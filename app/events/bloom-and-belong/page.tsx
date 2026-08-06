'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Fraunces, Cormorant_Garamond, Alex_Brush } from 'next/font/google';
import {
  ArrowRight, Calendar, Clock, Flower2, Heart, Leaf, Loader2, Mail, MapPin,
  Sparkles, Sprout, Ticket, Users, X
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
  { icon: Flower2,   title: 'Build bouquets for one another',       desc: 'Fresh flowers in your hands. You build one for her while she builds one for you — you leave with the one she made for you.' },
  { icon: Users,     title: 'Sit in real community',                 desc: 'A circle, not a crowd — women who are further along than "having it all figured out," just like you.' },
  { icon: Sparkles,  title: 'Gentle mindful coaching moments',       desc: 'Simple coaching designed to loosen a stuck mindset — no pressure, no performing.' },
  { icon: Mail,      title: 'A handwritten message made for you',    desc: 'A custom note written just for you, to hold onto long after the afternoon ends.' },
];

const details = [
  { icon: Calendar, label: 'Date',       value: 'Thursday, August 27',        sub: '3:30 PM – 7:00 PM' },
  { icon: MapPin,   label: 'Location',   value: 'SA Room 303, Limberlost Bldg', sub: 'George Brown College · 185 Queens Quay E, Toronto' },
  { icon: Ticket,   label: 'Investment', value: '$25',                          sub: 'Refreshments & flowers included' },
];

/* ─── Register Interest Panel ─── */
const KIT_FORM_ID = '8738698';

