'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Compass, Droplets, Feather, Heart, Leaf, Moon, Shield, Sparkles, Star, Sun, X, Monitor } from 'lucide-react';
import { Fraunces } from 'next/font/google';
import Grainient from '@/components/Grainient';
import TextPressure from '@/components/textpressure';
import Workbook from './workbook';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap' });
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ───── full content from PDF ───── */
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

interface WeekData { week: number; title: string; subtitle: string; powerWords: string[]; description: string; icon: React.ComponentType<{ size?: number }>; }
const weeksData: WeekData[] = [
     { week: 1, title: 'Meet Yourself Honestly', subtitle: 'Stop running from your own truth.', powerWords: ['Clarity', 'Awakening', 'Awareness'], description: 'Get honest about where you are, why you\'re stuck, and what\'s actually been running your life on autopilot.', icon: Compass },
     { week: 2, title: 'Silence the Voice That\'s Been Shrinking You', subtitle: 'Unlearn the beliefs you didn\'t even know you had.', powerWords: ['Rewire', 'Release', 'Reclaim'], description: 'Identify and rewrite the inherited limiting beliefs that have been quietly running the show — and learn how to catch the inner critic in real time.', icon: Moon },
     { week: 3, title: 'Come Home to Yourself', subtitle: 'Find a peace that doesn\'t depend on your circumstances.', powerWords: ['Calm', 'Grounded', 'Present'], description: 'Reconnect with your body, your breath, and your faith — so your nervous system stops running your life.', icon: Leaf },
     { week: 4, title: 'Boundaries Without Guilt', subtitle: 'Say no without losing your softness.', powerWords: ['Protected', 'Free', 'Unapologetic'], description: 'Hold your ground with family, culture, and people-pleasing patterns — and protect your energy without becoming someone you\'re not.', icon: Shield },
     { week: 5, title: 'Build the Calendar of the Woman You\'re Becoming', subtitle: 'Design a daily rhythm that finally sticks.', powerWords: ['Consistency', 'Discipline', 'Alignment'], description: 'Create a faith-aligned daily and weekly structure that fits your real life — and learn the consistency system that makes it last past week three.', icon: Sun },
     { week: 6, title: 'Become Her. For Real.', subtitle: 'Walk away as the woman you\'ve been praying to be.', powerWords: ['Embodied', 'Becoming', 'Unshakeable'], description: 'Lock in the identity, anticipate the setbacks, and leave with a 90-day plan to keep showing up as her — even when life gets loud.', icon: Star },
];

const painPointIcons = [Heart, Heart, Moon, X, Feather, Droplets, Moon, Leaf, Heart, Shield, Feather, Sparkles, Star];

