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
import { CalendarDays, MapPin, Clock, Users, Camera, CheckCircle2, Star, Shield, Flame, Anchor, KeyRound, AlertTriangle } from 'lucide-react';

const theme = {
  bg: '#f7f4f1',
  accent1: '#ecd9d2',
  accent2: '#E0c5bb',
  highlight: '#d29a89', // CTA + important accents
  text: 'var(--text-color, #57534E)'
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1"
      style={{
        color: theme.text,
        backgroundColor: `${hexToRgba(theme.accent2, 0.15)}`,
        borderColor: hexToRgba(theme.accent2, 0.4)
      }}
    >
      {children}
    </div>
  );
}

function ImagePlaceholder({ ratio = '16/9', src }: { ratio?: '1/1' | '4/3' | '16/9'; src?: string }) {
  const paddingMap: Record<string, string> = { '1/1': 'pb-[100%]', '4/3': 'pb-[75%]', '16/9': 'pb-[56.25%]' };
  return (
    <div
      className={`relative w-full ${paddingMap[ratio]} rounded-2xl overflow-hidden group border shadow-sm bg-white/70 backdrop-blur`}
      style={{ borderColor: hexToRgba(theme.accent2, 0.35) }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        (e.currentTarget as HTMLElement).style.setProperty('--x', x + '%');
        (e.currentTarget as HTMLElement).style.setProperty('--y', y + '%');
      }}
    >
      {src ? (
        <img src={src} alt="Soulmate workshop" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-sm opacity-80" style={{ color: theme.text }}>
          <Camera className="h-4 w-4 mr-2" /> Add hero image for Soulmate workshop
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(160px 160px at var(--x,50%) var(--y,50%), ${hexToRgba(theme.accent1, 0.25)}, transparent 70%)`
        }}
      />
    </div>
  );
}

type Mode = 'Online' | 'In-Person' | 'Hybrid';

export default function SoulmateWorkshopPage() {
  const fadeUp = useFadeUp();

  // Early-bird logic — deadline Nov 15, 11:59pm Toronto time (ET)
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

  // Countdown helper (d hh:mm:ss)
  const msRemaining = Math.max(0, deadline - nowMs);
  const d = Math.floor(msRemaining / (24 * 60 * 60 * 1000));
  const h = Math.floor((msRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((msRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const s = Math.floor((msRemaining % (60 * 1000)) / 1000);

  return (
    <div className="page-wrapper" style={{ backgroundColor: theme.bg }}>
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* softer, on-brand blobs */}
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
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.highlight }} />
                <span>VIP Workshop • Girls-Only Vibe</span>
              </div>

              <h1
                className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight"
                style={{ color: theme.text }}
              >
                The{' '}
                <BrushStrokeHighlight
                  height="0.9em"
                  waveWidthPercent={60}
                  animationDuration="28s"
                  blurred
                  colorStart={theme.accent2}
                  colorEnd={theme.accent1}
                >
                  Soulmate
                </BrushStrokeHighlight>{' '}
                Workshop
              </h1>

              <p className="font-lato text-lg leading-relaxed opacity-90 max-w-prose" style={{ color: theme.text }}>
                This is <strong>not</strong> a dating class. It’s a <em>self-rescue mission</em> for ambitious women
                who are tired of feeling vulnerable and overwhelmed. We’ll expose the myth of the “rescue relationship,”
                end the habit of outsourcing happiness, and build the inner strength to become your own anchor.
              </p>

              {/* Location / Timing */}
              <div className="grid sm:grid-cols-3 gap-3 text-sm font-lato">
                <InfoPill icon={<CalendarDays className="h-4 w-4" />} text={`Early-bird ends Nov 15 (Toronto time)`} />
                <InfoPill icon={<Clock className="h-4 w-4" />} text="2–3 hours • Live" />
                <InfoPill icon={<MapPin className="h-4 w-4" />} text="Toronto, Canada • In-Person" />
              </div>

              {/* Early-bird badge */}
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
                  <span className="text-xs opacity-80">
                    • {d}d {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Primary CTA */}
              <div className="flex gap-3 pt-2">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                  <Link href="/products/soulmate-workshop-tickets">Buy Now — {displayPrice}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-11 border-2"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                >
                  <Link href="#tickets">See Tickets</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
              />
              <Card
                className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/70 backdrop-blur"
                style={{
                  boxShadow: `0 10px 40px -8px ${hexToRgba('#000', 0.12)}`
                }}
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

      {/* PROBLEM -> TRUTH */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            className="md:col-span-2 border-0 bg-white/90 rounded-3xl shadow-sm ring-1"
            style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="font-playfair text-2xl" style={{ color: theme.text }}>
                Tired of waiting to be chosen?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-lato" style={{ color: theme.text }}>
              <p>
                Look around. Are you exhausted, overwhelmed, secretly terrified you can’t handle your own life? When
                loneliness hits or pressure mounts, it’s easy to chase the <em>Escape Ticket</em>: the fantasy of a
                soulmate who will validate your worth and fix what feels heavy.
              </p>
              <p>
                This isn’t that. This is where we stop chasing <strong>rescue</strong> and start building{' '}
                <strong>power</strong>.
              </p>
            </CardContent>
          </Card>

          <Callout icon={<AlertTriangle />} title="A cold hard truth you can’t ignore">
            If you build your life on <em>rented land</em> (external approval), it collapses the day the landlord leaves.
            Your worth is not a rental. It must be built on rock.
          </Callout>
        </div>
      </section>

      {/* HIGH PRICE OF THE RESCUE FANTASY */}
      <section className={`${container} ${sectionY} pt-0`}>
        <Card
          className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
          style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="font-playfair text-3xl" style={{ color: theme.text }}>
              The High Price of the “Rescue Fantasy”
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <BulletCard title="Vulnerable & Exhausted" text="Always chasing approval. Constantly needing proof you’re enough." />
            <BulletCard title="Stuck in the Chase" text="Attracted to unkind people because chasing distracts from deeper work." />
            <BulletCard title="Costly Detours" text="Rushing toward the wrong partner or path to avoid facing doubt or pressure." />
          </CardContent>
        </Card>
      </section>

      {/* IMAGINE A LIFE WHERE… */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid md:grid-cols-3 gap-6">
          <VisionCard icon={<KeyRound className="h-5 w-5" />} title="You hold the keys">
            Your happiness is generated <em>internally</em>. You are the source, not the customer.
          </VisionCard>
          <VisionCard icon={<Anchor className="h-5 w-5" />} title="Unshakeable mental strength">
            Grounded, resourceful, and calm—no matter what life throws at you.
          </VisionCard>
          <VisionCard icon={<Flame className="h-5 w-5" />} title="You choose—never from fear">
            You select a partner (or not) from abundance and alignment, not desperation.
          </VisionCard>
        </div>
      </section>

      {/* WHAT WE'LL DO INSIDE (techniques) */}
      <section className={`${container} ${sectionY} pt-0`}>
        <Card
          className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
          style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="font-playfair text-3xl" style={{ color: theme.text }}>
              Inside the Workshop
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div
              className="rounded-2xl bg-white/75 backdrop-blur p-5 shadow-sm ring-1"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <div className="font-playfair text-lg" style={{ color: theme.text }}>
                Expose the Myth
              </div>
              <div className="font-lato text-sm opacity-80" style={{ color: theme.text }}>
                Clear the “rescue relationship” fantasy that drains power and time.
              </div>
            </div>
            <div
              className="rounded-2xl bg-white/75 backdrop-blur p-5 shadow-sm ring-1"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <div className="font-playfair text-lg" style={{ color: theme.text }}>
                End Outsourcing
              </div>
              <div className="font-lato text-sm opacity-80" style={{ color: theme.text }}>
                Stop renting worth from likes, status, or temporary people.
              </div>
            </div>
            <div
              className="rounded-2xl bg-white/75 backdrop-blur p-5 shadow-sm ring-1"
              style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
            >
              <div className="font-playfair text-lg" style={{ color: theme.text }}>
                Build Your Inner Home
              </div>
              <div className="font-lato text-sm opacity-80" style={{ color: theme.text }}>
                High-impact practices to become your own anchor and selector.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TICKETS */}
      <section id="tickets" className={`${container} ${sectionY} pt-0`}>
        <Card
          className="border-0 rounded-3xl overflow-hidden shadow-xl bg-white/90 relative"
          style={{
            // cute gradient ring effect
            boxShadow: `0 12px 40px -8px ${hexToRgba('#000', 0.12)}`
          }}
        >
          {/* Ribbon */}
          <div
            className="absolute top-4 left-[-30px] rotate-[-15deg] text-xs font-semibold tracking-wide px-4 py-1 rounded-full shadow-sm"
            style={{
              backgroundColor: theme.highlight,
              color: '#fff',
              boxShadow: `0 6px 20px -6px ${hexToRgba(theme.highlight, 0.6)}`
            }}
          >
            EARLY-BIRD
          </div>

          <div className="grid md:grid-cols-3">
            {/* Left: Big cute sales panel */}
            <div
              className="md:col-span-2 p-8 relative"
              style={{
                background: `linear-gradient(160deg, ${hexToRgba(theme.accent1, 0.55)}, ${hexToRgba(theme.accent2, 0.55)})`
              }}
            >
              <div
                className="absolute -inset-6 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
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
                <p className="font-lato mt-2 opacity-90" style={{ color: theme.text }}>
                  Girls-only, faith-aligned space • Printed workbook • 2–3 hour live experience in Toronto, Canada.
                </p>

                {/* Timer + price row (segmented + cute) */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 items-end">
                  <div
                    className="rounded-2xl bg-white/80 backdrop-blur ring-1 p-4 text-center"
                    style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
                  >
                    <div className="text-xs uppercase tracking-wider font-lato opacity-70" style={{ color: theme.text }}>
                      Sale ends in
                    </div>
                    {saleActive ? (
                      <div className="mt-2 flex items-stretch justify-center gap-2">
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
                    <div className="text-xs uppercase tracking-wider font-lato opacity-70" style={{ color: theme.text }}>
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

                {/* Cute benefits bullets */}
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
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    className="rounded-full px-6 h-12 text-base shadow-md transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: theme.highlight, color: '#fff' }}
                  >
                    <Link href="/products/soulmate-workshop-tickets">Buy Now — {displayPrice}</Link>
                  </Button>
                  <span className="text-xs font-lato opacity-70" style={{ color: theme.text }}>
                    Early-bird ends Nov 15, 11:59pm Toronto time.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: cute image space */}
            <div className="p-8 bg-white grid place-items-center">
              <div className="w-full max-w-md">
                <ImagePlaceholder ratio="4/3" src="/assets/soulmate.webp" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* SAFETY / PROMISE */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 rounded-3xl shadow-sm" style={{ backgroundColor: '#f4fff7' }}>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl flex items-center gap-2" style={{ color: theme.text }}>
                <Shield className="h-5 w-5" /> Gentle-Pace Promise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Item title="Kind, faith-conscious facilitation" text="No force, no shame — only clarity and calm accountability." />
              <Item title="Beginner-friendly" text="You don’t need prior coaching to benefit." />
              <Item title="Real outcomes" text="Leave with a 30-day roadmap you can follow without burnout." />
            </CardContent>
          </Card>

          <Card
            className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
            style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
          >
            <CardHeader>
              <CardTitle className="font-playfair text-2xl" style={{ color: theme.text }}>
                FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-lato text-sm" style={{ color: theme.text }}>
              <p>
                <strong>Is this about dating?</strong> No. It’s about building the <em>inner foundation</em> that makes any future
                choice wise.
              </p>
              <p>
                <strong>Will I get recordings?</strong> Online pass includes 7-day replay; in-person includes workbook.
              </p>
              <p>
                <strong>Refunds?</strong> If you can’t attend, we’ll transfer you to the next Soulmate date.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className={`${container} ${sectionY} pt-0`}>
        <Card className="border-0 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-8" style={{ backgroundColor: '#fff' }}>
              <h4 className="font-playfair text-3xl mb-3" style={{ color: theme.text }}>
                Don’t miss the moment to save your future
              </h4>
              <p className="font-lato opacity-90 mb-6" style={{ color: theme.text }}>
                Every day you delay this inner work increases the risk of choosing from fear. This isn’t self-help—it’s
                <strong> self-rescue</strong>. Limited seats for this intensive session in Toronto.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                  <Link href="/products/soulmate-workshop-tickets">Buy Now — {displayPrice}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 border-2"
                  style={{ borderColor: theme.accent2, color: theme.text }}
                >
                  <Link href="#tickets">See Tickets</Link>
                </Button>
              </div>
            </div>
            <div
              className="relative p-8"
              style={{ background: `linear-gradient(160deg, ${hexToRgba(theme.accent1, 0.6)}, ${hexToRgba(theme.accent2, 0.6)})` }}
            >
              <div
                className="absolute -inset-5 -z-10 blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${hexToRgba(theme.accent1, 0.6)}, transparent)` }}
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
      <Footer />
    </div>
  );
}

