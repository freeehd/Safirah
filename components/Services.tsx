'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, Users, Crown, CheckCircle2 } from 'lucide-react';

const pastel = {
  accent: 'var(--highlight-color, #eb4a8)',
  text: 'var(--text-color, #s)',
  subtle: 'var(--subtle-accent, #s)',
};

type Props = {
  className?: string;
  /** Tier-1 CTA handler (Book a Session) */
  onTier1?: () => void;
  /** Tier-2 CTA href (Workshops listing) */
  tier2Href?: string; // default: '/events'
  /** Tier-3 CTA handler (Join Waitlist) */
  onTier3?: () => void;
};

function useFadeUp() {
  const prefersReduced = useReducedMotion();
  return {
    initial: { opacity: 0, y: prefersReduced ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: prefersReduced ? 0 : 0.5, ease: 'easeOut' },
  } as const;
}

export default function MiniServices({
  className = '',
  onTier1,
  tier2Href = '/events',
  onTier3,
}: Props) {
  const fadeUp = useFadeUp();

  return (
    <section className={`mx-auto max-w-7xl px-5 sm:px-8 py-12 ${className}`}>
      {/* Header */}
      <motion.div
        {...fadeUp}
        className="text-center max-w-3xl mx-auto"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm"
          style={{ borderColor: pastel.accent, backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
          <span>Your Path to Purpose-Driven Momentum</span>
        </div>
        <h2
          className="font-playfair text-3xl sm:text-4xl leading-tight tracking-tight mt-3"
          style={{ color: pastel.text }}
        >
          Ways to work together
        </h2>
        <p className="font-lato text-sm sm:text-base opacity-90 mt-3" style={{ color: pastel.text }}>
          Three tiers to meet you where you are — clarity, community, and a 6-week transformation.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Tier 1 */}
        <motion.div whileHover={{ y: -6 }} {...fadeUp}>
          <Card
            className="rounded-3xl border-0 shadow-md hover:shadow-lg transition-shadow ring-1 overflow-hidden bg-white/85 backdrop-blur"
            style={{ borderColor: 'rgba(232,180,168,0.28)' }}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#fde2e4] to-white" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--subtle-accent,#FCD5CE)]/70 text-[color:var(--text-color,#57534E)]">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: pastel.text }}>Tier 1</span>
              </div>
              <CardTitle className="font-playfair text-2xl mt-2" style={{ color: pastel.text }}>
                Clarity & Strategy Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-lato text-sm opacity-90" style={{ color: pastel.text }}>
                High-impact 1:1 to dissolve an urgent block and leave with a 7-day micro-plan.
              </p>
              <ul className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
                {[
                  'Pin-point the real problem',
                  'Resources + micro-plan',
                  'Faith-conscious guidance',
                ].map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
              
                   <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-10 border-2"
                    style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}
                >
                  <a href="/contact">Book Consultation</a>
                </Button>

              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tier 2 */}
        <motion.div whileHover={{ y: -6 }} {...fadeUp}>
          <Card
            className="rounded-3xl border-0 shadow-md hover:shadow-lg transition-shadow ring-1 overflow-hidden bg-white/85 backdrop-blur"
            style={{ borderColor: 'rgba(232,180,168,0.28)' }}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#fde2e4] to-white" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--subtle-accent,#FCD5CE)]/70 text-[color:var(--text-color,#57534E)]">
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: pastel.text }}>Tier 2</span>
              </div>
              <CardTitle className="font-playfair text-2xl mt-2" style={{ color: pastel.text }}>
                Upcoming Workshops
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-lato text-sm opacity-90" style={{ color: pastel.text }}>
                Sisterhood + strategy. Attend online or in-person. Limited seats each date.
              </p>
              <ul className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
                {[
                  'Warm, faith-aligned community',
                  'Real connection & clarity',
                  'Online & In-Person options',
                ].map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-10 border-2"
                  style={{ borderColor: pastel.accent, color: pastel.text }}
                >
                  <a href={tier2Href}>Browse Workshops</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tier 3 */}
        <motion.div whileHover={{ y: -6 }} {...fadeUp}>
          <Card
            className="rounded-3xl border-0 shadow-md hover:shadow-lg transition-shadow ring-1 overflow-hidden bg-white/85 backdrop-blur"
            style={{ borderColor: 'rgba(232,180,168,0.28)' }}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#fde2e4] to-white" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--subtle-accent,#FCD5CE)]/70 text-[color:var(--text-color,#57534E)]">
                  <Crown className="h-6 w-6" />
                </div>
                <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: pastel.text }}>Tier 3</span>
              </div>
              <CardTitle className="font-playfair text-2xl mt-2" style={{ color: pastel.text }}>
                Golden Purl Success Formula
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-lato text-sm opacity-90" style={{ color: pastel.text }}>
                A 6-week inside-out transformation: mindset re-patterning + a clear, blessed roadmap.
              </p>
              <ul className="font-lato text-sm opacity-90 space-y-2" style={{ color: pastel.text }}>
                {[
                  'NLP + gentle systems',
                  'Weekly milestones & accountability',
                  'Roadmap by week 6',
                ].map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
              
                   <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-10 border-2"
                    style={{ backgroundColor: 'var(--cta-color,#FFB5A7)', color: 'var(--cta-text-color,#fff)' }}
                >
                  <a href={tier2Href}>Join Waitlist</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
