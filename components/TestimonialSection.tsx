'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import testimonialsData from '@/data/testimonials.json';

type QuoteItem = {
  type: 'quote';
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
  priority?: number;
  visible?: boolean;
};

type PhotoItem = {
  type: 'photo';
  src: string;
  alt: string;
  caption?: string;
  priority?: number;
  visible?: boolean;
};

type Item = QuoteItem | PhotoItem;

// Items from data/testimonials.json
const TESTIMONIAL_ITEMS: Item[] = (testimonialsData as unknown as Item[]);

// Real data from testimonials.json
const SAMPLE_ITEMS: Item[] = [
  {
    type: 'quote',
    quote: 'I walked in anxious and walked out anchored. The softness + structure combo is everything.',
    name: 'Ayesha K.',
    role: 'Toronto (In-Person)',
    avatar: '/assets/testimonials/ayesha.webp',
    rating: 5,
    priority: 10,
    visible: true
  },
  {
    type: 'photo',
    src: '/assets/testimonials/group1.webp',
    alt: 'Smiling group after workshop',
    caption: 'After-session glow ✨',
    priority: 9,
    visible: true
  },
  {
    type: 'quote',
    quote: 'Not a dating thing—a self-rescue moment. The tools are gentle and they stick.',
    name: 'Sara B.',
    role: 'Online (Zoom)',
    avatar: '/assets/testimonials/sara.webp',
    rating: 5,
    priority: 8,
    visible: true
  },
  {
    type: 'photo',
    src: '/assets/testimonials/journal.webp',
    alt: 'Workbook and journal on table',
    caption: 'Printed workbook included',
    priority: 7,
    visible: true
  }
];

const theme = {
  text: '#2D2D2D',
  textLight: '#6B6B6B',
  border: '#E8D5D0',
  accent: '#D4A5A5',
  accentLight: '#F5E6E3',
  bg: '#FDF9F7',
  cardBg: '#FFFFFF',
  shimmer: 'linear-gradient(90deg, transparent, rgba(212, 165, 165, 0.1), transparent)'
};

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
        >
          <Star
            className="h-4 w-4"
            style={{ color: i < count ? theme.accent : '#D1D5DB' }}
            fill={i < count ? 'currentColor' : 'none'}
          />
        </motion.div>
      ))}
    </div>
  );
}

function QuoteCard({ t, onClick }: { t: QuoteItem; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <motion.button 
      className="tile group cursor-pointer text-left w-full h-full" 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open testimonial by ${t.name}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        className="h-full rounded-3xl border-2 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        style={{ 
          borderColor: theme.border,
          boxShadow: isHovered 
            ? '0 20px 60px -15px rgba(212, 165, 165, 0.4), 0 0 0 1px rgba(212, 165, 165, 0.1)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at top right, rgba(245, 230, 227, 0.5), transparent 60%)'
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: theme.shimmer,
            backgroundSize: '200% 100%'
          }}
          animate={isHovered ? {
            backgroundPosition: ['200% 0', '-200% 0']
          } : {}}
          transition={{ duration: 1.5, ease: 'linear' }}
        />

        <CardContent className="p-7 flex flex-col h-full relative z-10">
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              className="h-14 w-14 rounded-full overflow-hidden border-2 shrink-0 relative"
              style={{ borderColor: theme.accent, background: theme.accentLight }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t.avatar && !imageError ? (
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="h-full w-full object-cover" 
                  onError={() => setImageError(true)}
                />
              ) : (
                <div 
                  className="h-full w-full grid place-items-center text-xl font-bold" 
                  style={{ color: theme.accent }}
                >
                  {t.name?.[0]?.toUpperCase() ?? '•'}
                </div>
              )}
              <div 
                className="absolute inset-0 ring-2 ring-white/50 rounded-full"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base" style={{ color: theme.text }}>
                {t.name}
              </div>
              {t.role && (
                <div className="text-sm mt-0.5" style={{ color: theme.textLight }}>
                  {t.role}
                </div>
              )}
              <div className="mt-2.5">
                <Stars count={t.rating ?? 5} />
              </div>
            </div>
          </div>

          <div className="relative">
            <span 
              className="absolute -left-2 -top-1 text-5xl font-serif opacity-10"
              style={{ color: theme.accent }}
            >
              "
            </span>
            <p 
              className="text-base leading-relaxed flex-1 relative z-10 italic" 
              style={{ color: theme.text, whiteSpace: 'pre-line' }}
            >
              {t.quote}
            </p>
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentLight})` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.button>
  );
}

function PhotoTile({ t, onClick }: { t: PhotoItem; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button 
      className="tile group cursor-pointer w-full h-full" 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open photo: ${t.alt}`}
      whileHover={{ y: -8, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="h-full relative rounded-3xl overflow-hidden border-2 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
        style={{ 
          borderColor: theme.border,
          boxShadow: isHovered 
            ? '0 20px 60px -15px rgba(212, 165, 165, 0.4), 0 0 0 1px rgba(212, 165, 165, 0.1)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <motion.div 
          className="relative w-full h-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img 
            src={t.src} 
            alt={t.alt} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(212, 165, 165, 0.1) 100%)'
            }}
          />
        </motion.div>
        
        {t.caption && (
          <motion.div
            className="absolute inset-x-4 bottom-4 rounded-2xl px-5 py-3 text-sm backdrop-blur-xl font-medium"
            style={{
              color: theme.text,
              background: 'rgba(255, 255, 255, 0.95)',
              border: `2px solid ${theme.border}`,
              boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.2)'
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {t.caption}
          </motion.div>
        )}
        
        {/* Corner sparkle */}
        <motion.div
          className="absolute top-4 right-4"
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          } : {}}
          transition={{ duration: 0.6 }}
        >
          <Sparkles 
            className="h-5 w-5" 
            style={{ color: theme.accent }}
            fill="currentColor"
          />
        </motion.div>
      </div>
    </motion.button>
  );
}

