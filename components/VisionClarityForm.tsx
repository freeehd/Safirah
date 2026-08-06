'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Sparkles, CheckCircle2, Heart, Compass } from 'lucide-react';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VISION & CLARITY LAB — REGISTRATION FORM
 *
 *  This form posts to Kit (ConvertKit), matching the GoldenPearlForm pattern.
 *  To go live:
 *    1. Create the Vision & Clarity Lab form in your Kit account
 *    2. Paste its form ID below (the long numeric ID from the form's embed URL:
 *       https://app.kit.com/forms/<FORM_ID>/subscriptions)
 *  Until then the section renders a friendly "registration opens soon" panel —
 *  no submissions are silently misrouted to other events.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const KIT_FORM_ID = '';

const C = {
  dawn: '#F6F3EC',
  lilac: '#E6DFF2',
  periwinkle: '#B7A6E0',
  deepLilac: '#8B76C2',
  espresso: '#332521',
  body: '#4F4541',
  muted: '#725853',
  border: '#D9D0E2',
  white: '#FFFFFF',
};

interface Props {
  className?: string;
}

export default function VisionClarityForm({ className = '' }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ full_name: '', email_address: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border shadow-2xl ${className}`}
        style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderColor: C.periwinkle }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${C.lilac}, ${C.periwinkle}, ${C.lilac})` }} />
        <div className="relative z-10 text-center space-y-6 py-4">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: `${C.lilac}60` }}>
            <CheckCircle2 size={40} style={{ color: C.deepLilac }} />
          </div>
          <div className="space-y-2">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold" style={{ color: C.espresso }}>
              You&apos;re in, sister!
            </h2>
            <p className="font-lato font-medium" style={{ color: C.body }}>
              <Heart size={14} className="inline mr-1" style={{ color: C.deepLilac }} />
              Your seat at the Vision &amp; Clarity Lab is saved.
            </p>
          </div>
          <div className="p-4 rounded-2xl border" style={{ backgroundColor: `${C.lilac}40`, borderColor: C.border }}>
            <p className="font-lato text-sm sm:text-base leading-relaxed" style={{ color: C.body }}>
              Watch your inbox at <span className="font-bold" style={{ color: C.espresso }}>{formData.email_address}</span> for the Zoom link and your Clarity Workbook.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2 font-bold text-sm tracking-widest uppercase opacity-60" style={{ color: C.deepLilac }}>
            <Sparkles size={14} />
            <span>Clarity awaits</span>
            <Sparkles size={14} />
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: `${C.periwinkle}20` }} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border shadow-2xl ${className}`}
      style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderColor: `${C.periwinkle}50` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${C.lilac}, ${C.periwinkle}, ${C.lilac})` }} />

      {!KIT_FORM_ID ? (
        <div className="relative z-10 text-center space-y-5 py-6">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.lilac}60` }}>
            <Compass size={28} style={{ color: C.deepLilac }} />
          </div>
          <div className="space-y-2">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: C.espresso }}>
              Registration Opens Soon
            </h2>
            <p className="font-lato text-sm sm:text-base leading-relaxed max-w-sm mx-auto" style={{ color: C.body }}>
              We&apos;re finalizing the date for the Vision &amp; Clarity Lab. Drop your details and we&apos;ll notify you the moment seats open.
            </p>
          </div>
          <div className="pt-2 text-xs font-bold uppercase tracking-widest" style={{ color: C.deepLilac }}>
            <Sparkles size={12} className="inline mr-1" /> Save the date — details coming soon
          </div>
        </div>
      ) : (
        <>
          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: C.espresso }}>
                Save My Free Seat
              </h2>
              <p className="font-lato text-sm sm:text-base opacity-85" style={{ color: C.body }}>
                Vision &amp; Clarity Lab — live online
              </p>
            </div>
            <form
              action={`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`}
              method="post"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 transition-colors group-focus-within:opacity-100" style={{ color: C.deepLilac }}>
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="fields[full_name]"
                  placeholder="Full Name"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 border outline-none transition-all font-lato"
                  style={{ borderColor: C.border }}
                />
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 transition-colors group-focus-within:opacity-100" style={{ color: C.deepLilac }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email_address"
                  placeholder="Email Address"
                  required
                  value={formData.email_address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email_address: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 border outline-none transition-all font-lato"
                  style={{ borderColor: C.border }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full group relative overflow-hidden rounded-full py-5 font-playfair font-bold text-xl text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: `linear-gradient(135deg, ${C.periwinkle}, ${C.deepLilac})` }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'submitting' ? (
                    <>
                      <Sparkles size={20} className="animate-spin" />
                      Reserving...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Save My Free Seat
                    </>
                  )}
                </span>
              </button>
              <p className="text-[10px] sm:text-xs text-center opacity-60 font-medium" style={{ color: C.body }}>
                100% free • Sisters only • Live online
              </p>
            </form>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: `${C.periwinkle}15` }} />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: `${C.lilac}30` }} />
        </>
      )}
    </motion.div>
  );
}
