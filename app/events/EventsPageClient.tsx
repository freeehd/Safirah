'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import BrushStrokeHighlight from '@/components/BrushStrokeHighlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, MapPin, Clock, Sparkles, Star, Monitor } from 'lucide-react';

const pastel = {
  accent: 'var(--highlight-color, #e8b4a8)',
  text: 'var(--text-color, #57534E)',
  subtle: 'var(--subtle-accent, #FCD5CE)'
};

const container = 'mx-auto max-w-7xl px-5 sm:px-8';
const sectionY = 'py-14 md:py-20';

function useFadeUp() {
  const prefersReduced = useReducedMotion();
  return {
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: prefersReduced ? 0 : 0.6, ease: 'easeOut' }
  } as const;
}

type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  city: string;
  mode: 'Online' | 'In-Person' | 'Hybrid';
  short: string;
};

const upcoming: EventItem[] = [
  {
    slug: '6-week-program',
    title: '6-Week Program',
    date: 'Coming Soon',
    time: 'TBA',
    city: 'TBA',
    mode: 'TBA',
    short: 'A transformative 6-week journey to realign your life, career, and Deen — crafted with intention and care. Join the waitlist for early access and exclusive bonuses.'
  },
  {
    slug: 'vision-clarity-lab',
    title: 'Vision & Clarity Lab',
    date: 'TBA',
    time: 'TBA',
    city: 'Online • Zoom',
    mode: 'Online',
    short: 'A gentle deep-dive to map goals, values and next steps without overwhelm.'
  },
  {
    slug: 'boundaries-with-barakah',
    title: 'Boundaries with Barakah',
    date: 'TBA',
    time: 'TBA',
    city: 'Online • Zoom',
    mode: 'Online',
    short: 'Learn loving limits, nervous-system friendly planning, and sustainable pace.'
  },
  {
    slug: 'pricing-with-peace',
    title: 'Pricing with Peace',
    date: 'TBA',
    time: 'TBA',
    city: 'Online • Zoom',
    mode: 'Online',
    short: 'Step into authority, price with confidence, and hold value with softness.'
  }
];

const past: EventItem[] = [
  {
    slug: 'resilient-workshop',
    title: 'Resilient Workshop',
    date: 'Jan 31 & Feb 1, 2026',
    time: 'Ended',
    city: 'Toronto & Online',
    mode: 'Hybrid',
    short: 'A sacred space for connection, mindset mastery, and spiritual alignment. Shed the weight of isolation and find your lifelong sisterhood.'
  },
  {
    slug: 'soulmate-workshop',
    title: 'Soulmate Workshop',
    date: 'Nov 29 & 30, 2025',
    time: 'Ended',
    city: 'Toronto & Online',
    mode: 'Hybrid',
    short: 'Not a dating class — a self-rescue mission to stop outsourcing happiness and build unshakeable inner strength.'
  }
];

