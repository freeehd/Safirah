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
  Camera,
} from 'lucide-react';

const theme = {
  bg: '#f7f4f1',
  accent1: '#ecd9d2',
  accent2: '#E0c5bb',
  highlight: '#d29a89',
  text: '#57534E',
};

const container = 'mx-auto max-w-7xl px-4 sm:px-6 md:px-8';
const sectionY = 'py-10 sm:py-14 md:py-20';

/* ---------- canonical event info ---------- */
const IN_PERSON = {
  dateLabel: 'Saturday, Nov 29, 2025',
  timeLabel: '11:00 AM – 3:00 PM (ET)',
  placeLabel: '200 King St E, Toronto, Ontario, Canada',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=200%20King%20St%20E%2C%20Toronto%2C%20Ontario%2C%20Canada',
};

const ONLINE = {
  dateLabel: 'Sunday, Nov 30, 2025',
  timeLabel: '11:00 AM – 3:00 PM (ET)',
  placeLabel: 'Online • Join link emailed 24h before',
  learnUrl: 'https://www.hirahsaficoach.com/events/soulmate-workshop',
};

// Purchase links
const LINKS = {
  inPerson: 'https://shop.hirahsaficoach.com/products/soulmate-workshop-tickets',
  online: 'https://shop.hirahsaficoach.com/products/soulmate-workshop-online-pass',
};

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
    transition: { duration: prefersReduced ? 0 : 0.6, ease: 'easeOut' },
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
        borderColor: hexToRgba(theme.accent2, 0.4),
      }}
    >
      {children}
    </div>
  );
}

function ImagePlaceholder({
  ratio = '16/9',
  src,
}: {
  ratio?: '1/1' | '4/3' | '16/9';
  src?: string;
}) {
  const paddingMap: Record<string, string> = {
    '1/1': 'pb-[100%]',
    '4/3': 'pb-[75%]',
    '16/9': 'pb-[56.25%]',
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
      {icon} <span className="break-words">{text}</span>
    </div>
  );
}

function VisionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="rounded-2xl bg-white/90 backdrop-blur p-5 sm:p-6 shadow-sm ring-1 h-full"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: hexToRgba(theme.accent2, 0.2), color: theme.text }}
          >
            {icon}
          </span>
          <div className="font-playfair text-lg sm:text-xl" style={{ color: theme.text }}>
            {title}
          </div>
        </div>
        <div className="font-lato text-sm opacity-90 leading-relaxed" style={{ color: theme.text }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function CostCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="rounded-2xl bg-white/90 backdrop-blur p-5 sm:p-6 shadow-sm ring-1 h-full"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <div className="flex items-start gap-3 mb-2">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
            style={{ backgroundColor: hexToRgba('#ff6b6b', 0.15), color: '#d63031' }}
            aria-hidden
          >
            {icon}
          </span>
          <div className="font-playfair text-lg sm:text-xl" style={{ color: theme.text }}>
            {title}
          </div>
        </div>
        <div className="font-lato text-sm opacity-90 leading-relaxed" style={{ color: theme.text }}>
          {description}
        </div>
      </div>
    </motion.div>
  );
}

function TransformationStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div
        className="rounded-2xl bg-white/75 backdrop-blur p-5 sm:p-6 shadow-sm ring-1 h-full"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <div className="flex items-start gap-3 mb-2">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 font-playfair text-base sm:text-lg font-semibold"
            style={{ backgroundColor: hexToRgba(theme.highlight, 0.2), color: theme.highlight }}
            aria-hidden
          >
            {number}
          </span>
          <div className="font-playfair text-lg sm:text-xl" style={{ color: theme.text }}>
            {title}
          </div>
        </div>
        <div className="font-lato text-sm opacity-90 leading-relaxed" style={{ color: theme.text }}>
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

