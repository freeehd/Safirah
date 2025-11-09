'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDays,
  MapPin,
  Clock,
  Star,
  Shield,
  Flame,
  Anchor,
  KeyRound,
  AlertTriangle,
  Camera
} from 'lucide-react';

const theme = {
  bg: '#f7f4f1',
  accent1: '#ecd9d2',
  accent2: '#E0c5bb',
  highlight: '#d29a89',
  text: '#57534E'
};

const container = 'mx-auto max-w-7xl px-5 sm:px-8';
const sectionY = 'py-14 md:py-20';

/* ---------- utils ---------- */
function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const bigint = parseInt(n, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function useFadeUp() {
  const prefersReduced = useReducedMotion();
  return {
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: prefersReduced ? 0 : 0.6, ease: 'easeOut' }
  } as const;
}

/* ---------- primitives ---------- */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1"
      style={{
        color: theme.text,
        backgroundColor: hexToRgba(theme.accent2, 0.15),
        borderColor: hexToRgba(theme.accent2, 0.4)
      }}
    >
      {children}
    </div>
  );
}

function ImagePlaceholder({
  ratio = '16/9',
  src
}: {
  ratio?: '1/1' | '4/3' | '16/9';
  src?: string;
}) {
  const paddingMap: Record<string, string> = {
    '1/1': 'pb-[100%]',
    '4/3': 'pb-[75%]',
    '16/9': 'pb-[56.25%]'
  };
  return (
    <div
      className={`relative w-full ${paddingMap[ratio]} rounded-2xl overflow-hidden group border shadow-sm bg-white/70 backdrop-blur`}
      style={{ borderColor: hexToRgba(theme.accent2, 0.35) }}
    >
      {src ? (
        <img
          src={src}
          alt="Soulmate Workshop hero"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center text-sm opacity-80 gap-2"
          style={{ color: theme.text }}
        >
          <Camera className="h-4 w-4" />
          <span>Add hero image for Soulmate workshop</span>
        </div>
      )}
    </div>
  );
}

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full px-3 py-2 text-xs ring-1 bg-white/70 backdrop-blur"
      style={{ borderColor: hexToRgba(theme.accent2, 0.28), color: theme.text }}
    >
      {icon} <span>{text}</span>
    </div>
  );
}

function VisionCard({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="rounded-2xl bg-white/90 backdrop-blur p-6 shadow-sm ring-1 h-full"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: hexToRgba(theme.accent2, 0.2), color: theme.text }}
          >
            {icon}
          </span>
          <div className="font-playfair text-xl" style={{ color: theme.text }}>
            {title}
          </div>
        </div>
        <div
          className="font-lato text-sm opacity-90 leading-relaxed"
          style={{ color: theme.text }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function CostCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="rounded-2xl bg-white/90 backdrop-blur p-6 shadow-sm ring-1 h-full"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <div className="flex items-start gap-3 mb-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
            style={{ backgroundColor: hexToRgba('#ff6b6b', 0.15), color: '#d63031' }}
            aria-hidden
          >
            {icon}
          </span>
          <div className="font-playfair text-xl" style={{ color: theme.text }}>
            {title}
          </div>
        </div>
        <div
          className="font-lato text-sm opacity-90 leading-relaxed"
          style={{ color: theme.text }}
        >
          {description}
        </div>
      </div>
    </motion.div>
  );
}

function TransformationStep({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="rounded-2xl bg-white/75 backdrop-blur p-6 shadow-sm ring-1 h-full"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <div className="flex items-start gap-3 mb-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 font-playfair text-lg font-semibold"
            style={{ backgroundColor: hexToRgba(theme.highlight, 0.2), color: theme.highlight }}
            aria-hidden
          >
            {number}
          </span>
          <div className="font-playfair text-xl" style={{ color: theme.text }}>
            {title}
          </div>
        </div>
        <div
          className="font-lato text-sm opacity-90 leading-relaxed"
          style={{ color: theme.text }}
        >
          {description}
        </div>
      </div>
    </motion.div>
  );
}

function Dot() {
  return (
    <span
      className="mt-1 inline-block h-2 w-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: theme.highlight }}
      aria-hidden
    />
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="min-w-[54px] px-2 py-2 rounded-xl ring-1 bg-white/85 backdrop-blur"
      style={{ borderColor: hexToRgba(theme.accent2, 0.35), color: theme.text }}
    >
      <div className="text-lg font-playfair leading-none text-center">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] uppercase tracking-wider opacity-70 text-center">
        {label}
      </div>
    </div>
  );
}