/* ——— small components ——— */

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

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card
        className="border-0 bg-white/90 rounded-2xl shadow-sm ring-1"
        style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
      >
        <CardHeader className="pb-1">
          <CardTitle className="font-playfair text-xl" style={{ color: theme.text }}>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-lato text-sm opacity-80" style={{ color: theme.text }}>
            {text}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PriceCard({
  title,
  price,
  bullets,
  active,
  onSelect
}: {
  title: string;
  price: string;
  bullets: string[];
  active?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button onClick={onSelect} type="button" className="text-left">
      <Card
        className={`rounded-2xl ring-1 transition-all ${active ? 'shadow-lg bg-white' : 'bg-white/85'} `}
        style={{ borderColor: active ? hexToRgba(theme.accent2, 0.6) : hexToRgba(theme.accent2, 0.28) }}
      >
        <CardHeader className="pb-2">
          <CardTitle
            className="font-playfair text-xl flex items-baseline justify-between"
            style={{ color: theme.text }}
          >
            {title}
            <span className="text-lg font-normal opacity-80 flex items-center gap-2">
              <s className="opacity-60">$45</s>
              <span>{price}</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="font-lato text-sm opacity-90 space-y-2" style={{ color: theme.text }}>
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5" /> <span>{b}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </button>
  );
}

