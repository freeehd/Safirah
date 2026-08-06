'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight, BookOpen, Calendar, CalendarDays, Compass, Feather, Gift,
  Heart, MapPin, MessageCircle, Moon, Sparkles, Star, Sun, Users, X,
} from 'lucide-react';
import VisionClarityForm from '@/components/VisionClarityForm';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Palette: Dawn Clarity ─── */
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

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const bigint = parseInt(n, 16);
  return `rgba(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}, ${alpha})`;
}

function useFadeUp() {
  const prefersReduced = useReducedMotion();
  return {
    initial: { opacity: 0, y: prefersReduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: prefersReduced ? 0 : 0.6, ease: EASE },
  } as const;
}

/* ─── Content ─── */
const struggles = [
  'You know you want more — you just can\u2019t name exactly what \u201Cmore\u201D looks like.',
  'Every goal feels scattered. You start five things and finish none of them.',
  'Your values and your to-do list don\u2019t match, and it leaves you restless.',
  'You keep asking yourself: what am I actually working toward?',
  'Big vision, zero roadmap — so you stay stuck in the same spot.',
  'You\u2019re tired of reacting to life instead of designing it.',
];

const takeaways = [
  {
    icon: Compass,
    title: 'A Clear Vision Statement',
    desc: 'Leave with your north star written down — one sentence that describes the life you\u2019re building.',
  },
  {
    icon: Star,
    title: 'Your Core Values, Ranked',
    desc: 'Know what matters most, so your decisions finally get easy instead of exhausting.',
  },
  {
    icon: Moon,
    title: 'A 90-Day Next-Step Map',
    desc: 'Not a 47-page plan — a simple, doable roadmap for your next three months.',
  },
];

const belonging = [
  { icon: Heart, title: 'Clarity in Sisterhood', desc: 'Small-group breakout rooms with sisters on the same journey — you don\u2019t have to figure it out alone.' },
  { icon: Feather, title: 'Faith-Aligned Planning', desc: 'Vision through the lens of your Deen — goals that honor your prayers, your family, and your purpose.' },
  { icon: Sun, title: 'No Overwhelm, Ever', desc: 'Gentle frameworks, not hustle culture. You leave lighter, not heavier.' },
];

const details = [
  { icon: Calendar, label: 'When', value: 'Date TBA', sub: '90 minutes, live' },
  { icon: MapPin, label: 'Where', value: 'Online via Zoom', sub: 'Sisters only' },
  { icon: Gift, label: 'Investment', value: '100% Free', sub: 'Registration required' },
];