function WhichPassHelper() {
  return (
    <details className="mt-2 text-xs font-lato" style={{ color: theme.text }}>
      <summary className="underline cursor-pointer inline-flex items-center">
        Which should I choose?
      </summary>
      <div
        className="mt-2 rounded-xl ring-1 p-3 bg-white/70 backdrop-blur"
        style={{ borderColor: hexToRgba(theme.accent2, 0.35) }}
      >
        <p>
          <strong>In-Person (Toronto)</strong>: Includes the full live experience, printed workbook, treats, and gifts. Limited seats.
          <br />
          <strong>Online (Live)</strong>: Join from anywhere via a secure link. Same curriculum and same price as in-person.
        </p>
      </div>
    </details>
  );
}

/* ---------- event details band (responsive) ---------- */
function EventDetailsBand() {
  return (
    <div
      className="rounded-2xl ring-1 p-4 md:p-5 bg-white/85 backdrop-blur"
      style={{ borderColor: hexToRgba(theme.accent2, 0.35) }}
      aria-label="Event Details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* In-Person block */}
        <div className="rounded-xl p-4 ring-1 bg-white/80" style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}>
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: theme.text }}>
            <Star className="h-4 w-4" /> In-Person (Toronto)
          </div>
          <div className="mt-2 grid gap-2 text-sm font-lato" style={{ color: theme.text }}>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> {IN_PERSON.dateLabel}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {IN_PERSON.timeLabel}
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" /> {IN_PERSON.placeLabel}
            </div>
            <div className="pt-1">
              <a
                href={IN_PERSON.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline"
                style={{ color: theme.text }}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Online block */}
        <div className="rounded-xl p-4 ring-1 bg-white/80" style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}>
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: theme.text }}>
            <Star className="h-4 w-4" /> Online (Live)
          </div>
          <div className="mt-2 grid gap-2 text-sm font-lato" style={{ color: theme.text }}>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> {ONLINE.dateLabel}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {ONLINE.timeLabel}
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" /> {ONLINE.placeLabel}
            </div>
            <div className="pt-1">
              <a
                href={LINKS.online}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline"
                style={{ color: theme.text }}
                aria-label="Get the Online Pass"
              >
                Get the Online Pass →
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs opacity-80 mt-3 text-center" style={{ color: theme.text }}>
        Choose <strong>In-Person</strong> (Toronto) or <strong>Online</strong> when purchasing.
      </p>
    </div>
  );
}

