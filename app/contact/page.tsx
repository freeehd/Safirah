"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Mail, Phone, Clock, User, MessageSquare, CheckCircle2, Loader2, Globe2, Shield, Star, ChevronDown, X } from "lucide-react";

/**
 * ConsultationsPage — with toast success UX (Kit-only backend assumed)
 * - Keeps your structure & styling from v2
 * - Adds slide-in toast on 200 OK + gentle success overlay option
 */

// --- Brand tokens ---
const COLORS = {
  bg: "#f7f4f1",
  accent1: "#ecd9d2",
  accent2: "#E0c5bb",
  highlight: "#d29a89",
  text: "#2a1f29",
  onAccent: "#ffffff",
};

export default function ConsultationsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [parallax, setParallax] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // optional success screen

  // Autodetect timezone for convenience
  const timezone = useMemo(() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; }
  }, []);

  // Basic form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Clarity & Mindset Reset",
    message: "",
    preferred: "",
    tz: timezone,
    consent: false,
    touched: false,
  });

  const canSubmit = form.name.trim().length > 1 && /.+@.+\..+/.test(form.email) && form.message.trim().length > 5 && form.consent;

  useEffect(() => {
    const onScroll = () => setParallax(window.scrollY * 0.04);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked, touched: true }));
    else setForm((f) => ({ ...f, [name]: value, touched: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading"); setError(""); setShowToast(false); setShowOverlay(false);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "consultations-page" }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      setForm((f) => ({ ...f, message: "", preferred: "" }));
      // Toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4500);
      // Optional overlay (comment this out if you prefer toast only)
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 1800);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setStatus("error"); setError(err?.message || "Something went wrong. Please try again.");
      setShowToast(false); setShowOverlay(false);
    }
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundColor: COLORS.bg,
        backgroundImage:
          `radial-gradient(circle at 15% 15%, ${hexToRgba(COLORS.accent1, 0.45)}, transparent 55%),` +
          `radial-gradient(circle at 85% 25%, ${hexToRgba(COLORS.accent2, 0.40)}, transparent 55%),` +
          `radial-gradient(circle at 20% 85%, ${hexToRgba(COLORS.accent1, 0.50)}, transparent 60%)`,
      }}
    >
      {/* Gentle vignette */}
      <div className="pointer-events-none absolute inset-0" aria-hidden
        style={{ background: `radial-gradient(1200px 600px at 50% 0%, ${hexToRgba("#000", 0.04)}, transparent 60%)` }}
      />

      {/* Decorative parallax orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Orb top={-180 + parallax} left={-120} size={420} color={hexToRgba(COLORS.accent1, 0.6)} />
        <Orb top={240 - parallax * 1.2} left={"70%"} size={360} color={hexToRgba(COLORS.accent2, 0.45)} />
        <Orb top={"65%"} left={-160} size={320} color={hexToRgba(COLORS.highlight, 0.16)} blur />
      </div>

      {/* Header */}
      <section className="relative px-6 sm:px-12 lg:px-24 xl:px-32 pt-16 pb-10 z-10">
        <div className="max-w-screen-xl mx-auto">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 border text-sm font-semibold tracking-wide backdrop-blur shadow-sm"
            style={{ color: COLORS.text, borderColor: COLORS.highlight, backgroundColor: hexToRgba(COLORS.accent1, 0.15) }}
          >
            <Calendar size={16} /> Book Your 1:1 Consultation
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: COLORS.text }}>
            Let’s create calm, clarity, and momentum—together
          </h1>
          <AccentDivider />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: hexToRgba(COLORS.text, 0.9) }}>
            Use the form below to request a 45–60 minute 1:1 consultation. Share your goals and a preferred time—I'll reply with a confirmed slot or a couple of options that suit your timezone.
          </p>
        </div>
      </section>

      {/* Content grid */}
      <section className="relative px-6 sm:px-12 lg:px-24 xl:px-32 pb-24 z-10">
        <div className="max-w-screen-xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Booking form */}
          <div className="relative transition-transform will-change-transform hover:-translate-y-0.5">
            {/* Gradient frame */}
            <div className="p-[1.2px] rounded-3xl" style={{ background: `linear-gradient(135deg, ${hexToRgba(COLORS.highlight, 0.45)}, ${hexToRgba(COLORS.accent2, 0.45)})` }}>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-6 sm:p-8 backdrop-blur-md border"
                style={{ backgroundColor: hexToRgba("#ffffff", 0.6), borderColor: hexToRgba("#000000", 0.08), boxShadow: `0 24px 60px ${hexToRgba("#000000", 0.09)}` }}
                aria-describedby="form-help"
              >
                {/* status live region */}
                <span className="sr-only" aria-live="polite">
                  {status === "loading" ? "Sending" : status === "success" ? "Sent" : status === "error" ? "Error" : "Idle"}
                </span>

                <FormGrid>
                  <Field label="Full name" htmlFor="name" icon={<User size={18} />} required>
                    <Input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} invalid={form.touched && form.name.trim().length <= 1} />
                  </Field>

                  <Field label="Email" htmlFor="email" icon={<Mail size={18} />} required>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} invalid={form.touched && !/.+@.+\..+/.test(form.email)} />
                  </Field>

                  <Field label="Phone (optional)" htmlFor="phone" icon={<Phone size={18} />}>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 555 123 4567" value={form.phone} onChange={handleChange} />
                  </Field>

                  <Field label="What would you like support with?" htmlFor="topic">
                    <Select id="topic" name="topic" value={form.topic} onChange={handleChange}>
                      <option>Clarity & Mindset Reset</option>
                      <option>Business Strategy & Planning</option>
                      <option>Habits, Routines & Confidence</option>
                      <option>Stress, Overwhelm & Burnout</option>
                      <option>Other (share details below)</option>
                    </Select>
                  </Field>

                  <Field label="Tell me a little about you & your goals" htmlFor="message" icon={<MessageSquare size={18} />} required>
                    <Textarea id="message" name="message" rows={5} placeholder="What’s going on right now, and what would a great outcome look like?" value={form.message} onChange={handleChange} invalid={form.touched && form.message.trim().length <= 5} />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Preferred date & time" htmlFor="preferred" icon={<Clock size={18} />} tooltip={`Your timezone will be sent as: ${form.tz}`}>
                      <Input id="preferred" name="preferred" type="datetime-local" value={form.preferred} onChange={handleChange} />
                    </Field>
                    <Field label="Your timezone" htmlFor="tz">
                      <Input id="tz" name="tz" type="text" value={form.tz} readOnly />
                    </Field>
                  </div>

                  <label className="flex items-start gap-3 text-sm select-none" style={{ color: hexToRgba(COLORS.text, 0.9) }}>
                    <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1 h-4 w-4 rounded border" style={{ accentColor: COLORS.highlight, borderColor: hexToRgba("#000000", 0.2) }} aria-describedby="consent-note" />
                    <span id="consent-note">I agree to be contacted about this consultation request and understand my information will be handled respectfully. <strong>We never share your data.</strong></span>
                  </label>

                  {/* Submit */}
                  <div className="flex items-center gap-3 pt-2">
                    <button type="submit" disabled={!canSubmit || status === "loading"} className="group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-semibold transition-transform hover:scale-[1.02] focus:scale-[1.02] disabled:opacity-60" style={{ color: COLORS.onAccent, backgroundImage: `linear-gradient(135deg, ${COLORS.highlight}, ${COLORS.accent2})`, boxShadow: `0 10px 24px ${hexToRgba(COLORS.highlight, 0.25)}` }}>
                      {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                      {status === "loading" ? "Sending..." : "Request Consultation"}
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 60%)" }} />
                    </button>
                    {status === "success" && (
                      <span className="text-sm flex items-center gap-2" style={{ color: COLORS.text }}>
                        <CheckCircle2 size={16} style={{ color: COLORS.highlight }} /> Thank you! I’ll reply shortly with available slots.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-sm" role="alert" style={{ color: "#8a1f1f" }}>{error}</span>
                    )}
                  </div>

                  <p id="form-help" className="text-xs flex items-center gap-2" style={{ color: hexToRgba(COLORS.text, 0.7) }}>
                    <Shield size={14} /> Your details are encrypted in transit. No spam—ever.
                  </p>
                </FormGrid>
              </form>
            </div>
          </div>

          {/* Coach card / social proof / FAQs */}
          <aside className="space-y-6">
            <Card>
              <div className="flex items-center gap-4">
                <img src="/assets/1.webp" alt="Hirah Safi" className="h-16 w-16 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>Hirah Safi</h3>
                  <p className="text-sm" style={{ color: hexToRgba(COLORS.text, 0.8) }}>Lifestyle & Success Coach</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-3 text-sm">
                {["Compassionate, strategic guidance","Clear next steps after every call","Judgement‑free, confidential support"].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: hexToRgba(COLORS.highlight, 0.15), color: COLORS.highlight }}>
                      <CheckCircle2 size={14} />
                    </span>
                    <span style={{ color: hexToRgba(COLORS.text, 0.9) }}>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: hexToRgba(COLORS.accent1, 0.25) }}>
                <p className="text-sm" style={{ color: hexToRgba(COLORS.text, 0.9) }}>
                  “I walked in overwhelmed; I left with a plan and my spark back.”
                </p>
                <p className="mt-2 text-xs" style={{ color: hexToRgba(COLORS.text, 0.7) }}>— Client, 2025</p>
              </div>
              <div className="mt-6 flex items-center gap-1" aria-label="rating">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={18} style={{ color: COLORS.highlight }} />))}
                <span className="ml-2 text-sm" style={{ color: hexToRgba(COLORS.text, 0.8) }}>4.9/5 from recent sessions</span>
              </div>
            </Card>

            <Card>
              <h4 className="text-lg font-bold" style={{ color: COLORS.text }}>Quick FAQs</h4>
              {[
                { q: "How long is the consultation?", a: "Sessions are typically 45–60 minutes via Zoom or Google Meet." },
                { q: "What happens after I submit?", a: "You’ll receive an email with confirmation and a calendar invite. If the time isn’t perfect, we’ll offer close alternatives in your timezone." },
                { q: "Is there a fee?", a: "Intro consultations may be complimentary or discounted during promotions. We’ll confirm pricing in the email based on your selection." },
              ].map((item, i) => (
                <details key={i} className="mt-3 group rounded-xl border p-4 bg-white/40">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold select-none" style={{ color: COLORS.text }}>
                    {item.q}
                    <ChevronDown className="transition-transform group-open:rotate-180" size={18} />
                  </summary>
                  <div className="mt-2 text-sm" style={{ color: hexToRgba(COLORS.text, 0.85) }}>{item.a}</div>
                </details>
              ))}
            </Card>
          </aside>
        </div>
      </section>

      {/* Toast */}
      <Toast open={showToast} onClose={() => setShowToast(false)}>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: hexToRgba(COLORS.highlight, 0.2), color: COLORS.highlight }}>
            <CheckCircle2 size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: COLORS.text }}>Request sent!</p>
            <p className="text-xs" style={{ color: hexToRgba(COLORS.text, 0.8) }}>I’ll email you shortly with available times.</p>
          </div>
        </div>
      </Toast>

      {/* Optional quick overlay success (auto-fades) */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24" style={{ background: hexToRgba("#000", 0.1) }}>
          <div className="rounded-3xl px-6 py-4 shadow-xl backdrop-blur-md" style={{ backgroundColor: hexToRgba("#fff", 0.8), border: `1px solid ${hexToRgba("#000", 0.08)}` }}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: hexToRgba(COLORS.highlight, 0.2), color: COLORS.highlight }}>
                <CheckCircle2 size={20} />
              </span>
              <p className="text-sm font-semibold" style={{ color: COLORS.text }}>Thanks! Your consultation request is in.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ———————— UI helpers ———————— */
