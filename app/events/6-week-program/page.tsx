'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  X,
  Heart,
  Moon,
  Leaf,
  Shield,
  Sun,
  Star,
  Droplets,
  Feather,
  Compass,
} from 'lucide-react';
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

/* ───── content from PDF ───── */

const painPoints = [
  'You start over every Monday — and by Wednesday, you\'re already behind.',
  'You\'re tired of feeling like you\'re capable of so much more but can\'t stay consistent.',
  'You shrink yourself to keep the peace — at home, with family, in your marriage, at work.',
  'You say yes when you mean no, then resent yourself for it.',
  'Your inner critic is louder than your own voice.',
  'You\'ve read the books, downloaded the planners, said the duas — nothing sticks.',
  'You wake up anxious, move through your day scattered, and crash into bed exhausted.',
  'You feel disconnected from yourself, your body, sometimes even your faith.',
  'You\'ve lost yourself in being everyone\'s everything — daughter, wife, sister, employee.',
  'You\'re carrying limiting beliefs that were never even yours to begin with.',
  'You feel invisible in your own life.',
  'You scroll Instagram and feel further behind every day.',
  'You know who you want to be — you just can\'t seem to become her.',
];

const pleasurePoints = [
  'You wake up clear, calm, and rooted in who you are.',
  'You follow through on what matters — without forcing or burning out.',
  'You speak up. You take up space. You stop apologizing for existing.',
  'You have a daily rhythm that actually fits your real life — and you want to follow it.',
  'Your boundaries feel light, not harsh — and people respect them.',
  'You\'re reconnected to your body, your faith, and your own voice.',
  'Your inner critic is quieter. Your inner wisdom is louder.',
  'You stop chasing motivation — because discipline finally feels good.',
  'You feel grounded in who you are and excited about who you\'re becoming.',
  'You become the woman you\'ve been praying to be — and you have the system to keep showing up as her.',
];

const weeks = [
  {
    week: 1,
    title: 'Meet Yourself Honestly',
    subtitle: 'Stop running from your own truth.',
    powerWords: ['Clarity', 'Awakening', 'Awareness'],
    description:
      'Get honest about where you are, why you\'re stuck, and what\'s actually been running your life on autopilot.',
    icon: Compass,
  },
  {
    week: 2,
    title: 'Silence the Voice That\'s Been Shrinking You',
    subtitle: 'Unlearn the beliefs you didn\'t even know you had.',
    powerWords: ['Rewire', 'Release', 'Reclaim'],
    description:
      'Identify and rewrite the inherited limiting beliefs that have been quietly running the show — and learn how to catch the inner critic in real time.',
    icon: Moon,
  },
  {
    week: 3,
    title: 'Come Home to Yourself',
    subtitle: 'Find a peace that doesn\'t depend on your circumstances.',
    powerWords: ['Calm', 'Grounded', 'Present'],
    description:
      'Reconnect with your body, your breath, and your faith — so your nervous system stops running your life.',
    icon: Leaf,
  },
  {
    week: 4,
    title: 'Boundaries Without Guilt',
    subtitle: 'Say no without losing your softness.',
    powerWords: ['Protected', 'Free', 'Unapologetic'],
    description:
      'Hold your ground with family, culture, and people-pleasing patterns — and protect your energy without becoming someone you\'re not.',
    icon: Shield,
  },
  {
    week: 5,
    title: 'Build the Calendar of the Woman You\'re Becoming',
    subtitle: 'Design a daily rhythm that finally sticks.',
    powerWords: ['Consistency', 'Discipline', 'Alignment'],
    description:
      'Create a faith-aligned daily and weekly structure that fits your real life — and learn the consistency system that makes it last past week three.',
    icon: Sun,
  },
  {
    week: 6,
    title: 'Become Her. For Real.',
    subtitle: 'Walk away as the woman you\'ve been praying to be.',
    powerWords: ['Embodied', 'Becoming', 'Unshakeable'],
    description:
      'Lock in the identity, anticipate the setbacks, and leave with a 90-day plan to keep showing up as her — even when life gets loud.',
    icon: Star,
  },
];