/* ---------- sticky mobile buy bar ---------- */
function MobileBuyBar({ displayPrice }: { displayPrice: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
      <div
        className="rounded-2xl ring-1 bg-white/90 backdrop-blur p-2 shadow-lg"
        style={{ borderColor: hexToRgba(theme.accent2, 0.35) }}
      >
        <div className="flex gap-2">
          <Button
            asChild
            className="w-1/2 rounded-xl h-11"
            style={{ backgroundColor: theme.highlight, color: '#fff' }}
          >
            <a href={LINKS.inPerson} target="_blank" rel="noopener noreferrer">
              In-Person — {displayPrice}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-1/2 rounded-xl h-11 border-2"
            style={{ borderColor: theme.accent2, color: theme.text }}
          >
            <a href={LINKS.online} target="_blank" rel="noopener noreferrer">
              Online — {displayPrice}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function SoulmateWorkshopPage() {
  const fadeUp = useFadeUp();
  useReducedMotion(); // still used above via hook

  // Single full price (no early-bird)
  const price = 38;
  const displayPrice = `$${price}`;

  return (
    <div className="page-wrapper" style={{ backgroundColor: theme.bg }}>
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* backdrop blobs (hide on xs to prevent overlap) */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl -z-10 hidden sm:block"
          style={{ background: `radial-gradient(circle, ${hexToRgba(theme.accent2, 0.45)}, transparent 60%)` }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-10 h-80 w-80 rounded-3xl blur-3xl -z-10 hidden sm:block"
          style={{ background: `radial-gradient(circle, ${hexToRgba(theme.accent1, 0.45)}, transparent 65%)` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className={container}>
          <div className="grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
            {/* Text first on mobile */}
            <motion.div {...fadeUp} className="space-y-5 md:space-y-6 order-2 md:order-1">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 sm:px-4 py-1.5 text-xs sm:text-sm"
                style={{
                  borderColor: hexToRgba(theme.accent2, 0.45),
                  backgroundColor: hexToRgba(theme.accent2, 0.15),
                  color: theme.text,
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.highlight }} aria-hidden />
                <span>VIP Workshop • Girls-Only Vibe</span>
              </div>

              <h1
                className="font-playfair text-[32px] leading-tight sm:text-5xl md:text-6xl tracking-tight"
                style={{ color: theme.text }}
              >
                The{' '}
                <span
                  className="relative inline-block px-2 rounded"
                  style={{
                    background: `linear-gradient(120deg, ${hexToRgba(theme.accent2, 0.4)} 0%, ${hexToRgba(
                      theme.accent1,
                      0.4,
                    )} 100%)`,
                  }}
                >
                  Soulmate
                </span>{' '}
                Workshop
              </h1>

              <p
                className="font-lato text-base sm:text-lg leading-relaxed opacity-90 max-w-prose text-center mx-auto"
                style={{ color: theme.text }}
              >
                Two attendance options — <strong>In-Person (Toronto)</strong> and <strong>Online (Live)</strong> — so you can join the way that fits your season.
              </p>

              {/* Quick tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm font-lato">
                <InfoPill icon={<CalendarDays className="h-4 w-4" />} text="In-Person: Sat, Nov 29 • Online: Sun, Nov 30" />
                <InfoPill icon={<Clock className="h-4 w-4" />} text="Time: 11:00 AM – 3:00 PM (ET) both days" />
                <InfoPill icon={<MapPin className="h-4 w-4" />} text="Toronto venue: 200 King St E" />
              </div>

              {/* Details band */}
              <EventDetailsBand />

              {/* Simple price chip */}
              <div
                className="inline-flex flex-wrap items-center gap-2 rounded-full px-3 py-1 ring-1 mt-2"
                style={{
                  borderColor: hexToRgba(theme.accent2, 0.45),
                  backgroundColor: hexToRgba(theme.accent1, 0.15),
                  color: theme.text,
                }}
              >
                <span className="text-sm">
                  <strong>{displayPrice}</strong> CAD per person — same price for In-Person & Online.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 w-full sm:w-auto transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                  <a
                    href={LINKS.inPerson}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy In-Person Pass at ${displayPrice}`}
                  >
                    In-Person Pass — {displayPrice}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full px-6 h-11 w-full sm:w-auto border-2"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                >
                  <a
                    href={LINKS.online}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy Online Pass at ${displayPrice}`}
                  >
                    Online Pass — {displayPrice}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 h-11 w-full sm:w-auto border-2"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                  onClick={() =>
                    document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  aria-label="Scroll to tickets"
                >
                  See Tickets
                </Button>
              </div>
              <WhichPassHelper />
            </motion.div>

            {/* Visual second on mobile */}
            <motion.div {...fadeUp} className="relative order-1 md:order-2">
              <div
                className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-40 sm:opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
                aria-hidden
              />
              <Card
                className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/70 backdrop-blur"
                style={{ boxShadow: `0 10px 40px -8px ${hexToRgba('#000', 0.12)}` }}
              >
                <CardContent className="p-2 sm:p-3">
                  <ImagePlaceholder src="/assets/soulmate.webp" />
                </CardContent>
              </Card>
              <div className="mt-3 flex flex-wrap items-center gap-2">
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
              <CardTitle className="font-playfair text-2xl sm:text-3xl text-center" style={{ color: theme.text }}>
                The Real Problem Isn’t Being Single
              </CardTitle>
            </CardHeader>
            <CardContent className="max-w-3xl mx-auto space-y-4 font-lato text-center" style={{ color: theme.text }}>
              <p className="text-base sm:text-lg">
                The problem is feeling <strong>vulnerable, exhausted, and overwhelmed</strong> — secretly terrified you
                can’t handle your own life.
              </p>
              <p className="text-sm sm:text-base">
                When loneliness hits or pressure mounts, it’s tempting to chase the <em>Escape Ticket</em>: the fantasy
                of a soulmate who will validate your worth and fix what feels heavy.
              </p>
              <div
                className="mt-6 p-4 sm:p-6 rounded-2xl ring-1"
                style={{ backgroundColor: hexToRgba(theme.accent1, 0.15), borderColor: hexToRgba(theme.accent2, 0.35) }}
              >
                <p className="font-medium text-base sm:text-lg">
                  But here’s the truth: If you build your life on <em>rented land</em> (external approval), it collapses
                  the day the landlord leaves.
                </p>
              </div>
              <p className="text-base sm:text-lg pt-2">
                This workshop isn’t about chasing <strong>rescue</strong>. It’s about building <strong>power</strong>.
              </p>
              {/* Repeat logistics for scrollers */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <InfoPill
                  icon={<CalendarDays className="h-4 w-4" />}
                  text={`In-Person: ${IN_PERSON.dateLabel} • ${IN_PERSON.timeLabel}`}
                />
                <InfoPill
                  icon={<CalendarDays className="h-4 w-4" />}
                  text={`Online: ${ONLINE.dateLabel} • ${ONLINE.timeLabel}`}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* THE COST OF STAYING STUCK */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ color: theme.text }}>
              The High Cost of the “Rescue Fantasy”
            </h2>
            <p
              className="font-lato text-base sm:text-lg opacity-90 max-w-2xl mx-auto text-center"
              style={{ color: theme.text }}
            >
              Waiting for someone to fix your life comes at a price you can’t afford to keep paying.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
          <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ color: theme.text }}>
              Imagine a Life Where You’re the Source
            </h2>
            <p
              className="font-lato text-base sm:text-lg opacity-90 max-w-2xl mx-auto text-center"
              style={{ color: theme.text }}
            >
              Not waiting. Not hoping. Not outsourcing. Just <strong>whole</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
            <CardHeader className="pb-3 sm:pb-4 text-center">
              <CardTitle
                className="font-playfair text-2xl sm:text-3xl md:text-4xl"
                style={{ color: theme.text }}
              >
                Your Path to Inner Strength
              </CardTitle>
              <p
                className="font-lato text-base sm:text-lg opacity-90 mt-2"
                style={{ color: theme.text }}
              >
                Three powerful shifts that will transform how you show up in your life
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
              {/* Repeat logistics below steps for scrollers */}
              <div className="md:col-span-3 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <InfoPill
                    icon={<CalendarDays className="h-4 w-4" />}
                    text={`In-Person: ${IN_PERSON.dateLabel} • ${IN_PERSON.timeLabel}`}
                  />
                  <InfoPill
                    icon={<MapPin className="h-4 w-4" />}
                    text={`Venue: ${IN_PERSON.placeLabel}`}
                  />
                </div>
                <div className="mt-2">
                  <InfoPill
                    icon={<CalendarDays className="h-4 w-4" />}
                    text={`Online: ${ONLINE.dateLabel} • ${ONLINE.timeLabel}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* TICKETS */}
      <section id="tickets" className={`${container} ${sectionY} pt-0 scroll-mt-24`}>
        <Card
          className="border-0 rounded-3xl overflow-hidden shadow-xl bg-white/90 relative"
          style={{ boxShadow: `0 12px 40px -8px ${hexToRgba('#000', 0.12)}` }}
        >
          <div
            className="absolute top-3 sm:top-4 left-3 sm:left-[-30px] sm:rotate-[-15deg] text-[10px] sm:text-xs font-semibold tracking-wide px-3 sm:px-4 py-1 rounded-full shadow-sm z-10"
            style={{
              backgroundColor: theme.highlight,
              color: '#fff',
              boxShadow: `0 6px 20px -6px ${hexToRgba(theme.highlight, 0.6)}`,
            }}
          >
            WORKSHOP TICKETS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left */}
            <div
              className="md:col-span-2 p-6 sm:p-8 relative"
              style={{
                background: `linear-gradient(160deg, ${hexToRgba(
                  theme.accent1,
                  0.55,
                )}, ${hexToRgba(theme.accent2, 0.55)})`,
              }}
            >
              <div
                className="absolute -inset-6 -z-10 blur-3xl opacity-40 sm:opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
                aria-hidden
              />
              <div className="max-w-xl">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 mb-3"
                  style={{
                    borderColor: hexToRgba(theme.accent2, 0.45),
                    backgroundColor: hexToRgba(theme.accent2, 0.18),
                    color: theme.text,
                  }}
                >
                  💗 Two ticket types: In-Person (Toronto) or Online (Live)
                </div>
                <h3
                  className="font-playfair text-3xl sm:text-4xl md:text-5xl leading-tight"
                  style={{ color: theme.text }}
                >
                  Choose Your Pass
                </h3>
                <p
                  className="font-lato mt-2 opacity-90 text-center sm:text-left"
                  style={{ color: theme.text }}
                >
                  In-Person: <strong>{IN_PERSON.dateLabel}</strong> • {IN_PERSON.timeLabel} • {IN_PERSON.placeLabel}
                  <br />
                  Online: <strong>{ONLINE.dateLabel}</strong> • {ONLINE.timeLabel} • Live via secure link
                </p>

                {/* Price + options */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 items-stretch">
                  <div
                    className="rounded-2xl bg-white/80 backdrop-blur ring-1 p-4 text-center"
                    style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
                  >
                    <div
                      className="text-[11px] sm:text-xs uppercase tracking-wider font-lato opacity-70"
                      style={{ color: theme.text }}
                    >
                      Your Ticket
                    </div>
                    <div
                      className="mt-1 font-playfair text-2xl sm:text-3xl md:text-4xl flex items-center justify-center gap-2"
                      style={{ color: theme.text }}
                    >
                      <span className="leading-none">{displayPrice}</span>
                    </div>
                    <div className="mt-1 text-xs font-lato opacity-80" style={{ color: theme.text }}>
                      Per person, per pass (CAD).
                    </div>
                  </div>
                  <div
                    className="rounded-2xl bg-white/80 backdrop-blur ring-1 p-4 text-center"
                    style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
                  >
                    <div
                      className="text-[11px] sm:text-xs uppercase tracking-wider font-lato opacity-70"
                      style={{ color: theme.text }}
                    >
                      Attendance Options
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-lato space-y-1" style={{ color: theme.text }}>
                      <div>
                        <strong>In-Person (Toronto)</strong> — full live experience, workbook, treats & gifts.
                      </div>
                      <div>
                        <strong>Online (Live)</strong> — join via Zoom, same curriculum and price.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
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

                {/* CTA */}
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3">
                  <Button
                    asChild
                    className="rounded-full px-6 h-12 text-base shadow-md transition-transform hover:scale-[1.02] w-full sm:w-auto"
                    style={{ backgroundColor: theme.highlight, color: '#fff' }}
                  >
                    <a
                      href={LINKS.inPerson}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy In-Person Pass at ${displayPrice}`}
                    >
                      In-Person Pass — {displayPrice}
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full px-6 h-12 text-base transition-transform hover:scale-[1.02] border-2 w-full sm:w-auto"
                    style={{ borderColor: theme.accent2, color: theme.text }}
                  >
                    <a
                      href={LINKS.online}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy Online Pass at ${displayPrice}`}
                    >
                      Online Pass — {displayPrice}
                    </a>
                  </Button>
                  <span
                    className="text-xs font-lato opacity-70 text-center sm:text-left"
                    style={{ color: theme.text }}
                  >
                    Tickets are limited — in-person seats are first come, first served.
                  </span>
                </div>
                <WhichPassHelper />
              </div>
            </div>

            {/* Right visual */}
            <div className="p-6 sm:p-8 bg-white grid place-items-center">
              <div className="w-full max-w-md">
                <ImagePlaceholder ratio="4/3" src="/assets/soulmate.webp" />
                <div className="mt-4 grid gap-2 text-xs font-lato">
                  <a
                    href={IN_PERSON.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-center sm:text-left"
                    style={{ color: theme.text }}
                  >
                    📍 Open the Toronto venue in Google Maps
                  </a>
                  <a
                    href={ONLINE.learnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-center sm:text-left"
                    style={{ color: theme.text }}
                  >
                    💻 Learn about the online experience
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* EXPERIENCE DETAILS */}
      <section className={`${container} ${sectionY} pt-0`}>
        <motion.div {...fadeUp}>
          <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ color: theme.text }}>
              A Safe Space for Real Transformation
            </h2>
            <p
              className="font-lato text-base sm:text-lg opacity-90 max-w-2xl mx-auto text-center"
              style={{ color: theme.text }}
            >
              Everything you need for a comfortable, empowering experience
            </p>
          </div>

          {/* Snapshot again for clarity */}
          <div className="mb-6">
            <EventDetailsBand />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card
              className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className="font-playfair text-lg sm:text-xl"
                  style={{ color: theme.text }}
                >
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

            <Card
              className="border-0 rounded-3xl shadow-sm"
              style={{ backgroundColor: '#f4fff7' }}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className="font-playfair text-lg sm:text-xl flex items-center gap-2"
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
                <CardTitle
                  className="font-playfair text-lg sm:text-xl"
                  style={{ color: theme.text }}
                >
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
                <CardTitle
                  className="font-playfair text-lg sm:text-xl"
                  style={{ color: theme.text }}
                >
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
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 p-6 sm:p-8" style={{ backgroundColor: '#fff' }}>
              <h4
                className="font-playfair text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3"
                style={{ color: theme.text }}
              >
                Don’t miss the moment to save your future
              </h4>
              <p
                className="font-lato opacity-90 mb-2 sm:mb-3 text-center mx-auto max-w-2xl"
                style={{ color: theme.text }}
              >
                Join us <strong>In-Person (Toronto)</strong> on <strong>{IN_PERSON.dateLabel}</strong> or{' '}
                <strong>Online</strong> on <strong>{ONLINE.dateLabel}</strong> — both from{' '}
                <strong>11:00 AM – 3:00 PM (ET)</strong>.
              </p>
              <p
                className="font-lato opacity-90 mb-5 sm:mb-6 text-center mx-auto max-w-2xl"
                style={{ color: theme.text }}
              >
                Every day you delay this inner work increases the risk of choosing from fear. This isn’t self-help — it’s{' '}
                <strong>self-rescue</strong>. Limited seats for the Toronto session.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02] w-full sm:w-auto"
                  style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                  <a
                    href={LINKS.inPerson}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy In-Person Pass at ${displayPrice}`}
                  >
                    In-Person Pass — {displayPrice}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02] border-2 w-full sm:w-auto"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                >
                  <a
                    href={LINKS.online}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy Online Pass at ${displayPrice}`}
                  >
                    Online Pass — {displayPrice}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-2 w-full sm:w-auto"
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
              className="relative p-6 sm:p-8"
              style={{
                background: `linear-gradient(160deg, ${hexToRgba(
                  theme.accent1,
                  0.6,
                )}, ${hexToRgba(theme.accent2, 0.6)})`,
              }}
            >
              <div
                className="absolute -inset-5 -z-10 blur-3xl opacity-40 sm:opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
                aria-hidden
              />
              <div
                className="h-full w-full rounded-2xl bg-white/70 backdrop-blur grid place-items-center text-center p-5 sm:p-6 ring-1"
                style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
              >
                <div
                  className="font-playfair text-xl sm:text-2xl"
                  style={{ color: theme.text }}
                >
                  “Trade the temporary fantasy for permanent, limitless power.”
                </div>
                <div
                  className="mt-3 text-xs font-lato opacity-80"
                  style={{ color: theme.text }}
                >
                  In-Person: {IN_PERSON.dateLabel} • {IN_PERSON.timeLabel}
                  <br />
                  {IN_PERSON.placeLabel}
                  <br />
                  Online: {ONLINE.dateLabel} • {ONLINE.timeLabel}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Separator className="opacity-0" />

      {/* Sticky mobile buy bar */}
      <MobileBuyBar displayPrice={displayPrice} />
    </div>
  );
}
