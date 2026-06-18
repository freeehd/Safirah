'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Star, Heart, Clock, Calendar, Users, MessageCircle, Gift, Flower2, Leaf, Sun, Sprout, X, Feather } from 'lucide-react';
import { Fraunces } from 'next/font/google';
import Image from 'next/image';
import Grainient from '@/components/Grainient';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap' });
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Palette ─── */
const C = {
  cream: '#F8EDEB',
  beige: '#F9DCC4',
  peach: '#FEC89A',
  deepPeach: '#E8A87C',
  espresso: '#332521',
  body: '#4F4541',
  muted: '#725853',
  border: '#E8D5C8',
  white: '#FFFFFF',
};

/* ─── Content ─── */
const fixes = [
  {
    icon: Calendar,
    title: 'The Overwhelmed Calendar',
    desc: 'How to block out your days so your faith, your business goals, and your personal well-being peacefully coexist.',
  },
  {
    icon: Heart,
    title: 'The Guilt-Free "No"',
    desc: 'The mindset shifts you need to set unapologetic boundaries and stop people-pleasing at the expense of your own success.',
  },
  {
    icon: Sun,
    title: 'The Burnout Cycle',
    desc: 'How to ditch the anxiety of procrastination and build a high-performance routine that leaves you energized, not exhausted.',
  },
];

const struggles = [
  'You start every Monday with high hopes, only to feel overwhelmed by Wednesday.',
  'You say yes to everyone else — your career, your family — while your own dreams wait.',
  'Your to-do list keeps growing, but your energy keeps shrinking.',
  'You feel scattered, behind, and guilty no matter how much you do.',
  'Your schedule has no room for your faith, your rest, or your peace.',
  'You know you\'re capable of more — you just can\'t seem to find the system.',
];

