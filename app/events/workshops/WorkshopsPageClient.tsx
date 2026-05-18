'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Workshop {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  slug: string;
  isTBA?: boolean;
}

const workshops: Workshop[] = [
  {
    title: 'Business with Barakah',
    date: '15 Jan 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'Virtual Workshop',
    description: 'Align your business strategy with Islamic principles for sustainable growth. Covers ethical practices, intentional goal-setting, and impact-driven enterprise.',
    slug: 'business-with-barakah',
  },
  {
    title: 'Clarity & Vision Intensive',
    date: '22 Feb 2026',
    time: '11:00 AM – 3:00 PM',
    location: 'London · In Person',
    description: 'Gain crystal clarity on your vision through guided exercises and sisterhood discussions. Develop a roadmap aligned with your deepest values.',
    slug: 'clarity-vision-intensive',
  },
  {
    title: 'Launch with Tawakkul',
    date: '10 Mar 2026',
    time: '9:00 AM – 1:00 PM',
    location: 'Virtual Workshop',
    description: 'Overcome perfectionism and launch with confidence. Blends practical launch strategies with spiritual grounding in tawakkul.',
    slug: 'launch-with-tawakkul',
  },
  {
    title: 'Sisterhood & Systems',
    date: '5 Apr 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Birmingham · In Person',
    description: 'Build sustainable systems while nurturing meaningful connections. Operational excellence meets community among Muslim women entrepreneurs.',
    slug: 'sisterhood-systems',
  },
  {
    title: 'The Mindful Marketer',
    date: '18 May 2026',
    time: '11:00 AM – 2:00 PM',
    location: 'Virtual Workshop',
    description: 'Ethical marketing that feels authentic and aligned. Grow your audience without compromising your values.',
    slug: 'mindful-marketer',
    isTBA: true,
  },
];

const DUR = 680;