function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6 sm:p-8 border backdrop-blur-md transition-transform will-change-transform hover:-translate-y-0.5" style={{ backgroundColor: hexToRgba("#ffffff", 0.6), borderColor: hexToRgba("#000000", 0.08), boxShadow: `0 16px 40px ${hexToRgba("#000000", 0.06)}` }}>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { invalid, readOnly, className = "", style, ...rest } = props;
  return (
    <input
      {...rest}
      readOnly={readOnly}
      className={`w-full rounded-xl px-4 py-3 outline-none border transition-shadow focus:ring-2 ${className}`}
      style={{
        ...inputStyle(readOnly),
        borderColor: invalid ? hexToRgba("#b42318", 0.5) : hexToRgba("#000000", 0.15),
        boxShadow: invalid ? `0 0 0 4px ${hexToRgba("#b42318", 0.08)} inset` : `0 1px 0 ${hexToRgba("#000000", 0.03)} inset`,
        ...style,
      }}
      aria-invalid={invalid || undefined}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", style, ...rest } = props;
  return (
    <select {...rest} className={`w-full rounded-xl px-4 py-3 outline-none border focus:ring-2 transition-shadow ${className}`} style={{ ...inputStyle(false), borderColor: hexToRgba("#000000", 0.15), ...style }} />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  const { invalid, className = "", style, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`w-full rounded-xl px-4 py-3 outline-none border focus:ring-2 transition-shadow resize-y ${className}`}
      style={{
        ...inputStyle(false),
        borderColor: invalid ? hexToRgba("#b42318", 0.5) : hexToRgba("#000000", 0.15),
        boxShadow: invalid ? `0 0 0 4px ${hexToRgba("#b42318", 0.08)} inset` : `0 1px 0 ${hexToRgba("#000000", 0.03)} inset`,
        ...style,
      }}
      aria-invalid={invalid || undefined}
    />
  );
}