export default function EventsPageClient() {
  const fadeUp = useFadeUp();

  return (
    <div className="page-wrapper min-h-screen">
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY} pb-0`}>
        <motion.div
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(232,180,168,0.55), transparent 60%)' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-10 h-80 w-80 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(250,210,225,0.5), transparent 65%)' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className={container}>
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-4">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm"
              style={{ borderColor: pastel.accent, backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
              <span>Upcoming Events & Workshops</span>
            </div>
            <h1
              className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mt-4"
              style={{ color: pastel.text }}
            >
              Discover{' '}
              <BrushStrokeHighlight height="0.9em" waveWidthPercent={60} animationDuration="28s" blurred>
                your next step
              </BrushStrokeHighlight>
            </h1>
            <p className="font-lato text-lg sm:text-xl leading-relaxed opacity-90 mt-6" style={{ color: pastel.text }}>
              Join a warm, faith-aligned space to build clarity, community, and momentum — online or in person.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED: The Golden Pearl */}
      <section className={`${container} ${sectionY} pt-10`}>
        <motion.div
          {...fadeUp}
          className="rounded-[3rem] overflow-hidden shadow-2xl ring-1 bg-white/40 backdrop-blur-xl border-t-2"
          style={{ borderColor: 'rgba(212, 175, 55, 0.3)', borderTopColor: '#D4AF37' }}
        >
          <div className="grid lg:grid-cols-2">
            {/* Visual Side */}
            <div className="relative p-8 lg:p-12 overflow-hidden flex items-center justify-center min-h-[420px]" style={{ background: 'linear-gradient(135deg, #F5EAC8 0%, #EAD7A1 100%)' }}>
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at center, #9C7A1A 0%, transparent 70%)' }}
              />
              <div className="relative z-10 w-full group">
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                <ImagePlaceholder ratio="16/9" src="/assets/golden-pearl.webp" />
                <div className="absolute -bottom-4 -left-4 flex flex-col gap-2 scale-90 sm:scale-100">
                  <Badge><Sparkles className="h-3.5 w-3.5 text-yellow-600" /> Now Registering</Badge>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-14 flex flex-col justify-center gap-6 bg-white/40 backdrop-blur-sm">
              <div className="space-y-4">
                <Badge className="bg-yellow-100/50 text-yellow-800 border-yellow-200">
                  <Star className="h-4 w-4 fill-yellow-600 text-yellow-600" />
                  Featured Event
                </Badge>

                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter text-stone-900">
                  The <span className="text-yellow-700">Golden Pearl</span>
                </h2>

                <p className="font-lato text-xl opacity-80 leading-relaxed text-stone-800 font-medium">
                  Volume 3: Step into your brilliance. Find financial abundance while keeping your peace and Deen intact. This is the sanctuary you've been praying for.
                </p>
              </div>

              {/* Event Date / Time / Location */}
              <div
                className="rounded-2xl border-2 px-6 py-5 flex flex-col sm:flex-row gap-5 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-yellow-300/50"
                style={{ borderColor: '#D4AF37', background: 'linear-gradient(135deg, rgba(245,234,200,0.6) 0%, rgba(255,255,255,0.85) 100%)' }}
              >
                {/* Date */}
                <div className="flex flex-col gap-0.5 sm:pr-6 pb-4 sm:pb-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-700">📅 Date</span>
                  <strong className="font-playfair text-2xl font-bold leading-tight text-stone-900">Thursday</strong>
                  <strong className="font-playfair text-xl font-bold" style={{ color: '#9C7A1A' }}>May 21</strong>
                </div>
                {/* Time */}
                <div className="flex flex-col gap-0.5 sm:px-6 pb-4 sm:pb-0 pt-4 sm:pt-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-700">🕞 Time</span>
                  <strong className="font-playfair text-2xl font-bold leading-tight text-stone-900">3:30 PM</strong>
                  <strong className="font-lato text-base font-bold text-stone-700">to 6:30 PM</strong>
                </div>
                {/* Location */}
                <div className="flex flex-col gap-0.5 sm:pl-6 pt-4 sm:pt-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-700">📍 Location</span>
                  <strong className="font-playfair text-xl font-bold leading-snug text-stone-900">200 St James King St E</strong>
                  <strong className="font-lato text-base font-bold" style={{ color: '#9C7A1A' }}>Toronto Downtown</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-stone-200/50 py-6">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-widest text-yellow-800 font-bold opacity-60">Venue / Access</div>
                  <div className="font-playfair text-lg font-bold text-stone-900">Online & Local</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-widest text-yellow-800 font-bold opacity-60">Investment</div>
                  <div className="font-playfair text-lg font-bold text-stone-900">FREE Admission</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full px-10 h-14 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] hover:shadow-gold-xl"
                  style={{ backgroundColor: '#9C7A1A', color: '#fff' }}
                >
                  <Link href="/events/golden-pearl">Register Now →</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-10 h-14 text-lg font-bold border-2 transition-all hover:bg-stone-50"
                  style={{ borderColor: '#D4AF37', color: '#4A3B22' }}
                >
                  <Link href="/events/golden-pearl#details">Explore Experience</Link>
                </Button>
              </div>

              <div className="text-xs opacity-50 font-medium italic">✨ Seats are limited. Registration is strictly required for entry.</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* UPCOMING WORKSHOPS */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <h3 className="font-playfair text-3xl md:text-4xl font-bold" style={{ color: pastel.text }}>
            Upcoming Workshops
          </h3>
          <div className="flex items-center gap-3">
            <Badge className="bg-stone-100 text-stone-600 border-stone-200">Coming Soon</Badge>
            <Badge className="bg-stone-100 text-stone-600 border-stone-200">Online</Badge>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {upcoming.map((ev) => (
            <EventCard key={ev.slug} ev={ev} />
          ))}
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8 border-t border-stone-200/50 pt-12">
          <h3 className="font-playfair text-3xl md:text-4xl font-bold" style={{ color: pastel.text }}>
            Past Events
          </h3>
          <p className="font-lato opacity-60 italic">Memories from our previous sessions</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {past.map((ev) => (
            <EventCard key={ev.slug} ev={ev} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${container} ${sectionY}`}>
        <Card className="border-0 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-stone-200/50">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-10 sm:p-14 bg-white/80 backdrop-blur">
              <h4 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: pastel.text }}>
                Be first to know about new dates
              </h4>
              <p className="font-lato text-lg opacity-80 mb-8 max-w-xl" style={{ color: pastel.text }}>
                Join our community list and get priority access and special gifts when new workshops open.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full px-8 h-12 text-base font-bold transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}
                >
                  <Link href="/waitlist">Join the Events List →</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base font-bold border-2"
                  style={{ borderColor: pastel.accent, color: pastel.text }}
                >
                  <Link href="/services">See Coaching & Tiers</Link>
                </Button>
              </div>
            </div>
            <div className="relative p-10 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}>
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(center, ${pastel.subtle}, transparent)` }}
              />
              <div
                className="relative z-10 w-full rounded-3xl bg-white/70 backdrop-blur-md grid place-items-center text-center p-8 ring-1 border shadow-lg"
                style={{ borderColor: 'rgba(232,180,168,0.3)', color: pastel.text }}
              >
                <div className="font-playfair text-2xl italic leading-relaxed">
                  &quot;Clarity, community, and consistency.&quot;
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Separator className="opacity-0 h-10" />
      <Footer />
    </div>
  );
}

/* ——— components ——— */
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide ring-1 shadow-sm ${className}`}
      style={{ color: pastel.text, backgroundColor: 'rgba(255,255,255,0.85)', borderColor: 'rgba(232,180,168,0.35)' }}
    >
      {children}
    </div>
  );
}