function useKey(key: string, fn: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) fn();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [key, fn]);
}

function useIsMobile() {
  const [is, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = (e: MediaQueryListEvent | MediaQueryList) => set(!!e.matches);
    on(mq);
    mq.addEventListener('change', on as any);
    return () => mq.removeEventListener('change', on as any);
  }, []);
  return is;
}

function CuteLightbox({
  items,
  index,
  onClose,
  setIndex,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}) {
  const prefersReduced = useReducedMotion();
  const current = items[index];
  const [imageError, setImageError] = useState(false);

  const next = () => {
    setIndex((index + 1) % items.length);
    setImageError(false);
  };
  const prev = () => {
    setIndex((index - 1 + items.length) % items.length);
    setImageError(false);
  };

  useKey('Escape', onClose);
  useKey('ArrowRight', next);
  useKey('ArrowLeft', prev);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = prev);
  }, []);

  useEffect(() => {
    setImageError(false);
  }, [index]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          className="relative w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div
            className="rounded-3xl overflow-hidden bg-white shadow-2xl border-2"
            style={{ borderColor: theme.border }}
          >
            <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto">
              {current.type === 'photo' ? (
                <div className="flex flex-col items-center">
                  <motion.img
                    src={(current as PhotoItem).src}
                    alt={(current as PhotoItem).alt}
                    className="w-full h-auto rounded-2xl"
                    style={{ maxHeight: '60vh', objectFit: 'contain' }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {(current as PhotoItem).caption && (
                    <motion.div 
                      className="mt-5 text-base text-center font-medium px-6 py-3 rounded-full" 
                      style={{ 
                        color: theme.text,
                        background: theme.accentLight,
                        border: `1px solid ${theme.border}`
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {(current as PhotoItem).caption}
                    </motion.div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      className="h-16 w-16 rounded-full overflow-hidden border-2 shrink-0"
                      style={{ borderColor: theme.accent, background: theme.accentLight }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    >
                      {(current as QuoteItem).avatar && !imageError ? (
                        <img 
                          src={(current as QuoteItem).avatar!} 
                          alt={(current as QuoteItem).name} 
                          className="h-full w-full object-cover" 
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div 
                          className="h-full w-full grid place-items-center text-2xl font-bold" 
                          style={{ color: theme.accent }}
                        >
                          {(current as QuoteItem).name?.[0]?.toUpperCase() ?? '•'}
                        </div>
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <motion.div 
                        className="font-semibold text-lg" 
                        style={{ color: theme.text }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {(current as QuoteItem).name}
                      </motion.div>
                      {(current as QuoteItem).role && (
                        <motion.div 
                          className="text-sm mt-1" 
                          style={{ color: theme.textLight }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          {(current as QuoteItem).role}
                        </motion.div>
                      )}
                      <motion.div 
                        className="mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Stars count={(current as QuoteItem).rating ?? 5} />
                      </motion.div>
                    </div>
                  </div>
                  <motion.blockquote 
                    className="text-lg leading-relaxed italic relative pl-6" 
                    style={{ color: theme.text, whiteSpace: 'pre-line' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <span 
                      className="absolute left-0 top-0 text-6xl font-serif leading-none"
                      style={{ color: theme.accentLight }}
                    >
                      "
                    </span>
                    {(current as QuoteItem).quote}
                  </motion.blockquote>
                </div>
              )}
            </div>
          </div>

          <motion.button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl border-2"
            aria-label="Previous"
            style={{ borderColor: theme.border }}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5" style={{ color: theme.text }} />
          </motion.button>
          <motion.button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl border-2"
            aria-label="Next"
            style={{ borderColor: theme.border }}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-5 w-5" style={{ color: theme.text }} />
          </motion.button>
          <motion.button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white rounded-full p-2.5 shadow-xl border-2"
            aria-label="Close"
            style={{ borderColor: theme.border }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-5 w-5" style={{ color: theme.text }} />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function TestimonialCarousel() {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  const items = useMemo<Item[]>(
    () =>
      TESTIMONIAL_ITEMS
        .filter((t) => t.visible !== false)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)),
    []
  );

  const loop = useMemo(() => [...items, ...items, ...items], [items]);
  const speed = 40;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    
    const setPaused = (p: boolean) => {
      el.style.animationPlayState = p ? 'paused' : 'running';
    };
    
    const pause = () => setPaused(true);
    const play = () => setPaused(false);
    
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', play);
    el.addEventListener('touchstart', pause);
    el.addEventListener('touchend', play);
    
    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', play);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', play);
    };
  }, []);

  return (
    <section className="w-full py-16 md:py-24 text-center" style={{ background: theme.bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm mb-5 font-medium mx-auto"
            style={{ 
              borderColor: theme.border, 
              background: theme.cardBg,
              color: theme.text,
              boxShadow: '0 4px 12px -4px rgba(212, 165, 165, 0.3)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.span 
              className="h-2 w-2 rounded-full" 
              style={{ background: theme.accent }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Loved by Our Community</span>
            <Sparkles className="h-4 w-4" style={{ color: theme.accent }} />
          </motion.div>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 mx-auto" 
            style={{ color: theme.text, textAlign: 'center' }}
          >
            Real Stories,{' '}
            <span 
              className="inline-block px-3 py-1 rounded-2xl" 
              style={{ 
                background: theme.accentLight,
                color: theme.accent
              }}
            >
              Real Growth
            </span>
          </h2>
          <p 
            className="mt-4 text-lg md:text-xl max-w-2xl leading-relaxed" 
            style={{ color: theme.textLight, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Hear from the amazing women who've transformed their relationship with themselves
          </p>
        </motion.div>

        <div className="relative -mx-4 sm:mx-0">
          <div className="overflow-hidden px-4 sm:px-0 py-4">
            <div
              ref={trackRef}
              className={`flex ${isMobile ? 'gap-4' : 'gap-6'}`}
              style={{
                animation: prefersReduced ? 'none' : `scroll ${speed}s linear infinite`,
                animationPlayState: 'running',
                width: 'max-content',
                paddingTop: '8px',
                paddingBottom: '8px'
              }}
            >
              {loop.map((t, i) => {
                const onOpen = () => {
                  setIndex(i % items.length);
                  setOpen(true);
                };
                return (
                  <div
                    key={i}
                    className="shrink-0"
                    style={{ 
                      width: isMobile ? 'calc(85vw)' : '400px',
                      maxWidth: isMobile ? '400px' : undefined,
                      height: '340px',
                      padding: '4px'
                    }}
                  >
                    {t.type === 'quote' ? (
                      <QuoteCard t={t as QuoteItem} onClick={onOpen} />
                    ) : (
                      <PhotoTile t={t as PhotoItem} onClick={onOpen} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <motion.p 
          className="mt-8 text-sm font-medium" 
          style={{ color: theme.textLight, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          💫 Click any card to read the full story
        </motion.p>
      </div>

      <AnimatePresence>
        {open && (
          <CuteLightbox 
            items={items} 
            index={index} 
            setIndex={setIndex} 
            onClose={() => setOpen(false)} 
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