export default function FreeTimeManagementPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeEfBBoNZl5bJTjsOW5a4cTkaepFUwYuldJK3IllzyOll7MCA/formResponse';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    }).then(() => {
      setSubmitted(true);
      setLoading(false);
    }).catch(() => {
      // Google Forms responds — even if fetch errors, data likely sent
      setSubmitted(true);
      setLoading(false);
    });
  };

  const handleIframeLoad = () => {
    // Fallback for legacy iframe method (kept for compatibility)
    if (!submitted && !loading) return;
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCTA = () => {
    setShowPopup(false);
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..700,0..100,0..1&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <main className={`${fraunces.className} relative`}>
        {/* ─── subtle full-page Grainient backdrop ─── */}
        <div className="fixed inset-0 -z-10 opacity-25 pointer-events-none">
          <Grainient
            timeSpeed={0.06} colorBalance={0.0} warpStrength={0.3} warpFrequency={2.5}
            warpSpeed={0.6} warpAmplitude={40} blendAngle={15} blendSoftness={0.08}
            rotationAmount={200} noiseScale={3.0} grainAmount={0.03} grainScale={2.0}
            grainAnimated contrast={10.0} gamma={10.0} saturation={0.3} centerX={0.0}
            centerY={0.0} zoom={1} color1={C.beige} color2={C.peach} color3={C.cream}
          />
        </div>

        {/* ================================================================ */}
        {/* HERO — pressed-flower invitation */}
        {/* ================================================================ */}

<section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 md:px-16 py-20"
  style={{ backgroundColor: C.cream }}>
  
  {/* ── Deep atmospheric gradient base ── */}
  <div className="absolute inset-0 -z-20" style={{
    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.peach}30 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 100%, ${C.deepPeach}15 0%, transparent 50%),
                radial-gradient(ellipse 50% 40% at 20% 80%, ${C.beige}25 0%, transparent 50%)`
  }} />

  {/* ── Slow organic watercolor orbs ── */}
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
      style={{ background: `radial-gradient(circle, ${C.peach}35, transparent 70%)`, top: '-10%', left: '-5%' }}
      animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
      style={{ background: `radial-gradient(circle, ${C.deepPeach}20, transparent 70%)`, bottom: '-5%', right: '-5%' }}
      animate={{ x: [0, -30, 40, 0], y: [0, 20, -30, 0], scale: [1, 0.9, 1.05, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-[300px] h-[300px] rounded-full blur-[60px]"
      style={{ background: `radial-gradient(circle, ${C.beige}40, transparent 70%)`, top: '40%', left: '60%' }}
      animate={{ x: [0, 20, -20, 0], y: [0, -20, 15, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>

  {/* ── Floating botanical particles ── */}
  {[...Array(8)].map((_, i) => (
    <motion.div
      key={`bloom-${i}`}
      className="absolute pointer-events-none"
      style={{ left: `${8 + i * 12}%`, top: `${5 + (i % 3) * 25}%` }}
      animate={{
        y: [0, -15, 10, -5, 0],
        rotate: [0, i % 2 ? 15 : -15, 0],
        opacity: [0.15, 0.35, 0.2, 0.15],
      }}
      transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
    >
      {i % 3 === 0 ? <Flower2 size={10 + i * 2} style={{ color: C.peach }} /> :
       i % 3 === 1 ? <Leaf size={10 + i * 2} style={{ color: C.deepPeach }} /> :
       <Sprout size={10 + i * 2} style={{ color: C.beige }} />}
    </motion.div>
  ))}

  {/* ── Top decorative rule ── */}
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
    className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
  >
    <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${C.peach}60)` }} />
    <Leaf size={9} style={{ color: C.deepPeach }} className="rotate-[-20deg]" />
    <Flower2 size={11} style={{ color: C.peach }} />
    <Leaf size={9} style={{ color: C.deepPeach }} className="rotate-[20deg]" />
    <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${C.peach}60)` }} />
  </motion.div>

  {/* ── Main Content ── */}
  <motion.div
    className="relative z-10 max-w-[720px] w-full mx-auto text-center pt-8"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
  >
    {/* Eyebrow */}
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      className="mb-8"
    >
      <span
        className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] px-6 py-3 rounded-full"
        style={{
          color: C.deepPeach,
          backgroundColor: `${C.peach}15`,
          border: `1px solid ${C.peach}35`,
          boxShadow: `0 4px 20px ${C.peach}12, inset 0 1px 0 ${C.white}40`
        }}
      >
        <Sparkles size={11} />
        A Free 75-Minute Live Workshop
      </span>
    </motion.div>

    {/* Headline — NEW TITLE */}
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
      className="text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] mb-6"
      style={{ color: C.espresso, fontVariationSettings: '"SOFT" 50, "WONK" 1' }}
    >
      Free Calendar{' '}
      <span className="block mt-1">
        <span className="italic font-light" style={{ color: C.muted, fontVariationSettings: '"SOFT" 80, "WONK" 1' }}>&</span>{' '}
        Time Management
      </span>
      <span className="block mt-1 relative inline-block">
        Workshop
        <motion.span
          className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${C.deepPeach}, ${C.peach}, transparent)` }}
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
      className="text-[16px] sm:text-[19px] md:text-[21px] leading-[1.65] max-w-[480px] mx-auto mb-10 font-inter"
      style={{ color: C.body }}
    >
      Finally build a schedule that honors your faith, fuels your goals, and protects your peace —{' '}
      <em className="italic font-medium" style={{ color: C.muted }}>without the burnout.</em>
    </motion.p>

    {/* Meta tags */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
      className="flex items-center justify-center gap-3 mb-10 flex-wrap"
    >
      {[
        { icon: Calendar, text: 'July 5, 2026' },
        { icon: Sun, text: 'Live Online' },
        { icon: Heart, text: 'Sisters Only' },
        { icon: Gift, text: '100% Free' },
      ].map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          style={{
            color: i === 0 ? C.deepPeach : C.espresso,
            backgroundColor: `${C.white}70`,
            border: `1px solid ${i === 0 ? C.peach : C.border}40`,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 2px 12px ${C.peach}08`
          }}
        >
          <tag.icon size={11} strokeWidth={2} />
          {tag.text}
        </span>
      ))}
    </motion.div>

    {/* CTA */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
    >
      <a
        href="#cta-section"
        className="group relative inline-flex items-center justify-center gap-3 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] px-14 py-5 rounded-full transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(232,168,124,0.45)] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${C.deepPeach} 0%, ${C.peach} 100%)`,
          boxShadow: `0 14px 44px -10px ${C.peach}55`
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10">Save My Free Seat</span>
        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
      </a>
    </motion.div>

    {/* Social proof hint */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="text-[11px] mt-6 font-inter flex items-center justify-center gap-2"
      style={{ color: C.muted }}
    >
      <span className="inline-flex -space-x-1.5">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block w-5 h-5 rounded-full border-2 border-white" style={{
            backgroundColor: [C.peach, C.deepPeach, C.beige, C.border][i]
          }} />
        ))}
      </span>
      <span className="italic">Limited spots — 200+ sisters already registered</span>
    </motion.p>
  </motion.div>

  {/* ── Bottom scroll indicator ── */}
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4, duration: 0.6 }}
  >
    <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: `${C.muted}60` }}>Scroll</span>
    <motion.div
      className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
      style={{ borderColor: `${C.peach}50` }}
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-1 h-1.5 rounded-full" style={{ backgroundColor: C.deepPeach }} />
    </motion.div>
  </motion.div>