function inputStyle(readOnly = false): React.CSSProperties {
  return {
    borderColor: hexToRgba("#000000", 0.15),
    backgroundColor: readOnly ? "#ffffff99" : "#ffffffbf",
    color: COLORS.text,
  };
}

function hexToRgba(hex: string, alpha = 1) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function Orb({ top, left, size, color, blur = false }: { top: number | string; left: number | string; size: number; color: string; blur?: boolean; }) {
  return (
    <div className={`absolute rounded-full ${blur ? "blur-3xl" : ""}`} style={{ top, left, height: size, width: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, opacity: 0.5 }} />
  );
}

function AccentDivider() {
  return (
    <div className="mt-6 h-[3px] w-28 rounded-full" style={{ backgroundImage: `linear-gradient(90deg, ${hexToRgba(COLORS.highlight, 0.9)}, ${hexToRgba(COLORS.accent2, 0.9)})`, boxShadow: `0 6px 18px ${hexToRgba(COLORS.highlight, 0.25)}` }} />
  );
}

// Toast component (portal-less, fixed bottom-right on desktop; top on mobile)
function Toast({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode; }) {
  return (
    <div
      className={`fixed z-50 w-[92%] sm:w-auto sm:bottom-6 bottom-4 left-1/2 sm:left-auto sm:right-6 -translate-x-1/2 sm:translate-x-0 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      role="status"
      aria-live="polite"
    >
      <div className="rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md border flex items-start gap-3" style={{ backgroundColor: hexToRgba('#ffffff', 0.85), borderColor: hexToRgba('#000', 0.08) }}>
        {children}
        <button aria-label="Close" onClick={onClose} className="ml-2 rounded p-1 hover:opacity-80">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
// Reusable field wrapper with label & optional icon/tooltip
function Field({
  label,
  htmlFor,
  icon,
  tooltip,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}{required && <span className="ml-1" title="Required">*</span>}</span>
        {tooltip && (
          <span className="ml-2 text-xs opacity-70">{tooltip}</span>
        )}
      </label>
      {children}
    </div>
  );
}