export default function VisionClarityLabPage() {
  const fadeUp = useFadeUp();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 9000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToRegister = () => {
    setShowPopup(false);
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper-2 min-h-screen font-sans" style={{ backgroundColor: C.dawn }}>
      {/* ════════════════════════════════════════════════════════════════
          HERO — dawn invitation (no card, no rings)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 md:px-16 py-20" style={{ backgroundColor: C.dawn }}>
        {/* Dawn light base */}
        <div className="absolute inset-0 -z-20" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${hexToRgba(C.periwinkle, 0.18)} 0%, transparent 60%),
                      radial-gradient(ellipse 60% 50% at 85% 100%, ${hexToRgba(C.deepLilac, 0.10)} 0%, transparent 50%),
                      radial-gradient(ellipse 50% 40% at 15% 80%, ${hexToRgba(C.lilac, 0.25)} 0%, transparent 50%)` }}
        />

        {/* Drifting dawn orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{ background: `radial-gradient(circle, ${hexToRgba(C.periwinkle, 0.30)} 0%, transparent 70%)`, top: '-10%', right: '-5%' }}
            animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[420px] h-[420px] rounded-full blur-[90px]"
            style={{ background: `radial-gradient(circle, ${hexToRgba(C.deepLilac, 0.18)} 0%, transparent 70%)`, bottom: '-8%', left: '-6%' }}
            animate={{ x: [0, 30, -40, 0], y: [0, -25, 30, 0], scale: [1, 0.92, 1.06, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full blur-[70px]"
            style={{ background: `radial-gradient(circle, ${hexToRgba(C.lilac, 0.35)} 0%, transparent 70%)`, top: '42%', left: '58%' }}
            animate={{ x: [0, -20, 25, 0], y: [0, 20, -18, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Floating clarity particles */}
        {[...Array(9)].map((_, i) => {
          const Icon = i % 3 === 0 ? Compass : i % 3 === 1 ? Star : Feather;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute pointer-events-none"
              style={{ left: `${6 + i * 11}%`, top: `${8 + (i % 3) * 26}%` }}
              animate={{ y: [0, -18, 10, -6, 0], rotate: [0, i % 2 ? 18 : -18, 0], opacity: [0.12, 0.32, 0.18, 0.12] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            >
              <Icon size={10 + i * 2} style={{ color: i % 3 === 0 ? C.deepLilac : i % 3 === 1 ? C.periwinkle : C.lilac }} />
            </motion.div>
          );
        })}

        {/* Top decorative rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        >
          <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${C.periwinkle}70)` }} />
          <Star size={10} style={{ color: C.deepLilac }} />
          <Feather size={12} style={{ color: C.periwinkle }} />
          <Compass size={11} style={{ color: C.deepLilac }} />
          <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${C.periwinkle}70)` }} />
        </motion.div>

        {/* Main content */}
        <motion.div className="relative z-10 max-w-[760px] w-full mx-auto text-center pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="mb-8">
            <span
              className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] px-6 py-3 rounded-full"
              style={{ color: C.deepLilac, backgroundColor: `${C.lilac}55`, border: `1px solid ${C.periwinkle}45`, boxShadow: `0 4px 20px ${hexToRgba(C.deepLilac, 0.10)}, inset 0 1px 0 ${C.white}50` }}
            >
              <Sparkles size={11} />
              A Free 90-Minute Live Workshop
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="font-playfair text-[clamp(2.4rem,7vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.03em] mb-6"
            style={{ color: C.espresso }}
          >
            Vision &amp;{' '}
            <span className="italic font-medium" style={{ color: C.deepLilac }}>Clarity</span>
            <span className="block mt-1 relative inline-block">
              Lab
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                style={{ background: `linear-gradient(to right, transparent, ${C.periwinkle}, ${C.deepLilac}, transparent)` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="font-lato text-[16px] sm:text-[19px] md:text-[21px] leading-[1.65] max-w-[520px] mx-auto mb-10"
            style={{ color: C.body }}
          >
            A gentle, guided deep-dive to map your goals, your values, and your next step —{' '}
            <em className="italic font-medium" style={{ color: C.muted }}>without the overwhelm.</em>
          </motion.p>

          {/* Meta tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="flex items-center justify-center gap-3 mb-10 flex-wrap"
          >
            {[
              { icon: CalendarDays, text: 'Date TBA' },
              { icon: Sun, text: 'Live Online' },
              { icon: Heart, text: 'Sisters Only' },
              { icon: Gift, text: '100% Free' },
            ].map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  color: i === 0 ? C.deepLilac : C.espresso,
                  backgroundColor: `${C.white}70`,
                  border: `1px solid ${i === 0 ? C.periwinkle : C.border}45`,
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 2px 12px ${hexToRgba(C.periwinkle, 0.08)}`,
                }}
              >
                <tag.icon size={11} strokeWidth={2} />
                {tag.text}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}>
            <a
              href="#register"
              className="group relative inline-flex items-center justify-center gap-3 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] px-14 py-5 rounded-full transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${C.periwinkle} 0%, ${C.deepLilac} 100%)`, boxShadow: `0 14px 44px -10px ${hexToRgba(C.deepLilac, 0.55)}` }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10">Save My Free Seat</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }} className="text-[11px] mt-6 font-lato flex items-center justify-center gap-2" style={{ color: C.muted }}>
            <span className="inline-flex -space-x-1.5">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="inline-block w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: [C.periwinkle, C.deepLilac, C.lilac, C.border][i] }} />
              ))}
            </span>
            <span className="italic">Limited spots — reserved for sisters ready to get clear</span>
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: `${C.muted}70` }}>Scroll</span>
          <motion.div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: `${C.periwinkle}60` }} animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="w-1 h-1.5 rounded-full" style={{ backgroundColor: C.deepLilac }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PAIN POINTS
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 md:px-16 max-w-[1140px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full"
            style={{ color: C.muted, backgroundColor: `${C.lilac}50`, border: `1px solid ${C.periwinkle}40` }}
          >
            <Moon size={11} />
            Does This Sound Familiar?
          </span>
          <h2 className="font-playfair text-[28px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4" style={{ color: C.espresso }}>
            You don&apos;t need more hustle.{' '}
            <span className="italic font-light" style={{ color: C.muted }}><br />You need clarity.</span>
          </h2>
          <p className="font-lato text-[16px] md:text-[17px] leading-[1.8] tracking-[0.01em] max-w-xl mx-auto" style={{ color: C.body }}>
            Ambition without direction is exhaustion. This workshop gives you the quiet hour to finally map where you&apos;re going — and why.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 max-w-4xl mx-auto">
          {struggles.map((point, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.04 }}>
              <div
                className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.75)', border: `1px solid ${C.border}70`, backdropFilter: 'blur(8px)' }}
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C.lilac}60`, color: C.deepLilac }}>
                  <Compass size={13} strokeWidth={2.5} />
                </div>
                <p className="font-lato text-[14px] md:text-[15px] leading-relaxed font-medium pt-0.5" style={{ color: C.body }}>{point}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          BRIDGE — note from Hirah
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-5 md:px-16" style={{ backgroundColor: C.lilac }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative w-full md:w-[40%] aspect-[4/5] rounded-[2rem] overflow-hidden flex-shrink-0"
            style={{ border: `2px solid ${C.periwinkle}50`, boxShadow: `0 20px 60px -16px ${hexToRgba(C.deepLilac, 0.3)}` }}
          >
            <Image
              src="/assets/hirah-notebook.jpeg"
              alt="Hirah Safi planning with a notebook"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center" style={{ border: `1px solid ${C.periwinkle}50` }}>
              <Feather size={16} style={{ color: C.deepLilac }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="flex-1 text-center md:text-left"
          >
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full"
              style={{ color: C.muted, backgroundColor: `${C.white}60`, border: `1px solid ${C.periwinkle}35` }}
            >
              <Sparkles size={11} />
              A Note from Hirah
            </span>
            <blockquote className="font-playfair text-[22px] md:text-[28px] leading-[1.5] tracking-[-0.01em] font-medium mb-6" style={{ color: C.espresso }}>
              &ldquo;Clarity isn&apos;t a lightning bolt. It&apos;s a practice —{' '}
              <span className="italic font-light" style={{ color: C.deepLilac }}>and you can begin it tonight, in one quiet hour.</span>&rdquo;
            </blockquote>
            <p className="font-lato text-[15px] leading-[1.7]" style={{ color: C.body }}>
              This isn&apos;t another loud masterclass. It&apos;s a calm, guided session where you finally sit down with
              yourself — your values, your vision, your next step — and leave with it written down.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          WHAT YOU'LL WALK AWAY WITH
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 md:px-16 max-w-[1140px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] mb-5 px-4 py-2 rounded-full"
            style={{ color: C.muted, backgroundColor: `${C.lilac}50`, border: `1px solid ${C.periwinkle}40` }}
          >
            <Sparkles size={11} />
            What You&apos;ll Walk Away With
          </span>
          <h2 className="font-playfair text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4" style={{ color: C.espresso }}>
            In Just 90 Minutes,<br />
            <span className="italic font-light" style={{ color: C.deepLilac }}>You&apos;ll Leave With&hellip;</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {takeaways.map((takeaway, i) => {
            const Icon = takeaway.icon;
            return (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div
                  className="relative h-full p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden text-left"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, boxShadow: `0 8px 32px -8px ${hexToRgba(C.deepLilac, 0.10)}` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full transition-all duration-700 group-hover:opacity-80" style={{ backgroundColor: `${C.lilac}70` }} />
                  <div className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${C.lilac}60` }}>
                    <Icon size={22} style={{ color: C.deepLilac }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-[18px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] mb-3" style={{ color: C.espresso }}>
                    {takeaway.title}
                  </h3>
                  <p className="relative z-10 font-lato text-[14px] md:text-[15px] leading-[1.7]" style={{ color: C.body }}>
                    {takeaway.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          WHY YOU BELONG — split with image
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-5 md:px-16" style={{ backgroundColor: C.lilac }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] mb-5 px-4 py-2 rounded-full"
              style={{ color: C.muted, backgroundColor: `${C.white}60`, border: `1px solid ${C.periwinkle}35` }}
            >
              <Heart size={11} />
              Why You Belong
            </span>
            <h2 className="font-playfair text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: C.espresso }}>
              Clarity is better <span className="italic font-light" style={{ color: C.deepLilac }}>in sisterhood.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative w-full md:w-[44%] aspect-[4/5] rounded-[2rem] overflow-hidden flex-shrink-0"
              style={{ border: `2px solid ${C.periwinkle}50`, boxShadow: `0 20px 60px -16px ${hexToRgba(C.deepLilac, 0.3)}` }}
            >
              <Image
                src="/assets/hirah-smile-shrug.jpeg"
                alt="Hirah Safi smiling warmly"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 44vw"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/80 backdrop-blur-md px-5 py-4" style={{ border: `1px solid ${C.periwinkle}40` }}>
                <p className="font-playfair text-sm italic leading-snug" style={{ color: C.espresso }}>
                  &ldquo;You&apos;re not behind. You&apos;re just before your breakthrough.&rdquo;
                </p>
              </div>
            </motion.div>

            <div className="flex-1 grid gap-4">
              {belonging.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <div
                      className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                      style={{ backgroundColor: `${C.white}80`, border: `1px solid ${C.border}70`, backdropFilter: 'blur(8px)' }}
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0" style={{ backgroundColor: `${C.lilac}70`, color: C.deepLilac }}>
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-playfair text-[17px] md:text-[19px] font-semibold mb-1" style={{ color: C.espresso }}>{item.title}</h3>
                        <p className="font-lato text-[14px] leading-relaxed" style={{ color: C.body }}>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          DETAILS + CTA
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 md:px-16 max-w-[1140px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] mb-5 px-4 py-2 rounded-full"
            style={{ color: C.muted, backgroundColor: `${C.lilac}50`, border: `1px solid ${C.periwinkle}40` }}
          >
            <CalendarDays size={11} />
            The Details
          </span>
          <h2 className="font-playfair text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: C.espresso }}>
            One Quiet Hour. <span className="italic font-light" style={{ color: C.deepLilac }}>A Clearer You.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12">
          {details.map((detail, i) => {
            const Icon = detail.icon;
            return (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div
                  className="h-full text-center p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1.5"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, boxShadow: `0 8px 32px -8px ${hexToRgba(C.deepLilac, 0.10)}` }}
                >
                  <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${C.lilac}60`, color: C.deepLilac }}>
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="font-playfair text-xl font-bold mb-1" style={{ color: C.espresso }}>{detail.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: C.deepLilac }}>{detail.label}</div>
                  <div className="font-lato text-sm opacity-70" style={{ color: C.body }}>{detail.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeUp} className="text-center">
          <a
            href="#register"
            className="group relative inline-flex items-center justify-center gap-3 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] px-14 py-5 rounded-full transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${C.periwinkle} 0%, ${C.deepLilac} 100%)`, boxShadow: `0 14px 44px -10px ${hexToRgba(C.deepLilac, 0.55)}` }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">Save My Free Seat</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
          <p className="font-lato text-[11px] mt-4 italic" style={{ color: C.muted }}>
            Limited spots — registration is required to receive the Zoom link.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          REGISTRATION — Kit form
      ════════════════════════════════════════════════════════════════ */}
      <section id="register" className="py-20 md:py-24 px-5 md:px-16 scroll-mt-24" style={{ backgroundColor: C.lilac }}>
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] mb-5 px-4 py-2 rounded-full"
              style={{ color: C.muted, backgroundColor: `${C.white}60`, border: `1px solid ${C.periwinkle}35` }}
            >
              <Heart size={11} />
              Claim Your Seat
            </span>
            <h2 className="font-playfair text-[32px] md:text-[38px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: C.espresso }}>
              Your Clarity Hour <span className="italic font-light" style={{ color: C.deepLilac }}>Starts Here</span>
            </h2>
          </motion.div>
          <VisionClarityForm />
          <p className="font-lato text-center text-[12px] mt-6 opacity-70" style={{ color: C.body }}>
            <MessageCircle size={12} className="inline mr-1" style={{ color: C.deepLilac }} />
            Questions? Reach out — we&apos;re happy to help you get settled before the session.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          BONUS strip
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 md:px-16">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6" style={{ backgroundColor: `${C.lilac}60`, color: C.deepLilac }}>
            <BookOpen size={22} strokeWidth={1.8} />
          </div>
          <h2 className="font-playfair text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] mb-4" style={{ color: C.espresso }}>
            Every sister leaves with the <span className="italic font-light" style={{ color: C.deepLilac }}>Clarity Workbook</span>
          </h2>
          <p className="font-lato text-[15px] md:text-[16px] leading-[1.8] max-w-xl mx-auto" style={{ color: C.body }}>
            Your prompts, frameworks, and 90-day map — all in one place, plus access to the Vision &amp; Clarity
            WhatsApp circle so the clarity lasts long after the session ends.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          POPUP — gentle nudge
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-[420px] z-[10000]"
          >
            <div
              className="relative rounded-[2rem] p-6 shadow-2xl"
              style={{ backgroundColor: `${C.white}F2`, border: `1px solid ${C.periwinkle}50`, backdropFilter: 'blur(16px)' }}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:rotate-90 transition-transform"
                style={{ color: C.muted }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${C.lilac}60`, color: C.deepLilac }}>
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-bold mb-1" style={{ color: C.espresso }}>
                    Still thinking it over?
                  </h4>
                  <p className="font-lato text-[13px] leading-relaxed mb-3" style={{ color: C.body }}>
                    Your seat is free — and your clarity hour is waiting. One hour tonight could change your next three months.
                  </p>
                  <button
                    onClick={scrollToRegister}
                    className="inline-flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-3 rounded-full transition-transform hover:scale-[1.03]"
                    style={{ background: `linear-gradient(135deg, ${C.periwinkle}, ${C.deepLilac})` }}
                  >
                    Save My Seat <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
