import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../../lib/email';
import { getQuizResultEmailHtml } from '../../../lib/email-templates';
import { OptionKey } from '../../../lib/quiz-data';

const KIT_API_BASE = (process.env.KIT_API_BASE || 'https://api.kit.com').replace(/\/$/, '');
const KIT_API_KEY = process.env.KIT_API_KEY as string;

// Optional defaults (tags only). Forms/sequences are intentionally unsupported here.
const DEFAULT_TAG_IDS = (process.env.KIT_DEFAULT_TAG_ID || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const DEFAULT_TAG_NAME = process.env.KIT_DEFAULT_TAG_NAME?.trim();

function k(path: string) { return `${KIT_API_BASE}/v4${path.startsWith('/') ? '' : '/'}${path}`; }

async function kfetch<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', 'X-Kit-Api-Key': KIT_API_KEY!, ...(init?.headers || {}) },
    cache: 'no-store'
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${url} -> ${res.status} ${res.statusText} :: ${text}`);
  }
  try { return (await res.json()) as T; } catch { return {} as T; }
}

/* ---------- Custom fields: ensure they exist ---------- */
let customFieldsCache: Array<{ id: number; key: string; label: string }> | null = null;

async function listCustomFields() {
  if (customFieldsCache) return customFieldsCache;
  const data = await kfetch<{ custom_fields: Array<{ id: number; key: string; label: string }> }>(k('/custom_fields'));
  customFieldsCache = data.custom_fields || [];
  return customFieldsCache;
}
const labelFromKey = (key: string) =>
  key.replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, m => m.toUpperCase());

async function ensureCustomFieldsExist(fieldKeys: string[]) {
  if (!fieldKeys.length) return;
  const existing = await listCustomFields();
  const have = new Set(existing.map(f => f.key.toLowerCase()));
  for (const raw of fieldKeys) {
    const key = String(raw || '').toLowerCase();
    if (!key || have.has(key)) continue;
    const created = await kfetch<{ custom_field: { id: number; key: string; label: string } }>(k('/custom_fields'), {
      method: 'POST',
      body: JSON.stringify({ label: labelFromKey(key) })
    });
    customFieldsCache = [...(customFieldsCache || []), created.custom_field];
    have.add(created.custom_field.key.toLowerCase());
  }
}

/* ---------- Tags: list/ensure/apply ---------- */
let tagsCache: Array<{ id: number; name: string }> | null = null;

async function listTags() {
  if (tagsCache) return tagsCache;
  const data = await kfetch<{ tags: Array<{ id: number; name: string }> }>(k('/tags'));
  tagsCache = (data.tags || []);
  return tagsCache;
}
const isNumericLike = (v: unknown) => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v));

async function ensureTagId(input: string | number): Promise<number> {
  if (isNumericLike(input)) {
    const id = Number(input);
    // Verify the ID exists so we don’t blow up later
    await kfetch(k(`/tags/${id}`));
    return id;
  }
  const name = String(input).trim();
  if (!name) throw new Error('Empty tag name provided');
  const tags = await listTags();
  const found = tags.find(t => t.name.toLowerCase() === name.toLowerCase());
  if (found) return found.id;
  const created = await kfetch<{ tag: { id: number; name: string } }>(k('/tags'), {
    method: 'POST',
    body: JSON.stringify({ name })
  });
  tagsCache = [...(tagsCache || []), created.tag];
  return created.tag.id;
}

async function applyTag(subscriberId: number, tagId: number) {
  await kfetch(k(`/tags/${tagId}/subscribers/${subscriberId}`), { method: 'POST', body: '{}' });
}

/* ---------- Subscriber upsert ---------- */
async function upsertSubscriber(input: {
  email: string;
  first_name?: string | null;
  fields?: Record<string, any> | null;
  // optional: state?: 'active' | 'unsubscribed' | ...
}) {
  const body: any = {
    email_address: input.email,
    first_name: input.first_name ?? null,
    fields: input.fields ?? null
  };
  // If you want to set state on *first create*, you can also pass state here:
  // if (input.state) body.state = input.state;

  const data = await kfetch<{ subscriber: { id: number } }>(k('/subscribers'), {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return data.subscriber;
}

/* ---------- POST handler ---------- */
export async function POST(req: NextRequest) {
  try {
    if (!KIT_API_KEY) return NextResponse.json({ error: 'Missing KIT_API_KEY' }, { status: 500 });
    const body = await req.json();

    const email: string | undefined = body.email || body.email_address;
    const name: string | undefined = body.name || body.firstName || body.first_name;
    const debug = Boolean(body.debug);
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    // Map your quiz meta -> custom fields
    const meta = body.meta ?? {};
    const fields: Record<string, any> = {
      entry_point: meta.entry_point ?? 'quiz',
      quiz_result: meta.result ?? null,
      quiz_answers_json: meta.answers ? JSON.stringify(meta.answers) : null,
      quiz_count_a: meta.counts?.A ?? null,
      quiz_count_b: meta.counts?.B ?? null,
      quiz_count_c: meta.counts?.C ?? null,
      quiz_count_d: meta.counts?.D ?? null
    };

    // 0) Ensure custom fields exist so values persist
    await ensureCustomFieldsExist(Object.keys(fields).filter(k => fields[k] !== undefined));

    // 1) Upsert subscriber (single API per the docs)
    const sub = await upsertSubscriber({ email, first_name: name ?? null, fields });

    // 2) Resolve/apply tags (IDs or names; auto-create names)
    const requestedTagIds: (string | number)[] = Array.isArray(body.tagIds) ? body.tagIds : [];
    const requestedTagNames: string[] = Array.isArray(body.tagNames) ? body.tagNames : [];
    let tagInputs: (string | number)[] = [...requestedTagIds, ...requestedTagNames];

    if (!tagInputs.length) {
      if (DEFAULT_TAG_IDS.length) tagInputs = [...DEFAULT_TAG_IDS];
      else if (DEFAULT_TAG_NAME) tagInputs = [DEFAULT_TAG_NAME];
    }

    const appliedTagIds: number[] = [];
    for (const t of tagInputs) {
      try {
        const id = await ensureTagId(t);
        await applyTag(sub.id, id);
        appliedTagIds.push(id);
      } catch (e) {
        // Skip invalid numeric IDs; name path will auto-create or throw meaningfully
        if (!isNumericLike(t)) throw e;
      }
    }

    // 3) Send result email (fire and forget or await, depending on preference)
    // We'll await it to ensure it's sent, but catch errors so we don't fail the request
    if (meta.result) {
      try {
        const emailHtml = getQuizResultEmailHtml(name || 'Friend', meta.result as OptionKey);
        await sendEmail({
          to: email,
          subject: 'Your Safirah Coaching Quiz Results',
          html: emailHtml
        });
      } catch (emailErr) {
        console.error('Failed to send quiz result email:', emailErr);
        // Don't fail the request, just log it
      }
    }

    return NextResponse.json({
      ok: true,
      subscriberId: sub.id,
      tagsApplied: appliedTagIds,
      ...(debug && { debug: { fieldsCreated: (customFieldsCache || []).map(f => f.key), tagsApplied: appliedTagIds } })
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
  }
}
