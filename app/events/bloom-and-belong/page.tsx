'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Fraunces, Cormorant_Garamond, Alex_Brush } from 'next/font/google';
import {
  Calendar, Clock, Flower2, Heart, Loader2, Mail, MapPin,
  Sparkles, Sprout, Ticket, Users, CheckCircle2, ArrowRight,
  Bell, Instagram, Share2, Info
} from 'lucide-react';
import GradientWaves from '@/components/ui/GradientWave';

/* ─── Typography ─── */
const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Palette — Tan / Ivory / Blush + illustration mauves ─── */
const C = {
  tan:       '#BFA484',
  ivory:     '#EDE5DB',
  blush:     '#EDD4CF',
  mauve:     '#8E7687',
  deepMauve: '#5E4457',
  cocoa:     '#3D2733',
  body:      '#66525E',
  muted:     '#8E7885',
  border:    '#E5D6D0',
  white:     '#FFFFFF',
};

const rgba = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  const b = parseInt(h, 16);
  return `rgba(${(b >> 16) & 255},${(b >> 8) & 255},${b & 255},${a})`;
};

function useFadeUp() {
  const r = useReducedMotion();
  return {
    initial: { opacity: 0, y: r ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: r ? 0 : 0.75, ease: EASE },
  } as const;
}

const activities = [
  {
    icon: Flower2,
    title: 'Build bouquets for one another',
    desc: 'Fresh blooms in your hands. You build one for her while she builds one for you — you leave holding the sacred gift she arranged for you.'
  },
  {
    icon: Users,
    title: 'Sit in authentic community',
    desc: 'A circle, never a crowd — women who value softness, growth, and showing up honestly without performing.'
  },
  {
    icon: Sparkles,
    title: 'Mindful coaching moments',
    desc: 'Gentle, somatic prompts designed to soften stuck mindsets and reconnect you to your natural rhythm.'
  },
  {
    icon: Mail,
    title: 'A handwritten letter just for you',
    desc: 'A custom personal keepsake written for your season, to hold onto long after the petals dry.'
  },
];

const details = [
  { icon: Calendar, label: 'Timing', value: 'New Dates TBA', sub: 'Priority notification sent to waitlist first' },
  { icon: MapPin,   label: 'Location', value: 'Toronto, Ontario', sub: 'Limberlost Bldg / SA Room 303 · Queens Quay' },
  { icon: Ticket,   label: 'Investment', value: '$25', sub: 'All fresh flowers, supplies & refreshments included' },
];

/* ─── Waitlist Form Component ─── */
const KIT_FORM_ID = '8738698';

