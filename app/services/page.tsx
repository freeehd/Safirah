'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import BubbleMenu from '@/components/BubbleMenu';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Compass, Sparkles, Users, Crown, ListChecks, Target, Camera, CheckCircle2, Star } from 'lucide-react';
import BrushStrokeHighlight from '@/components/BrushStrokeHighlight';

/**
 * Services page — Polished v2 (matched styling)
 * - Tailwind + shadcn/ui + framer-motion only
 * - Uses site CSS vars for theme cohesion (soft pink/peach palette, Playfair/Lato)
 */

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
        <Camera className="h-4 w-4 mr-2" /> Add image
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            'radial-gradient(160px 160px at var(--x,50%) var(--y,50%), rgba(232,180,168,0.25), transparent 70%)'
        }}
      />
    </div>
  );
}

export default function ServicesPage() {
  const fadeUp = useFadeUp();

  const menuItems = [
    { label: 'Home', href: '/', rotation: -8, hoverStyles: { bgColor: '#FFB5A7', textColor: '#FFFFFF' } },
    { label: 'About', href: '/about', rotation: 8, hoverStyles: { bgColor: '#FCD5CE', textColor: '#57534E' } },
    { label: 'Services', href: '/services', rotation: -8, hoverStyles: { bgColor: '#FEC89A', textColor: '#57534E' } },
    { label: 'Contact', href: '#', rotation: 8, hoverStyles: { bgColor: '#F9DCC4', textColor: '#57534E' } }
  ];

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
              <span>Your Path to Purpose-Driven Momentum</span>
            </div>
            <h1
              className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mt-4"
              style={{ color: pastel.text }}
            >
              Services that turn clarity into{' '}
              <BrushStrokeHighlight height="0.9em" waveWidthPercent={60} animationDuration="28s" blurred>
                unstoppable action
              </BrushStrokeHighlight>
            </h1>
            <p className="font-lato text-lg leading-relaxed opacity-90 mt-4" style={{ color: pastel.text }}>
              Three ways to work together—each designed for ambitious Muslim women to move past overwhelm,
              build faith-aligned systems, and grow with peace.
            </p>
          </motion.div>
        </div>

        {/* ribbon stats */}
        <div className="mt-10 bg-gradient-to-r from-[#fde2e4] via-[#fad2e1] to-[#f9dcc4]">
          <div className={`${container} py-5 grid grid-cols-3 gap-4 text-center`}>
            {[
              ['High-impact 1:1', 'Immediate clarity'],
              ['Sisterhood events', 'Warm, strategic community'],
              ['6-week cohort', 'Holistic success']
            ].map(([a, b], i) => (
              <motion.div key={i} whileHover={{ y: -3 }} className="select-none">
                <div className="font-playfair text-xl sm:text-2xl">{a}</div>
                <div className="text-xs sm:text-sm font-lato opacity-70">{b}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS — elevated card design */}
      <section className={`${container} ${sectionY}`}>
        <div className="grid gap-6 md:gap-7 lg:gap-8 md:grid-cols-3">
          <TierCard
            icon={<Compass className="h-6 w-6" />}
            label="Tier 1"
            title="Clarity & Strategy Session"
            blurb="A single, high-impact 1:1 to dissolve an urgent block, get laser clarity, and leave with a micro-plan."
            bullets={[
              'Pin-point the real problem (not the loudest symptom)',
              'Resources + 7-day micro-plan',
              'Faith-conscious, compassionate guidance'
            ]}
            ctaText="Book a Session"
            ctaIcon={<ArrowRightIcon />}
            accent="from-[#fde2e4] to-white"
          />

          {/* Tier 2 — EXACT styling, just renamed + linked */}
          <TierCard
            icon={<Users className="h-6 w-6" />}
            label="Tier 2"
            title="Workshops"
            blurb="Browse our upcoming workshops — attend online or in person. Build real sisterhood while gaining strategic clarity in a warm, faith-aligned space."
            bullets={[
              'Upcoming dates with limited seats',
              'Online and In-Person formats',
              'Connection, learning, and gentle accountability'
            ]}
            ctaText="Browse Workshops"
            ctaHref="/events"
            ctaVariant="outline"
            accent="from-[#fde2e4] to-white"
          />

          <TierCard
            icon={<Crown className="h-6 w-6" />}
            label="Tier 3"
            title="The Golden Purl Success Formula"
            blurb="A 6-week transformation that dissolves Imposter Syndrome and fear of failure while installing a step-by-step navigation system."
            bullets={[
              'Mindset re-patterning (NLP + gentle systems)',
              'Weekly milestones & accountability',
              'Clear, blessed roadmap by week 6'
            ]}
            ctaText="Join Waitlist"
            ctaIcon={<ArrowRightIcon />}
            accent="from-[#fde2e4] to-white"
          />
        </div>
      </section>

      {/* INFOGRAPHIC / FUNNEL EXPLAINER */}
      <section className={`${container} ${sectionY}`}>
        <motion.div
          {...fadeUp}
          className="rounded-3xl p-6 sm:p-8 shadow-sm ring-1"
          style={{
            background: 'linear-gradient(175deg, #f8edeb 0%, #fde2e4 60%, #fad2e1 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            borderColor: 'rgba(232,180,168,0.35)'
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h2 className="font-playfair text-3xl md:text-4xl" style={{ color: pastel.text }}>How the Journey Flows</h2>
            <Badge>Faith-aligned Path</Badge>
          </div>
          <p className="font-lato opacity-90 max-w-3xl mt-3" style={{ color: pastel.text }}>
            After three connection workshops (~60 days apart), you’ll have priority access to the 6-week cohort.
            Prefer online or in-person? Choose the rhythm that honours your season.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[{
              icon: <Users className="h-5 w-5" />, title: 'Attend 3 Events', text: 'Signature workshops spaced ~60 days apart for momentum & community.'
            },{
              icon: <ListChecks className="h-5 w-5" />, title: 'Get on the List', text: 'Join the waitlist any time — secure priority access to the cohort.'
            },{
              icon: <Target className="h-5 w-5" />, title: 'Commit to 6 Weeks', text: 'Clarity, mindset, and systems — in a faith-aligned container.'
            }].map((s, i) => (
              <div key={i} className="rounded-2xl bg-white/75 backdrop-blur p-5 flex items-start gap-3 shadow-sm ring-1"
                   style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
                <div className="h-10 w-10 grid place-items-center rounded-full bg-[color:var(--subtle-accent,#FCD5CE)]/70 text-[color:var(--text-color,#57534E)]">
                  {s.icon}
                </div>
                <div>
                  <div className="font-playfair text-lg" style={{ color: pastel.text }}>{s.title}</div>
                  <div className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Options/outcomes */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="border-0 bg-white/75 rounded-2xl ring-1" style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
              <CardHeader className="pb-2"><CardTitle className="font-playfair" style={{ color: pastel.text }}>Your Options</CardTitle></CardHeader>
              <CardContent className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
                <p>• Attend all three events → join the next cohort with priority.</p>
                <p>• Join the waitlist any time (reserve your place early).</p>
                <p>• Choose <strong>Online</strong> or <strong>In-Person</strong> at each step.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/75 rounded-2xl ring-1" style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
              <CardHeader className="pb-2"><CardTitle className="font-playfair" style={{ color: pastel.text }}>What You’ll Leave With</CardTitle></CardHeader>
              <CardContent className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
                <p>• Unshakeable mindset rooted in Tawakkul</p>
                <p>• A clear, loving roadmap tailored to your reality</p>
                <p>• Systems & boundaries that protect your peace</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className={`${container} ${sectionY}`}>
        <Card className="border-0 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-8 bg-white">
              <h3 className="font-playfair text-3xl mb-3" style={{ color: pastel.text }}>Ready to Secure Your Future?</h3>
              <p className="font-lato opacity-90 mb-6" style={{ color: pastel.text }}>
                Demand is high for the Golden Purl Success Formula. Join the waitlist to receive priority access and cohort dates.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6 transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}>
                <Link href="/waitlist">Join the Waitlist <ArrowRightIcon /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 border-2" style={{ borderColor: pastel.accent, color: pastel.text }}>
                <Link href="/events">See Upcoming Events</Link>
              </Button>
              </div>
            </div>
            <div className="relative p-8" style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}>
              <div className="absolute -inset-5 -z-10 blur-3xl opacity-50" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${pastel.subtle}, transparent)` }} />
              <div className="h-full w-full rounded-2xl bg-white/70 backdrop-blur grid place-items-center text-center p-6 ring-1"
                   style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
                <div className="font-playfair text-2xl" style={{ color: pastel.text }}>“Profit with peace. Strategy with softness.”</div>
                <div className="mt-4 w-full">
                  {/* <ImagePlaceholder ratio="16/9" /> */}
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

/* ————— helpers ————— */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1"
      style={{ color: pastel.text, backgroundColor: 'rgba(232,180,168,0.10)', borderColor: 'rgba(232,180,168,0.35)' }}
    >
      <Star className="h-3.5 w-3.5" /> {children}
    </div>
  );
}

function ArrowRightIcon() {
  return <span className="ml-2 inline-block">→</span>;
}

function TierCard({
  icon,
  label,
  title,
  blurb,
  bullets,
  ctaText,
  ctaIcon,
  ctaVariant = 'solid',
  ctaHref,
  accent
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  blurb: string;
  bullets: string[];
  ctaText: string;
  ctaIcon?: React.ReactNode;
  ctaVariant?: 'solid' | 'outline';
  ctaHref?: string;
  accent: string; // e.g. 'from-[#fde2e4] to-white'
}) {
  const ButtonInner = (
    <>
      {ctaText} {ctaIcon}
    </>
  );

  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card
        className={`rounded-3xl border-0 shadow-md hover:shadow-lg transition-shadow ring-1 overflow-hidden bg-white/85 backdrop-blur`}
        style={{ borderColor: 'rgba(232,180,168,0.28)' }}
      >
        <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--subtle-accent,#FCD5CE)]/70 text-[color:var(--text-color,#57534E)]">
                {icon}
              </div>
              <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: pastel.text }}>{label}</span>
            </div>
          </div>
          <CardTitle className="font-playfair text-2xl mt-2" style={{ color: pastel.text }}>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <ImagePlaceholder ratio="16/9" /> */}
          <p className="font-lato text-sm opacity-90" style={{ color: pastel.text }}>{blurb}</p>
          <ul className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="pt-1">
            {ctaHref ? (
              <Button asChild className="rounded-full px-6 transition-transform hover:scale-[1.02]"
                      variant={ctaVariant === 'outline' ? 'outline' : undefined}
                      style={ctaVariant === 'outline'
                        ? { borderColor: pastel.accent, color: pastel.text }
                        : { backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}>
                <Link href={ctaHref}>{ButtonInner}</Link>
              </Button>
            ) : (
              <Button asChild className="rounded-full px-6 transition-transform hover:scale-[1.02]"
                      variant={ctaVariant === 'outline' ? 'outline' : undefined}
                      style={ctaVariant === 'outline'
                        ? { borderColor: pastel.accent, color: pastel.text }
                        : { backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}>
                <Link href={ctaVariant === 'outline' ? '/events' : '/waitlist'}>
                  {ButtonInner}
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
