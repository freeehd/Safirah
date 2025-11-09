'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import BubbleMenu from '@/components/BubbleMenu';
import Footer from '@/components/Footer';
import BrushStrokeHighlight from '@/components/BrushStrokeHighlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, MapPin, Clock, Sparkles, Star } from 'lucide-react';

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
  date: string; // human string
  time: string; // e.g. "10:00–13:00 PKT"
  city: string; // e.g. "Islamabad • In-Person"
  mode: 'Online' | 'In-Person' | 'Hybrid';
  short: string;
};

const upcoming: EventItem[] = [
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

export default function EventsPage() {
  const fadeUp = useFadeUp();

  // Early-bird logic (Toronto time)
  const deadline = new Date('2025-11-15T23:59:59-05:00').getTime();
  const [nowMs, setNowMs] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const saleActive = nowMs < deadline;
  const fullPrice = 45;
  const salePrice = 35;
  const displayPrice = saleActive ? `$${salePrice}` : `$${fullPrice}`;
  const msRemaining = Math.max(0, deadline - nowMs);
  const d = Math.floor(msRemaining / (24*60*60*1000));
  const h = Math.floor((msRemaining % (24*60*60*1000)) / (60*60*1000));
  const m = Math.floor((msRemaining % (60*60*1000)) / (60*1000));
  const s = Math.floor((msRemaining % (60*1000)) / 1000);

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* soft backdrop blobs */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(252,213,206,0.55), transparent 60%)' }}
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
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
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
            <p className="font-lato text-lg leading-relaxed opacity-90 mt-4" style={{ color: pastel.text }}>
              Join a warm, faith-aligned space to build clarity, community, and momentum — online or in person.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED: Soulmate Workshop */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div
          {...fadeUp}
          className="rounded-3xl overflow-hidden shadow-lg ring-1 bg-white/80 backdrop-blur"
          style={{ borderColor: 'rgba(232,180,168,0.35)' }}
        >
          <div className="grid md:grid-cols-2">
            {/* Visual */}
            <div className="relative p-6 md:p-8" style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}>
              <div
                className="absolute -inset-5 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${pastel.subtle}, transparent)` }}
              />
              <div
                className="h-full w-full rounded-2xl bg-white/70 backdrop-blur ring-1 p-4 sm:p-6 grid gap-4"
                style={{ borderColor: 'rgba(232,180,168,0.28)' }}
              >
                <ImagePlaceholder ratio="16/9" />
                <div className="flex items-center gap-2">
                  <Badge><Star className="h-3.5 w-3.5" /> New</Badge>
                  <Badge>Women-First</Badge>
                  <Badge>Faith-Aligned</Badge>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="p-6 md:p-10">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-sm mb-3"
                style={{ borderColor: 'rgba(232,180,168,0.35)', color: pastel.text }}
              >
                <Sparkles className="h-4 w-4" /> Soulmate — Featured Workshop
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl" style={{ color: pastel.text }}>
              Soulmate Workshop 
              </h2>
              <p className="font-lato mt-3 opacity-90" style={{ color: pastel.text }}>
                Not a dating class — a self‑rescue mission to stop outsourcing happiness and build unshakeable inner strength.
              </p>

              <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm font-lato">
                <InfoPill icon={<CalendarDays className="h-4 w-4" />} text={`Early‑bird ends Nov 15 (Toronto time)`} />
                <InfoPill icon={<Clock className="h-4 w-4" />} text="2–3 hours • Live" />
                <InfoPill icon={<MapPin className="h-4 w-4" />} text="Toronto, Canada • In‑Person" />
              </div>

              {/* Price + countdown */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1"
                     style={{ borderColor: 'rgba(232,180,168,0.35)', backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}>
                  <span className="text-sm"><s>$45</s> <strong>{displayPrice}</strong></span>
                  {saleActive && (
                    <span className="text-xs opacity-80">• {d}d {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</span>
                  )}
                </div>

                <Button asChild className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}>
                  <Link href="https:/shop.hirahsaficoach.com/products/soulmate-workshop-tickets">Buy Now — {displayPrice}</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-full px-6 h-11 border-2"
                        style={{ borderColor: pastel.accent, color: pastel.text }}>
                  <Link href="/events/soulmate-workshop">See Full Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* UPCOMING WORKSHOPS */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <h3 className="font-playfair text-2xl md:text-3xl" style={{ color: pastel.text }}>
            Upcoming Workshops
          </h3>
          <div className="flex items-center gap-2">
            <Badge>TBA</Badge>
            <Badge>Online</Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {upcoming.map((ev) => (
            <EventCard key={ev.slug} ev={ev} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${container} ${sectionY}`}>
        <Card className="border-0 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-8 bg-white">
              <h4 className="font-playfair text-3xl mb-3" style={{ color: pastel.text }}>
                Be first to know about new dates
              </h4>
              <p className="font-lato opacity-90 mb-6" style={{ color: pastel.text }}>
                Join the events list and get priority access when Soulmate and other workshops open.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full px-6 transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}
                >
                  <Link href="/waitlist">Join the Events List →</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 border-2"
                  style={{ borderColor: pastel.accent, color: pastel.text }}
                >
                  <Link href="/services">See Coaching & Tiers</Link>
                </Button>
              </div>
            </div>
            <div className="relative p-8" style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}>
              <div
                className="absolute -inset-5 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${pastel.subtle}, transparent)` }}
              />
              <div
                className="h-full w-full rounded-2xl bg-white/70 backdrop-blur grid place-items-center text-center p-6 ring-1"
                style={{ borderColor: 'rgba(232,180,168,0.28)' }}
              >
                <div className="font-playfair text-2xl" style={{ color: pastel.text }}>
                  “Clarity, community, and consistency.”
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Separator className="opacity-0" />
      <Footer />
    </div>
  );
}

/* ——— components ——— */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1"
      style={{ color: pastel.text, backgroundColor: 'rgba(232,180,168,0.10)', borderColor: 'rgba(232,180,168,0.35)' }}
    >
      {children}
    </div>
  );
}

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full px-3 py-2 text-xs ring-1 bg-white/70 backdrop-blur"
      style={{ borderColor: 'rgba(232,180,168,0.28)', color: pastel.text }}
    >
      {icon} <span>{text}</span>
    </div>
  );
}