function WaitlistPanel() {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email_address: email, 'fields[full_name]': name }).toString(),
      });
    } catch {
      // Kit returns opaque response in no-cors
    }
    setStatus('done');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl p-8 sm:p-12 backdrop-blur-xl bg-white/95"
      style={{ borderColor: `${C.tan}60` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-2 rounded-t-[2.5rem]"
        style={{ background: `linear-gradient(90deg, ${C.blush}, ${C.mauve}, ${C.tan}, ${C.blush})` }}
      />

      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] px-4 py-1.5 rounded-full"
          style={{ color: C.deepMauve, backgroundColor: `${C.blush}95`, border: `1px solid ${C.tan}50` }}>
          <Bell size={12} className="text-[#8E7687] animate-pulse" />
          Priority Waitlist
        </div>

        <h3 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-semibold italic`} style={{ color: C.cocoa }}>
          Be First in the <span style={{ color: C.mauve }}>Circle</span>
        </h3>

        <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto" style={{ color: C.body }}>
          Since Bloom &amp; Belong is being rescheduled, spaces will remain strictly capped to keep the room intimate.
          Enter your details to receive <strong className="font-semibold text-[#5E4457]">48-hour early access</strong> before public announcements.
        </p>
      </div>

      {status === 'done' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 px-4 space-y-4 rounded-3xl"
          style={{ backgroundColor: `${C.blush}40`, border: `1px solid ${C.tan}40` }}
        >
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: `${C.white}`, color: C.mauve }}>
            <Flower2 size={32} className="animate-bounce" />
          </div>
          <h4 className={`${cormorant.className} italic font-semibold text-3xl sm:text-4xl`} style={{ color: C.cocoa }}>
            You&apos;re on the priority list, sister 🌸
          </h4>
          <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto" style={{ color: C.body }}>
            Thank you for holding space with us. As soon as the new date &amp; venue are locked in, you will get the private reservation link straight to your inbox.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full" style={{ backgroundColor: `${C.white}90`, color: C.deepMauve }}>
              <CheckCircle2 size={14} style={{ color: C.mauve }} /> Confirmation recorded
            </span>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1" style={{ color: C.mauve }}>
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Ahmad"
              className="w-full px-5 py-4 rounded-2xl bg-white/95 border outline-none transition-all focus:ring-2 focus:ring-[#8E7687]/40 text-base"
              style={{ borderColor: C.border, color: C.cocoa }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1" style={{ color: C.mauve }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              className="w-full px-5 py-4 rounded-2xl bg-white/95 border outline-none transition-all focus:ring-2 focus:ring-[#8E7687]/40 text-base"
              style={{ borderColor: C.border, color: C.cocoa }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`${cormorant.className} w-full rounded-2xl py-4 sm:py-5 font-bold text-xl sm:text-2xl italic text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99] disabled:opacity-75 mt-3 flex items-center justify-center gap-2`}
            style={{
              background: `linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})`,
              boxShadow: `0 14px 40px -10px ${rgba(C.mauve, 0.55)}`,
            }}
          >
            {status === 'loading' ? (
              <span className="inline-flex items-center gap-2 not-italic text-base">
                <Loader2 size={18} className="animate-spin" /> Securing your spot…
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Join Priority Waitlist <ArrowRight size={20} className="not-italic" />
              </span>
            )}
          </button>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs" style={{ color: C.muted }}>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 size={13} style={{ color: C.mauve }} /> No payment required now
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 size={13} style={{ color: C.mauve }} /> Early access link sent by email
            </span>
          </div>
        </form>
      )}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function BloomBelongPage() {
  const fadeUp = useFadeUp();

  return (
    <div className="min-h-screen font-sans selection:bg-[#EDD4CF]" style={{ backgroundColor: C.ivory }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[850px] sm:min-h-[920px] flex items-center justify-center overflow-hidden py-20 md:py-32 px-5 md:px-16" style={{ backgroundColor: C.ivory }}>

        {/* Full-bleed wave canvas */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
          <GradientWaves
            horizonColor="#C0627E"
            waveColor="#F2A8BF"
            crestColor="#FDE8F0"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={25}
            turbulence={20}
            tilt={1.11}
            zoom={1.2}
            height={5.5}
            fogDepth={29}
            detail="low"
            brightness={1}
            opacity={2}
            mouseInteraction
            parallaxStrength={1}
            grain
            grainIntensity={0.05}
          />
        </div>

        {/* Luminous top-to-bottom fade so ivory page bleeds in at bottom */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background: `linear-gradient(180deg, ${rgba(C.ivory, 0.15)} 0%, ${rgba(C.blush, 0.25)} 55%, ${C.ivory} 100%)`
        }} />

        {/* Floating petal emojis */}
        {[
          { emoji: '🌸', left: '8%',  top: '12%', size: 28, dur: 8,  delay: 0 },
          { emoji: '🌷', left: '18%', top: '62%', size: 22, dur: 11, delay: 1.2 },
          { emoji: '🌺', left: '78%', top: '10%', size: 32, dur: 9,  delay: 0.4 },
          { emoji: '🌸', left: '88%', top: '55%', size: 20, dur: 13, delay: 2.1 },
          { emoji: '🌿', left: '35%', top: '8%',  size: 18, dur: 10, delay: 0.8 },
          { emoji: '🌷', left: '65%', top: '72%', size: 26, dur: 12, delay: 1.7 },
          { emoji: '🌸', left: '52%', top: '82%', size: 16, dur: 7,  delay: 3.0 },
          { emoji: '🌺', left: '5%',  top: '40%', size: 24, dur: 14, delay: 0.2 },
          { emoji: '🌿', left: '92%', top: '30%', size: 20, dur: 9,  delay: 2.5 },
          { emoji: '🌸', left: '42%', top: '5%',  size: 30, dur: 11, delay: 1.0 },
          { emoji: '🌷', left: '72%', top: '88%', size: 18, dur: 8,  delay: 3.5 },
          { emoji: '🌺', left: '25%', top: '85%', size: 22, dur: 10, delay: 0.6 },
        ].map((p, i) => (
          <motion.div key={i} className="absolute pointer-events-none z-10 select-none"
            style={{ left: p.left, top: p.top, fontSize: p.size }}
            animate={{ y: [0, -(12 + i * 2), 8, 0], rotate: [0, i % 2 ? 15 : -15, 5, 0], opacity: [0.35, 0.7, 0.45, 0.35], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          >
            {p.emoji}
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div className="relative z-10 w-full max-w-6xl mx-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-[1.08fr_0.92fr] gap-12 md:gap-16 items-center">
            {/* Copy */}
            <div className="text-center md:text-left">
              {/* Eyebrow Status Badges */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="mb-6 flex flex-wrap items-center justify-center md:justify-start gap-2.5"
              >
                <span
                  className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] px-5 py-2.5 rounded-full backdrop-blur-md shadow-sm"
                  style={{ color: C.cocoa, backgroundColor: `${C.white}95`, border: `1px solid ${C.tan}55` }}
                >
                  <Sparkles size={13} style={{ color: C.mauve }} />
                  A Flower Circle Afternoon · Toronto
                </span>

                <span
                  className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2.5 rounded-full shadow-sm text-white"
                  style={{
                    background: `linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})`,
                    border: `1px solid ${C.tan}60`
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  Postponed · Waitlist Open
                </span>
              </motion.div>

              {/* Main headline — Alex Brush */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.22 }}
                className="mb-6 text-center"
              >
                <div
                  className={`${alexBrush.className} block leading-[0.88]`}
                  style={{ fontSize: 'clamp(5.2rem,15vw,11.5rem)', color: C.cocoa }}
                >
                  Bloom <span style={{ color: C.mauve }}>&amp;</span>
                </div>
                <div
                  className={`${alexBrush.className} block leading-[0.88]`}
                  style={{ fontSize: 'clamp(5.2rem,15vw,11.5rem)', color: C.cocoa, marginTop: '-0.08em' }}
                >
                  Belong
                </div>
              </motion.div>

              {/* Hook */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.45 }}
                className={`${fraunces.className} text-2xl sm:text-[1.7rem] md:text-[1.85rem] max-w-[620px] mx-auto md:mx-0 mb-8 font-normal leading-[1.45]`}
                style={{ color: C.cocoa }}
              >
                You keep waiting to feel ready.{' '}
                <span className="italic font-medium" style={{ color: C.deepMauve }}>What if you just felt held instead?</span>
              </motion.p>

              {/* Postponed & Rescheduling Callout Notice */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.55 }}
                className="rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md shadow-md border text-left"
                style={{
                  backgroundColor: `${C.white}90`,
                  borderColor: `${C.tan}55`,
                  boxShadow: `0 12px 36px -12px ${rgba(C.mauve, 0.15)}`
                }}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: `${C.blush}80`, color: C.deepMauve }}>
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className={`${cormorant.className} text-xl sm:text-2xl font-bold italic`} style={{ color: C.cocoa }}>
                      Rescheduling for an Even Deeper Experience
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed mt-1" style={{ color: C.body }}>
                      We are rescheduling Bloom &amp; Belong to curate the most nourishing, intentional gathering possible.
                      Sign up on the priority waitlist below to get the exclusive reservation link <strong>48 hours before public launch</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Event details strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden backdrop-blur-md mb-8"
                style={{ backgroundColor: `${C.tan}35`, border: `1px solid ${C.tan}40`, boxShadow: `0 10px 30px -14px ${rgba(C.mauve, 0.2)}` }}
              >
                {[
                  { label: 'Status',      value: 'Rescheduling',   sub: 'New Dates Announced Soon', accent: true },
                  { label: 'Location',    value: 'Toronto, ON',    sub: 'Limberlost Bldg · Queens Quay' },
                  { label: 'Investment',  value: '$25',            sub: 'Fresh flowers & tea included' },
                  { label: 'The Circle',  value: 'Small & Intimate', sub: 'Strictly capped circle' },
                ].map((d) => (
                  <div key={d.label} className="text-center p-4 sm:p-5"
                    style={{ backgroundColor: d.accent ? `${C.blush}C0` : `${C.white}E6` }}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: C.mauve }}>{d.label}</div>
                    <div className={`${cormorant.className} italic font-semibold text-lg sm:text-xl leading-snug`} style={{ color: C.cocoa }}>{d.value}</div>
                    <div className="text-xs mt-1 leading-relaxed" style={{ color: C.body }}>{d.sub}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.75 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a
                    href="#waitlist"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-bold text-lg sm:text-xl leading-none px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})`,
                      boxShadow: `0 12px 30px -10px ${rgba(C.deepMauve, 0.5)}`,
                    }}
                  >
                    <Bell size={18} />
                    Join Priority Waitlist
                    <ArrowRight size={18} />
                  </a>

                  <a
                    href="#what-it-is"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-base sm:text-lg leading-none px-7 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
                    style={{
                      color: C.deepMauve,
                      backgroundColor: `${C.white}90`,
                      border: `1.5px solid ${C.tan}60`,
                    }}
                  >
                    <Sprout size={18} />
                    Explore the Experience
                  </a>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-xs sm:text-sm" style={{ color: C.body }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Free to join · First access to limited spots when announced</span>
                </div>
              </motion.div>
            </div>

            {/* Featured image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
              className="relative mx-auto w-full max-w-[420px] hidden md:block"
            >
              <div className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl" style={{ background: `radial-gradient(ellipse, ${rgba(C.blush, 0.55)} 0%, transparent 70%)` }} />
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-1"
                style={{ border: `2.5px solid ${C.white}`, boxShadow: `0 30px 70px -20px ${rgba(C.mauve, 0.5)}, 0 0 0 2px ${rgba(C.tan, 0.45)}` }}
              >
                <Image src="/assets/bouqutes.webp" alt="Hand-tied bouquets from Bloom & Belong" fill className="object-cover" sizes="(max-width:768px) 100vw,420px" />
              </div>
              <div className="absolute -bottom-4 -right-3 sm:-right-6 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-5 py-2.5 shadow-xl" style={{ border: `1px solid ${C.tan}50` }}>
                <Flower2 size={16} style={{ color: C.mauve }} />
                <span className="text-sm font-bold" style={{ color: C.cocoa }}>Built with love 🌸</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: `${C.muted}80` }}>Scroll</span>
          <motion.div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: `${C.mauve}50` }}
            animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1 h-1.5 rounded-full" style={{ backgroundColor: C.mauve }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ THE BOUQUET EXCHANGE ════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 px-5 md:px-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 82% 18%, ${rgba(C.blush, 0.55)} 0%, transparent 58%), radial-gradient(ellipse at 8% 92%, ${rgba(C.tan, 0.32)} 0%, transparent 55%)` }} />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="relative w-full md:w-[46%] flex-shrink-0"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ border: `2px solid ${C.tan}40` }}>
              <Image src="/assets/flower1.webp" alt="Bloom & Belong — arranging flowers together" fill className="object-cover" sizes="(max-width:768px) 100vw,46vw" />
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 w-32 sm:w-40 aspect-square rounded-3xl overflow-hidden shadow-xl rotate-3"
              style={{ border: `2px solid ${C.white}` }}
            >
              <Image src="/assets/flower2.webp" alt="A finished bouquet from Bloom & Belong" fill className="object-cover" sizes="160px" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="absolute -top-6 -left-4 sm:-left-6 w-24 sm:w-32 aspect-square rounded-3xl overflow-hidden shadow-xl -rotate-3"
              style={{ border: `2px solid ${C.white}` }}
            >
              <Image src="/assets/bouqutes.webp" alt="Bouquets from Bloom & Belong" fill className="object-cover" sizes="128px" />
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex-1 text-center md:text-left space-y-5"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.white}90`, border: `1px solid ${C.tan}40` }}>
              <Flower2 size={12} /> The Heart of the Afternoon
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-6xl leading-tight`} style={{ color: C.cocoa }}>
              You build one for her. <span className="block font-light not-italic" style={{ color: C.mauve }}>She builds one for you.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: C.body }}>
              The centerpiece of the afternoon: real flowers in your hands. You make a bouquet for the woman beside you while she makes one for you — then you swap, and you leave holding the one she made.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-1">
              {[
                { e: '🌷', t: 'Build hers' },
                { e: '🤝', t: 'Swap' },
                { e: '💐', t: 'Keep yours' },
              ].map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-md" style={{ color: C.cocoa, backgroundColor: `${C.white}92`, border: `1.5px solid ${rgba(C.blush, 0.9)}` }}>
                  <span>{s.e}</span>{s.t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE STRUGGLE ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 max-w-4xl mx-auto text-center">
        <motion.div {...fadeUp} className="space-y-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.blush}90`, border: `1px solid ${C.tan}40` }}>
            <Heart size={12} /> Does This Sound Familiar?
          </span>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
            You know the mindset you&apos;re stuck in. The one that says{' '}
            <span className={`${cormorant.className} italic font-semibold text-2xl md:text-3xl`} style={{ color: C.mauve }}>
              &ldquo;not yet, not enough, not now.&rdquo;
            </span>
            {' '}You&apos;ve read the books. Saved the reels. Told yourself this is the season you finally shift — and then the season passed anyway.
          </p>
          <h3 className={`${cormorant.className} italic font-semibold text-3xl sm:text-4xl md:text-5xl leading-snug`} style={{ color: C.cocoa }}>
            Growth doesn&apos;t happen in isolation.{' '}
            <span className="not-italic font-light block mt-1" style={{ color: C.mauve }}>It happens in a room.</span>
          </h3>
        </motion.div>
      </section>

      {/* ═══ WHAT IT IS ══════════════════════════════════════════════ */}
      <section id="what-it-is" className="py-20 md:py-28 px-5 md:px-16 rounded-[2.5rem] my-4 scroll-mt-24" style={{ backgroundColor: C.blush }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.white}90`, border: `1px solid ${C.tan}40` }}>
              <Flower2 size={12} /> What It Actually Is
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-6xl leading-tight`} style={{ color: C.cocoa }}>
              An afternoon for women tired of doing{' '}
              <span style={{ color: C.mauve }}>&ldquo;new year, new me&rdquo;</span>{' '}alone
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: C.body }}>
              Real flowers in your hands. Real women around you — not an audience, not a comment section, a circle.
              You&apos;ll build a bouquet for someone else while she builds one for you, and somewhere in that grounding work,
              you&apos;ll loosen the mindset that&apos;s been keeping you small.
            </p>
          </motion.div>

          {/* 2-col photos */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {['bloom-event-2', 'bloom-event-3'].map((img, i) => (
              <motion.div key={img}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl"
                style={{ border: `2px solid ${C.tan}35` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Bloom & Belong" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw,50vw" />
              </motion.div>
            ))}
          </div>

          {/* 3-col photos */}
          <div className="grid grid-cols-3 gap-4">
            {['bloom-event-4', 'bloom-event-5', 'bloom-event-7'].map((img, i) => (
              <motion.div key={img}
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
                style={{ border: `1px solid ${C.tan}30` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Bloom & Belong" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="33vw" />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <p className={`${fraunces.className} italic text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto`} style={{ color: C.cocoa }}>
              This isn&apos;t a networking event with a flower theme bolted on. It&apos;s mindset work disguised as making something beautiful —
              {' '}<span className="font-light" style={{ color: C.deepMauve }}>because that&apos;s often the only way real shifts happen.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHAT WE'LL DO ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 max-w-[1180px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.blush}90`, border: `1px solid ${C.tan}40` }}>
            <Sparkles size={12} /> What We&apos;ll Do Together
          </span>
          <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-6xl leading-tight`} style={{ color: C.cocoa }}>
            Not through more information.{' '}
            <span className="block font-light not-italic" style={{ color: C.mauve }}>Through something you feel in your body.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="group h-full p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, boxShadow: `0 8px 30px -8px ${rgba(C.mauve, 0.07)}` }}>
                  <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${C.blush}90`, color: C.mauve }}>
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className={`${cormorant.className} italic font-semibold text-xl md:text-2xl leading-snug mb-3`} style={{ color: C.cocoa }}>{a.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.body }}>{a.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══ THE SPREAD ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 rounded-[2.5rem] my-4" style={{ backgroundColor: C.blush }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.white}90`, border: `1px solid ${C.tan}40` }}>
              <Heart size={12} /> The Spread
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-5xl`} style={{ color: C.cocoa }}>
              Come hungry —{' '}
              <span className="font-light not-italic" style={{ color: C.mauve }}>for more than the flowers</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: C.body }}>
              A beautiful spread of refreshments is part of the afternoon — served like everything else here: generously, and in good company.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {['refreshments-1', 'refreshments-2', 'refreshments-3', 'refreshments-4'].map((img, i) => (
              <motion.div key={img}
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className={`relative rounded-[2rem] overflow-hidden shadow-lg ${i % 2 === 1 ? 'md:mt-8' : ''}`}
                style={{ aspectRatio: '3/4', border: `1px solid ${C.tan}35` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Refreshments" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw,25vw" />
              </motion.div>
            ))}
          </div>

          {/* Extra refreshments row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {['refreshments-5', 'refreshments-6', 'refreshments-7'].map((img, i) => (
              <motion.div key={img}
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-md"
                style={{ border: `1px solid ${C.tan}30` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Refreshments" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="33vw" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE DETAILS ═════════════════════════════════════════════ */}
      <section id="details" className="py-20 md:py-28 px-5 md:px-16 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.blush}90`, border: `1px solid ${C.tan}40` }}>
              <Calendar size={12} /> The Details
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-5xl`} style={{ color: C.cocoa }}>
              Everything you need to <span style={{ color: C.mauve }}>know</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {details.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="h-full text-center p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 shadow-md"
                    style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                    <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${C.blush}90`, color: C.mauve }}>
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: C.mauve }}>{d.label}</div>
                    <div className={`${cormorant.className} italic font-semibold text-2xl leading-snug mb-1`} style={{ color: C.cocoa }}>{d.value}</div>
                    <div className="text-sm leading-relaxed" style={{ color: C.body }}>{d.sub}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center">
            <p className={`${fraunces.className} italic text-xl md:text-2xl max-w-2xl mx-auto`} style={{ color: C.cocoa }}>
              Spaces are intentionally small —{' '}
              <span className="font-light" style={{ color: C.mauve }}>this only works if the room stays a circle, not a crowd.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ COME AS YOU ARE ═════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 rounded-[2.5rem] my-4" style={{ backgroundColor: C.blush }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative w-full md:w-[42%] aspect-[3/4] rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl"
              style={{ border: `2px solid ${C.tan}40` }}
            >
              <Image src="/assets/hirah-1.jpeg" alt="Hirah Safi, lifestyle coach" fill className="object-cover" sizes="(max-width:768px) 100vw,42vw" />
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg" style={{ border: `1px solid ${C.tan}40` }}>
                <Flower2 size={18} style={{ color: C.mauve }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="flex-1 text-center md:text-left space-y-5"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ color: C.mauve, backgroundColor: `${C.white}90`, border: `1px solid ${C.tan}40` }}>
                <Sparkles size={12} /> Come As You Are
              </span>
              <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-5xl leading-tight`} style={{ color: C.cocoa }}>
                Not the version of you who&apos;s <span style={{ color: C.mauve }}>&ldquo;finally figured it out&rdquo;</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: C.body }}>
                Just as you are right now — a little stuck, a little tired of doing it alone, ready for something to shift.
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.body }}>
                Leave with a full heart, a bouquet that isn&apos;t yours because you needed something to hold, and a community
                that remembers your name <em className={`${fraunces.className} italic`} style={{ color: C.mauve }}>after the flowers are gone.</em>
              </p>
              <p className={`${cormorant.className} italic font-semibold text-3xl md:text-4xl pt-2`} style={{ color: C.cocoa }}>
                We can&apos;t wait to <span style={{ color: C.mauve }}>bloom with you. 🌸</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PRIORITY WAITLIST & UPDATES ═════════════════════════════ */}
      <section id="waitlist" className="py-20 md:py-28 px-5 md:px-16 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14 space-y-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] px-5 py-2 rounded-full shadow-sm"
              style={{ color: C.deepMauve, backgroundColor: `${C.blush}90`, border: `1px solid ${C.tan}50` }}>
              <Bell size={12} className="text-[#8E7687]" /> Priority Notification List
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl sm:text-5xl md:text-6xl`} style={{ color: C.cocoa }}>
              Join the <span style={{ color: C.mauve }}>Waitlist</span>
            </h2>
            <p className={`${fraunces.className} italic text-base sm:text-lg max-w-xl mx-auto`} style={{ color: C.body }}>
              Be the first to know the moment our rescheduled date and venue are unveiled.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            {/* Waitlist Signup Form Card */}
            <WaitlistPanel />

            {/* Share & Connect Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="relative overflow-hidden rounded-[2.5rem] border p-8 sm:p-10 text-center shadow-xl flex flex-col justify-between"
              style={{ backgroundColor: `${C.white}95`, borderColor: `${C.tan}55`, backdropFilter: 'blur(16px)' }}
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: C.mauve }}>
                  Know a sister who needs this room?
                </div>

                <div className="mx-auto w-44 h-44 rounded-2xl overflow-hidden bg-white p-2.5 shadow-inner border mb-4" style={{ borderColor: C.border }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/qr-bloom-belong.png" alt="Bloom & Belong QR code" className="w-full h-full object-contain" />
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: C.body }}>
                  Scan to share this invitation with a friend or save it on your phone for future announcements.
                </p>

                <a
                  href="/qr-bloom-belong.png"
                  download="bloom-and-belong-qr.png"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-6 py-3.5 rounded-full transition-all hover:scale-[1.03] shadow-sm"
                  style={{ color: C.mauve, backgroundColor: `${C.blush}90`, border: `1px solid ${C.tan}50` }}
                >
                  <Share2 size={13} />
                  Download QR Code
                </a>
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: `${C.border}90` }}>
                <p className="text-xs mb-1.5 uppercase tracking-wider font-semibold" style={{ color: C.muted }}>Follow the journey</p>
                <a
                  href="https://instagram.com/lifeandsuccesscoach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cormorant.className} italic font-semibold text-xl inline-flex items-center gap-1.5 transition-colors hover:opacity-80`}
                  style={{ color: C.deepMauve }}
                >
                  <Instagram size={18} />
                  @lifeandsuccesscoach
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY MOBILE WAITLIST BAR ═══════════════════════════════ */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: EASE }}
        className="md:hidden fixed bottom-4 left-4 right-4 z-50"
      >
        <a
          href="#waitlist"
          className={`${cormorant.className} italic w-full rounded-2xl py-3.5 text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-2`}
          style={{
            background: `linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})`,
            border: '1.5px solid rgba(255,255,255,0.3)',
            boxShadow: `0 14px 35px -8px ${rgba(C.deepMauve, 0.6)}`
          }}
        >
          <Flower2 size={18} className="not-italic" /> Join Priority Waitlist
        </a>
      </motion.div>

    </div>
  );
}
