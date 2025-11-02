'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import BrushStrokeHighlight from './BrushStrokeHighlight';
import { CheckCircle2 } from 'lucide-react';

const pastel = {
  accent: 'var(--highlight-color, #e8b4a8)',
  text: 'var(--text-color, #57534E)',
  subtle: 'var(--subtle-accent, #FCD5CE)',
};

const painPoints = [
  'Feeling stuck in the same place for a long time',
  'Struggling with consistency or commitment',
  'Tired of that one goal not happening',
  'Tired of comparing yourself to others',
  'Signing up for too much and not finishing on time',
  'Hard to track business/client progress consistently',
  'Procrastination + frustrating time management',
  'Wanting balance so life/business stay organised & calm',
];

export default function ShiftToSuccess() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.set(content, { autoAlpha: 0, y: 40 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.to(content, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' });
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20"
    >
      {/* soft backdrop */}
      <div className="relative isolate">
        <div
          className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(252,213,206,0.55), transparent 60%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-10 h-80 w-80 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(250,210,225,0.5), transparent 65%)' }}
        />

        <div
          ref={contentRef}
          className="rounded-[28px] ring-1 shadow-sm bg-white/80 backdrop-blur px-5 sm:px-8 py-8 md:py-10"
          style={{ borderColor: 'rgba(232,180,168,0.28)' }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2
              className="font-playfair text-3xl sm:text-4xl leading-tight tracking-tight"
              style={{ color: pastel.text }}
            >
              It’s time for your{' '}
              <span className="align-middle">
                <BrushStrokeHighlight height="0.9em" waveWidthPercent={60} animationDuration="26s" blurred>
                  Shift to Success
                </BrushStrokeHighlight>
              </span>
            </h2>

            <p
              className="font-lato text-base sm:text-lg leading-relaxed opacity-90 mt-4"
              style={{ color: pastel.text }}
            >
              Let’s be honest — real growth starts by acknowledging where we’re stuck.
              Does any of this sound familiar?
            </p>
          </div>

          {/* grid of pains */}
          <ul className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2">
            {painPoints.map((point, i) => (
              <li
                key={i}
                className="group flex items-start gap-3 rounded-2xl p-4 sm:p-5 bg-white/80 ring-1 shadow-xs hover:shadow-md transition-shadow"
                style={{ borderColor: 'rgba(232,180,168,0.22)' }}
              >
                <div
                  className="mt-0.5 grid h-9 w-9 place-items-center rounded-full shrink-0"
                  style={{ backgroundColor: 'rgba(232,180,168,0.18)', color: pastel.text }}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span
                  className="font-lato text-[15px] sm:text-base leading-relaxed"
                  style={{ color: pastel.text }}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* conclusion */}
          <div className="mt-8 sm:mt-10 text-center">
            <p className="font-lato opacity-90" style={{ color: pastel.text }}>
              If you nodded along to any of these, you’re not alone. And more importantly…
            </p>
            <h3
              className="font-playfair text-2xl sm:text-3xl mt-2"
              style={{ color: pastel.text }}
            >
              You are in the right place.
            </h3>
          </div>

          {/* petite CTA — added at the very end */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <a
              href="/book-clarity-session"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-transform"
              style={{
                backgroundColor: 'var(--cta-color,#FFB5A7)',
                color: 'var(--cta-text-color,#fff)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 22px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow, 0 6px 16px rgba(0,0,0,0.06))';
              }}
              aria-label="Book a 1:1 session with Hirah"
            >
              Book a 1-to-1 Session with Hirah&nbsp;→
            </a>
          </div>
          {/* /petite CTA */}
        </div>
      </div>
    </section>
  );
}
