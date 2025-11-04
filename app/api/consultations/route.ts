// app/api/consultations/route.ts — Kit (ConvertKit) only + optional email via Resend
// -----------------------------------------------------------------------------
// ENV required:
//   KIT_API_KEY="..."                 // required
//   KIT_TAG_ID="123456"               // optional (applies a tag)
//   KIT_FORM_ID="123456"              // optional (adds to a form)
//   RESEND_API_KEY="..."              // optional (to email you a copy)
//   MAIL_TO="you@domain.com"          // optional; where to send the email
//   MAIL_FROM="Bookings <noreply@your-domain.com>"  // optional; verified sender in Resend

import { NextResponse } from 'next/server';

// ----- Types -----
interface ConsultBody {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
  preferred?: string; // datetime-local string
  tz?: string;
  consent?: boolean;
  source?: string; // e.g. "consultations-page"
}

// ----- Helpers -----
function json(status: number, data: any) {
  return NextResponse.json(data, { status });
}
function isEmail(s: string) { return /.+@.+\..+/.test(s); }
async function safeJson<T = any>(res: Response): Promise<T | null> {
  try { return (await res.json()) as T; } catch { return null; }
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
function nl2br(s: string) { return s.replace(/\n/g, '<br/>'); }

// ----- Email via Resend (optional) -----
async function sendMail(data: ConsultBody) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || 'Bookings <bookings@example.com>';
  if (!key || !to) return { skipped: true };

  const subject = `New 1:1 Consultation — ${data.name}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2a1f29;">
      <h2 style="margin:0 0 12px;font-size:18px;">New 1:1 Consultation Request</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #eee;border-radius:10px;">
        <tbody>
          <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
          ${data.phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>` : ''}
          ${data.topic ? `<tr><td><strong>Topic</strong></td><td>${escapeHtml(data.topic!)}</td></tr>` : ''}
          ${data.preferred ? `<tr><td><strong>Preferred</strong></td><td>${escapeHtml(data.preferred!)}</td></tr>` : ''}
          ${data.tz ? `<tr><td><strong>Timezone</strong></td><td>${escapeHtml(data.tz!)}</td></tr>` : ''}
          <tr><td style="vertical-align:top"><strong>Message</strong></td><td>${nl2br(escapeHtml(data.message))}</td></tr>
          ${data.source ? `<tr><td><strong>Source</strong></td><td>${escapeHtml(data.source!)}</td></tr>` : ''}
        </tbody>
      </table>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html })
  });
  const body = await safeJson(res);
  return { ok: res.ok, status: res.status, body };
}

// ----- Kit (ConvertKit) API -----
const KIT_BASE = 'https://api.kit.com/v4';

async function kitUpsertSubscriber(data: ConsultBody) {
  const API = process.env.KIT_API_KEY;
  if (!API) throw new Error('Missing env KIT_API_KEY');

  const payload: any = {
    email: data.email,
    first_name: data.name,
    fields: {
      phone: data.phone || '',
      topic: data.topic || '',
      message: data.message,
      timezone: data.tz || '',
      preferred: data.preferred || '',
      source: data.source || 'consultations-page',
    },
  };

  const res = await fetch(`${KIT_BASE}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API}` },
    body: JSON.stringify(payload),
  });
  const body = await safeJson(res);
  return { ok: res.ok, status: res.status, body };
}

async function kitApplyTag(email: string) {
  const API = process.env.KIT_API_KEY;
  const TAG = process.env.KIT_TAG_ID;
  if (!API || !TAG) return { skipped: true };

  const res = await fetch(`${KIT_BASE}/tags/${encodeURIComponent(TAG)}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API}` },
    body: JSON.stringify({ email }),
  });
  const body = await safeJson(res);
  return { ok: res.ok, status: res.status, body };
}

async function kitAddToForm(email: string) {
  const API = process.env.KIT_API_KEY;
  const FORM = process.env.KIT_FORM_ID;
  if (!API || !FORM) return { skipped: true };

  const res = await fetch(`${KIT_BASE}/forms/${encodeURIComponent(FORM)}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API}` },
    body: JSON.stringify({ email }),
  });
  const body = await safeJson(res);
  return { ok: res.ok, status: res.status, body };
}

// ----- Handler -----
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConsultBody;

    // Basic validation
    if (!body || typeof body !== 'object') return json(400, { error: 'Invalid body' });
    if (!body.name || body.name.trim().length < 2) return json(422, { error: 'Name is required' });
    if (!body.email || !isEmail(body.email)) return json(422, { error: 'Valid email is required' });
    if (!body.message || body.message.trim().length < 6) return json(422, { error: 'Message is too short' });

    // Fan-out: email and Kit operations in parallel (independent)
    const [mail, upsert, tag, form] = await Promise.all([
      sendMail(body).catch((e) => ({ error: e?.message || 'mail-failed' })),
      kitUpsertSubscriber(body).catch((e) => ({ error: e?.message || 'kit-upsert-failed' })),
      kitApplyTag(body.email).catch((e) => ({ error: e?.message || 'kit-tag-failed' })),
      kitAddToForm(body.email).catch((e) => ({ error: e?.message || 'kit-form-failed' })),
    ]);

    return json(200, { ok: true, mail, kit: { upsert, tag, form } });
  } catch (e: any) {
    return json(500, { ok: false, error: e?.message || 'Server error' });
  }
}