function Item({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: theme.highlight }} />
      <div>
        <div className="font-lato font-semibold" style={{ color: theme.text }}>
          {title}
        </div>
        <div className="font-lato text-sm opacity-80" style={{ color: theme.text }}>
          {text}
        </div>
      </div>
    </div>
  );
}

function Callout({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl p-5 bg-white/85 backdrop-blur ring-1"
      style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-1 h-9 w-9 rounded-full grid place-items-center"
          style={{ backgroundColor: hexToRgba(theme.accent2, 0.25), color: theme.text }}
        >
          {icon}
        </div>
        <div>
          <div className="font-playfair text-lg" style={{ color: theme.text }}>
            {title}
          </div>
          <div className="font-lato text-sm opacity-90" style={{ color: theme.text }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="rounded-2xl bg-white/75 backdrop-blur p-5 shadow-sm ring-1"
      style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
    >
      <div className="font-playfair text-lg" style={{ color: theme.text }}>
        {title}
      </div>
      <div className="font-lato text-sm opacity-80" style={{ color: theme.text }}>
        {text}
      </div>
    </div>
  );
}

function VisionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl bg-white/90 backdrop-blur p-5 shadow-sm ring-1"
      style={{ borderColor: hexToRgba(theme.accent2, 0.28) }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: hexToRgba(theme.accent2, 0.2), color: theme.text }}
        >
          {icon}
        </span>
        <div className="font-playfair text-lg" style={{ color: theme.text }}>
          {title}
        </div>
      </div>
      <div className="mt-2 font-lato text-sm opacity-90" style={{ color: theme.text }}>
        {children}
      </div>
    </div>
  );
}

/* ——— tiny helpers ——— */

function Dot() {
  return (
    <span
      className="mt-1 inline-block h-2 w-2 rounded-full"
      style={{ backgroundColor: theme.highlight }}
    />
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="min-w-[54px] px-2 py-2 rounded-xl ring-1 bg-white/85 backdrop-blur"
      style={{ borderColor: hexToRgba(theme.accent2, 0.35), color: theme.text }}
    >
      <div className="text-lg font-playfair leading-none text-center">{String(value).padStart(2, '0')}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-70 text-center">{label}</div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
