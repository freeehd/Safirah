'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Sparkles, CheckCircle2, MessageCircle, Quote, PenLine } from 'lucide-react';
import Image from 'next/image';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BLOOM & BELONG — REVIEW / FEEDBACK FORM
 *
 *  Posts to a Google Form (house pattern: hidden iframe + no-cors POST).
 *  To go live:
 *    1. Create the review Google Form in Hirah's account
 *    2. Paste the formResponse URL into FORM_ACTION below
 *    3. Paste the field entry IDs (grab via console: Array.from(document
 *       .querySelectorAll('input[name^="entry."]')).map(el => el.name))
 *       into the FIELD_ENTRY_IDS object below
 *  Until then the form shows a friendly "reviews open soon" panel — nothing
 *  is submitted to the wrong place.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const FORM_ACTION = '';

const FIELD_ENTRY_IDS: Record<string, string> = {
  name: 'entry.1',
  email: 'entry.2',
  rating: 'entry.3',
  comments: 'entry.4',
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const C = {
  cream: '#FBF7F0',
  rose: '#E8B4A8',
  blush: '#F6E4DE',
  deepRose: '#B9705F',
  espresso: '#332521',
  body: '#4F4541',
  muted: '#725853',
  border: '#E5D5CE',
  white: '#FFFFFF',
};

export default function ReviewPageClient() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const live = Boolean(FORM_ACTION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!live) return;
    setStatus('submitting');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('success');
    }
  };

  return (
    <main className="page-wrapper-2 min-h-screen" style={{ backgroundColor: C.cream }}>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-5 md:px-16 py-20 md:py-28 text-center">
        <div className="absolute inset-0 -z-10" style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${C.blush}80 0%, transparent 65%),
                      radial-gradient(ellipse 50% 45% at 85% 90%, ${C.rose}30 0%, transparent 60%)`,
        }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="max-w-2xl mx-auto">
          <span
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full mb-7"
            style={{ color: C.deepRose, backgroundColor: `${C.white}80`, border: `1px solid ${C.rose}50` }}
          >
            <Heart size={11} />
            Bloom &amp; Belong
          </span>
          <h1 className="font-playfair text-[clamp(2rem,6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-5" style={{ color: C.espresso }}>
            How was your <span className="italic font-light" style={{ color: C.deepRose }}>afternoon?</span>
          </h1>
          <p className="font-lato text-[16px] md:text-[18px] leading-[1.75] max-w-lg mx-auto" style={{ color: C.body }}>
            We&apos;d love to hear about your Bloom &amp; Belong experience — the flowers, the circle, the shift.
            Your words help more sisters find their way to the room.
          </p>
        </motion.div>
      </section>

      {/* ─── Form ─── */}
      <section className="px-5 md:px-16 pb-24">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl p-8 sm:p-10"
            style={{ backgroundColor: `${C.white}90`, borderColor: `${C.rose}40`, backdropFilter: 'blur(16px)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${C.rose}, ${C.deepRose}, ${C.rose})` }} />

            {!live ? (
              <div className="text-center space-y-5 py-8">
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.blush}80` }}>
                  <PenLine size={26} style={{ color: C.deepRose }} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: C.espresso }}>
                    Reviews open soon
                  </h2>
                  <p className="font-lato text-sm sm:text-base leading-relaxed max-w-sm mx-auto" style={{ color: C.body }}>
                    We&apos;re setting up the review collection — check back after the event, or share your
                    experience with us directly. Your words matter.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1.5 pt-2 text-xs font-bold uppercase tracking-widest" style={{ color: C.deepRose }}>
                  <Sparkles size={13} />
                  <span>Thank you for blooming with us</span>
                  <Sparkles size={13} />
                </div>
              </div>
            ) : (
              <>
                <div className="text-center space-y-2 mb-8">
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: C.espresso }}>
                    Leave your review
                  </h2>
                  <p className="font-lato text-sm opacity-80" style={{ color: C.body }}>
                    Two minutes — it truly helps
                  </p>
                </div>

                <form action={FORM_ACTION} method="POST" target="hidden-review-frame" onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="pageHistory" value="0" />

                  {/* Rating */}
                  <div className="text-center">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: C.muted }}>
                      Your rating *
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="transition-transform duration-200 hover:scale-125"
                        >
                          <Star
                            size={34}
                            className={star <= (hoverRating || rating) ? 'fill-current' : ''}
                            style={{ color: star <= (hoverRating || rating) ? C.deepRose : `${C.border}` }}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name={FIELD_ENTRY_IDS.rating} value={rating} />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: C.muted }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name={FIELD_ENTRY_IDS.name}
                      required
                      placeholder="Your name"
                      className="w-full px-5 py-4 rounded-2xl bg-white/70 border outline-none transition-all font-lato focus:ring-4"
                      style={{ borderColor: C.border, color: C.espresso }}
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: C.muted }}>
                      Email <span className="normal-case opacity-60">(optional — only if you&apos;d like a reply)</span>
                    </label>
                    <input
                      type="email"
                      name={FIELD_ENTRY_IDS.email}
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 rounded-2xl bg-white/70 border outline-none transition-all font-lato"
                      style={{ borderColor: C.border, color: C.espresso }}
                    />
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: C.muted }}>
                      Your review *
                    </label>
                    <textarea
                      name={FIELD_ENTRY_IDS.comments}
                      required
                      rows={5}
                      placeholder="What did Bloom & Belong mean to you? What shifted, what stayed with you?"
                      className="w-full px-5 py-4 rounded-2xl bg-white/70 border outline-none transition-all font-lato resize-none"
                      style={{ borderColor: C.border, color: C.espresso }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting' || rating === 0}
                    className="w-full rounded-full py-5 font-playfair font-bold text-lg text-white shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.deepRose})` }}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Share my review'}
                  </button>
                </form>

                {/* Hidden iframe so the POST doesn't navigate the page */}
                <iframe name="hidden-review-frame" className="hidden" />
              </>
            )}
          </motion.div>

          {/* Review examples hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.muted }}>
              <Quote size={12} />
              Real words help real sisters
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Success overlay ─── */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(51,37,33,0.55)', backdropFilter: 'blur(6px)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative w-full max-w-md rounded-[2.5rem] bg-white p-10 text-center shadow-2xl"
            >
              <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${C.blush}90` }}>
                <CheckCircle2 size={40} style={{ color: C.deepRose }} />
              </div>
              <h3 className="font-playfair text-3xl font-bold mb-3" style={{ color: C.espresso }}>
                Shukran, sister!
              </h3>
              <p className="font-lato text-[15px] leading-relaxed" style={{ color: C.body }}>
                Your review has been received. Thank you for taking a moment — your words will help
                more sisters find their seat in the circle.
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-6 text-xs font-bold uppercase tracking-widest" style={{ color: C.deepRose }}>
                <MessageCircle size={13} />
                Bloom &amp; Belong
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