function EventCard({ ev }: { ev: EventItem }) {
  const isTBA = ev.date === 'TBA';
  const isEnded = ev.time === 'Ended';

  const content = (
    <Card
      className={`rounded-[2rem] border-0 shadow-lg transition-all ring-1 overflow-hidden bg-white/90 backdrop-blur group ${!isTBA ? 'hover:shadow-2xl hover:-translate-y-2' : ''
        }`}
      style={{ borderColor: 'rgba(232,180,168,0.2)' }}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${isEnded ? 'from-stone-200 to-stone-300' : 'from-[#F5EAC8] to-[#D4AF37]'}`} />
      <CardHeader className="pb-3 border-b border-stone-100/50">
        <CardTitle className="font-playfair text-2xl group-hover:text-yellow-800 transition-colors" style={{ color: pastel.text }}>
          {ev.title}
        </CardTitle>
        <div
          className="mt-3 grid gap-2 text-sm font-lato opacity-80"
          style={{ color: pastel.text }}
        >
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 opacity-50" /> {ev.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 opacity-50" /> {ev.time}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 opacity-50" /> {ev.city}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-6">
        <p className="font-lato text-base opacity-90 leading-relaxed" style={{ color: pastel.text }}>
          {ev.short}
        </p>
        {(!isTBA && !isEnded) && (
          <div className="pt-2 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all group-hover:gap-3" style={{ color: '#9C7A1A' }}>
            Explore Session <Sparkles size={14} />
          </div>
        )}
        {isEnded && (
          <div className="pt-2 text-xs font-bold uppercase tracking-widest text-stone-400">
            Session Completed
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <motion.div whileHover={!isTBA ? { scale: 1.01 } : {}}>
      {isTBA ? content : <Link href={`/events/${ev.slug}`}>{content}</Link>}
    </motion.div>
  );
}

function ImagePlaceholder({ ratio = '4/3', src }: { ratio?: '1/1' | '4/3' | '16/9'; src?: string }) {
  const paddingMap: Record<string, string> = { '1/1': 'pb-[100%]', '4/3': 'pb-[75%]', '16/9': 'pb-[56.25%]' };
  return (
    <div
      className={`relative w-full ${paddingMap[ratio]} rounded-[2rem] overflow-hidden group border shadow-xl bg-white/70 backdrop-blur`}
      style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        (e.currentTarget as HTMLElement).style.setProperty('--x', x + '%');
        (e.currentTarget as HTMLElement).style.setProperty('--y', y + '%');
      }}
    >
      <div className="absolute inset-0 bg-stone-100 grid place-items-center">
        <img
          src={src || "/assets/8.webp"}
          alt="Hirah Safi coaching workshop - Faith-aligned women's empowerment event"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            'radial-gradient(200px 200px at var(--x,50%) var(--y,50%), rgba(212, 175, 55, 0.15), transparent 70%)'
        }}
      />
    </div>
  );
}