export default function WorkshopsPageClient() {
  const [leftIdx, setLeftIdx] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [flipRotation, setFlipRotation] = useState(0);

  const getRightIdx = () => leftIdx + 1;

  const CoverLeft = () => (
    <div className="w-full h-full bg-[#8B6B5E] flex flex-col items-center justify-center text-center p-8 rounded-l-md relative">
      <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[#D4AF37]/40" />
      <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[#D4AF37]/40" />
    </div>
  );

  const CoverRight = () => (
    <div className="w-full h-full bg-[#8B6B5E] flex flex-col items-center justify-center text-center p-8 rounded-r-md relative">
      <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/40" />
      <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/40" />
      <div className="w-12 h-px bg-white/30 mb-3" />
      <h2 className="font-serif text-lg text-white tracking-widest mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
        Workshops
      </h2>
      <p className="italic text-white/60 text-xs mb-3" style={{ fontFamily: 'EB Garamond, serif' }}>
        A sacred collection
      </p>
      <div className="w-12 h-px bg-white/30 mb-3" />
      <button
        onClick={() => go(1)}
        className="text-[0.45rem] tracking-[0.25em] uppercase text-white/60 hover:text-white bg-none border-none cursor-pointer"
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        Open to Explore
      </button>
    </div>
  );

  const WorkshopPage = ({ idx }: { idx: number }) => {
    if (idx < 0 || idx >= workshops.length) return null;
    const w = workshops[idx];
    return (
      <div className="w-full h-full bg-[#FDFBF8] relative overflow-hidden rounded-r-md">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(139,107,94,0.07) 28px)',
          }}
        />
        <div className="absolute inset-0 p-5 overflow-y-auto flex flex-col text-xs">
          <div className="text-[0.45rem] tracking-widest uppercase text-[#8B6B5E] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
            Workshop {idx + 1}
          </div>
          <h3 className="font-bold text-sm text-[#3d2b1f] mb-2 leading-snug">{w.title}</h3>
          <div className="h-px bg-[#8B6B5E]/15 mb-2" />

          <div className="text-[#7a6155] space-y-1 mb-2">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={13} className="text-[#8B6B5E] flex-shrink-0" />
              <span>{w.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#8B6B5E] flex-shrink-0" />
              <span>{w.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#8B6B5E] flex-shrink-0" />
              <span>{w.location}</span>
            </div>
          </div>

          <p className="italic text-[#7a6155] leading-relaxed border-t border-[#8B6B5E]/10 pt-2 mb-4 flex-1 line-clamp-5">
            {w.description}
          </p>

          {w.isTBA ? (
            <div className="text-[0.46rem] tracking-widest uppercase text-gray-400" style={{ fontFamily: 'Cinzel, serif' }}>
              Coming Soon
            </div>
          ) : (
            <Link
              href={`/events/${w.slug}`}
              className="text-[0.47rem] tracking-[0.2em] uppercase text-[#8B6B5E] hover:text-[#6B5A47] flex items-center gap-1 no-underline"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Learn More <ArrowRight size={11} />
            </Link>
          )}

          <div className="text-[0.62rem] text-[#c4a98e] tracking-widest mt-auto">
            {idx + 1} / {workshops.length}
          </div>
        </div>
      </div>
    );
  };

  const EndRight = () => (
    <div className="w-full h-full bg-[#7a5248] flex flex-col items-center justify-center text-center p-8 rounded-r-md relative">
      <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/40" />
      <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/40" />
      <div className="w-12 h-px bg-white/30 mb-3" />
      <h3 className="text-base text-white tracking-widest mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
        Barakah Awaits
      </h3>
      <p className="italic text-white/60 text-xs max-w-[170px] mb-3" style={{ fontFamily: 'EB Garamond, serif' }}>
        Join our sacred space of learning, growth, and sisterhood.
      </p>
      <div className="w-12 h-px bg-white/30 mb-3" />
      <button
        onClick={() => go(-1)}
        className="text-[0.45rem] tracking-[0.25em] uppercase text-white/60 hover:text-white bg-none border-none cursor-pointer"
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        ← Go Back
      </button>
    </div>
  );

  const getLeftContent = () => {
    if (leftIdx === -1) return <CoverLeft />;
    if (leftIdx >= workshops.length) return <div className="w-full h-full bg-[#7a5248] rounded-l-md" />;
    return <WorkshopPage idx={leftIdx} />;
  };

  const getRightContent = () => {
    const ri = getRightIdx();
    if (ri <= 0) return <CoverRight />;
    if (ri > workshops.length) return <EndRight />;
    return <WorkshopPage idx={ri} />;
  };

  const go = (dir: number) => {
    if (busy) return;
    const nextLeft = leftIdx + dir;
    if (nextLeft < -1 || nextLeft > workshops.length) return;

    setBusy(true);

    if (dir > 0) {
      setFlipRotation(-180);
      setTimeout(() => {
        setLeftIdx(nextLeft);
        setFlipRotation(0);
        setBusy(false);
      }, DUR);
    } else {
      setFlipRotation(-180);
      setLeftIdx(nextLeft);
      setTimeout(() => {
        setFlipRotation(0);
        setBusy(false);
      }, 50);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Escape') {
        setLeftIdx(-1);
        setBusy(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [busy, leftIdx]);

  const pos = leftIdx + 1;
  const total = workshops.length + 2;

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div
        className="relative w-[560px] h-[400px]"
        style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Left page (static) */}
        <div className="absolute left-0 top-0 w-[280px] h-[400px] rounded-l-md overflow-hidden z-10">
          {getLeftContent()}
        </div>

        {/* Spine */}
        <div
          className="absolute left-[277px] top-0 w-1.5 h-full z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #3a2018, #7a5040, #3a2018)',
            boxShadow: '1px 0 8px rgba(0,0,0,0.25), -1px 0 4px rgba(0,0,0,0.1)',
          }}
        />

        {/* Flipper (animated page) */}
        <motion.div
          className="absolute left-[280px] top-0 w-[280px] h-[400px] z-20"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: flipRotation }}
          transition={{ duration: DUR / 1000, ease: [0.45, 0, 0.2, 1] }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-r-md overflow-hidden shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {getRightContent()}
          </div>

          {/* Back face (hidden) */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          />
        </motion.div>

        {/* Edge shadows */}
        <div
          className="absolute left-0 top-0 h-full w-5 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.11), transparent)',
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-5 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.11), transparent)',
          }}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-5 mt-8">
        <button
          onClick={() => go(-1)}
          disabled={busy || leftIdx === -1}
          className="w-10 h-10 rounded-full bg-white border border-[#8B6B5E]/30 text-[#8B6B5E] hover:bg-[#f6ece7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!busy && i !== pos) {
                  go(i > pos ? 1 : -1);
                }
              }}
              disabled={busy}
              className={`h-1.75 rounded transition-all ${
                i === pos
                  ? 'w-5 bg-[#8B6B5E]'
                  : i < pos
                  ? 'w-1.75 bg-[#8B6B5E]/50'
                  : 'w-1.75 bg-[#8B6B5E]/20 hover:bg-[#8B6B5E]/30'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={busy || leftIdx >= workshops.length}
          className="w-10 h-10 rounded-full bg-white border border-[#8B6B5E]/30 text-[#8B6B5E] hover:bg-[#f6ece7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Hints */}
      <p className="text-center text-xs italic text-[#8B6B5E]/50 mt-3">
        {leftIdx === -1 ? 'Press → to open · click the book' : '← → to turn pages · ESC to close'}
      </p>
    </div>
  );
}