const painPointIcons = [
  Heart, Heart, Moon, X, Feather, Droplets, Moon, Leaf, Heart, Shield, Feather, Sparkles, Star,
];

/* ───── components ───── */

function SectionEyebrow({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="inline-block text-[9px] uppercase tracking-[0.4em] font-medium mb-5"
        style={{ color: pal.mist, letterSpacing: '0.4em' }}
      >
        {text}
      </span>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight text-center mb-4"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        color: pal.espresso,
        fontWeight: 500,
      }}
    >
      {children}
    </motion.h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto mb-10"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: 'italic',
        color: pal.stone,
      }}
    >
      {children}
    </motion.p>
  );
}

function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="origin-center h-px w-20 sm:w-28 mx-auto my-12 sm:my-16"
      style={{ backgroundColor: hex2rgba(pal.espresso, 0.1) }}
    />
  );
}

/* ───── main ───── */
export default function SixWeekProgramPage() {
  const prefersReduced = useReducedMotion();
  const [showSuccess, setShowSuccess] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  const ff = (delay = 0) =>
    ({
      initial: prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
    }) as const;

  /* ─── watch for Kit's inline success alert → show popup ─── */
  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      const success = container.querySelector('.formkit-alert-success');
      if (success && !showSuccess) {
        setShowSuccess(true);
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
        className="relative min-h-dvh flex flex-col items-center overflow-hidden px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-20"
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

        {/* ── scroll hint ── */}
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span
            className="text-[7px] uppercase tracking-[0.35em]"
            style={{ color: hex2rgba(pal.espresso, 0.2) }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-6"
            style={{ backgroundColor: hex2rgba(pal.espresso, 0.15) }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ================================================================ */}
        {/* HERO */}
        {/* ================================================================ */}
        <section className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center min-h-[70vh] justify-center">
          {/* eyebrow */}
          <motion.div {...ff(0.1)} className="mb-5">
            <span
              className="inline-block text-[9px] uppercase tracking-[0.4em] font-medium"
              style={{ color: pal.mist, letterSpacing: '0.4em' }}
            >
              A 6-Week Journey
            </span>
          </motion.div>

          {/* TextPressure heading */}
          <motion.div
            className="w-full max-w-3xl mx-auto h-[clamp(4rem,14vw,9rem)]"
            {...ff(0.3)}
          >
            <TextPressure
              text="The Becoming"
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

          {/* subtitle */}
          <motion.p
            {...ff(0.6)}
            className="max-w-xl text-center mt-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: pal.cocoa,
              lineHeight: 1.6,
            }}
          >
            A 6-Week Reset for the Woman You&rsquo;ve Been Praying to Be
          </motion.p>

          {/* decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="origin-center h-px w-24 sm:w-32 mt-6 mb-8"
            style={{ backgroundColor: hex2rgba(pal.espresso, 0.12) }}
          />

          {/* hero CTA */}
          <motion.div {...ff(0.9)} className="flex flex-col items-center gap-3">
            <a
              href="#pricing"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden btn-shine"
              style={{
                backgroundColor: pal.dustyRose,
                color: '#ffffff',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              <Sparkles size={14} className="opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12" />
              Join The Becoming
              <ArrowRight size={14} className="transition-all duration-500 group-hover:translate-x-1.5" />
            </a>
            <span
              className="text-[9px] tracking-widest uppercase mt-1"
              style={{ color: hex2rgba(pal.espresso, 0.3), letterSpacing: '0.2em' }}
            >
              $475 one-time &middot; or 2 payments of $287.50
            </span>
          </motion.div>
        </section>

        {/* ================================================================ */}
        {/* PAIN POINTS — "Does this sound familiar?" */}
        {/* ================================================================ */}
        <section className="relative z-10 w-full max-w-5xl mx-auto py-16 sm:py-20">
          <SectionEyebrow text="Does This Sound Familiar?" />
          <SectionTitle>
            You know who you want to be.<br />
            You just can&rsquo;t seem to <span className="italic">become</span> her.
          </SectionTitle>
          <SectionSubtitle>
            You&rsquo;ve tried. You&rsquo;ve prayed. You&rsquo;ve started over more times than you can count.
            None of it stuck — because you were trying to fix the surface instead of resetting from the inside out.
          </SectionSubtitle>

          <div className="grid gap-3 sm:grid-cols-2 max-w-4xl mx-auto">
            {painPoints.map((point, i) => {
              const Icon = painPointIcons[i] || Feather;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="flex items-start gap-3 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: hex2rgba('#ffffff', 0.35),
                      border: `1px solid ${hex2rgba(pal.dustyRose, 0.08)}`,
                    }}
                  >
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: hex2rgba(pal.dustyRose, 0.12) }}
                    >
                      <Icon size={13} style={{ color: pal.dustyRose }} />
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: pal.cocoa,
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 400,
                      }}
                    >
                      {point}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ================================================================ */}
        {/* WEEK-BY-WEEK */}
        {/* ================================================================ */}
        <section className="relative z-10 w-full max-w-5xl mx-auto py-16 sm:py-20">
          <SectionEyebrow text="Your 6-Week Roadmap" />
          <SectionTitle>
            The Path Back to <span className="italic">You</span>
          </SectionTitle>
          <SectionSubtitle>
            Each week builds on the last — from honest self-awareness to unshakeable embodiment.
            By week six, you don&rsquo;t just know who she is. You <em>are</em> her.
          </SectionSubtitle>

          <div className="relative max-w-3xl mx-auto">
            {/* vertical connector line */}
            <div
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{
                background: `linear-gradient(180deg, ${hex2rgba(pal.dustyRose, 0.3)}, ${hex2rgba(pal.dustyRose, 0.1)} 50%, ${hex2rgba(pal.dustyRose, 0.3)})`,
              }}
              aria-hidden
            />

            <div className="flex flex-col gap-6 sm:gap-8">
              {weeks.map((w, i) => (
                <motion.div
                  key={w.week}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex gap-4 sm:gap-6 items-start">
                    {/* week number badge */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: hex2rgba(pal.dustyRose, 0.12),
                          border: `1px solid ${hex2rgba(pal.dustyRose, 0.2)}`,
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <span
                          className="text-[11px] font-medium leading-none"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: pal.dustyRose,
                          }}
                        >
                          W{w.week}
                        </span>
                        <span
                          className="text-[7px] uppercase tracking-wider mt-0.5"
                          style={{ color: hex2rgba(pal.dustyRose, 0.6) }}
                        >
                          {w.powerWords[0]}
                        </span>
                      </div>
                    </div>

                    {/* content card */}
                    <div
                      className="flex-1 rounded-2xl p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: hex2rgba('#ffffff', 0.3),
                        border: `1px solid ${hex2rgba(pal.dustyRose, 0.1)}`,
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3
                          className="text-base sm:text-lg leading-snug"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: pal.espresso,
                            fontWeight: 600,
                          }}
                        >
                          {w.title}
                        </h3>
                        {/* power word tags */}
                        {w.powerWords.map((pw) => (
                          <span
                            key={pw}
                            className="inline-block text-[9px] uppercase tracking-[0.15em] rounded-full px-2.5 py-0.5"
                            style={{
                              backgroundColor: hex2rgba(pal.dustyRose, 0.1),
                              color: hex2rgba(pal.espresso, 0.55),
                              fontFamily: "'Playfair Display', Georgia, serif",
                            }}
                          >
                            {pw}
                          </span>
                        ))}
                      </div>
                      <p
                        className="text-xs italic mb-2"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: pal.stone,
                        }}
                      >
                        {w.subtitle}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: pal.cocoa, fontFamily: 'Lato, sans-serif' }}
                      >
                        {w.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* week-by-week CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-10"
          >
            <a
              href="#pricing"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-3 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden btn-shine"
              style={{
                backgroundColor: pal.dustyRose,
                color: '#ffffff',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              This Is for Me
              <ArrowRight size={14} className="transition-all duration-500 group-hover:translate-x-1.5" />
            </a>
          </motion.div>
        </section>

        <Divider />

        {/* ================================================================ */}
        {/* PLEASURE POINTS — "What if 6 weeks from now..." */}
        {/* ================================================================ */}
        <section className="relative z-10 w-full max-w-5xl mx-auto py-16 sm:py-20">
          <SectionEyebrow text="This Is What&rsquo;s Waiting for You" />
          <SectionTitle>
            What If 6 Weeks From Now,<br />
            You Woke Up as <span className="italic">Her</span>?
          </SectionTitle>
          <SectionSubtitle>
            Not a version of you that has everything figured out. But a version of you who finally
            <em> trusts herself </em> enough to follow through.
          </SectionSubtitle>

          <div className="grid gap-3 sm:grid-cols-2 max-w-4xl mx-auto">
            {pleasurePoints.map((point, i) => {
              const icons = [Star, Sun, Heart, Compass, Shield, Leaf, Moon, Sparkles, Droplets, Feather];
              const Icon = icons[i] || Star;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="flex items-start gap-3 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: hex2rgba(pal.blush, 0.15),
                      border: `1px solid ${hex2rgba(pal.blush, 0.15)}`,
                    }}
                  >
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: hex2rgba(pal.dustyRose, 0.15) }}
                    >
                      <CheckCircle size={13} style={{ color: pal.dustyRose }} />
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: pal.cocoa,
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 400,
                      }}
                    >
                      {point}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ================================================================ */}
        {/* PRICING */}
        {/* ================================================================ */}
        <section
          id="pricing"
          className="relative z-10 w-full max-w-3xl mx-auto py-16 sm:py-20 scroll-mt-24"
        >
          <SectionEyebrow text="Invest in Your Becoming" />
          <SectionTitle>
            Choose Your Path
          </SectionTitle>
          <SectionSubtitle>
            This isn&rsquo;t another course. It&rsquo;s a 6-week transformation — with live sessions,
            a workbook, templates, and a system that actually sticks. &darr;
          </SectionSubtitle>

          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
            {/* One-time payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div
                className="rounded-2xl p-6 sm:p-7 backdrop-blur-md h-full flex flex-col"
                style={{
                  backgroundColor: hex2rgba('#ffffff', 0.4),
                  border: `1px solid ${hex2rgba(pal.dustyRose, 0.15)}`,
                }}
              >
                <h3
                  className="text-lg mb-1"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: pal.espresso,
                    fontWeight: 500,
                  }}
                >
                  Full Payment
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    className="text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: pal.espresso,
                      fontWeight: 600,
                    }}
                  >
                    $475
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: pal.stone }}
                  >
                    one-time
                  </span>
                </div>
                <ul className="flex-1 space-y-2 mb-6">
                  {[
                    'All 6 weekly sessions',
                    'Digital workbook & templates',
                    'Private community access',
                    'Lifetime access to replays',
                    '90-day integration plan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: pal.cocoa }}>
                      <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: pal.dustyRose }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="group relative inline-flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-[11px] font-medium uppercase tracking-[0.13em] transition-all duration-500 overflow-hidden btn-shine"
                  style={{
                    backgroundColor: pal.dustyRose,
                    color: '#ffffff',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Secure Your Spot
                  <ArrowRight size={12} className="transition-all duration-500 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            {/* Split payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div
                className="rounded-2xl p-6 sm:p-7 backdrop-blur-md h-full flex flex-col relative overflow-hidden"
                style={{
                  backgroundColor: hex2rgba(pal.blush, 0.2),
                  border: `1px solid ${hex2rgba(pal.dustyRose, 0.25)}`,
                }}
              >
                {/* Recommended badge */}
                <div
                  className="absolute top-0 right-0 rounded-bl-xl px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-medium"
                  style={{
                    backgroundColor: hex2rgba(pal.dustyRose, 0.2),
                    color: pal.dustyRose,
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Flexible
                </div>

                <h3
                  className="text-lg mb-1"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: pal.espresso,
                    fontWeight: 500,
                  }}
                >
                  Split Payment
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: pal.espresso,
                      fontWeight: 600,
                    }}
                  >
                    $287.50
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: pal.stone }}
                  >
                    &times; 2
                  </span>
                </div>
                <p
                  className="text-xs mb-4"
                  style={{ color: pal.mist, fontStyle: 'italic' }}
                >
                  $575 total
                </p>
                <ul className="flex-1 space-y-2 mb-6">
                  {[
                    'All 6 weekly sessions',
                    'Digital workbook & templates',
                    'Private community access',
                    'Lifetime access to replays',
                    '90-day integration plan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: pal.cocoa }}>
                      <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: pal.dustyRose }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="group relative inline-flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-[11px] font-medium uppercase tracking-[0.13em] transition-all duration-500 overflow-hidden btn-shine"
                  style={{
                    backgroundColor: pal.dustyRose,
                    color: '#ffffff',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  2 Payments
                  <ArrowRight size={12} className="transition-all duration-500 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ================================================================ */}
        {/* WAITLIST / SIGNUP */}
        {/* ================================================================ */}
        <section
          id="waitlist"
          className="relative z-10 w-full max-w-xl mx-auto py-16 sm:py-20 scroll-mt-24"
        >
          <SectionEyebrow text="Secure Your Spot" />
          <SectionTitle>
            Doors Are Opening Soon
          </SectionTitle>
          <SectionSubtitle>
            Be the first to know when enrollment opens — and secure your spot before the public announcement.
          </SectionSubtitle>

          {/* frosted-glass card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
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
                        required
                        type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${hex2rgba(pal.dustyRose, 0.2)}`,
                          color: pal.espresso,
                          fontFamily: "'Playfair Display', Georgia, serif",
                          letterSpacing: '0.02em',
                        }}
                      />
                    </div>

                    {/* hidden email — auto-derived from name */}
                    <div className="formkit-field" style={{ display: 'none' }}>
                      <input
                        className="formkit-input"
                        name="email_address"
                        type="email"
                        value={`${nameValue.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '') || 'guest'}@waitlist.hirahsafi.com`}
                        readOnly
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
        </section>

        {/* subtle right-edge vertical accent */}
        <motion.div
          className="fixed right-0 top-0 w-px h-full pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 10%, ${hex2rgba(pal.dustyRose, 0.12)} 50%, transparent 90%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* ================================================================ */}
        {/* SUCCESS POPUP */}
        {/* ================================================================ */}
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
                  {nameValue ? `Congratulations, ${nameValue.split(' ')[0]}!` : 'Congratulations!'}
                </h2>

                {/* body */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: pal.stone }}
                >
                  Thank you for taking this courageous step forward. We&rsquo;re so excited to have you with us on this journey&mdash;you&rsquo;ll be the first to know the moment doors open.
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

        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: -150%;
          bottom: -150%;
          left: -50%;
          width: 40%;
          transform: rotate(20deg) translateX(-120%);
          background: linear-gradient(to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.35) 50%,
              rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
          filter: blur(0.5px);
          animation: shimmer 2.4s linear infinite;
        }

        @keyframes shimmer {
          0% {
            transform: rotate(20deg) translateX(-130%);
          }
          100% {
            transform: rotate(20deg) translateX(320%);
          }
        }
      `}</style>
    </>
  );
}