</section>
        {/* ================================================================ */}
        {/* PAIN POINTS — "Tired of starting every Monday…" */}
        {/* ================================================================ */}
        <section className="py-20 px-5 md:px-16 max-w-[1140px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-14"
          >
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full"
              style={{ color: C.muted, backgroundColor: `${C.peach}25`, border: `1px solid ${C.peach}40` }}
            >
              <Leaf size={11} />
              Does This Sound Familiar?
            </span>
            <h2 className="text-[28px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#332521] mb-4">
              You don&apos;t have a time problem.{' '}
              <span className="italic font-light" style={{ color: C.muted }}><br />You need a system that protects your peace.</span>
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.8] tracking-[0.01em] text-[#4F4541] max-w-xl mx-auto font-inter">
              You&apos;ve tried planners, apps, and Monday motivation. Nothing sticks because the system wasn&apos;t built for <em>you</em> — your faith, your energy, your real life.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 max-w-4xl mx-auto">
            {struggles.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
              >
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1 group"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.75)',
                    border: `1px solid ${C.border}70`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${C.peach}30`, color: C.deepPeach }}
                  >
                    <Leaf size={13} strokeWidth={2.5} />
                  </div>
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-[#4F4541] font-medium font-inter pt-0.5">{point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* BRIDGE — Hirah comfort-zone image + quote */}
        {/* ================================================================ */}
        <section className="py-16 md:py-24 px-5 md:px-16" style={{ backgroundColor: `${C.cream}` }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative w-full md:w-[40%] aspect-[4/5] rounded-[2rem] overflow-hidden flex-shrink-0 shadow-[0_20px_60px_-16px_rgba(201,169,162,0.3)]"
              style={{ border: `2px solid ${C.peach}40` }}
            >
              <Image
                src="/assets/hirah-comfort-zone.jpeg"
                alt="Hirah Safi reading Comfort Zone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {/* Corner floral accent */}
              <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center" style={{ border: `1px solid ${C.peach}40` }}>
                <Flower2 size={16} style={{ color: C.deepPeach }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="flex-1 text-center md:text-left"
            >
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full"
                style={{ color: C.muted, backgroundColor: `${C.peach}20`, border: `1px solid ${C.peach}30` }}
              >
                <Sprout size={11} />
                A Note from Hirah
              </span>
              <blockquote className="text-[22px] md:text-[28px] leading-[1.5] tracking-[-0.01em] font-medium mb-6" style={{ color: C.espresso }}>
                &ldquo;We want to be the women we pray to be. But transformation doesn&apos;t happen by accident —{' '}
                <span className="italic font-light" style={{ color: C.muted }}>it happens by design.</span>&rdquo;
              </blockquote>
              <p className="text-[15px] leading-[1.7] font-inter" style={{ color: C.body }}>
                This isn&apos;t just another rigid, boring productivity seminar. This is a warm, high-energy,{' '}
                <strong>girls-only sanctuary</strong> designed to help you reclaim your days, align your schedule with your prayers,
                and step into the woman you are truly capable of becoming.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* WHAT WE'RE FIXING TOGETHER */}
        {/* ================================================================ */}
        <section className="py-24 px-5 md:px-16 max-w-[1140px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-14"
          >
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] mb-5 px-4 py-2 rounded-full"
              style={{ color: C.muted, backgroundColor: `${C.peach}25`, border: `1px solid ${C.peach}40` }}
            >
              <Sparkles size={11} />
              What We&apos;re Fixing Together
            </span>
            <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#332521] mb-4">
              In Just 75 Minutes,<br />
              <span className="italic font-light" style={{ color: C.muted }}>You&apos;ll Walk Away With&hellip;</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {fixes.map((fix, i) => {
              const Icon = fix.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <div
                    className="relative h-full p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 group overflow-hidden text-left"
                    style={{
                      backgroundColor: C.white,
                      border: `1px solid ${C.border}`,
                      boxShadow: '0 8px 32px -8px rgba(201,169,162,0.08)',
                    }}
                  >
                    {/* Corner peach glow */}
                    <div
                      className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full -z-0 transition-all duration-700 group-hover:opacity-80"
                      style={{ backgroundColor: `${C.peach}40` }}
                    />

                    <div
                      className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${C.peach}30` }}
                    >
                      <Icon size={22} style={{ color: C.deepPeach }} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-[18px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#332521] mb-3">
                      {fix.title}
                    </h3>
                    <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.7] font-inter" style={{ color: C.body }}>
                      {fix.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* WHY YOU BELONG — floral botanical split */}
        {/* ================================================================ */}
        <section className="py-20 md:py-28 px-5 md:px-16 relative overflow-hidden" style={{ backgroundColor: `${C.cream}` }}>
          {/* Decorative background petals */}
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full opacity-[0.06] pointer-events-none" style={{ backgroundColor: C.peach }} />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full opacity-[0.04] pointer-events-none" style={{ backgroundColor: C.deepPeach }} />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-center mb-16"
            >
              <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#332521] mb-4">
                💖 Why You Belong{' '}
                <span className="italic font-light" style={{ color: C.muted }}>in This Space</span>
              </h2>
              <p className="text-[16px] md:text-[17px] leading-[1.8] tracking-[0.01em] font-inter max-w-2xl mx-auto" style={{ color: C.body }}>
                When you save your free seat today, you aren&apos;t just registering for a workshop.
                You&apos;re stepping into a supportive, faith-conscious community of ambitious women
                who are ready to rise together.
              </p>
            </motion.div>

            {/* Image + community cards */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
                className="relative w-full md:w-[45%] aspect-[3/4] rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-[0_24px_64px_-16px_rgba(201,169,162,0.25)]"
                style={{ border: `2px solid ${C.peach}40` }}
              >
                <Image
                  src="/assets/hirah-smile-shrug.jpeg"
                  alt="Hirah Safi - warm and welcoming"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                {/* Corner floral accent */}
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center" style={{ border: `1px solid ${C.peach}50` }}>
                  <Flower2 size={14} style={{ color: C.deepPeach }} />
                </div>
              </motion.div>

              <div className="flex-1 space-y-4">
                {[
                  { icon: Users, text: 'A fun, positive, totally judgment-free vibe with sisters who get it.' },
                  { icon: Heart, text: 'Faith-conscious coaching that honors your values and your schedule.' },
                  { icon: Feather, text: 'Finally get the clarity you\'ve been praying for — in a space that feels like home.' },
                  { icon: MessageCircle, text: 'Expect real connection, real tools, and a community that cheers you on.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                    >
                      <div
                        className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-500 hover:-translate-y-0.5"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          border: `1px solid ${C.border}60`,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <div
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0"
                          style={{ backgroundColor: `${C.peach}30` }}
                        >
                          <Icon size={15} style={{ color: C.deepPeach }} strokeWidth={1.5} />
                        </div>
                        <p className="text-[14px] md:text-[15px] leading-relaxed font-inter" style={{ color: C.body }}>{item.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* DETAILS + CTA */}
        {/* ================================================================ */}
        <section id="cta-section" className="py-24 px-5 md:px-16 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-14"
            >
              <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#332521] mb-6">
                Claim Your Free Seat &<br />
                <span className="italic font-light" style={{ color: C.muted }}>Join the Sisterhood!</span>
              </h2>
            </motion.div>

            {/* Details cards */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {[
                { icon: Calendar, label: 'When', value: 'Sunday, July 5, 2026' },
                { icon: Sun, label: 'Where', value: 'Live Online (From your cozy spot ☕)' },
                { icon: Sparkles, label: 'Investment', value: '100% FREE' },
              ].map((detail, i) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    className="flex-1 w-full"
                  >
                    <div
                      className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        border: `1px solid ${C.border}60`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${C.peach}30` }}
                      >
                        <Icon size={18} style={{ color: C.deepPeach }} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.muted }}>{detail.label}</span>
                      <span className="text-[15px] font-semibold" style={{ color: C.espresso }}>{detail.value}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Inline Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="relative max-w-[580px] mx-auto w-full"
            >
              <div
                className="relative rounded-[1.75rem] p-7 sm:p-8 overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  border: `1px solid ${C.peach}35`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 8px 32px -8px rgba(201,169,162,0.12)`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${C.peach}50, transparent)` }} />

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${C.peach}25` }}>
                      <CheckCircle size={24} style={{ color: C.deepPeach }} />
                    </div>
                    <h3 className="text-[20px] font-semibold mb-2" style={{ color: C.espresso }}>You&apos;re all set, sister! 🌸</h3>
                    <p className="text-[13px] leading-[1.7] font-inter max-w-sm mx-auto" style={{ color: C.body }}>
                      We&apos;ll send your workshop details and the exclusive VIP WhatsApp invite to your inbox shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} action={FORM_ACTION} method="POST" target="hidden-frame">
                    {/* Hidden Google Form fields */}
                    <input type="hidden" name="fbzx" value="2596042932523919528" />
                    <input type="hidden" name="pageHistory" value="0" />

                    <div className="space-y-4">
                      {/* First name */}
                      <div>
                        <label className="block text-[12px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: C.espresso }}>
                          First Name <span style={{ color: C.deepPeach }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="entry.1613095291"
                          required
                          placeholder="Your answer"
                          className="w-full px-4 py-3 rounded-xl text-[14px] font-inter outline-none transition-all duration-300 focus:-translate-y-0.5"
                          style={{
                            backgroundColor: `${C.peach}10`,
                            border: `1.5px solid ${C.border}60`,
                            color: C.espresso,
                          }}
                          onFocus={(e) => e.target.style.borderColor = C.deepPeach}
                          onBlur={(e) => e.target.style.borderColor = `${C.border}60`}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[12px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: C.espresso }}>
                          Email Address <span style={{ color: C.deepPeach }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="entry.1268531263"
                          required
                          placeholder="Your answer"
                          className="w-full px-4 py-3 rounded-xl text-[14px] font-inter outline-none transition-all duration-300 focus:-translate-y-0.5"
                          style={{
                            backgroundColor: `${C.peach}10`,
                            border: `1.5px solid ${C.border}60`,
                            color: C.espresso,
                          }}
                          onFocus={(e) => e.target.style.borderColor = C.deepPeach}
                          onBlur={(e) => e.target.style.borderColor = `${C.border}60`}
                        />
                      </div>

                      {/* Biggest struggle */}
                      <div>
                        <label className="block text-[12px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: C.espresso }}>
                          What is your biggest struggle with time management right now?
                        </label>
                        <textarea
                          name="entry.2137681401"
                          rows={3}
                          placeholder="Your answer"
                          className="w-full px-4 py-3 rounded-xl text-[14px] font-inter outline-none resize-none transition-all duration-300 focus:-translate-y-0.5"
                          style={{
                            backgroundColor: `${C.peach}10`,
                            border: `1.5px solid ${C.border}60`,
                            color: C.espresso,
                          }}
                          onFocus={(e) => e.target.style.borderColor = C.deepPeach}
                          onBlur={(e) => e.target.style.borderColor = `${C.border}60`}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full inline-flex items-center justify-center gap-2.5 text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-1 overflow-hidden disabled:opacity-60"
                        style={{
                          background: `linear-gradient(135deg, ${C.deepPeach}, ${C.peach})`,
                          boxShadow: `0 10px 32px -6px ${C.peach}50`,
                        }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                        <span className="relative z-10">{loading ? 'Sending...' : '🌸 Save My Free Seat'}</span>
                        {!loading && <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>
                  </form>
                )}

                {/* Hidden iframe for form submission */}
                <iframe name="hidden-frame" className="hidden" onLoad={handleIframeLoad} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CLOSING — final image + encouragement */}
        {/* ================================================================ */}
        <section className="py-16 md:py-24 px-5 md:px-16 relative overflow-hidden" style={{ backgroundColor: `${C.cream}` }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex-1 text-center md:text-left"
            >
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full"
                style={{ color: C.muted, backgroundColor: `${C.peach}20`, border: `1px solid ${C.peach}30` }}
              >
                <Flower2 size={11} />
                See You There, Sister
              </span>
              <h2 className="text-[28px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#332521] mb-4">
                You&apos;ve been praying for clarity.{' '}
                <span className="italic font-light" style={{ color: C.muted }}>This is your sign.</span>
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[1.8] tracking-[0.01em] font-inter mb-8" style={{ color: C.body }}>
                Save your free seat today and walk away with a faith-aligned system, a supportive sisterhood,
                and the clarity to finally become the woman you&apos;ve been praying to be.
              </p>
              <a href="#cta-section"
                className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:gap-3"
                style={{ color: C.deepPeach }}
              >
                Save My Free Seat
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="relative w-full md:w-[38%] aspect-[4/5] rounded-[2rem] overflow-hidden flex-shrink-0 shadow-[0_20px_60px_-16px_rgba(201,169,162,0.25)]"
              style={{ border: `2px solid ${C.peach}40` }}
            >
              <Image
                src="/assets/hirah-notebook.jpeg"
                alt="Hirah Safi - ready to guide you"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 38vw"
              />
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center" style={{ border: `1px solid ${C.peach}50` }}>
                <Leaf size={14} style={{ color: C.deepPeach }} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ================================================================ */}
      {/* FEELING NERVOUS? POPUP */}
      {/* ================================================================ */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full rounded-2xl p-6 shadow-[0_16px_48px_rgba(201,169,162,0.2)] text-left"
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: `1px solid ${C.peach}60`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-1 transition-colors"
              style={{ color: `${C.body}60` }}
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-4 pr-4">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
                style={{ backgroundColor: `${C.peach}30` }}
              >
                <Flower2 size={17} style={{ color: C.deepPeach }} />
              </div>
              <div>
                <h4 className="text-[16px] font-bold mb-1" style={{ color: C.espresso }}>Still thinking it over?</h4>
                <p className="text-[13px] leading-relaxed font-inter mb-4" style={{ color: C.body }}>
                  That&apos;s okay. This is a zero-pressure, judgment-free space designed for sisters like you.
                  Your seat is waiting — no strings attached, just growth.
                </p>
                <button
                  onClick={scrollToCTA}
                  className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  style={{ color: C.deepPeach }}
                >
                  Save my free seat
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