/* ---------- small composed bits ---------- */
function EarlyBirdChip({
  saleActive,
  fullPrice,
  displayPrice,
  d,
  h,
  m,
  s
}: {
  saleActive: boolean;
  fullPrice: number;
  displayPrice: string;
  d: number;
  h: number;
  m: number;
  s: number;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 mt-2"
      style={{
        borderColor: hexToRgba(theme.accent2, 0.45),
        backgroundColor: hexToRgba(theme.accent1, 0.15),
        color: theme.text
      }}
    >
      <span className="text-sm font-medium">Early-bird:</span>
      <span className="text-sm">
        <s>${fullPrice}</s> <strong>{displayPrice}</strong> until Nov 15, 11:59pm ET
      </span>
      {saleActive && (
        <span className="text-xs opacity-80" aria-hidden>
          • {d}d {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </span>
      )}
      {/* Screen-reader friendly static note to avoid tick-by-tick announcements */}
      <span className="sr-only">
        Early-bird price ends on November 15 at 11:59 pm Eastern Time.
      </span>
    </div>
  );
}

/* ---------- page ---------- */
export default function SoulmateWorkshopPage() {
  const fadeUp = useFadeUp();
  const prefersReduced = useReducedMotion();

  // Early-bird logic
  const deadline = new Date('2025-11-15T23:59:59-05:00').getTime(); // ET
  const [nowMs, setNowMs] = useState<number>(Date.now());

  useEffect(() => {
    // Respect reduced motion: update once per minute instead of per second
    const interval = prefersReduced ? 60_000 : 1_000;
    const id = setInterval(() => setNowMs(Date.now()), interval);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const saleActive = nowMs < deadline;
  const fullPrice = 45;
  const salePrice = 35;
  const displayPrice = saleActive ? `$${salePrice}` : `$${fullPrice}`;

  // Countdown helper
  const msRemaining = Math.max(0, deadline - nowMs);
  const d = Math.floor(msRemaining / (24 * 60 * 60 * 1000));
  const h = Math.floor((msRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((msRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const s = Math.floor((msRemaining % (60 * 1000)) / 1000);

  return (
    <div className="page-wrapper" style={{ backgroundColor: theme.bg }}>
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* backdrop blobs */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl -z-10"
          style={{ background: `radial-gradient(circle, ${hexToRgba(theme.accent2, 0.45)}, transparent 60%)` }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-10 h-80 w-80 rounded-3xl blur-3xl -z-10"
          style={{ background: `radial-gradient(circle, ${hexToRgba(theme.accent1, 0.45)}, transparent 65%)` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className={container}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div {...fadeUp} className="space-y-6">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm"
                style={{
                  borderColor: hexToRgba(theme.accent2, 0.45),
                  backgroundColor: hexToRgba(theme.accent2, 0.15),
                  color: theme.text
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: theme.highlight }}
                  aria-hidden
                />
                <span>VIP Workshop • Girls-Only Vibe</span>
              </div>

              <h1
                className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight"
                style={{ color: theme.text }}
              >
                The{' '}
                <span
                  className="relative inline-block px-2 rounded"
                  style={{
                    background: `linear-gradient(120deg, ${hexToRgba(theme.accent2, 0.4)} 0%, ${hexToRgba(
                      theme.accent1,
                      0.4
                    )} 100%)`
                  }}
                >
                  Soulmate
                </span>{' '}
                Workshop
              </h1>

              <p
                className="font-lato text-lg leading-relaxed opacity-90 max-w-prose"
                style={{ color: theme.text }}
              >
                This is <strong>not</strong> a dating class. It’s a <em>self-rescue mission</em> for ambitious women
                who are tired of feeling vulnerable and overwhelmed. We’ll expose the myth of the “rescue relationship,”
                end the habit of outsourcing happiness, and build the inner strength to become your own anchor.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 text-sm font-lato">
                <InfoPill icon={<CalendarDays className="h-4 w-4" />} text="Early-bird ends Nov 15" />
                <InfoPill icon={<Clock className="h-4 w-4" />} text="2–3 hours • Live" />
                <InfoPill icon={<MapPin className="h-4 w-4" />} text="Toronto, Canada" />
              </div>

              <EarlyBirdChip
                saleActive={saleActive}
                fullPrice={fullPrice}
                displayPrice={displayPrice}
                d={d}
                h={h}
                m={m}
                s={s}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                  <a
                    href="https://shop.hirahsaficoach.com/products/soulmate-workshop-tickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy ticket for the Soulmate Workshop at ${displayPrice}`}
                  >
                    Buy Now — {displayPrice}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 h-11 border-2"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                  onClick={() =>
                    document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  aria-label="Scroll to tickets"
                >
                  See Tickets
                </Button>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-50"
                style={{
                  background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)`
                }}
                aria-hidden
              />
              <Card
                className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/70 backdrop-blur"
                style={{ boxShadow: `0 10px 40px -8px ${hexToRgba('#000', 0.12)}` }}
              >
                <CardContent className="p-3">
                  <ImagePlaceholder src="/assets/soulmate.webp" />
                </CardContent>
              </Card>
              <div className="mt-3 flex items-center gap-2">
                <Badge>
                  <Star className="h-3.5 w-3.5" /> Women-First
                </Badge>
                <Badge>Faith-Aligned</Badge>
                <Badge>Gentle Pace</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE REAL PROBLEM */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <Card
            className="border-0 bg-white/90 rounded-3xl shadow-sm ring-1"
            style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="font-playfair text-3xl text-center"
                style={{ color: theme.text }}
              >
                The Real Problem Isn’t Being Single
              </CardTitle>
            </CardHeader>
            <CardContent
              className="max-w-3xl mx-auto space-y-4 font-lato text-center"
              style={{ color: theme.text }}
            >
              <p className="text-lg">
                The problem is feeling <strong>vulnerable, exhausted, and overwhelmed</strong> — secretly terrified you
                can’t handle your own life.
              </p>
              <p>
                When loneliness hits or pressure mounts, it’s tempting to chase the <em>Escape Ticket</em>: the fantasy
                of a soulmate who will validate your worth and fix what feels heavy.
              </p>
              <div
                className="mt-6 p-6 rounded-2xl ring-1"
                style={{
                  backgroundColor: hexToRgba(theme.accent1, 0.15),
                  borderColor: hexToRgba(theme.accent2, 0.35)
                }}
              >
                <p className="font-medium text-lg">
                  But here’s the truth: If you build your life on <em>rented land</em> (external approval), it collapses
                  the day the landlord leaves.
                </p>
              </div>
              <p className="text-lg pt-2">
                This workshop isn’t about chasing <strong>rescue</strong>. It’s about building <strong>power</strong>.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* THE COST OF STAYING STUCK */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <div className="text-center mb-8 flex flex-col items-center">
            <h2 className="font-playfair text-3xl md:text-4xl mb-3" style={{ color: theme.text }}>
              The High Cost of the “Rescue Fantasy”
            </h2>
            <p
              className="font-lato text-lg opacity-90 max-w-2xl mx-auto text-center"
              style={{ color: theme.text }}
            >
              Waiting for someone to fix your life comes at a price you can’t afford to keep paying.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <CostCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="Vulnerable & Exhausted"
              description="Constantly seeking external validation. Always needing proof you’re enough. Never feeling secure in your own worth."
            />
            <CostCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="Stuck in Toxic Patterns"
              description="Attracted to unavailable people because the chase distracts you from the deeper work you need to do."
            />
            <CostCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="Costly Life Detours"
              description="Rushing toward the wrong partner or path just to escape the pressure — wasting precious years of your life."
            />
          </div>
        </motion.div>
      </section>

      {/* THE TRANSFORMATION */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <div className="text-center mb-8 flex flex-col items-center">
            <h2 className="font-playfair text-3xl md:text-4xl mb-3" style={{ color: theme.text }}>
              Imagine a Life Where You’re the Source
            </h2>
            <p
              className="font-lato text-lg opacity-90 max-w-2xl mx-auto text-center"
              style={{ color: theme.text }}
            >
              Not waiting. Not hoping. Not outsourcing. Just <strong>whole</strong>.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <VisionCard icon={<KeyRound className="h-5 w-5" />} title="You Hold the Keys">
              Your happiness is generated <em>internally</em>. You’re the source of your own fulfillment, not a
              customer waiting for delivery.
            </VisionCard>
            <VisionCard icon={<Anchor className="h-5 w-5" />} title="Unshakeable Strength">
              Grounded, resourceful, and calm—no matter what storms come your way. You become your own anchor.
            </VisionCard>
            <VisionCard icon={<Flame className="h-5 w-5" />} title="You Choose from Power">
              You select a partner (or not) from abundance and alignment—never from desperation or fear.
            </VisionCard>
          </div>
        </motion.div>
      </section>

      {/* WHAT WE'LL DO */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <Card
            className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
            style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
          >
            <CardHeader className="pb-4 text-center">
              <CardTitle className="font-playfair text-3xl md:text-4xl" style={{ color: theme.text }}>
                Your Path to Inner Strength
              </CardTitle>
              <p className="font-lato text-lg opacity-90 mt-2" style={{ color: theme.text }}>
                Three powerful shifts that will transform how you show up in your life
              </p>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <TransformationStep
                number="1"
                title="Expose the Myth"
                description="Dismantle the “rescue relationship” fantasy that’s been draining your power and stealing your time."
              />
              <TransformationStep
                number="2"
                title="End Outsourcing"
                description="Stop renting your worth from likes, status, or temporary people. Reclaim ownership of your value."
              />
              <TransformationStep
                number="3"
                title="Build Your Inner Home"
                description="Learn high-impact practices to become your own anchor, protector, and the selector of your own life."
              />
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* TICKETS */}
      <section id="tickets" className={`${container} ${sectionY} pt-0`}>
        <Card
          className="border-0 rounded-3xl overflow-hidden shadow-xl bg-white/90 relative"
          style={{ boxShadow: `0 12px 40px -8px ${hexToRgba('#000', 0.12)}` }}
        >
          <div
            className="absolute top-4 left-[-30px] rotate-[-15deg] text-xs font-semibold tracking-wide px-4 py-1 rounded-full shadow-sm z-10"
            style={{
              backgroundColor: theme.highlight,
              color: '#fff',
              boxShadow: `0 6px 20px -6px ${hexToRgba(theme.highlight, 0.6)}`
            }}
          >
            EARLY-BIRD
          </div>

          <div className="grid md:grid-cols-3">
            {/* Left */}
            <div
              className="md:col-span-2 p-8 relative"
              style={{
                background: `linear-gradient(160deg, ${hexToRgba(theme.accent1, 0.55)}, ${hexToRgba(
                  theme.accent2,
                  0.55
                )})`
              }}
            >
              <div
                className="absolute -inset-6 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
                aria-hidden
              />
              <div className="max-w-xl">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 mb-3"
                  style={{
                    borderColor: hexToRgba(theme.accent2, 0.45),
                    backgroundColor: hexToRgba(theme.accent2, 0.18),
                    color: theme.text
                  }}
                >
                  💗 Early-bird — Toronto only
                </div>
                <h3 className="font-playfair text-4xl md:text-5xl leading-tight" style={{ color: theme.text }}>
                  General Admission
                </h3>
                <p className="font-lato mt-2 opacity-90 text-center mx-auto" style={{ color: theme.text }}>
                  Girls-only, faith-aligned space • Printed workbook • 2–3 hour live experience in Toronto, Canada.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 items-end">
                  <div
                    className="rounded-2xl bg-white/80 backdrop-blur ring-1 p-4 text-center"
                    style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
                  >
                    <div
                      className="text-xs uppercase tracking-wider font-lato opacity-70"
                      style={{ color: theme.text }}
                    >
                      Sale ends in
                    </div>
                    {saleActive ? (
                      <div className="mt-2 flex items-stretch justify-center gap-2" role="timer" aria-live="off">
                        <TimeBox label="Days" value={d} />
                        <TimeBox label="Hrs" value={h} />
                        <TimeBox label="Min" value={m} />
                        <TimeBox label="Sec" value={s} />
                      </div>
                    ) : (
                      <div className="mt-1 font-playfair text-lg" style={{ color: theme.text }}>
                        Sale ended
                      </div>
                    )}
                  </div>
                  <div
                    className="rounded-2xl bg-white/80 backdrop-blur ring-1 p-4 text-center"
                    style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
                  >
                    <div
                      className="text-xs uppercase tracking-wider font-lato opacity-70"
                      style={{ color: theme.text }}
                    >
                      Today
                    </div>
                    <div
                      className="mt-1 font-playfair text-3xl md:text-4xl flex items-center justify-center gap-2"
                      style={{ color: theme.text }}
                    >
                      <s className="text-xl opacity-60">$45</s>
                      <span className="leading-none">{displayPrice}</span>
                    </div>
                  </div>
                </div>

                <ul className="mt-5 grid gap-2 text-sm font-lato" style={{ color: theme.text }}>
                  <li className="flex items-start gap-2">
                    <Dot /> Kind, gentle-paced facilitation
                  </li>
                  <li className="flex items-start gap-2">
                    <Dot /> Printed workbook to take home
                  </li>
                  <li className="flex items-start gap-2">
                    <Dot /> Girls-only, faith-aligned environment
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    className="rounded-full px-6 h-12 text-base shadow-md transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: theme.highlight, color: '#fff' }}
                  >
                    <a
                      href="https://shop.hirahsaficoach.com/products/soulmate-workshop-tickets"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy ticket for the Soulmate Workshop at ${displayPrice}`}
                    >
                      Buy Now — {displayPrice}
                    </a>
                  </Button>
                  <span className="text-xs font-lato opacity-70" style={{ color: theme.text }}>
                    Early-bird ends Nov 15, 11:59pm Toronto time.
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="p-8 bg-white grid place-items-center">
              <div className="w-full max-w-md">
                <ImagePlaceholder ratio="4/3" src="/assets/soulmate.webp" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* EXPERIENCE DETAILS */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <div className="text-center mb-8 flex flex-col items-center">
            <h2 className="font-playfair text-3xl md:text-4xl mb-3" style={{ color: theme.text }}>
              A Safe Space for Real Transformation
            </h2>
            <p
              className="font-lato text-lg opacity-90 max-w-2xl mx-auto text-center"
              style={{ color: theme.text }}
            >
              Everything you need for a comfortable, empowering experience
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card
              className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl" style={{ color: theme.text }}>
                  What’s Included
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-lato text-sm" style={{ color: theme.text }}>
                <div className="flex items-start gap-2">
                  <Dot /> <span>Commemorative water bottle, pen & tote bag</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot /> <span>Food, soft drinks & delicious desserts</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot /> <span>Printed workbook to take home</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-3xl shadow-sm" style={{ backgroundColor: '#f4fff7' }}>
              <CardHeader className="pb-2">
                <CardTitle
                  className="font-playfair text-xl flex items-center gap-2"
                  style={{ color: theme.text }}
                >
                  <Shield className="h-5 w-5" /> Safe Space
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-lato text-sm" style={{ color: theme.text }}>
                <div className="flex items-start gap-2">
                  <Dot /> <span>Girls-only, faith-aligned environment</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot /> <span>Kind, gentle-paced facilitation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot /> <span>No force, no shame — only clarity</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl" style={{ color: theme.text }}>
                  Perfect For You If
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-lato text-sm" style={{ color: theme.text }}>
                <div className="flex items-start gap-2">
                  <Dot />
                  <span>You want clarity and control without waiting for rescue</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot />
                  <span>You’re ready to stop outsourcing your worth</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot />
                  <span>You’re a beginner — come as you are</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl" style={{ color: theme.text }}>
                  You’ll Leave With
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-lato text-sm" style={{ color: theme.text }}>
                <div className="flex items-start gap-2">
                  <Dot /> <span>A clear 30-day action plan</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot /> <span>Real tools you’ll actually use</span>
                </div>
                <div className="flex items-start gap-2">
                  <Dot /> <span>A stronger, steadier version of you</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className={`${container} ${sectionY} pt-0`}>
        <Card className="border-0 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-8" style={{ backgroundColor: '#fff' }}>
              <h4 className="font-playfair text-3xl mb-3" style={{ color: theme.text }}>
                Don’t miss the moment to save your future
              </h4>
              <p className="font-lato opacity-90 mb-6 text-center mx-auto max-w-2xl" style={{ color: theme.text }}>
                Every day you delay this inner work increases the risk of choosing from fear. This isn’t self-help —
                it’s <strong>self-rescue</strong>. Limited seats for this intensive session in Toronto.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                  <a
                    href="https://shop.hirahsaficoach.com/products/soulmate-workshop-tickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy ticket for the Soulmate Workshop at ${displayPrice}`}
                  >
                    Buy Now — {displayPrice}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-2"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                  onClick={() =>
                    document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  aria-label="See tickets"
                >
                  See Tickets
                </Button>
              </div>
            </div>
            <div
              className="relative p-8"
              style={{
                background: `linear-gradient(160deg, ${hexToRgba(theme.accent1, 0.6)}, ${hexToRgba(theme.accent2, 0.6)})`
              }}
            >
              <div
                className="absolute -inset-5 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
                aria-hidden
              />
              <div
                className="h-full w-full rounded-2xl bg-white/70 backdrop-blur grid place-items-center text-center p-6 ring-1"
                style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
              >
                <div className="font-playfair text-2xl" style={{ color: theme.text }}>
                  “Trade the temporary fantasy for permanent, limitless power.”
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Separator className="opacity-0" />
    </div>
  );
}