function EventCard({ ev }: { ev: EventItem }) {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card
        className="rounded-3xl border-0 shadow-md hover:shadow-lg transition-shadow ring-1 overflow-hidden bg-white/85 backdrop-blur"
        style={{ borderColor: 'rgba(232,180,168,0.28)' }}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#fde2e4] to-white" />
        <CardHeader className="pb-2">
          <CardTitle className="font-playfair text-xl" style={{ color: pastel.text }}>
            {ev.title}
          </CardTitle>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-lato opacity-90" style={{ color: pastel.text }}>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> {ev.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> {ev.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {ev.city}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <ImagePlaceholder ratio="16/9" /> */}
          <p className="font-lato text-sm opacity-90" style={{ color: pastel.text }}>
            {ev.short}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ImagePlaceholder({ ratio = '4/3' }: { ratio?: '1/1' | '4/3' | '16/9' }) {
  const paddingMap: Record<string, string> = { '1/1': 'pb-[100%]', '4/3': 'pb-[75%]', '16/9': 'pb-[56.25%]' };
  return (
    <div
      className={`relative w-full ${paddingMap[ratio]} rounded-2xl overflow-hidden group border shadow-sm bg-white/70 backdrop-blur`}
      style={{ borderColor: 'rgba(232,180,168,0.35)' }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        (e.currentTarget as HTMLElement).style.setProperty('--x', x + '%');
        (e.currentTarget as HTMLElement).style.setProperty('--y', y + '%');
      }}
    >
      <div className="absolute inset-0 grid place-items-center text-sm opacity-80" style={{ color: pastel.text }}>
        <img src="/assets/8.webp" alt="Hirah Safi, life and success coach" className="w-full h-full object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'radial-gradient(160px 160px at var(--x,50%) var(--y,50%), rgba(232,180,168,0.25), transparent 70%)' }}
      />
    </div>
  );
}