export default function SixWeekProgramPage() {
     const [showModal, setShowModal] = useState(false);
     const [emailValue, setEmailValue] = useState('');

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!emailValue.trim()) return;
          setShowModal(true);
          setEmailValue('');
     };

     return (
          <>
               <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..700,0..100,0..1&display=swap" rel="stylesheet" />
               <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

               <main className={`${fraunces.className} relative`}>
                    {/* ─── subtle full-page Grainient backdrop ─── */}
                    <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
                         <Grainient
                              timeSpeed={0.08} colorBalance={0.0} warpStrength={0.3} warpFrequency={2.5}
                              warpSpeed={0.8} warpAmplitude={40} blendAngle={15} blendSoftness={0.08}
                              rotationAmount={200} noiseScale={3.0} grainAmount={0.03} grainScale={2.0}
                              grainAnimated contrast={10.0} gamma={10.0} saturation={0.2} centerX={0.0}
                              centerY={0.0} zoom={1} color1="#FBE8E2" color2="#fc84c0" color3="#FBE8E2"
                         />
                    </div>

                    {/* ================================================================ */}
                    {/* HERO */}
                    {/* ================================================================ */}
                    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-5 md:px-16 py-20">
                         <div className="absolute inset-0 -z-10">
                              <Grainient
                                   timeSpeed={2} colorBalance={0.1} warpStrength={0.6} warpFrequency={3.5}
                                   warpSpeed={5.2} warpAmplitude={80} blendAngle={15} blendSoftness={0.12}
                                   rotationAmount={300} noiseScale={2.5} grainAmount={0.06} grainScale={3.0}
                                   grainAnimated contrast={1.2} gamma={1.0} saturation={.9} centerX={0.0}
                                   centerY={-0.05} zoom={0.95} color1="#CDADA4" color2="#FBE8E2" color3="#CDADA4"
                              />
                         </div>

                         {/* Background glow and rings */}
                         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full -z-10 pointer-events-none"
                              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)' }}
                              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 2, ease: EASE, delay: 0.1 }} />

                         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[580px] h-[480px] sm:h-[580px] rounded-full -z-10 pointer-events-none border border-white/60"
                              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
                              animate={{ scale: [1, 1.03, 1], opacity: [1, 0.75, 1], rotate: 0 }}
                              transition={{ duration: 4, ease: EASE, repeat: Infinity, delay: 0.3 }} />

                         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full -z-10 pointer-events-none border border-white/40"
                              initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
                              animate={{ scale: [1, 1.05, 1], opacity: [1, 0.65, 1], rotate: 0 }}
                              transition={{ duration: 5, ease: EASE, repeat: Infinity, delay: 0.5 }} />

                         {/* Floating decorative stars */}
                         {[...Array(8)].map((_, i) => (
                              <motion.div key={`hero-star-${i}`}
                                   className="absolute z-0 pointer-events-none"
                                   initial={{ opacity: 0, scale: 0 }}
                                   animate={{
                                        opacity: [0, 0.6, 0.4, 0],
                                        scale: [0, 1, 0.7, 0],
                                        y: [0, -(12 + i * 10)],
                                        x: [0, (i % 2 === 0 ? 1 : -1) * (8 + i * 7)],
                                   }}
                                   transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.8, ease: EASE }}
                                   style={{
                                        top: `${12 + (i * 9) % 65}%`,
                                        left: `${4 + (i * 13) % 87}%`,
                                   }}>
                                   <Star size={8 + (i % 3) * 6} className="text-[#fc84c0]/40" />
                              </motion.div>
                         ))}

                         <motion.div
                              className="relative z-10 max-w-[680px] w-full mx-auto text-center px-8 py-16 sm:px-16 sm:py-24 rounded-[2.5rem] backdrop-blur-xl overflow-hidden"
                              style={{
                                   backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                   border: '1px solid rgba(255, 255, 255, 0.6)',
                                   boxShadow: '0 32px 64px -16px rgba(114, 88, 83, 0.15), inset 0 0 0 1px rgba(255,255,255,0.7)',
                              }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                         >
                              {/* Soft inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-60 pointer-events-none" />

                              <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                                   className="relative inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#A05A4A] mb-10 px-5 py-2 rounded-full border border-[#E8C5B8]/40 bg-[#FFF1EC]/30">
                                   <Star size={10} className="text-[#A05A4A] opacity-70" />
                                   A 6-Week Transformation
                                   <Star size={10} className="text-[#A05A4A] opacity-70" />
                              </motion.span>

                              <motion.div className="relative w-full flex items-center justify-center h-[clamp(4rem,14vw,9rem)] mb-6"
                                   initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}>
                                   <TextPressure text="The Becoming" flex alpha={false} stroke={false} width weight={false} italic textColor="#332521" minFontSize={48} />
                              </motion.div>

                              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                                   className="relative text-[19px] sm:text-[24px] font-playfair leading-[1.6] text-[#4F4541] max-w-[420px] mx-auto mb-10">
                                   <em className="italic text-[#725853] font-medium mr-1">Finally.</em> 
                                   Become the woman you&rsquo;ve been praying to be.
                              </motion.p>

                              {/* Tags Row */}
                              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                                   className="relative flex items-center justify-center gap-3 mb-10 flex-wrap">
                                   <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#fc84c0] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ring-1 ring-[#fc84c0]/20">
                                        <Sparkles size={12} className="opacity-80" />
                                        Save over 60% Today
                                   </span>
                                   <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A3B36] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ring-1 ring-[#D2C3BF]/40">
                                        <Monitor size={12} className="opacity-80" />
                                        100% Online
                                   </span>
                              </motion.div>

                              {/* Elegant Pricing Display */}
                              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                   transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                                   className="relative inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 rounded-2xl sm:rounded-full border border-white/60 bg-white/50 px-8 py-4 sm:py-3 text-[13px] font-semibold tracking-[0.1em] text-[#4F4541] mb-12 shadow-[0_8px_32px_-8px_rgba(114,88,83,0.1)] backdrop-blur-md">
                                   <div className="flex flex-col items-center sm:items-end gap-1">
                                        <span className="text-[#9F928B] text-[10px] sm:text-[11px] font-medium uppercase tracking-widest line-through">$1,300 Value</span>
                                        <div className="flex items-baseline gap-1.5">
                                             <span className="text-[#332521] text-[20px] sm:text-[22px] font-playfair font-bold leading-none">$475</span>
                                             <span className="text-[#725853] font-medium text-[10px] uppercase tracking-wider">one-time</span>
                                        </div>
                                   </div>
                                   <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-[#D2C3BF] to-transparent" />
                                   <div className="sm:hidden h-px w-20 bg-gradient-to-r from-transparent via-[#D2C3BF] to-transparent" />
                                   <div className="flex flex-col items-center sm:items-start gap-1">
                                        <span className="text-[#9F928B] text-[10px] sm:text-[11px] font-medium uppercase tracking-widest line-through">$1,400 Value</span>
                                        <div className="flex items-baseline gap-1.5">
                                             <span className="text-[#332521] text-[20px] sm:text-[22px] font-playfair font-bold leading-none">$287.50</span>
                                             <span className="text-[#725853] font-medium text-[10px] uppercase tracking-wider">&times; 2</span>
                                        </div>
                                   </div>
                              </motion.div>

                              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.8, ease: EASE, delay: 0.6 }} className="relative">
                                   <a href="#pricing"
                                        className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#4A3B36] to-[#604E48] text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-full hover:from-[#332521] hover:to-[#4A3B36] transition-all duration-500 shadow-[0_12px_40px_-8px_rgba(74,59,54,0.5)] hover:shadow-[0_16px_48px_-8px_rgba(74,59,54,0.6)] hover:-translate-y-1 overflow-hidden">
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                                        <span className="relative z-10">Begin the Journey</span>
                                        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                   </a>
                              </motion.div>
                         </motion.div>
                    </section>

                    {/* ================================================================ */}
                    {/* PAIN POINTS — "Does This Sound Familiar?" */}
                    {/* ================================================================ */}

                    <section className="py-16 md:py-24 px-5 md:px-16 max-w-[1140px] mx-auto">
                         <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE }} className="text-center mb-10 md:mb-14">
                              <h2 className="text-[28px] md:text-[34px] font-semibold text-[#332521] mb-3 md:mb-4 leading-tight">
                                   You know who you want to be.<br />
                                   You just <span className="italic text-[#725853]">can&rsquo;t seem to become</span> her.
                              </h2>
                              <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#4F4541] max-w-lg mx-auto text-center">
                                   You&rsquo;ve tried. You&rsquo;ve prayed. You&rsquo;ve started over more times than you can count.
                              </p>
                         </motion.div>

                         <div className="grid grid-rows-2 grid-flow-col sm:block sm:columns-2 md:columns-3 gap-4 overflow-x-auto sm:overflow-visible pb-8 sm:pb-0 -mx-5 px-5 sm:mx-auto sm:px-0 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                              {/* inline styles above hide scrollbar in Firefox/IE. Webkit scrollbar hidden via Tailwind if possible, but let's just let it be clean */}
                              {painPoints.map((point, i) => {
                                   const Icon = painPointIcons[i] || Feather;
                                   return (
                                        <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                                             viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                                             className="break-inside-avoid relative group w-[80vw] sm:w-auto snap-center sm:mb-4 h-full">
                                             <div className="absolute inset-0 bg-gradient-to-br from-[#FFF1EC]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl -z-10 blur-xl" />
                                             <div className="relative flex items-start gap-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-[#D2C3BF]/50 transition-all duration-500 hover:border-[#C9A9A2] hover:bg-white hover:shadow-[0_8px_32px_rgba(201,169,162,0.2)] hover:-translate-y-1 h-full">
                                                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 bg-[#FFF1EC] text-[#725853] border border-[#F5E5E0] shadow-sm">
                                                       <Icon size={14} strokeWidth={2.5} />
                                                  </div>
                                                  <p className="text-[14px] md:text-[15px] leading-relaxed text-[#4F4541] font-medium pt-1">{point}</p>
                                             </div>
                                        </motion.div>
                                   );
                              })}
                         </div>

                         {/* Mobile Swipe Indicator */}
                         <motion.div
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                              className="flex sm:hidden items-center justify-center gap-2 mt-4 text-[#725853]/80 text-[12px] font-medium tracking-wide uppercase"
                         >
                              <span className="opacity-70">Swipe to explore</span>
                              <motion.div
                                   animate={{ x: [0, 4, 0] }}
                                   transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              >
                                   <ArrowRight size={14} />
                              </motion.div>
                         </motion.div>
                    </section>

                    {/* ================================================================ */}
                    {/* WORKBOOK — Your Companion Workbook */}
                    {/* ================================================================ */}
                    <section className="py-20 px-5 md:px-16 max-w-[1140px] mx-auto">
                         <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE }} className="text-center mb-10">
                              <h2 className="text-[32px] font-semibold text-[#332521] mb-4">From Our Past Programs</h2>
                              <p className="text-[16px] leading-[1.6] text-[#4F4541] max-w-xl mx-auto text-center">
                                   Each session comes with a beautifully designed workbook — journaling prompts, NLP exercises, and a
                                   proven framework to release what&rsquo;s been holding you back.
                              </p>
                         </motion.div>
                         <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                              className="w-full max-w-[920px] mx-auto" style={{ height: 'clamp(500px, 80vh, 700px)' }}>
                              <Workbook />
                         </motion.div>
                    </section>

                    {/* ================================================================ */}
                    {/* ROADMAP */}
                    {/* ================================================================ */}
                    <section className="py-24 px-5 md:px-16 bg-[#FDFCFB] border-y border-[#E8DFDD] relative overflow-hidden">
                         <div className="max-w-5xl mx-auto relative z-10">
                              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                   transition={{ duration: 0.5, ease: EASE }} className="text-center mb-16 md:mb-24">
                                   <h2 className="text-[36px] md:text-[42px] font-semibold text-[#332521] mb-5">The 6-Week Roadmap</h2>
                                   <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#4F4541] text-center max-w-2xl mx-auto">
                                        Each week builds on the last — from honest self-awareness to unshakeable embodiment.
                                        By week six, you don&rsquo;t just know who she is. You <em>are</em> her.
                                   </p>
                              </motion.div>

                              <div className="relative space-y-12 md:space-y-24">
                                   {/* Vertical dashed line */}
                                   <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-[#D2C3BF]/50 md:-translate-x-1/2 z-0" />

                                   {weeksData.map((w, i) => {
                                        const isEven = i % 2 === 0;
                                        return (
                                             <motion.div key={w.week} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                                  viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                                                  className={`relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                                  {/* Icon Bubble */}
                                                  <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#FFF1EC] border-4 border-[#FDFCFB] shadow-sm flex items-center justify-center text-[#725853] z-10">
                                                       <w.icon size={22} />
                                                  </div>

                                                  {/* Spacer for desktop centering */}
                                                  <div className="hidden md:block w-1/2" />

                                                  {/* Card */}
                                                  <div className={`w-full md:w-1/2 pl-[56px] md:pl-0 ${isEven ? 'md:pr-12 lg:pr-20' : 'md:pl-12 lg:pl-20'}`}>
                                                       <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E8DFDD] shadow-sm hover:shadow-[0_12px_40px_rgba(210,195,191,0.3)] hover:-translate-y-1.5 transition-all duration-500 group relative overflow-hidden text-left">
                                                            {/* Subtle corner glow */}
                                                            <div className={`absolute top-0 w-32 h-32 bg-[#FFF1EC]/50 blur-3xl rounded-full -z-10 transition-all duration-700 group-hover:bg-[#FBE8E2] ${isEven ? 'right-0 -mr-16 -mt-16' : 'left-0 -ml-16 -mt-16'}`} />

                                                            <div className="flex flex-col mb-4 items-start">
                                                                 <span className="inline-block bg-[#FDFCFB] border border-[#E8DFDD] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] text-[#A05A4A] mb-4 shadow-sm">
                                                                      Week {w.week}
                                                                 </span>
                                                                 <h3 className="text-[22px] md:text-[26px] font-semibold text-[#332521] leading-tight group-hover:text-[#725853] transition-colors">{w.title}</h3>
                                                            </div>

                                                            <p className="text-[15px] italic text-[#8A7671] mb-5 pb-5 border-b border-[#F0EBE9]">{w.subtitle}</p>

                                                            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#4F4541] mb-6">{w.description}</p>

                                                            <div className="flex flex-wrap items-center gap-2">
                                                                 {w.powerWords.map(pw => (
                                                                      <span key={pw} className="text-[10px] font-medium uppercase tracking-[0.1em] rounded-full px-3 py-1.5 bg-[#F9F7F6] text-[#635551] border border-[#E8DFDD]/50">
                                                                           {pw}
                                                                      </span>
                                                                 ))}
                                                            </div>
                                                       </div>
                                                  </div>
                                             </motion.div>
                                        );
                                   })}
                              </div>
                         </div>
                    </section>

                    {/* ================================================================ */}
                    {/* PLEASURE POINTS — "What if 6 weeks from now..." */}
                    {/* ================================================================ */}
                    <section className="py-20 px-5 md:px-16 max-w-[1140px] mx-auto">
                         <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE }} className="text-center mb-12">
                              <h2 className="text-[32px] font-semibold text-[#332521] mb-4">
                                   What If 6 Weeks From Now,<br />
                                   You Woke Up as <span className="italic">Her</span>?
                              </h2>
                              <p className="text-[16px] leading-[1.6] text-[#4F4541] text-center ">
                                   Not a version of you that has everything figured out. But a version of you who finally <em>trusts herself</em> enough to follow through.
                              </p>
                         </motion.div>

                         <div className="grid gap-3 sm:grid-cols-2 max-w-4xl mx-auto">
                              {pleasurePoints.map((point, i) => (
                                   <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.03, ease: EASE }}>
                                        <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-[#D2C3BF] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                             <span className="inline-flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 mt-0.5 bg-[#FFF1EC]">
                                                  <CheckCircle size={13} className="text-[#725853]" />
                                             </span>
                                             <p className="text-[15px] leading-relaxed text-[#4F4541]">{point}</p>
                                        </div>
                                   </motion.div>
                              ))}
                         </div>
                    </section>

                    {/* ================================================================ */}
                    {/* PRICING */}
                    {/* ================================================================ */}
                    <section id="pricing" className="py-20 px-5 md:px-16 max-w-[1140px] mx-auto scroll-mt-20">
                         <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE }} className="text-center mb-16">
                              <h2 className="text-[32px] font-semibold text-[#332521] mb-4">Choose Your Path</h2>
                              <p className="text-[16px] leading-[1.6] text-[#4F4541] text-center">
                                   This isn&rsquo;t another course. It&rsquo;s a 6-week transformation — with live sessions,
                                   a workbook, templates, and a system that actually sticks.
                              </p>
                         </motion.div>

                         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                              {/* Full Pay */}
                              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                   transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                                   className="bg-white rounded-xl border border-[#D2C3BF] p-10 flex flex-col shadow-[0_20px_40px_rgba(74,59,54,0.04)]">
                                   <h3 className="text-[24px] font-semibold text-[#332521] mb-2">Full Payment</h3>
                                   <div className="flex flex-col items-start gap-0 mb-6">
                                        <span className="text-[#9F928B] text-[14px] leading-none line-through mb-1">$1,300</span>
                                        <div className="flex items-baseline gap-1">
                                             <span className="text-[48px] font-bold text-[#332521] leading-[1.1] tracking-[-0.02em]">$475</span>
                                             <span className="text-[14px] text-[#4F4541]">one-time</span>
                                        </div>
                                   </div>
                                   <ul className="flex-1 space-y-3 mb-8">
                                        {['All 6 weekly sessions (Online)', 'Digital workbook & templates', 'Private community access', 'Lifetime access to replays', '90-day integration plan'].map(item => (
                                             <li key={item} className="flex items-start gap-2 text-[15px] text-[#4F4541]">
                                                  <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-[#725853]" />
                                                  <span>{item}</span>
                                             </li>
                                        ))}
                                   </ul>
                                   <a href="https://shop.hirahsaficoach.com/products/6-week-program-onetime" target="_blank" rel="noopener noreferrer"
                                        className="w-full text-center bg-[#FFF1EC] text-[#332521] text-[12px] font-semibold leading-none uppercase tracking-[0.1em] px-8 py-4 rounded-full border border-[#725853]/20 hover:bg-[#F5E5E0] transition-all duration-300">
                                        Secure Your Spot
                                   </a>
                              </motion.div>

                              {/* Split Pay */}
                              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                   transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                                   className="bg-white rounded-xl border border-[#725853] p-10 flex flex-col shadow-[0_20px_40px_rgba(74,59,54,0.04)] relative">
                                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFF1EC] px-4 py-1 rounded-full text-[12px] font-semibold uppercase tracking-[0.1em] text-[#725853] border border-[#725853]/20">
                                        Flexible
                                   </div>
                                   <h3 className="text-[24px] font-semibold text-[#332521] mb-2">Split Payment</h3>
                                   <div className="flex flex-col items-start gap-0 mb-1">
                                        <span className="text-[#9F928B] text-[14px] leading-none line-through mb-1">$1,400</span>
                                        <div className="flex items-baseline gap-1">
                                             <span className="text-[48px] font-bold text-[#332521] leading-[1.1] tracking-[-0.02em]">$287.50</span>
                                             <span className="text-[14px] text-[#4F4541]">&times; 2</span>
                                        </div>
                                   </div>
                                   <p className="text-[14px] text-[#725853] mb-6">$575 total</p>
                                   <ul className="flex-1 space-y-3 mb-8">
                                        {['All 6 weekly sessions (Online)', 'Digital workbook & templates', 'Private community access', 'Lifetime access to replays', '90-day integration plan'].map(item => (
                                             <li key={item} className="flex items-start gap-2 text-[15px] text-[#4F4541]">
                                                  <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-[#725853]" />
                                                  <span>{item}</span>
                                             </li>
                                        ))}
                                   </ul>
                                   <a href="https://shop.hirahsaficoach.com/products/6-week-program-split" target="_blank" rel="noopener noreferrer"
                                        className="w-full text-center bg-[#4A3B36] text-white text-[12px] font-semibold leading-none uppercase tracking-[0.1em] px-8 py-4 rounded-full hover:bg-[#332521] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                        2 Payments
                                   </a>
                              </motion.div>
                         </div>
                    </section>


                    {/* ── success modal ── */}
                    {showModal && (
                         <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                              <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
                              <div className="relative w-full max-w-sm rounded-xl bg-white p-10 text-center shadow-xl border border-[#D2C3BF]">
                                   <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1 text-[#4F4541]/40 hover:text-[#332521] transition-colors">
                                        <X size={18} />
                                   </button>
                                   <div className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF1EC]">
                                        <CheckCircle size={28} className="text-[#725853]" />
                                   </div>
                                   <h3 className="text-[24px] font-semibold text-[#332521] mb-2">You&rsquo;re on the List!</h3>
                                   <p className="text-[16px] leading-[1.6] text-[#4F4541] mb-6">
                                        Thank you for your interest in The Becoming. We&rsquo;ll notify you the moment doors open.
                                   </p>
                                   <button onClick={() => setShowModal(false)}
                                        className="w-full rounded-full bg-[#4A3B36] text-white text-[12px] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 hover:bg-[#332521] transition-all duration-300">
                                        Got it
                                   </button>
                              </div>
                         </div>
                    )}
               </main>
          </>
     );
}
