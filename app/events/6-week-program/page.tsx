'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, X } from 'lucide-react';
import Grainient from '@/components/Grainient';
import Script from 'next/script';
import TextPressure from '@/components/textpressure';

/* ───── palette ───── */
const pal = {
  cream: '#F5F0E8',
  dustyRose: '#C9A9A2',
  blush: '#E8D5D0',
  beige: '#D4C4B8',
  lightGray: '#D1C9C4',
  softPeach: '#E8C4B8',
  espresso: '#4A3B36',
  cocoa: '#7A6B65',
  stone: '#8C7F7A',
  mist: '#9F928B',
};

function hex2rgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const v = parseInt(n, 16);
  return `rgba(${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}, ${a})`;
}

/* ───── main ───── */
export default function SixWeekProgramPage() {
  const prefersReduced = useReducedMotion();
  const [showSuccess, setShowSuccess] = useState(false);
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  /* ─── watch for Kit's inline success alert → show popup ─── */
  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      const success = container.querySelector('.formkit-alert-success');
      if (success && !showSuccess) {
        setShowSuccess(true);
        // hide the inline alert so Kit doesn't show two messages
        (success as HTMLElement).style.display = 'none';
      }
    });

    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [showSuccess]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />

      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      <main
        className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-8 sm:px-14 lg:px-20 pt-28 sm:pt-32 pb-16"
      >
        {/* ─── WebGL grainient background ─── */}
        <div className="absolute inset-0 -z-10">
          <Grainient
            timeSpeed={0.12}
            colorBalance={0.0}
            warpStrength={0.6}
            warpFrequency={3.5}
            warpSpeed={1.2}
            warpAmplitude={80}
            blendAngle={15}
            blendSoftness={0.12}
            rotationAmount={300}
            noiseScale={2.5}
            grainAmount={0.06}
            grainScale={3.0}
            grainAnimated={true}
            contrast={1.2}
            gamma={1.0}
            saturation={0.9}
            centerX={0.0}
            centerY={-0.05}
            zoom={0.95}
            color1="#F5F0E8"
            color2="#E8D5D0"
            color3="#C9A9A2"
          />
        </div>

        {/* ─── content zone ─── */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* eyebrow label */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mb-5"
          >
            <span
              className="inline-block text-[9px] uppercase tracking-[0.4em] font-medium"
              style={{ color: pal.mist, letterSpacing: '0.4em' }}
            >
              Upcoming Experience
            </span>
          </motion.div>

          {/* ─── TextPressure hero heading ─── */}
          <motion.div
            className="w-full max-w-2xl mx-auto h-[clamp(4rem,12vw,8rem)]"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <TextPressure
              text="6-Week Program"
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor={pal.espresso}
              minFontSize={36}
            />
          </motion.div>

          {/* ─── decorative slim underline ─── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="origin-center h-px w-24 sm:w-32 mt-2 mb-6"
            style={{ backgroundColor: hex2rgba(pal.espresso, 0.12) }}
          />

          {/* ─── COMING SOON stamp ─── */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="mb-7"
          >
            <div
              className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border-2 shadow-sm"
              style={{
                borderColor: hex2rgba(pal.dustyRose, 0.4),
                backgroundColor: hex2rgba(pal.blush, 0.2),
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: pal.dustyRose }}
              />
              <span
                className="text-xs uppercase tracking-[0.25em] font-medium"
                style={{
                  color: pal.cocoa,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                }}
              >
                Coming Soon
              </span>
            </div>
          </motion.div>

          {/* ─── Signup form ─── */}
          <motion.div
            className="w-full max-w-sm mx-auto"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          >
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: pal.stone, letterSpacing: '0.02em', lineHeight: 1.7, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
            >
              Be the first to know when doors open&mdash;secure your spot before the public announcement.
            </p>

            {/* ── frosted-glass card ── */}
            <div
              ref={formContainerRef}
              className="relative rounded-2xl p-5 sm:p-6 backdrop-blur-xl"
              style={{
                backgroundColor: hex2rgba(pal.cream, 0.28),
                border: `1px solid ${hex2rgba(pal.dustyRose, 0.12)}`,
              }}
            >
              <form
                action="https://app.kit.com/forms/9448368/subscriptions"
                className="seva-form formkit-form"
                method="post"
                data-sv-form="9448368"
                data-uid="998129977b"
                data-format="inline"
                data-version="5"
              >
                <div data-style="clean">
                  <ul
                    className="formkit-alert formkit-alert-error hidden-empty"
                    data-element="errors"
                    data-group="alert"
                  />

                  <div data-element="fields" className="flex flex-col gap-3">
                    <div className="formkit-field">
                      <input
                        className="formkit-input w-full px-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-300"
                        name="fields[first_name]"
                        aria-label="Name"
                        placeholder="Your name"
                        type="text"
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${hex2rgba(pal.dustyRose, 0.2)}`,
                          color: pal.espresso,
                          fontFamily: "'Playfair Display', Georgia, serif",
                          letterSpacing: '0.02em',
                        }}
                      />
                    </div>

                    <div className="formkit-field">
                      <input
                        className="formkit-input w-full px-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-300"
                        name="email_address"
                        aria-label="Email Address"
                        placeholder="Your email"
                        required
                        type="email"
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${hex2rgba(pal.dustyRose, 0.2)}`,
                          color: pal.espresso,
                          fontFamily: "'Playfair Display', Georgia, serif",
                          letterSpacing: '0.02em',
                        }}
                      />
                    </div>

                    <button
                      data-element="submit"
                      className="formkit-submit group relative inline-flex items-center justify-center gap-3 w-full py-2.5 rounded-xl text-[11px] font-medium tracking-[0.13em] uppercase transition-all duration-500"
                      style={{
                        backgroundColor: pal.dustyRose,
                        color: '#ffffff',
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      <div className="formkit-spinner">
                        <div /><div /><div />
                      </div>
                      <span className="flex items-center justify-center gap-2.5">
                        <Sparkles
                          size={12}
                          className="opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12"
                        />
                        Join the Waitlist
                        <ArrowRight
                          size={12}
                          className="transition-all duration-500 group-hover:translate-x-1.5"
                        />
                      </span>
                    </button>
                  </div>

                  <div className="formkit-powered-by-convertkit-container text-center mt-3">
                    <a
                      href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
                      data-element="powered-by"
                      className="formkit-powered-by-convertkit"
                      data-variant="dark"
                      target="_blank"
                      rel="nofollow noopener"
                      style={{ opacity: 0.2, fontSize: '9px', color: pal.espresso, textDecoration: 'none', letterSpacing: '0.05em' }}
                    >
                      Powered by Kit
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* subtle right-edge vertical accent */}
        <motion.div
          className="absolute right-0 top-0 w-px"
          style={{
            background: `linear-gradient(180deg, transparent 10%, ${hex2rgba(pal.dustyRose, 0.15)} 50%, transparent 90%)`,
          }}
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />

        {/* ─── success popup overlay ─── */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccess(false)}
              />

              {/* modal card */}
              <motion.div
                className="relative w-full max-w-sm rounded-2xl p-8 sm:p-10 text-center shadow-2xl"
                style={{
                  backgroundColor: pal.cream,
                  border: `1px solid ${hex2rgba(pal.dustyRose, 0.2)}`,
                }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* close button */}
                <button
                  onClick={() => setShowSuccess(false)}
                  className="absolute top-4 right-4 p-1 rounded-full transition-colors"
                  style={{ color: hex2rgba(pal.espresso, 0.3) }}
                  onMouseEnter={(e) => e.currentTarget.style.color = pal.espresso}
                  onMouseLeave={(e) => e.currentTarget.style.color = hex2rgba(pal.espresso, 0.3)}
                >
                  <X size={16} />
                </button>

                {/* check icon */}
                <motion.div
                  className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full"
                  style={{ backgroundColor: hex2rgba(pal.dustyRose, 0.15) }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1], type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={28} style={{ color: pal.dustyRose }} />
                </motion.div>

                {/* heading */}
                <h2
                  className="text-xl mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: pal.espresso, fontWeight: 500 }}
                >
                  You&rsquo;re on the list
                </h2>

                {/* body */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: pal.stone }}
                >
                  Now check your inbox to confirm your spot. We&rsquo;ll notify you the moment doors open.
                </p>

                {/* close CTA */}
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-2.5 rounded-xl text-[11px] font-medium uppercase tracking-[0.13em] transition-all duration-300"
                  style={{
                    backgroundColor: pal.dustyRose,
                    color: '#ffffff',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.92';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ─── Kit form style overrides ─── */}
      <style jsx global>{`
        .formkit-alert.hidden-empty:empty {
          display: none !important;
        }
        .formkit-alert.hidden-empty {
          min-height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .formkit-form[data-uid="998129977b"] .formkit-input {
          background: #ffffff !important;
          border: 1px solid ${hex2rgba(pal.dustyRose, 0.2)} !important;
          border-radius: 12px !important;
          color: ${pal.espresso} !important;
          font-weight: 400 !important;
          padding: 10px 16px !important;
        }
        .formkit-form[data-uid="998129977b"] .formkit-input:focus {
          border-color: ${pal.dustyRose} !important;
          box-shadow: 0 0 0 3px ${hex2rgba(pal.dustyRose, 0.12)} !important;
          outline: none !important;
        }
        .formkit-form[data-uid="998129977b"] .formkit-input::placeholder {
          color: ${hex2rgba(pal.espresso, 0.35)} !important;
          font-family: 'Playfair Display', Georgia, serif !important;
          font-style: italic !important;
          font-weight: 400 !important;
          opacity: 1 !important;
        }

        .formkit-form[data-uid="998129977b"] .formkit-submit {
          background: ${pal.dustyRose} !important;
          border-radius: 12px !important;
          margin-bottom: 0 !important;
          font-weight: 500 !important;
          overflow: hidden;
          box-shadow: 0 1px 3px ${hex2rgba(pal.dustyRose, 0.2)} !important;
        }
        .formkit-form[data-uid="998129977b"] .formkit-submit:hover {
          opacity: 0.92 !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 6px ${hex2rgba(pal.dustyRose, 0.25)} !important;
        }
        .formkit-form[data-uid="998129977b"] .formkit-submit > span {
          padding: 10px 24px !important;
        }
        .formkit-form[data-uid="998129977b"] .formkit-submit:hover > span {
          background-color: ${hex2rgba('#ffffff', 0.06)} !important;
        }

        .formkit-form[data-uid="998129977b"] .formkit-alert-success {
          background: ${hex2rgba(pal.blush, 0.3)} !important;
          border: 1px solid ${hex2rgba(pal.dustyRose, 0.3)} !important;
          color: ${pal.espresso} !important;
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: 13px !important;
          border-radius: 12px !important;
          padding: 12px 16px !important;
          margin: 0 0 6px !important;
        }
        .formkit-form[data-uid="998129977b"] .formkit-alert-error {
          background: ${hex2rgba('#fde8e2', 0.5)} !important;
          border: 1px solid #f2643b !important;
          color: #c53030 !important;
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: 12px !important;
          border-radius: 12px !important;
          padding: 10px 16px !important;
          margin: 0 0 6px !important;
        }

        .formkit-form[data-uid="998129977b"] .formkit-spinner > div {
          background-color: #ffffff !important;
        }
        .formkit-powered-by-convertkit-container a:hover {
          opacity: 0.4 !important;
        }

        /* TextPressure container sizing */
        .text-pressure-title {
          letter-spacing: -0.02em;
        }
      `}</style>
    </>
  );
}
