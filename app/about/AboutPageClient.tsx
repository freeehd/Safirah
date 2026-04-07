'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Footer from '@/components/Footer';
import BrushStrokeHighlight from '@/components/BrushStrokeHighlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2, HeartHandshake, Compass, Sparkles, BookOpenCheck,
  Target, Crown, Users, Shield, Leaf, Camera
} from 'lucide-react';
import CircularGallery from '@/components/CircularGallery';

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

export default function AboutPageClient() {
  const fadeUp = useFadeUp();

  const menuItems = [
    { label: 'Home', href: '/', rotation: -8, hoverStyles: { bgColor: '#FFB5A7', textColor: '#FFFFFF' } },
    { label: 'About', href: '/about', rotation: 8, hoverStyles: { bgColor: '#FCD5CE', textColor: '#57534E' } },
    { label: 'Services', href: '/services', rotation: -8, hoverStyles: { bgColor: '#FEC89A', textColor: '#57534E' } },
    { label: 'Contact', href: '/contact', rotation: 8, hoverStyles: { bgColor: '#F9DCC4', textColor: '#57534E' } }
  ];

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* floating blobs */}
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
            {/* Text */}
            <motion.div {...fadeUp} className="space-y-6">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm"
                style={{ borderColor: pastel.accent, backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
                <span className="tracking-wide">From struggle to soft power</span>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight" style={{ color: pastel.text }}>
                Meet{' '}
                <BrushStrokeHighlight height="0.9em" waveWidthPercent={60} animationDuration="28s" blurred>
                  Hirah Safi
                </BrushStrokeHighlight>
                — Life & Success Coach
              </h1>

              <p className="font-lato text-lg leading-relaxed opacity-90 max-w-prose" style={{ color: pastel.text }}>
                I know what it's like for a dream to feel under siege. For three years I lived inside a stuck mindset —
                self-doubt, anxiety, unhealthy boundaries, and financial strain. Healing took more than knowledge; it
                required deep commitment, gentle discipline, and faith.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="rounded-full px-6 transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}>
                  <a href="/services">Start Your Shift</a>
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-2"
                        style={{ borderColor: pastel.accent, color: pastel.text, backgroundColor: 'rgba(232,180,168,0.08)' }}>
                  <a href="/contact">Book Consultation</a>
                </Button>
              </div>
            </motion.div>

            {/* Image card */}
            <motion.div {...fadeUp} className="relative group">
              <div
                className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-50 transition-transform group-hover:scale-105"
                style={{ background: `radial-gradient(60% 60% at 50% 50%, ${pastel.subtle}, transparent)` }}
              />
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/70 backdrop-blur transition-transform group-hover:-translate-y-1">
                <CardContent className="p-2">
                  <div className="relative group rounded-2xl overflow-hidden ring-1 ring-white/40">
                    <img
                      src="/assets/5.webp"
                      alt="Hirah Safi - Faith-aligned life and success coach for Muslim women entrepreneurs in Toronto"
                      className="w-full h-[58vh] sm:h-[64vh] lg:h-[620px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(220px 220px at 20% 20%, rgba(232,180,168,0.18), transparent 60%), radial-gradient(200px 200px at 80% 80%, rgba(250,210,225,0.18), transparent 60%)'
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Floating note */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                className="absolute -bottom-6 -left-4 rounded-2xl px-4 py-3 shadow-md border"
                style={{ backgroundColor: pastel.accent, color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                <div className="text-xs sm:text-sm uppercase tracking-wider opacity-90">Faith • Clarity • Soft Power</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Ribbon stats */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }}
                    className="mt-10 bg-gradient-to-r from-[#fde2e4] via-[#fad2e1] to-[#f9dcc4]">
          <div className={`${container} py-6 grid grid-cols-3 gap-6 text-center`}>
            {[
              ['8+ yrs', 'Self-development research'],
              ['1:1 & NLP', 'Mindset re-patterning'],
              ['Women-first', 'Faith-aligned coaching']
            ].map(([a, b], i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="select-none">
                <div className="font-playfair text-2xl sm:text-3xl" style={{ color: pastel.text }}>{a}</div>
                <div className="text-xs sm:text-sm font-lato opacity-70" style={{ color: pastel.text }}>{b}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STORY + QUOTE */}
      <section className={`${container} ${sectionY} grid gap-10 md:grid-cols-5`}>
        <motion.div {...fadeUp} className="md:col-span-3 space-y-6">
          <h2 className="font-playfair text-3xl md:text-4xl" style={{ color: pastel.text }}>
            The Power of Mindset in Business & Life
          </h2>
          <p className="font-lato leading-relaxed opacity-90" style={{ color: pastel.text }}>
            My breakthrough arrived when I finally said: enough. Working with a life coach helped me see my purpose clearly
            for the first time. I stopped denying the love and value I wanted to give the world.
          </p>
          <p className="font-lato leading-relaxed opacity-90" style={{ color: pastel.text }}>
            I immersed myself not only in my craft but in the pillars of a healthy business:
            <strong> marketing, branding, and financial literacy</strong>. Across eight years and countless books, I built a
            gentle yet powerful toolkit to support women at every stage.
          </p>
          <p className="font-lato leading-relaxed opacity-90" style={{ color: pastel.text }}>
            When I chose the life I dreamed of, I became unstoppable. My calling is to walk beside you as you become
            who you're meant to be.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="md:col-span-2">
          <Card className="border-0 bg-white/70 shadow-sm rounded-3xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <blockquote className="font-playfair text-2xl leading-snug" style={{ color: pastel.text }}>
                "Strategy blooms when it's paired with softness. True change is gentle, consistent, and full of faith."
              </blockquote>
            </CardContent>
          </Card>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <Card className="border-0 bg-white/70 shadow-sm rounded-3xl hover:shadow-md transition-shadow">
              <div className="p-2">
                <div className="relative group rounded-2xl overflow-hidden ring-1 ring-white/40">
                  <img
                    src="/assets/1.webp"
                    alt="Hirah Safi portrait - Life coach specializing in faith-aligned mindset coaching"
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(180px 180px at 75% 25%, rgba(232,180,168,0.18), transparent 65%)' }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* PILLARS */}
      <section className={`${container} pb-10`}>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: <HeartHandshake className="h-6 w-6" />, title: 'Compassionate Coaching', text: 'Kind accountability, safe pace, nervous-system aware.' },
            { icon: <BookOpenCheck className="h-6 w-6" />, title: 'Proven Toolkits', text: 'NLP, habit loops, boundary practice, reflective journaling.' },
            { icon: <Compass className="h-6 w-6" />, title: 'Aligned Strategy', text: 'Business pillars that serve your life — not consume it.' }
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -6 }}>
              <Card className="border-0 bg-white/90 rounded-2xl shadow-sm ring-1"
                    style={{ borderColor: 'rgba(232,180,168,0.28)' }}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="grid place-items-center h-10 w-10 rounded-full"
                       style={{ backgroundColor: pastel.subtle, color: pastel.text }}>
                    {item.icon}
                  </div>
                  <CardTitle className="font-playfair text-xl" style={{ color: pastel.text }}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PAIN & PLEASURE POINTS */}
      <section className={`${container} ${sectionY}`}>
        <h2 className="font-playfair text-3xl md:text-4xl text-center mb-10" style={{ color: pastel.text }}>
          She's not unambitious — she's under-supported
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Pain */}
          <motion.div {...fadeUp}>
            <Card className="border-0 bg-[#fff1f3] rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center gap-2" style={{ color: pastel.text }}>
                  <Shield className="h-5 w-5" /> Pain Points
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Item title="Mindset & Self-Worth Blocks" text="Imposter syndrome, harsh inner critic, comparison, scarcity, fear of judgment." />
                <Item title="Spiritual & Emotional Overwhelm" text="Crisis-based reliance on faith; doubts about whether financial desires are aligned with Allah's plan." />
                <Item title="Clarity & Sustainability" text="Month-to-month survival, fear of scaling, guilt when resting or taking time off." />
                <Item title="External Pressure" text="Over-explaining value, fear of raising prices, worry about being seen as 'greedy'." />
              </CardContent>
            </Card>
          </motion.div>

          {/* Pleasure */}
          <motion.div {...fadeUp}>
            <Card className="border-0 bg-[#f0fff6] rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center gap-2" style={{ color: pastel.text }}>
                  <Sparkles className="h-5 w-5" /> Pleasure Points (Her Vision)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Item icon={<CheckCircle2 className="h-4 w-4" />} title="Unshakeable Faith & Clarity" text="Tawakkul-rooted mindset, crystal strategy from idea to execution." />
                <Item icon={<Crown className="h-4 w-4" />} title="Confidence & Authority" text="Empress energy — price with peace, lead with ease." />
                <Item icon={<Users className="h-4 w-4" />} title="Nurturing Community" text="Faith-conscious sisterhood free of judgment and comparison." />
                <Item icon={<Leaf className="h-4 w-4" />} title="Sustainable, Purpose-Driven Success" text="Income with time freedom, inner peace, and barakah — with systems and boundaries." />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* images */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {["/assets/5.webp","/assets/2.webp","/assets/3.webp","/assets/4.webp"].map((src, idx) => (
            <Card key={idx} className="border-0 bg-[#f0fff6] rounded-3xl shadow-sm">
              <div className="p-2">
                <div className="relative group rounded-2xl overflow-hidden ring-1 ring-white/40">
                  <img
                    src={src}
                    alt={`Hirah Safi coaching session - ${['Coach portrait','Client success','Workshop moment','Community gathering'][idx]}`}
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(160px 160px at 50% 50%, rgba(232,180,168,0.16), transparent 65%)' }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className={`${container} pb-10`}>
        <motion.div
          {...fadeUp}
          className="grid md:grid-cols-4 gap-4 rounded-3xl p-6 shadow-sm"
          style={{ background: 'linear-gradient(175deg, #f8edeb 0%, #fde2e4 60%, #fad2e1 100%)' }}
        >
          {[
            { icon: <BookOpenCheck className="h-5 w-5" />, title: '1. Gentle Audit', text: 'We map blocks & patterns with compassion.' },
            { icon: <Target className="h-5 w-5" />, title: '2. Clear Targets', text: 'Define a faith-aligned plan you can trust.' },
            { icon: <Compass className="h-5 w-5" />, title: '3. Soft Execution', text: 'Systems & boundaries that protect your energy.' },
            { icon: <Sparkles className="h-5 w-5" />, title: '4. Sustain & Soften', text: 'Stability, peace, and consistent growth.' }
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="rounded-2xl bg-white/70 backdrop-blur p-5 flex items-start gap-3 shadow-sm">
              <div className="h-10 w-10 grid place-items-center rounded-full" style={{ backgroundColor: pastel.subtle, color: pastel.text }}>{s.icon}</div>
              <div>
                <div className="font-playfair text-lg" style={{ color: pastel.text }}>{s.title}</div>
                <div className="font-lato text-sm opacity-80" style={{ color: pastel.text }}>{s.text}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Card className="border-0 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3">
            <motion.div {...fadeUp} className="md:col-span-2 p-8 bg-white">
              <h3 className="font-playfair text-3xl mb-3" style={{ color: pastel.text }}>
                Ready to build a business that serves your life?
              </h3>
              <p className="font-lato opacity-90 mb-6" style={{ color: pastel.text }}>
                Let's re-pattern your mindset, clarify your strategy, and create gentle systems that protect your peace.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full px-6 transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}>
                  <a href="/contact">Book a Discovery Call</a>
                </Button>
               
                <Button variant="outline" className="rounded-full px-6 border-2"
                        style={{ borderColor: pastel.accent, color: pastel.text }}>
                  <a href="/services">See Coaching Packages</a>
                </Button>
                
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="relative p-8" style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}>
              <div className="absolute -inset-5 -z-10 blur-3xl opacity-50" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${pastel.subtle}, transparent)` }} />
              <div className="h-full w-full rounded-2xl bg-white/70 backdrop-blur grid place-items-center text-center p-6">
                <div className="font-playfair text-2xl" style={{ color: pastel.text }}>"Profit with peace. Strategy with softness."</div>
              </div>
            </motion.div>
          </div>
        </Card>
      </section>

      <Separator className="opacity-0" />
      <Footer />
    </div>
  );
}

/* ——— helpers ——— */

function Item({ title, text, icon }: { title: string; text: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      {icon ? (
        <div className="mt-1 text-[color:var(--text-color,#57534E)]">{icon}</div>
      ) : (
        <div className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--highlight-color,#e8b4a8)' }} />
      )}
      <div>
        <div className="font-lato font-semibold" style={{ color: 'var(--text-color,#57534E)' }}>{title}</div>
        <div className="font-lato text-sm opacity-80" style={{ color: 'var(--text-color,#57534E)' }}>{text}</div>
      </div>
    </div>
  );
}
