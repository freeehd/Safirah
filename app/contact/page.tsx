"use client";
import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Globe2, Shield, Star, ChevronDown, ArrowRight, CreditCard, Mail } from "lucide-react";

/**
 * ConsultationsPage — Purchase Page for 1:1 Session
 * - Replaces the request form with a direct purchase link
 * - Shows price ($160 CAD) and value proposition
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
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallax(window.scrollY * 0.04);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main
      className="page-wrapper relative min-h-screen w-full overflow-hidden"
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
            <Calendar size={16} /> 1:1 Coaching Session
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: COLORS.text }}>
            Let’s create calm, clarity, and momentum—together
          </h1>
          <AccentDivider />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: hexToRgba(COLORS.text, 0.9) }}>
            Ready to dive deep? Book a focused 45–60 minute 1:1 consultation to reset your mindset, plan your strategy, or overcome overwhelm.
          </p>
        </div>
      </section>

      {/* Content grid */}
      <section className="relative px-6 sm:px-12 lg:px-24 xl:px-32 pb-24 z-10">
        <div className="max-w-screen-xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Purchase Card */}
          <div className="relative transition-transform will-change-transform hover:-translate-y-0.5">
            {/* Gradient frame */}
            <div className="p-[1.2px] rounded-3xl" style={{ background: `linear-gradient(135deg, ${hexToRgba(COLORS.highlight, 0.45)}, ${hexToRgba(COLORS.accent2, 0.45)})` }}>
              <div
                className="rounded-3xl p-8 sm:p-10 backdrop-blur-md border flex flex-col gap-6"
                style={{ backgroundColor: hexToRgba("#ffffff", 0.6), borderColor: hexToRgba("#000000", 0.08), boxShadow: `0 24px 60px ${hexToRgba("#000000", 0.09)}` }}
              >
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: COLORS.text }}>Single Session</h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold" style={{ color: COLORS.text }}>$160</span>
                    <span className="text-lg font-medium" style={{ color: hexToRgba(COLORS.text, 0.7) }}>CAD</span>
                  </div>
                  <p className="mt-4 text-base" style={{ color: hexToRgba(COLORS.text, 0.85) }}>
                    One-time payment. No subscription.
                  </p>
                </div>

                <div className="space-y-4 border-t border-b py-6" style={{ borderColor: hexToRgba(COLORS.text, 0.1) }}>
                  {[
                    "45–60 minute private video call",
                    "Deep dive into your specific challenge",
                    "Actionable strategy & next steps",
                    "Recording available upon request"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} style={{ color: COLORS.highlight }} className="shrink-0 mt-0.5" />
                      <span style={{ color: hexToRgba(COLORS.text, 0.9) }}>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://shop.hirahsaficoach.com/products/1-on-1-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-transform hover:scale-[1.02] focus:scale-[1.02]"
                  style={{ color: COLORS.onAccent, backgroundImage: `linear-gradient(135deg, ${COLORS.highlight}, ${COLORS.accent2})`, boxShadow: `0 10px 24px ${hexToRgba(COLORS.highlight, 0.25)}` }}
                >
                  <span>Book & Pay Now</span>
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 60%)" }} />
                </a>

                <p className="text-xs text-center" style={{ color: hexToRgba(COLORS.text, 0.6) }}>
                  <Shield size={12} className="inline mr-1" />
                  Secure payment via our shop
                </p>
              </div>
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
                {["Compassionate, strategic guidance", "Clear next steps after every call", "Judgement‑free, confidential support"].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: hexToRgba(COLORS.highlight, 0.15), color: COLORS.highlight }}>
                      <CheckCircle2 size={14} />
                    </span>
                    <span style={{ color: hexToRgba(COLORS.text, 0.9) }}>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: hexToRgba(COLORS.text, 0.1) }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: hexToRgba(COLORS.text, 0.6) }}>
                  Questions?
                </p>
                <a
                  href="mailto:hirahsafi@gmail.com"
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/50 group"
                  style={{ backgroundColor: hexToRgba(COLORS.accent1, 0.15) }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110" style={{ color: COLORS.highlight }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: COLORS.text }}>Email Me</p>
                    <p className="text-sm" style={{ color: hexToRgba(COLORS.text, 0.8) }}>hirahsafi@gmail.com</p>
                  </div>
                </a>
              </div>

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
                { q: "How do I schedule my time?", a: "After purchasing, you'll receive a link to my calendar to book a slot that works for you." },
                { q: "What if I need to reschedule?", a: "Life happens! You can reschedule up to 24 hours before your session using the link in your confirmation email." },
                { q: "Is the $160 CAD fee refundable?", a: "Sessions are non-refundable but can be rescheduled. If you're unsure, feel free to reach out via email first." },
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
    </main>
  );
}

/* ———————— UI helpers ———————— */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6 sm:p-8 border backdrop-blur-md transition-transform will-change-transform hover:-translate-y-0.5" style={{ backgroundColor: hexToRgba("#ffffff", 0.6), borderColor: hexToRgba("#000000", 0.08), boxShadow: `0 16px 40px ${hexToRgba("#000000", 0.06)}` }}>
      {children}
    </div>
  );
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
