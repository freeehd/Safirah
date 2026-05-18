'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface BookPage {
  header?: string;
  content: React.ReactNode;
}

interface BookOpeningCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  slug: string;
  coverColor?: string;
  isTBA?: boolean;
  pages?: BookPage[];
  backCoverTitle?: string;
  backCoverColor?: string;
}

const EASE = [0.34, 1.56, 0.64, 1] as const;
const FLIP_DURATION = 0.7;
const GOLD = '#D4AF37';

function PaperTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.04,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 26px,
          rgba(0,0,0,0.15) 27px
        )`,
      }}
    />
  );
}

export default function BookOpeningCard({
  title,
  date,
  time,
  location,
  description,
  slug,
  coverColor = '#B98A82',
  isTBA = false,
  pages: customPages,
  backCoverTitle,
  backCoverColor,
}: BookOpeningCardProps) {
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const pages = useMemo((): BookPage[] => {
    if (customPages?.length) return customPages;

    return [
      {
        header: 'Event Details',
        content: (
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold text-stone-800 leading-tight">
              {title}
            </h3>
            <div className="space-y-3 text-sm text-stone-500">
              <div className="flex items-center gap-2.5">
                <CalendarDays size={15} style={{ color: coverColor }} />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={15} style={{ color: coverColor }} />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} style={{ color: coverColor }} />
                <span>{location}</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        header: 'About',
        content: (
          <div className="h-full flex flex-col">
            <p className="text-sm text-stone-600 font-lato leading-relaxed line-clamp-[12]">
              {description}
            </p>
          </div>
        ),
      },
      {
        header: 'Registration',
        content: (
          <div className="h-full flex flex-col items-center justify-center text-center gap-5">
            {isTBA ? (
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">
                Date Announced Soon
              </span>
            ) : (
              <>
                <p className="text-sm text-stone-500 max-w-[180px]">
                  Secure your spot at this exclusive workshop.
                </p>
                <Link
                  href={`/events/${slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
                  style={{ backgroundColor: coverColor }}
                >
                  Learn More <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>
        ),
      },
    ];
  }, [customPages, title, date, time, location, description, slug, coverColor, isTBA]);

  const totalPages = pages.length;
  const isLastPage = pageIndex >= totalPages;

  const openBook = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeBook = useCallback(() => {
    setPageIndex(0);
    setIsOpen(false);
  }, []);

  const nextPage = useCallback(() => {
    if (isFlipping) return;
    if (!isOpen) {
      openBook();
      return;
    }
    if (pageIndex < totalPages) {
      setIsFlipping(true);
      setTimeout(() => {
        setPageIndex((p) => p + 1);
        setIsFlipping(false);
      }, prefersReduced ? 0 : FLIP_DURATION * 1000);
    }
  }, [isOpen, pageIndex, totalPages, openBook, prefersReduced, isFlipping]);

  const prevPage = useCallback(() => {
    if (isFlipping) return;
    if (pageIndex > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setPageIndex((p) => p - 1);
        setIsFlipping(false);
      }, prefersReduced ? 0 : FLIP_DURATION * 1000);
    } else if (isOpen) {
      closeBook();
    }
  }, [pageIndex, isOpen, closeBook, prefersReduced, isFlipping]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      else if (e.key === 'ArrowLeft') prevPage();
      else if (e.key === 'Escape') closeBook();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextPage, prevPage, closeBook]);

  const spineColor = `color-mix(in srgb, ${coverColor} 40%, #000 60%)`;
  const backColor = backCoverColor || `color-mix(in srgb, ${coverColor} 60%, #000 40%)`;

  return (
    <div className="flex flex-col items-center py-10 px-4 select-none">
      <div
        className="relative w-[260px] sm:w-[300px] max-w-[320px]"
        style={{
          aspectRatio: '3/4',
          perspective: '2200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Spine */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5 z-[150] pointer-events-none"
          style={{
            backgroundColor: spineColor,
            boxShadow: `
              inset 0.5px 0 4px rgba(255,255,255,0.3),
              inset -0.5px 0 4px rgba(0,0,0,0.4)
            `,
          }}
        />

        {/* Back cover */}
        <motion.div
          className="absolute inset-0 z-0 rounded-r-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center"
          style={{
            backgroundColor: backColor,
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateY: isOpen ? 0 : 0,
            z: isOpen ? -200 : 0,
          }}
          transition={{
            duration: prefersReduced ? 0 : FLIP_DURATION,
            ease: EASE,
          }}
        >
          <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center mb-4">
            <span className="text-2xl text-white/80">✦</span>
          </div>
          <h4 className="font-playfair text-lg font-bold text-white/90 leading-snug">
            {backCoverTitle || title}
          </h4>
          <div className="w-8 h-px bg-white/20 my-3" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            The End
          </span>
        </motion.div>

        {/* Current page - only visible when book is open */}
        {isOpen && pageIndex < totalPages && (
          <motion.div
            className="absolute inset-0 z-40 rounded-r-xl overflow-hidden"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateY: isFlipping ? -180 : 0,
            }}
            transition={{
              duration: prefersReduced ? 0 : FLIP_DURATION,
              ease: EASE,
            }}
          >
            {/* Right page */}
            <div
              className="absolute inset-0 backface-hidden rounded-r-xl overflow-hidden"
              style={{
                backgroundColor: '#FDFAF8',
                boxShadow: `
                  inset 8px 0 16px rgba(0,0,0,0.03),
                  inset 0 0 0 1px rgba(0,0,0,0.02)
                `,
              }}
            >
              <PaperTexture />
              <div className="relative h-full flex flex-col p-6 pl-8">
                {pages[pageIndex].header && (
                  <motion.div
                    className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3"
                    style={{ color: coverColor }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{
                      opacity: isFlipping ? 0 : 1,
                      y: isFlipping ? 6 : 0,
                    }}
                    transition={{
                      duration: prefersReduced ? 0 : 0.3,
                      delay: prefersReduced ? 0 : 0.15,
                    }}
                  >
                    {pages[pageIndex].header}
                  </motion.div>
                )}
                <div className="flex-1 overflow-hidden">{pages[pageIndex].content}</div>
                <div className="text-[10px] text-stone-300 text-right mt-3 font-medium tabular-nums">
                  {pageIndex + 1}
                </div>
              </div>
            </div>

            {/* Left page back */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{
                backgroundColor: '#F5F0EE',
                transform: 'rotateY(180deg)',
              }}
            >
              <PaperTexture />
              <div className="relative h-full flex items-center justify-center">
                <span className="text-stone-300 text-xs font-medium tabular-nums">
                  {pageIndex + 1}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Page stack depth beneath current */}
        {isOpen && pageIndex < totalPages - 1 && (
          <div className="absolute inset-0 z-30 rounded-r-xl" style={{ transform: 'translateZ(-2px)' }}>
            <div
              className="absolute inset-0 rounded-r-xl"
              style={{
                backgroundColor: '#FDFAF8',
                boxShadow: `
                  inset 8px 0 16px rgba(0,0,0,0.03),
                  0 2px 8px rgba(0,0,0,0.08)
                `,
              }}
            />
          </div>
        )}

        {/* Front cover */}
        <motion.div
          className="absolute inset-0 z-50 cursor-pointer rounded-r-2xl overflow-hidden"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateY: isOpen ? -180 : 0,
          }}
          transition={{
            duration: prefersReduced ? 0 : FLIP_DURATION,
            ease: EASE,
          }}
          onClick={!isOpen ? openBook : undefined}
          role={!isOpen ? 'button' : undefined}
          tabIndex={!isOpen ? 0 : undefined}
          onKeyDown={
            !isOpen
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') openBook();
                }
              : undefined
          }
          aria-label="Open book"
        >
          {/* Front cover face */}
          <div
            className="absolute inset-0 backface-hidden rounded-r-2xl overflow-hidden"
            style={{ backgroundColor: coverColor }}
          >
            {/* Texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.06,
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 24px,
                  rgba(255,255,255,0.4) 25px
                )`,
              }}
            />

            {/* Edge lighting */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 3%, transparent 10%)`,
              }}
            />

            {/* Cover thickness */}
            <div
              className="absolute left-0 top-0 bottom-0 w-2.5"
              style={{
                background: `linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05))`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8">
              <motion.div
                className="w-px self-stretch bg-white/20"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
              />
              <motion.h3
                className="font-playfair text-xl font-bold text-center leading-snug text-white/95 px-2"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
                animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.95 : 1 }}
                transition={{ duration: prefersReduced ? 0 : 0.35 }}
              >
                {title}
              </motion.h3>
              <motion.div
                className="text-xs font-bold uppercase tracking-[0.3em] text-white/70"
                animate={{ opacity: isOpen ? 0 : 0.7 }}
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
              >
                {isTBA ? 'Coming Soon' : date}
              </motion.div>
              <motion.div
                className="w-px self-stretch bg-white/20"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
              />
              <motion.div
                className="text-[11px] text-white/50 font-bold tracking-widest uppercase"
                animate={{ opacity: isOpen ? 0 : 0.6, y: isOpen ? 4 : 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
              >
                Click to Open
              </motion.div>
            </div>

            {/* Gold corners */}
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2"
              style={{ borderColor: `${GOLD}40` }}
              animate={{ opacity: isOpen ? 0 : 0.4 }}
              transition={{ duration: prefersReduced ? 0 : 0.25 }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-8 h-8 rounded-full border-2"
              style={{ borderColor: `${GOLD}40` }}
              animate={{ opacity: isOpen ? 0 : 0.4 }}
              transition={{ duration: prefersReduced ? 0 : 0.25 }}
            />
          </div>

          {/* Back cover face */}
          <div
            className="absolute inset-0 rounded-l-2xl overflow-hidden backface-hidden"
            style={{
              backgroundColor: '#F7F1EF',
              transform: 'rotateY(180deg)',
            }}
          >
            <PaperTexture />
            <div className="relative h-full flex flex-col items-center justify-center p-8 gap-4">
              <div className="w-10 h-px bg-stone-300/60" />
              <h4 className="font-playfair text-lg font-bold text-stone-700 text-center leading-snug">
                {title}
              </h4>
              <div className="w-10 h-px bg-stone-300/60" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: `${coverColor}80` }}
              >
                Workshop
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex items-center gap-3 mt-6"
          >
            <button
              onClick={prevPage}
              disabled={isFlipping || (pageIndex === 0 && isOpen)}
              className="p-2.5 rounded-full hover:bg-stone-100 active:bg-stone-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Previous page"
              title="Previous page (←)"
            >
              <ChevronLeft size={20} className="text-stone-600" />
            </button>

            <div className="min-w-[64px] text-center">
              <span className="text-sm font-semibold text-stone-600 tabular-nums">
                {Math.min(pageIndex + 1, totalPages)}
              </span>
              <span className="text-stone-300 mx-1.5">/</span>
              <span className="text-sm text-stone-400 tabular-nums">
                {totalPages}
              </span>
            </div>

            <button
              onClick={nextPage}
              disabled={isFlipping || isLastPage}
              className="p-2.5 rounded-full hover:bg-stone-100 active:bg-stone-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Next page"
              title="Next page (→)"
            >
              <ChevronRight size={20} className="text-stone-600" />
            </button>

            <div className="w-px h-5 bg-stone-200 mx-1" />

            <button
              onClick={closeBook}
              className="p-2.5 rounded-full hover:bg-stone-100 active:bg-stone-200 transition-colors"
              aria-label="Close book"
              title="Close book (Esc)"
            >
              <X size={18} className="text-stone-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper text */}
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[11px] text-stone-400 mt-2 text-center"
          >
            Use arrow keys or buttons to turn pages
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