function ReservePanel() {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'done'>('idle');

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:new URLSearchParams({ email_address:email, 'fields[full_name]':name }).toString(),
      });
    } catch { /* Kit returns an opaque response — treat as sent */ }
    setStatus('done');
  };

  return (
    <motion.div
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ duration:0.7, ease:EASE }}
      className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl p-8 sm:p-10"
      style={{ backgroundColor:`${C.white}F5`, borderColor:`${C.tan}50`, backdropFilter:'blur(16px)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2.5rem]" style={{ background:`linear-gradient(90deg, ${C.blush}, ${C.mauve}, ${C.tan})` }} />

      <div className="text-center space-y-3 mb-8">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-1.5 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.blush}90`, border:`1px solid ${C.tan}50` }}>
          <Heart size={12} /> Intentionally Limited Circle
        </span>
        <h2 className={`${cormorant.className} text-4xl sm:text-5xl font-semibold italic`} style={{ color:C.cocoa }}>
          Register <span style={{ color:C.mauve }}>Interest</span>
        </h2>
        <p className="text-sm leading-relaxed" style={{ color:C.body }}>
          No payment now — just tell us you&apos;re coming. The details to secure your seat arrive by email.
        </p>
      </div>

      {status === 'done' ? (
        <div className="text-center py-8 space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor:`${C.blush}90`, color:C.mauve }}>
            <Flower2 size={24} />
          </div>
          <h3 className={`${cormorant.className} italic font-semibold text-3xl`} style={{ color:C.cocoa }}>
            You&apos;re on the list, sister. 🌸
          </h3>
          <p className="text-sm leading-relaxed" style={{ color:C.body }}>
            Watch your inbox — the next step is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={register} className="space-y-4">
          {[
            { label:'Full Name',      type:'text',  val:name,  set:setName,  ph:'Your full name' },
            { label:'Email Address',  type:'email', val:email, set:setEmail, ph:'your.email@example.com' },
          ].map(({ label, type, val, set, ph }) => (
            <div key={label}>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1" style={{ color:C.mauve }}>{label}</label>
              <input type={type} required value={val} onChange={e => set(e.target.value)} placeholder={ph}
                className="w-full px-5 py-4 rounded-2xl bg-white/90 border outline-none transition-all focus:ring-2 focus:ring-[#8E7687]/40 text-base"
                style={{ borderColor:C.border, color:C.cocoa }} />
            </div>
          ))}
          <button type="submit" disabled={status==='loading'}
            className={`${cormorant.className} w-full rounded-full py-5 font-bold text-xl italic text-white shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2`}
            style={{ background:`linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})`, boxShadow:`0 14px 40px -10px ${rgba(C.mauve,0.55)}` }}
          >
            {status==='loading'
              ? <span className="inline-flex items-center gap-2"><Loader2 size={18} className="animate-spin not-italic" /> Sending…</span>
              : <span className="inline-flex items-center gap-2">Register Interest <ArrowRight size={17} className="not-italic" /></span>}
          </button>
          <div className="flex items-center justify-center gap-2 text-xs opacity-70 pt-1" style={{ color:C.body }}>
            <Mail size={13} style={{ color:C.mauve }} />
            <span>No payment now — reserve through the link we&apos;ll email you</span>
          </div>
        </form>
      )}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function BloomBelongPage() {
  const fadeUp = useFadeUp();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 9000);
    return () => clearTimeout(t);
  }, []);


  return (
    <div className="min-h-screen font-sans selection:bg-[#EDD4CF]" style={{ backgroundColor:C.ivory }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[800px] sm:min-h-[900px] flex items-center justify-center overflow-hidden py-20 md:py-32 px-5 md:px-16" style={{ backgroundColor:C.ivory }}>

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
          background:`linear-gradient(180deg, ${rgba(C.ivory,0.15)} 0%, ${rgba(C.blush,0.25)} 55%, ${C.ivory} 100%)`
        }} />

        {/* Floating petal emojis — varied sizes, positions, speeds */}
        {[
          { emoji:'🌸', left:'8%',  top:'12%', size:28, dur:8,  delay:0 },
          { emoji:'🌷', left:'18%', top:'62%', size:22, dur:11, delay:1.2 },
          { emoji:'🌺', left:'78%', top:'10%', size:32, dur:9,  delay:0.4 },
          { emoji:'🌸', left:'88%', top:'55%', size:20, dur:13, delay:2.1 },
          { emoji:'🌿', left:'35%', top:'8%',  size:18, dur:10, delay:0.8 },
          { emoji:'🌷', left:'65%', top:'72%', size:26, dur:12, delay:1.7 },
          { emoji:'🌸', left:'52%', top:'82%', size:16, dur:7,  delay:3.0 },
          { emoji:'🌺', left:'5%',  top:'40%', size:24, dur:14, delay:0.2 },
          { emoji:'🌿', left:'92%', top:'30%', size:20, dur:9,  delay:2.5 },
          { emoji:'🌸', left:'42%', top:'5%',  size:30, dur:11, delay:1.0 },
          { emoji:'🌷', left:'72%', top:'88%', size:18, dur:8,  delay:3.5 },
          { emoji:'🌺', left:'25%', top:'85%', size:22, dur:10, delay:0.6 },
        ].map((p, i) => (
          <motion.div key={i} className="absolute pointer-events-none z-10 select-none"
            style={{ left:p.left, top:p.top, fontSize:p.size }}
            animate={{ y:[0, -(12+i*2), 8, 0], rotate:[0, i%2?15:-15, 5, 0], opacity:[0.35,0.7,0.45,0.35], scale:[1,1.1,0.95,1] }}
            transition={{ duration:p.dur, repeat:Infinity, ease:'easeInOut', delay:p.delay }}
          >
            {p.emoji}
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div className="relative z-10 max-w-[860px] w-full mx-auto text-center"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6 }}
        >
          {/* Eyebrow */}
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease:EASE, delay:0.1 }} className="mb-5">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] px-6 py-2.5 rounded-full backdrop-blur-md shadow-sm"
              style={{ color:C.cocoa, backgroundColor:`${C.white}95`, border:`1px solid ${C.tan}55` }}>
              <Sparkles size={12} style={{ color:C.mauve }} />
              A Flower Circle Afternoon · Toronto
            </span>
          </motion.div>

          {/* Main headline — Alex Brush, two-line editorial layout */}
          <motion.div
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, ease:EASE, delay:0.22 }}
            className="mb-7"
          >
            <div
              className={`${alexBrush.className} block leading-[0.9]`}
              style={{ fontSize:'clamp(5rem,15vw,12rem)', color:C.cocoa }}
            >
              Bloom <span style={{ color:C.mauve }}>&amp;</span>
            </div>
            <div
              className={`${alexBrush.className} block leading-[0.9]`}
              style={{ fontSize:'clamp(5rem,15vw,12rem)', color:C.cocoa, marginTop:'-0.1em' }}
            >
              Belong
            </div>
          </motion.div>

          {/* Sub-script decorative tag */}
          <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }} transition={{ duration:0.9, ease:EASE, delay:0.38 }}
            className="flex items-center justify-center gap-3 mb-7"
          >
            <div className="h-px w-16" style={{ background:`linear-gradient(to right, transparent, ${C.tan}80)` }} />
            <span className={`${cormorant.className} italic text-xl sm:text-2xl font-semibold`} style={{ color:C.deepMauve }}>🌸 August 27, 2025</span>
            <div className="h-px w-16" style={{ background:`linear-gradient(to left, transparent, ${C.tan}80)` }} />
          </motion.div>

          {/* Hook */}
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.85, ease:EASE, delay:0.45 }}
            className={`${fraunces.className} text-2xl sm:text-[1.7rem] md:text-[2rem] max-w-[720px] mx-auto mb-10 font-normal leading-[1.5]`}
            style={{ color:C.cocoa }}
          >
            You keep waiting to feel ready.{' '}
            <span className="italic font-medium" style={{ color:C.deepMauve }}>What if you just felt held instead?</span>
          </motion.p>

          {/* Meta tags — cute pill badges */}
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease:EASE, delay:0.58 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap"
          >
            {[
              { emoji:'🗓️', text:'Aug 27' },
              { emoji:'🕒', text:'3:30 – 7 PM' },
              { emoji:'📍', text:'Toronto' },
              { emoji:'🌸', text:'Only $25', highlight: true },
            ].map((tag, i) => (
              <motion.span key={i}
                whileHover={{ scale:1.06, y:-2 }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full backdrop-blur-md cursor-default select-none"
                style={{
                  color: tag.highlight ? C.white : C.cocoa,
                  backgroundColor: tag.highlight ? C.mauve : `${C.white}92`,
                  border: tag.highlight ? `1.5px solid ${rgba(C.deepMauve,0.4)}` : `1.5px solid ${rgba(C.blush,0.9)}`,
                  boxShadow: tag.highlight
                    ? `0 6px 20px -4px ${rgba(C.mauve,0.45)}, inset 0 1px 0 rgba(255,255,255,0.2)`
                    : `0 4px 14px -4px ${rgba(C.mauve,0.12)}, inset 0 1px 0 rgba(255,255,255,0.8)`,
                  letterSpacing:'0.03em',
                }}
              >
                <span>{tag.emoji}</span>
                {tag.text}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.85, ease:EASE, delay:0.72 }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://shop.hirahsaficoach.com/products/bloom-belong-workshop" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl leading-none px-8 sm:px-10 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:C.deepMauve,
                  boxShadow:`0 10px 30px -12px ${rgba(C.deepMauve,0.5)}`,
                }}
              >
                <span className="text-lg" aria-hidden>🌸</span>
                Reserve My Seat — $25
                <ArrowRight size={17} />
              </a>
              <a href="#what-it-is"
                className="inline-flex items-center gap-2.5 font-semibold text-lg sm:text-xl leading-none px-8 sm:px-10 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  color:C.deepMauve,
                  backgroundColor:`${C.white}90`,
                  border:`1.5px solid ${C.deepMauve}`,
                }}
              >
                <Sprout size={17} />
                See What&apos;s Included
              </a>
            </div>
            <p className="mt-4 text-xs sm:text-sm font-semibold" style={{ color:C.deepMauve }}>✨ Secure checkout · Receipt emailed instantly</p>
          </motion.div>

          {/* Small circle note */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1, duration:0.8 }}
            className="flex items-center justify-center gap-2 mt-9 text-sm" style={{ color:C.body }}
          >
            <span className="inline-flex -space-x-1.5">
              {[C.tan, C.blush, C.mauve, C.deepMauve].map((bg,i) => (
                <span key={i} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor:bg }} />
              ))}
            </span>
            <span className="italic font-medium">Spaces are intentionally small — limited to a real circle, not a crowd.</span>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5, duration:0.6 }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color:`${C.muted}80` }}>Scroll</span>
          <motion.div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor:`${C.mauve}50` }}
            animate={{ y:[0,4,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
          >
            <div className="w-1 h-1.5 rounded-full" style={{ backgroundColor:C.mauve }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ THE BOUQUET EXCHANGE ════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 px-5 md:px-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at 82% 18%, ${rgba(C.blush,0.55)} 0%, transparent 58%), radial-gradient(ellipse at 8% 92%, ${rgba(C.tan,0.32)} 0%, transparent 55%)` }} />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            className="relative w-full md:w-[46%] flex-shrink-0"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ border:`2px solid ${C.tan}40` }}>
              <Image src="/assets/flower1.webp" alt="Bloom & Belong — arranging flowers together" fill className="object-cover" sizes="(max-width:768px) 100vw,46vw" />
            </div>
            <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.6, ease:EASE, delay:0.2 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 w-32 sm:w-40 aspect-square rounded-3xl overflow-hidden shadow-xl rotate-3"
              style={{ border:`2px solid ${C.white}` }}
            >
              <Image src="/assets/flower2.webp" alt="A finished bouquet from Bloom & Belong" fill className="object-cover" sizes="160px" />
            </motion.div>
            <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.6, ease:EASE, delay:0.3 }}
              className="absolute -top-6 -left-4 sm:-left-6 w-24 sm:w-32 aspect-square rounded-3xl overflow-hidden shadow-xl -rotate-3"
              style={{ border:`2px solid ${C.white}` }}
            >
              <Image src="/assets/bouqutes.webp" alt="Bouquets from Bloom & Belong" fill className="object-cover" sizes="128px" />
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease:EASE, delay:0.1 }}
            className="flex-1 text-center md:text-left space-y-5"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.white}90`, border:`1px solid ${C.tan}40` }}>
              <Flower2 size={12} /> The Heart of the Afternoon
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-6xl leading-tight`} style={{ color:C.cocoa }}>
              You build one for her. <span className="block font-light not-italic" style={{ color:C.mauve }}>She builds one for you.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color:C.body }}>
              The centerpiece of the afternoon: real flowers in your hands. You make a bouquet for the woman beside you while she makes one for you — then you swap, and you leave holding the one she made.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-1">
              {[
                { e:'🌷', t:'Build hers' },
                { e:'🤝', t:'Swap' },
                { e:'💐', t:'Keep yours' },
              ].map((s,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-md" style={{ color:C.cocoa, backgroundColor:`${C.white}92`, border:`1.5px solid ${rgba(C.blush,0.9)}` }}>
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
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.blush}90`, border:`1px solid ${C.tan}40` }}>
            <Heart size={12} /> Does This Sound Familiar?
          </span>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color:C.body }}>
            You know the mindset you&apos;re stuck in. The one that says{' '}
            <span className={`${cormorant.className} italic font-semibold text-2xl md:text-3xl`} style={{ color:C.mauve }}>
              &ldquo;not yet, not enough, not now.&rdquo;
            </span>
            {' '}You&apos;ve read the books. Saved the reels. Told yourself this is the season you finally shift — and then the season passed anyway.
          </p>
          <h3 className={`${cormorant.className} italic font-semibold text-3xl sm:text-4xl md:text-5xl leading-snug`} style={{ color:C.cocoa }}>
            Growth doesn&apos;t happen in isolation.{' '}
            <span className="not-italic font-light block mt-1" style={{ color:C.mauve }}>It happens in a room.</span>
          </h3>
        </motion.div>
      </section>

      {/* ═══ WHAT IT IS ══════════════════════════════════════════════ */}
      <section id="what-it-is" className="py-20 md:py-28 px-5 md:px-16 rounded-[2.5rem] my-4 scroll-mt-24" style={{ backgroundColor:C.blush }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.white}90`, border:`1px solid ${C.tan}40` }}>
              <Flower2 size={12} /> What It Actually Is
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-6xl leading-tight`} style={{ color:C.cocoa }}>
              An afternoon for women tired of doing{' '}
              <span style={{ color:C.mauve }}>&ldquo;new year, new me&rdquo;</span>{' '}alone
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color:C.body }}>
              Real flowers in your hands. Real women around you — not an audience, not a comment section, a circle.
              You&apos;ll build a bouquet for someone else while she builds one for you, and somewhere in that grounding work,
              you&apos;ll loosen the mindset that&apos;s been keeping you small.
            </p>
          </motion.div>

          {/* 2-col photos */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {['bloom-event-2','bloom-event-3'].map((img,i) => (
              <motion.div key={img}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.7, ease:EASE, delay:i*0.12 }}
                className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl"
                style={{ border:`2px solid ${C.tan}35` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Bloom & Belong" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw,50vw" />
              </motion.div>
            ))}
          </div>
          {/* 3-col photos */}
          <div className="grid grid-cols-3 gap-4">
            {['bloom-event-4','bloom-event-5','bloom-event-7'].map((img,i) => (
              <motion.div key={img}
                initial={{ opacity:0, scale:0.94 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ duration:0.55, ease:EASE, delay:i*0.08 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
                style={{ border:`1px solid ${C.tan}30` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Bloom & Belong" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="33vw" />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <p className={`${fraunces.className} italic text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto`} style={{ color:C.cocoa }}>
              This isn&apos;t a networking event with a flower theme bolted on. It&apos;s mindset work disguised as making something beautiful —
              {' '}<span className="font-light" style={{ color:C.deepMauve }}>because that&apos;s often the only way real shifts happen.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHAT WE'LL DO ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 max-w-[1180px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.blush}90`, border:`1px solid ${C.tan}40` }}>
            <Sparkles size={12} /> What We&apos;ll Do Together
          </span>
          <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-6xl leading-tight`} style={{ color:C.cocoa }}>
            Not through more information.{' '}
            <span className="block font-light not-italic" style={{ color:C.mauve }}>Through something you feel in your body.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={i} {...fadeUp} transition={{ duration:0.5, delay:i*0.1 }}>
                <div className="group h-full p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{ backgroundColor:C.white, border:`1px solid ${C.border}`, boxShadow:`0 8px 30px -8px ${rgba(C.mauve,0.07)}` }}>
                  <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor:`${C.blush}90`, color:C.mauve }}>
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className={`${cormorant.className} italic font-semibold text-xl md:text-2xl leading-snug mb-3`} style={{ color:C.cocoa }}>{a.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:C.body }}>{a.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══ THE SPREAD ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 rounded-[2.5rem] my-4" style={{ backgroundColor:C.blush }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.white}90`, border:`1px solid ${C.tan}40` }}>
              <Heart size={12} /> The Spread
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-5xl`} style={{ color:C.cocoa }}>
              Come hungry —{' '}
              <span className="font-light not-italic" style={{ color:C.mauve }}>for more than the flowers</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color:C.body }}>
              A beautiful spread of refreshments is part of the afternoon — served like everything else here: generously, and in good company.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {['refreshments-1','refreshments-2','refreshments-3','refreshments-4'].map((img,i) => (
              <motion.div key={img}
                initial={{ opacity:0, scale:0.94 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ duration:0.6, ease:EASE, delay:i*0.08 }}
                className={`relative rounded-[2rem] overflow-hidden shadow-lg ${i%2===1?'md:mt-8':''}`}
                style={{ aspectRatio:'3/4', border:`1px solid ${C.tan}35` }}
              >
                <Image src={`/assets/${img}.jpeg`} alt="Refreshments" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw,25vw" />
              </motion.div>
            ))}
          </div>

          {/* Extra refreshments row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {['refreshments-5','refreshments-6','refreshments-7'].map((img,i) => (
              <motion.div key={img}
                initial={{ opacity:0, scale:0.94 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ duration:0.55, ease:EASE, delay:i*0.08 }}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-md"
                style={{ border:`1px solid ${C.tan}30` }}
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
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.blush}90`, border:`1px solid ${C.tan}40` }}>
              <Calendar size={12} /> The Details
            </span>
            <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-5xl`} style={{ color:C.cocoa }}>
              Everything you need to <span style={{ color:C.mauve }}>know</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {details.map((d,i) => {
              const Icon = d.icon;
              return (
                <motion.div key={i} {...fadeUp} transition={{ duration:0.5, delay:i*0.1 }}>
                  <div className="h-full text-center p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 shadow-md"
                    style={{ backgroundColor:C.white, border:`1px solid ${C.border}` }}>
                    <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor:`${C.blush}90`, color:C.mauve }}>
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color:C.mauve }}>{d.label}</div>
                    <div className={`${cormorant.className} italic font-semibold text-2xl leading-snug mb-1`} style={{ color:C.cocoa }}>{d.value}</div>
                    <div className="text-sm leading-relaxed" style={{ color:C.body }}>{d.sub}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center">
            <p className={`${fraunces.className} italic text-xl md:text-2xl max-w-2xl mx-auto`} style={{ color:C.cocoa }}>
              Spaces are intentionally small —{' '}
              <span className="font-light" style={{ color:C.mauve }}>this only works if the room stays a circle, not a crowd.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ COME AS YOU ARE ═════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-16 rounded-[2.5rem] my-4" style={{ backgroundColor:C.blush }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <motion.div
              initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ duration:0.7, ease:EASE }}
              className="relative w-full md:w-[42%] aspect-[3/4] rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl"
              style={{ border:`2px solid ${C.tan}40` }}
            >
              <Image src="/assets/hirah-1.jpeg" alt="Hirah Safi, lifestyle coach" fill className="object-cover" sizes="(max-width:768px) 100vw,42vw" />
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg" style={{ border:`1px solid ${C.tan}40` }}>
                <Flower2 size={18} style={{ color:C.mauve }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ duration:0.7, ease:EASE, delay:0.15 }}
              className="flex-1 text-center md:text-left space-y-5"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ color:C.mauve, backgroundColor:`${C.white}90`, border:`1px solid ${C.tan}40` }}>
                <Sparkles size={12} /> Come As You Are
              </span>
              <h2 className={`${cormorant.className} italic font-semibold text-4xl md:text-5xl leading-tight`} style={{ color:C.cocoa }}>
                Not the version of you who&apos;s <span style={{ color:C.mauve }}>&ldquo;finally figured it out&rdquo;</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color:C.body }}>
                Just as you are right now — a little stuck, a little tired of doing it alone, ready for something to shift.
              </p>
              <p className="text-base leading-relaxed" style={{ color:C.body }}>
                Leave with a full heart, a bouquet that isn&apos;t yours because you needed something to hold, and a community
                that remembers your name <em className={`${fraunces.className} italic`} style={{ color:C.mauve }}>after the flowers are gone.</em>
              </p>
              <p className={`${cormorant.className} italic font-semibold text-3xl md:text-4xl pt-2`} style={{ color:C.cocoa }}>
                We can&apos;t wait to <span style={{ color:C.mauve }}>bloom with you. 🌸</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ RESERVE + QR ════════════════════════════════════════════ */}
      <section id="reserve" className="py-20 md:py-28 px-5 md:px-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12 space-y-3">
            <h2 className={`${cormorant.className} italic font-semibold text-5xl md:text-6xl`} style={{ color:C.cocoa }}>
              Register Your <span style={{ color:C.mauve }}>Interest</span>
            </h2>
            <p className={`${fraunces.className} italic text-lg`} style={{ color:C.body }}>
              August 27 · Toronto · Spaces are limited
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <ReservePanel />

            {/* QR share card */}
            <motion.div
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.7, ease:EASE, delay:0.1 }}
              className="relative overflow-hidden rounded-[2.5rem] border p-8 sm:p-10 text-center shadow-xl"
              style={{ backgroundColor:`${C.white}95`, borderColor:`${C.tan}55`, backdropFilter:'blur(16px)' }}
            >
              <div className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color:C.mauve }}>Know a sister who needs this room?</div>
              <div className="mx-auto w-48 h-48 rounded-2xl overflow-hidden bg-white p-2 shadow-inner border" style={{ borderColor:C.border }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/qr-bloom-belong.png" alt="QR code" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs leading-relaxed mt-4 mb-5" style={{ color:C.body }}>
                Scan to open the page on any phone — or share the link directly.
              </p>
              <a href="/qr-bloom-belong.png" download="bloom-and-belong-qr.png"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-6 py-3.5 rounded-full transition-all hover:scale-[1.03]"
                style={{ color:C.mauve, backgroundColor:`${C.blush}90`, border:`1px solid ${C.tan}50` }}
              >
                Download QR Code
              </a>
              <div className="mt-6 pt-6 border-t" style={{ borderColor:`${C.border}80` }}>
                <p className="text-xs mb-1" style={{ color:C.body }}>Follow the journey</p>
                <p className={`${cormorant.className} italic font-semibold text-lg`} style={{ color:C.cocoa }}>@lifeandsuccesscoach</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY MOBILE BAR ═══════════════════════════════════════ */}
      <motion.div initial={{ y:80 }} animate={{ y:0 }} transition={{ delay:1.2, duration:0.6, ease:EASE }}
        className="md:hidden fixed bottom-5 left-5 right-5 z-50"
      >
        <a href="https://shop.hirahsaficoach.com/products/bloom-belong-workshop" target="_blank" rel="noopener noreferrer"
          className={`${cormorant.className} italic w-full rounded-full py-4 text-white font-bold text-xl shadow-2xl flex items-center justify-center gap-2`}
          style={{ background:`linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})`, border:'2px solid rgba(255,255,255,0.3)' }}
        >
          <Flower2 size={18} className="not-italic" /> Reserve My Seat — $25
        </a>
      </motion.div>

      {/* ═══ POPUP ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:60 }}
            transition={{ duration:0.5, ease:EASE }}
            className="fixed bottom-24 md:bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] z-[10000]"
          >
            <div className="relative rounded-[2rem] p-6 shadow-2xl"
              style={{ backgroundColor:`${C.white}FA`, border:`1px solid ${C.tan}55`, backdropFilter:'blur(16px)' }}
            >
              <button onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:rotate-90 transition-transform"
                style={{ color:C.muted }} aria-label="Close"
              ><X size={18} /></button>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor:`${C.blush}90`, color:C.mauve }}>
                  <Flower2 size={20} />
                </div>
                <div>
                  <h4 className={`${cormorant.className} italic font-semibold text-xl mb-1`} style={{ color:C.cocoa }}>
                    The circle is <span style={{ color:C.mauve }}>small.</span>
                  </h4>
                  <p className="text-xs leading-relaxed mb-3" style={{ color:C.body }}>
                    When the room fills, it fills. If this afternoon is meant for you, don&apos;t leave your seat for later.
                  </p>
                  <a href="https://shop.hirahsaficoach.com/products/bloom-belong-workshop" target="_blank" rel="noopener noreferrer" onClick={() => setShowPopup(false)}
                    className="inline-flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-2.5 rounded-full transition-transform hover:scale-[1.03] shadow-md"
                    style={{ background:`linear-gradient(135deg, ${C.mauve}, ${C.deepMauve})` }}
                  >
                    Reserve My Seat <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
