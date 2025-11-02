'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import BubbleMenu from '@/components/BubbleMenu';
import Footer from '@/components/Footer';
import BrushStrokeHighlight from '@/components/BrushStrokeHighlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, MapPin, Clock, Users, Camera, CheckCircle2, Star, Shield } from 'lucide-react';

const pastel = {
  accent: 'var(--highlight-color, #e8b4a8)',
  text: 'var(--text-color, #57534E)',
  subtle: 'var(--subtle-accent, #FCD5CE)',
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
      style={{ color: pastel.text, backgroundColor: 'rgba(232,180,168,0.10)', borderColor: 'rgba(232,180,168,0.35)' }}
    >
      {children}
    </div>
  );
}

function ImagePlaceholder({ ratio = '16/9' }: { ratio?: '1/1' | '4/3' | '16/9' }) {
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
        <Camera className="h-4 w-4 mr-2" /> Add hero image
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'radial-gradient(160px 160px at var(--x,50%) var(--y,50%), rgba(232,180,168,0.25), transparent 70%)' }}
      />
    </div>
  );
}

type Mode = 'Online' | 'In-Person' | 'Hybrid';

export default function GoldenPearlEventPage() {
  const fadeUp = useFadeUp();

  const menuItems = [
    { label: 'Home', href: '/', rotation: -8, hoverStyles: { bgColor: '#FFB5A7', textColor: '#FFFFFF' } },
    { label: 'About', href: '/about', rotation: 8, hoverStyles: { bgColor: '#FCD5CE', textColor: '#57534E' } },
    { label: 'Services', href: '/services', rotation: -8, hoverStyles: { bgColor: '#FEC89A', textColor: '#57534E' } },
    { label: 'Events', href: '/events', rotation: 8, hoverStyles: { bgColor: '#F9DCC4', textColor: '#57534E' } }
  ];

  // Booking form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<Mode>('Hybrid');
  const [variant, setVariant] = useState<'online'|'inperson'>('online'); // for price selection
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');

  async function handleCheckout() {
    if (!fullName || !email) {
      alert('Please enter your name and email.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: 'golden-pearl',
          variant, // 'online' or 'inperson'
          customer: { name: fullName, email },
          metadata: { mode, note }
        }),
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (e:any) {
      console.error(e);
      alert('Could not start checkout. Please try again or contact us.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
    

      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* backdrop blobs */}
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
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div {...fadeUp} className="space-y-6">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm"
                style={{ borderColor: pastel.accent, backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
                <span>Flagship Event</span>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight" style={{ color: pastel.text }}>
                The{' '}
                <BrushStrokeHighlight height="0.9em" waveWidthPercent={60} animationDuration="28s" blurred>
                  Golden Pearl
                </BrushStrokeHighlight>{' '}
                Experience
              </h1>

              <p className="font-lato text-lg leading-relaxed opacity-90 max-w-prose" style={{ color: pastel.text }}>
                A transformational gathering for ambitious Muslim women to dissolve inner blocks, deepen Tawakkul,
                and craft a loving, practical roadmap — with sisterhood, structure, and real clarity.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 text-sm font-lato">
                <InfoPill icon={<CalendarDays className="h-4 w-4" />} text="Next date: TBA — join waitlist" />
                <InfoPill icon={<Clock className="h-4 w-4" />} text="Half-day intensive" />
                <InfoPill icon={<MapPin className="h-4 w-4" />} text="Hybrid — Islamabad + Zoom" />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-50"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${pastel.subtle}, transparent)` }}
              />
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/70 backdrop-blur">
                <CardContent className="p-3">
                  {/* <ImagePlaceholder /> */}
                </CardContent>
              </Card>
              <div className="mt-3 flex items-center gap-2">
                <Badge><Star className="h-3.5 w-3.5" /> Women-First</Badge>
                <Badge>Faith-Aligned</Badge>
                <Badge>Gentle Pace</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL EXPERIENCE */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Mindset Re-patterning', 'NLP-informed tools to soften the inner critic and build calm confidence.'],
            ['Aligned Strategy', 'Clarity on priorities, boundaries, and a plan you can actually follow.'],
            ['Sisterhood & Support', 'A warm, faith-conscious space to be seen, held and celebrated.'],
          ].map(([title, text], i) => (
            <Feature key={i} title={title} text={text} />
          ))}
        </div>
      </section>

      {/* BOOK NOW (FORM + PRICES) */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid gap-8 md:grid-cols-5">
          <Card className="md:col-span-3 border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
                style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
            <CardHeader>
              <CardTitle className="font-playfair text-3xl" style={{ color: pastel.text }}>Book Your Spot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>Full Name</label>
                  <input
                    className="mt-1 w-full rounded-xl border px-4 py-2 bg-white/70"
                    style={{ borderColor: 'rgba(232,180,168,0.35)', color: pastel.text }}
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>Email</label>
                  <input
                    className="mt-1 w-full rounded-xl border px-4 py-2 bg-white/70"
                    style={{ borderColor: 'rgba(232,180,168,0.35)', color: pastel.text }}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>Attendance Mode</label>
                  <select
                    className="mt-1 w-full rounded-xl border px-4 py-2 bg-white/70"
                    style={{ borderColor: 'rgba(232,180,168,0.35)', color: pastel.text }}
                    value={mode}
                    onChange={(e) => setMode(e.target.value as Mode)}
                  >
                    <option>Hybrid</option>
                    <option>Online</option>
                    <option>In-Person</option>
                  </select>
                </div>
                <div>
                  <label className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>Note (optional)</label>
                  <input
                    className="mt-1 w-full rounded-xl border px-4 py-2 bg-white/70"
                    style={{ borderColor: 'rgba(232,180,168,0.35)', color: pastel.text }}
                    placeholder="Anything you want us to know"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <small className="font-lato opacity-70" style={{ color: pastel.text }}>
                  We’ll email the Zoom link or venue details after checkout.
                </small>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 grid gap-4">
            {/* Online price */}
            <PriceCard
              title="Online Pass"
              price="₨ 4,500"
              bullets={['Half-day access', 'Downloadable workbook', 'Zoom replay (7 days)']}
              active={variant === 'online'}
              onSelect={() => setVariant('online')}
            />
            {/* In-person price */}
            <PriceCard
              title="In-Person Pass"
              price="₨ 9,000"
              bullets={['Half-day access', 'Printed workbook', 'Light refreshments']}
              active={variant === 'inperson'}
              onSelect={() => setVariant('inperson')}
            />
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="rounded-full px-6 h-11 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}
            >
              {loading ? 'Starting checkout…' : 'Proceed to Payment →'}
            </Button>
            <p className="text-xs font-lato opacity-70" style={{ color: pastel.text }}>
              Secured by Stripe. You’ll receive an instant confirmation email.
            </p>
          </div>
        </div>
      </section>

      {/* AGENDA / WHAT HAPPENS INSIDE */}
      <section className={`${container} ${sectionY} pt-0`}>
        <Card className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
              style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
          <CardHeader className="pb-2">
            <CardTitle className="font-playfair text-3xl" style={{ color: pastel.text }}>Inside the Experience</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {[
              ['Arrival & Intention', 'Gentle grounding, introductions, and intention setting.'],
              ['Softening the Inner Critic', 'NLP-informed reframing and calm nervous-system practice.'],
              ['Aligned Road-mapping', 'Clarify targets, boundaries, and 30-day micro-plan.'],
            ].map(([t, d], i) => (
              <div key={i} className="rounded-2xl bg-white/75 backdrop-blur p-5 shadow-sm ring-1"
                   style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
                <div className="font-playfair text-lg" style={{ color: pastel.text }}>{t}</div>
                <div className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>{d}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* GUARANTEE / SAFETY */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 bg-[#f0fff6] rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl flex items-center gap-2" style={{ color: pastel.text }}>
                <Shield className="h-5 w-5" /> Gentle-Pace Promise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Item title="Kind, faith-conscious facilitation" text="No force, no shame — only clarity and calm accountability." />
              <Item title="Beginner-friendly" text="You don’t need prior coaching experience to benefit." />
              <Item title="Real outcomes" text="Leave with a 30-day roadmap you can follow without burnout." />
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/85 backdrop-blur ring-1 rounded-3xl"
                style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl" style={{ color: pastel.text }}>FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-lato text-sm" style={{ color: pastel.text }}>
              <p><strong>Is it suitable if I’m very early-stage?</strong> Yes — the tools are gentle, universal, and practical.</p>
              <p><strong>Will I get recordings?</strong> Online pass includes 7-day replay; in-person includes workbook.</p>
              <p><strong>Refunds?</strong> If you can’t attend, we’ll transfer you to the next Golden Pearl date.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="opacity-0" />
      <Footer />
    </div>
  );
}

/* ——— small components ——— */

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full px-3 py-2 text-xs ring-1 bg-white/70 backdrop-blur"
         style={{ borderColor: 'rgba(232,180,168,0.28)', color: pastel.text }}>
      {icon} <span>{text}</span>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card className="border-0 bg-white/90 rounded-2xl shadow-sm ring-1"
            style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
        <CardHeader className="pb-1">
          <CardTitle className="font-playfair text-xl" style={{ color: pastel.text }}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>{text}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PriceCard({
  title, price, bullets, active, onSelect
}: {
  title: string; price: string; bullets: string[]; active?: boolean; onSelect?: () => void;
}) {
  return (
    <button onClick={onSelect} type="button" className="text-left">
      <Card className={`rounded-2xl ring-1 transition-all ${active ? 'shadow-lg bg-white' : 'bg-white/85'} `}
            style={{ borderColor: active ? 'rgba(232,180,168,0.6)' : 'rgba(232,180,168,0.28)' }}>
        <CardHeader className="pb-2">
          <CardTitle className="font-playfair text-xl flex items-baseline justify-between" style={{ color: pastel.text }}>
            {title} <span className="text-lg font-normal opacity-80">{price}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
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
      <div className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--highlight-color,#e8b4a8)' }} />
      <div>
        <div className="font-lato font-semibold" style={{ color: 'var(--text-color,#57534E)' }}>{title}</div>
        <div className="font-lato text-sm opacity-80" style={{ color: 'var(--text-color,#57534E)' }}>{text}</div>
      </div>
    </div>
  );
}
