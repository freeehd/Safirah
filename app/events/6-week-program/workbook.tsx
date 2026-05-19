'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// --- Data Structures ---
type BlockType = 'phase' | 'nlp' | 'prompt' | 'quote' | 'lines' | 'text' | 'tan-box';

interface Block {
  type: BlockType;
  title?: string;
  subtitle?: string;
  content?: string | string[];
  num?: string;
  lines?: number;
}

interface PageContent {
  pageNumber: number;
  headerLabel?: string;
  blocks: Block[];
}

interface SheetData {
  front: PageContent;
  back: PageContent;
}

const SHEETS: SheetData[] = [
  {
    front: { pageNumber: 0, blocks: [] },
    back: {
      pageNumber: 1,
      blocks: [
        { type: 'tan-box', content: 'You are not your beliefs. You are the one who can change them.' },
        { type: 'text', title: 'Dear Beautiful Soul,', content: [
          'This workbook is your safe space. What you write here is private, honest, and powerful. There are no wrong answers — only your truth.',
          'Together with your coach, you will identify the limiting belief that has been quietly running in the background of your life — and release it for good.'
        ]},
        { type: 'text', title: '✦ How to Use This Workbook', content: [
          '1. Find a quiet space. Sit somewhere safe.',
          '2. Be radically honest. The magic only works with truth.',
          '3. Move slowly. Every question deserves real thought.'
        ]},
        { type: 'quote', content: '"Until you make the unconscious conscious, it will direct your life and you will call it fate."\n— Carl Jung' }
      ],
    },
  },
  {
    front: {
      pageNumber: 2,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'phase', num: '01', title: 'Arrival — Ground Yourself First', subtitle: "Before we dig deep, let's land in the present moment." },
        { type: 'nlp', title: 'The 5-4-3-2-1 Method', content: 'Your coach will guide you through this slowly. 5 things you can SEE, 4 you can TOUCH, 3 you can HEAR, 2 you can SMELL, 1 you can TASTE.' },
        { type: 'prompt', num: 'Q1', title: 'Right now, how are you feeling?', subtitle: '1 = totally overwhelmed | 10 = clear and ready' },
        { type: 'text', content: 'My number today is: ___ / 10     Because...' },
        { type: 'lines', lines: 1 },
        { type: 'prompt', num: 'Q2', title: 'What made you show up today?' },
        { type: 'lines', lines: 1 }
      ],
    },
    back: {
      pageNumber: 3,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'phase', num: '02', title: 'Excavate — Find the Belief', subtitle: "The belief cannot be healed if it stays hidden." },
        { type: 'nlp', title: 'The Meta Model', content: '"Always", "never", "I cannot", "I am not enough" — these words are signals. Your coach listens closely to your language.' },
        { type: 'prompt', num: 'Q4', title: 'Finish this sentence:', subtitle: '"When it comes to success / money, I believe I am..."' },
        { type: 'lines', lines: 1 },
        { type: 'prompt', num: 'Q5', title: 'Where did this belief come from?', subtitle: 'Was it an experience, something you were told as a child?' },
        { type: 'lines', lines: 2 }
      ],
    },
  },
  {
    front: {
      pageNumber: 4,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'prompt', num: 'Q6', title: 'How old do you feel when this belief is loudest?', subtitle: 'Limiting beliefs often live in a younger version of us.' },
        { type: 'text', content: 'When this belief takes over, inside I feel ___ years old. At that age I learned that...' },
        { type: 'lines', lines: 2 },
        { type: 'prompt', num: 'Q7', title: "What is this belief's job?", subtitle: 'Every belief started as protection. What has it been protecting you from?' },
        { type: 'lines', lines: 2 },
        { type: 'tan-box', content: 'This belief was never the truth. It was a survival strategy.' }
      ],
    },
    back: {
      pageNumber: 5,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'phase', num: '03', title: "Challenge — Break the Belief's Power", subtitle: 'A belief is only as strong as the evidence you give it.' },
        { type: 'nlp', title: 'Challenging Generalisations', content: '"Always? Can you think of even one time that was not true?" Your coach will ask. Your job: answer honestly — no defending the belief.' },
        { type: 'prompt', num: 'Q8', title: 'Write the limiting belief in one clear sentence:' },
        { type: 'lines', lines: 1 },
        { type: 'prompt', num: 'Q9', title: 'Is this belief 100% true, 100% of the time?' },
        { type: 'lines', lines: 1 }
      ],
    },
  },
  {
    front: {
      pageNumber: 6,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'prompt', num: 'Q10', title: 'What has believing this cost you?', subtitle: 'Relationships? Business? Peace? Be specific.' },
        { type: 'lines', lines: 3 },
        { type: 'prompt', num: 'Q11', title: 'If your best friend held this belief, what would you tell her?' },
        { type: 'lines', lines: 3 }
      ],
    },
    back: {
      pageNumber: 7,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'phase', num: '04', title: 'Release — Let It Go', subtitle: 'The most powerful part. This is where the old belief ends.' },
        { type: 'nlp', title: 'Six-Step Reframe + Submodality Shift', content: 'Imagine the belief as a physical object. Slowly shrink it. Drain its colour. Push it far into the distance. Watch it disappear. Breathe.' },
        { type: 'prompt', num: 'Q12', title: 'My limiting belief felt like:', subtitle: 'Describe it as an object — colour, size, weight.' },
        { type: 'lines', lines: 1 },
        { type: 'prompt', num: 'Q13', title: 'As you let it go, what did you notice in your body?' },
        { type: 'lines', lines: 1 }
      ],
    },
  },
  {
    front: {
      pageNumber: 8,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'prompt', num: 'Q14', title: 'Write a goodbye letter to this belief:', subtitle: 'Acknowledge it. Thank it. Release it with compassion.' },
        { type: 'text', content: 'Dear belief, Thank you for... I no longer need you because... I release you now.' },
        { type: 'lines', lines: 3 },
        { type: 'tan-box', content: 'I thank this belief for its service. I release it with love. It no longer runs my life.' }
      ],
    },
    back: {
      pageNumber: 9,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'phase', num: '05', title: 'Rebuild — Install Your New Belief', subtitle: 'Replace the old with something powerful and true.' },
        { type: 'nlp', title: 'Positive Anchoring + Future Pacing', content: 'Choose a new empowering belief. Relive a memory where it felt true. Press your thumb and finger together to anchor this feeling.' },
        { type: 'prompt', num: 'Q15', title: 'Write your new empowering belief:' },
        { type: 'lines', lines: 1 },
        { type: 'prompt', num: 'Q16', title: 'Find evidence this new belief is already true:' },
        { type: 'lines', lines: 2 }
      ],
    },
  },
  {
    front: {
      pageNumber: 10,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'prompt', num: 'Q17', title: 'Future self vision — close your eyes and answer:', subtitle: '3 months from now, living this new belief — what is different?' },
        { type: 'text', content: 'In 3 months, I am... (describe business, relationships, confidence, energy)' },
        { type: 'lines', lines: 3 },
        { type: 'prompt', num: 'Q18', title: 'What is the first action you will take THIS WEEK?' },
        { type: 'lines', lines: 2 }
      ],
    },
    back: {
      pageNumber: 11,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'phase', num: '06', title: 'Anchor & Commit — Make It Stick', subtitle: 'This is how the new belief becomes your new normal.' },
        { type: 'nlp', title: 'Daily Belief Conditioning', content: '① Morning: Read your new belief aloud 3 times.\n② Evening: Write one piece of evidence this belief was true today.\n③ Anchor press: Use your thumb-finger anchor anytime doubt appears.' },
        { type: 'prompt', num: 'Q19', title: 'My daily practice plan:' },
        { type: 'lines', lines: 2 },
      ],
    },
  },
  {
    front: {
      pageNumber: 12,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'prompt', num: 'Q20', title: 'Who is your accountability person?' },
        { type: 'lines', lines: 1 },
        { type: 'tan-box', content: 'I am not starting over. I am starting from strength.' },
        { type: 'text', title: 'Final reflection — in your own words:', content: "The biggest shift I feel after today's session is..." },
        { type: 'lines', lines: 3 }
      ],
    },
    back: {
      pageNumber: 13,
      headerLabel: 'Let It Go Workbook',
      blocks: [
        { type: 'tan-box', content: 'You did something today most people never do. You chose yourself.' },
        { type: 'text', title: 'Your Post-Session Commitments', content: [
          '✦ Daily belief practice: 21 days of morning and evening conditioning.',
          '✦ Anchor activation: Use your thumb-finger anchor whenever doubt appears.',
          '✦ Re-read this workbook: On hard days, read your answers to remember this moment.',
        ]},
        { type: 'quote', content: '"The moment you accept total responsibility for everything in your life is the moment you claim the power to change anything in your life."\n— Hal Elrod' }
      ],
    },
  },
];

const TOTAL_SPREADS = SHEETS.length;
type BookState = 'closed' | 'opening' | 'open' | 'flipping-forward' | 'flipping-back' | 'closing';

/* ============================================================
   BLOCK RENDERER
   ============================================================ */
function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'phase':
      return (
        <div key={index} className="wb-block-phase">
          {block.num && <div className="wb-step-num">{block.num}</div>}
          <div className="wb-subtitle">{block.subtitle}</div>
          <h3 className="wb-title !mb-0">{block.title}</h3>
        </div>
      );
    case 'nlp':
      return (
        <div key={index} className="wb-block-nlp">
          <h4 className="wb-nlp-title">{block.title}</h4>
          <p className="wb-nlp-text">{block.content}</p>
        </div>
      );
    case 'prompt':
      return (
        <div key={index} className="wb-block-prompt">
          <div className="wb-prompt-header">
            {block.num && <span className="wb-prompt-num">{block.num}</span>}
            <h3 className="wb-prompt-title">{block.title}</h3>
          </div>
          {block.subtitle && <p className="wb-prompt-subtitle">{block.subtitle}</p>}
        </div>
      );
    case 'tan-box':
      return (
        <div key={index} className="wb-block-tan">
          <p className="wb-tan-text">{block.content as string}</p>
        </div>
      );
    case 'quote':
      return (
        <div key={index} className="wb-quote">
          <p>{block.content}</p>
        </div>
      );
    case 'text':
      return (
        <div key={index} className="wb-text-block">
          {block.title && <h4 className="wb-text-title">{block.title}</h4>}
          {Array.isArray(block.content)
            ? block.content.map((p, i) => <p key={i} className="wb-text-p">{p}</p>)
            : <p className="wb-text-p">{block.content}</p>}
        </div>
      );
    case 'lines':
      return (
        <div key={index} className="wb-write-lines">
          {Array.from({ length: block.lines || 1 }).map((_, i) => (
            <div key={i} className="wb-write-line" />
          ))}
        </div>
      );
    default:
      return null;
  }
}

/* ============================================================
   PAGE CONTENT VIEW
   ============================================================ */
function PageContentView({ content, isRightSide }: { content: PageContent | null; isRightSide?: boolean }) {
  if (!content || content.blocks.length === 0) {
    return <div className={`wb-page-content ${isRightSide ? 'wb-is-right' : 'wb-is-left'}`} />;
  }
  return (
    <div className={`wb-page-content ${isRightSide ? 'wb-is-right' : 'wb-is-left'}`}>
      {content.headerLabel && <div className="wb-header"><span>Hirah Safi</span><span>{content.headerLabel}</span></div>}
      <div className="flex-1">
        {content.blocks.map((block, i) => renderBlock(block, i))}
      </div>
      {content.pageNumber > 0 && <div className="wb-page-num">{content.pageNumber}</div>}
    </div>
  );
}

/* ============================================================
   COVER DESIGNS
   ============================================================ */
function CoverDesign() {
  return (
    <div className="wb-cover-inner">
      <div className="wb-cover-gradient" />
      <div className="wb-cover-blob" />
      <div className="wb-cover-content">
        <h1 className="wb-cover-title">Hirah<br />Safi</h1>
        <div className="wb-cover-tagline">Life & Success Coaching</div>
      </div>
      <div className="wb-cover-divider" />
      <h2 className="wb-cover-book-title">Let It Go</h2>
      <h3 className="wb-cover-subtitle">Release Your Limiting Beliefs</h3>
      <div className="wb-cover-footer">A Coaching Session Workbook</div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function Workbook() {
  const [bookState, setBookState] = useState<BookState>('closed');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [hoverTilt, setHoverTilt] = useState({ x: 0, y: 0, active: false });
  const [animLock, setAnimLock] = useState(false);
  const [flipAngle, setFlipAngle] = useState(0);
  const [responsiveScale, setResponsiveScale] = useState(1);

  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number, y: number } | null>(null);

  const getLeftPage = useCallback((index: number) => index === 0 ? null : SHEETS[index].front, []);
  const getRightPage = useCallback((index: number) => SHEETS[index].back, []);

  // Calculate dynamic scale
  useEffect(() => {
    const handleResize = () => {
      const container = viewportRef.current;
      // Use container dimensions when available, fall back to viewport
      const cw = container ? container.clientWidth : window.innerWidth;
      const ch = container ? container.clientHeight : window.innerHeight;
      const isOpenWidth = 440 * 2;
      const isClosedWidth = 440;
      const targetWidth = bookState === 'closed' || bookState === 'closing' ? isClosedWidth : isOpenWidth;
      const scaleW = (cw - 16) / targetWidth;
      const scaleH = (ch - 16) / 600;
      // Slightly reduce the cap for small screens so it's not too zoomed in
      const cap = cw < 640 ? 0.7 : 1;
      setResponsiveScale(Math.min(cap, scaleW, scaleH));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [bookState]);

  const openBook = useCallback(() => {
    if (bookState !== 'closed' || animLock) return;
    setAnimLock(true);
    setBookState('opening');
    setTimeout(() => { setBookState('open'); setAnimLock(false); }, 900);
  }, [bookState, animLock]);

  const closeBook = useCallback(() => {
    if (bookState !== 'open' || animLock) return;
    setAnimLock(true);
    setBookState('closing');
    setTimeout(() => {
      setBookState('closed');
      setCurrentSpread(0);
      setAnimLock(false);
    }, 900);
  }, [bookState, animLock]);

  const goNext = useCallback(() => {
    if (bookState !== 'open' || animLock || currentSpread >= TOTAL_SPREADS - 1) return;
    setAnimLock(true);
    setBookState('flipping-forward');
    setFlipAngle(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setFlipAngle(-180));
    });
    setTimeout(() => {
      setCurrentSpread(prev => prev + 1);
      setBookState('open');
      setAnimLock(false);
    }, 600);
  }, [bookState, animLock, currentSpread]);

  const goPrev = useCallback(() => {
    if (bookState !== 'open' || animLock || currentSpread <= 0) return;
    setAnimLock(true);
    setBookState('flipping-back');
    setFlipAngle(-180);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setFlipAngle(0));
    });
    setTimeout(() => {
      setCurrentSpread(prev => prev - 1);
      setBookState('open');
      setAnimLock(false);
    }, 600);
  }, [bookState, animLock, currentSpread]);

  /* ---- Interactions ---- */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      if (bookState !== 'closed') return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setHoverTilt({ x: (e.clientX - cx) / (rect.width / 2), y: (e.clientY - cy) / (rect.height / 2), active: true });
    };
    const onLeave = () => setHoverTilt({ x: 0, y: 0, active: false });
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current || animLock || bookState !== 'open') return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) goPrev();
        else goNext();
      } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
        closeBook();
      }
      touchStart.current = null;
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [bookState, animLock, goNext, goPrev, closeBook]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (bookState !== 'open' || animLock) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === 'Escape' || e.key === 'ArrowDown') { e.preventDefault(); closeBook(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [bookState, animLock, goNext, goPrev, closeBook]);

  const isOpen = bookState !== 'closed' && bookState !== 'closing';
  const isFlippingForward = bookState === 'flipping-forward';
  const isFlippingBack = bookState === 'flipping-back';
  const isFlipping = isFlippingForward || isFlippingBack;

  let baseRightSpreadIndex = currentSpread;
  let baseLeftSpreadIndex = currentSpread;
  let flipFrontIndex = currentSpread;
  let flipBackIndex = currentSpread;

  if (isFlippingForward) {
    baseRightSpreadIndex = currentSpread + 1;
    baseLeftSpreadIndex = currentSpread;
    flipFrontIndex = currentSpread;
    flipBackIndex = currentSpread + 1;
  } else if (isFlippingBack) {
    baseRightSpreadIndex = currentSpread;
    baseLeftSpreadIndex = currentSpread - 1;
    flipFrontIndex = currentSpread - 1;
    flipBackIndex = currentSpread;
  }

  const bookTransformStyle = {
    '--hover-x': hoverTilt.x,
    '--hover-y': hoverTilt.y,
    transform: `scale(${responsiveScale}) ${
      bookState === 'closed' || bookState === 'closing'
        ? `translateX(-220px) rotateX(${12 - hoverTilt.y * 4}deg) rotateY(${-10 + hoverTilt.x * 4}deg) translateZ(20px)`
        : `translateX(0px) rotateX(2deg) rotateY(0deg) translateZ(0px)`
    }`,
  } as React.CSSProperties;

  return (
    <div className="wb-viewport" ref={viewportRef}>
      <style>{`
        /* ============================================================
           WORKBOOK CSS — Self-contained, scoped via .wb- prefix
           ============================================================ */
        .wb-viewport {
          --wb-bg: #F7F5F2;
          --wb-bg-mid: #EFEBE6;
          --wb-cover-bg: #FAF9F8;
          --wb-page-paper: #FFFFFF;
          --wb-page-edge: #F4EFEA;
          --wb-page-edge-shadow: #E8DED5;
          --wb-text-primary: #4A423E;
          --wb-text-secondary: #8A7E78;
          --wb-text-light: #B4A9A4;
          --wb-accent: #D4A3A3;
          --wb-accent-dark: #B88686;
          --wb-divider: #F0EAE6;
          --wb-nav-border: rgba(74, 66, 62, 0.12);
          --wb-nav-text: rgba(74, 66, 62, 0.8);
          --wb-nav-bg: rgba(255, 255, 255, 0.7);
          --wb-box-pink: #FDF9F9;
          --wb-box-purple: #F8F6FA;
          --wb-box-tan: #FCFAF8;
          --wb-border-pink: #F5E6E6;
          --wb-border-purple: #EBE5F0;
          --wb-page-w: 440px;
          --wb-page-h: 600px;
          --wb-page-depth: 24px;
          --wb-cover-overhang: 8px;
          --wb-font-display: "Cormorant Garamond", "Playfair Display", Georgia, serif;
          --wb-font-body: "Inter", -apple-system, sans-serif;
          --wb-ease-smooth: cubic-bezier(0.25, 1, 0.4, 1);
          --wb-ease-flip: cubic-bezier(0.4, 0, 0.2, 1);
          --wb-duration-open: 900ms;
          --wb-duration-flip: 650ms;
          --wb-radius-cover: 6px;
          --wb-radius-page: 2px;
        }
        .wb-viewport {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 2200px;
          touch-action: none;
          padding-bottom: 36px;
        }

        /* ── Book Assembly ── */
        .wb-book {
          position: relative;
          width: calc(var(--wb-page-w) * 2);
          height: calc(var(--wb-page-h) + var(--wb-cover-overhang) * 2);
          transform-style: preserve-3d;
          transition: transform var(--wb-duration-open) var(--wb-ease-smooth);
          will-change: transform;
          --hover-x: 0; --hover-y: 0;
        }
        .wb-book-shadow {
          position: absolute;
          left: var(--wb-page-w); top: 0;
          width: var(--wb-page-w);
          height: calc(var(--wb-page-h) + var(--wb-cover-overhang) * 2);
          background: radial-gradient(ellipse at 50% 50%, rgba(130, 120, 115, 0.3) 0%, transparent 75%);
          transform-origin: left center;
          transition: transform var(--wb-duration-open) var(--wb-ease-smooth), opacity var(--wb-duration-open);
          pointer-events: none;
        }
        .wb-closed .wb-book-shadow, .wb-closing .wb-book-shadow {
          transform: translateZ(-40px) scale(1.15);
        }
        .wb-opening .wb-book-shadow, .wb-open .wb-book-shadow,
        .wb-flipping-forward .wb-book-shadow, .wb-flipping-back .wb-book-shadow {
          transform: translateZ(-40px) scale(1.02);
        }

        /* ── Paper Edges ── */
        .wb-paper-edge {
          position: absolute;
          background: linear-gradient(var(--edge-angle, 90deg), var(--wb-page-edge-shadow) 0%, var(--wb-page-paper) 40%, var(--wb-page-edge) 60%, var(--wb-page-edge-shadow) 100%);
        }
        .wb-paper-edge-right {
          left: var(--wb-page-w); top: var(--wb-cover-overhang);
          width: calc(var(--wb-page-depth) - 2px); height: var(--wb-page-h);
          --edge-angle: 90deg;
          transform-origin: left center;
          transform: translateX(var(--wb-page-w)) translateZ(calc(var(--wb-page-depth) / -2 + 1px)) rotateY(90deg);
        }
        .wb-paper-edge-top {
          left: var(--wb-page-w); top: var(--wb-cover-overhang);
          width: var(--wb-page-w); height: calc(var(--wb-page-depth) - 2px);
          --edge-angle: 180deg;
          transform-origin: left top;
          transform: translateZ(calc(var(--wb-page-depth) / -2 + 1px)) rotateX(-90deg);
        }
        .wb-paper-edge-bottom {
          left: var(--wb-page-w); top: var(--wb-cover-overhang);
          width: var(--wb-page-w); height: calc(var(--wb-page-depth) - 2px);
          --edge-angle: 0deg;
          transform-origin: left top;
          transform: translateY(var(--wb-page-h)) translateZ(calc(var(--wb-page-depth) / -2 + 1px)) rotateX(-90deg);
        }

        /* ── Spine ── */
        .wb-spine {
          position: absolute;
          left: var(--wb-page-w); top: 0;
          width: var(--wb-page-depth);
          height: calc(var(--wb-page-h) + var(--wb-cover-overhang) * 2);
          transform-origin: left center;
          transform: translateZ(calc(var(--wb-page-depth) / 2)) rotateY(-90deg);
          background: linear-gradient(90deg, #EBE6E0 0%, #FFFFFF 30%, #F4F0EC 70%, #EBE6E0 100%);
          border-right: 1px solid rgba(0,0,0,0.02);
        }

        /* ── Covers ── */
        .wb-cover {
          position: absolute;
          width: calc(var(--wb-page-w) + var(--wb-cover-overhang));
          height: calc(var(--wb-page-h) + var(--wb-cover-overhang) * 2);
          transform-style: preserve-3d;
        }
        .wb-cover-back {
          left: var(--wb-page-w); top: 0;
          transform: translateZ(calc(var(--wb-page-depth) / -2));
          border-radius: 0 var(--wb-radius-cover) var(--wb-radius-cover) 0;
          box-shadow: 0 10px 40px rgba(130, 120, 115, 0.2);
          overflow: hidden;
        }
        .wb-cover-front {
          left: var(--wb-page-w); top: 0;
          transform-origin: left center;
          transition: transform var(--wb-duration-open) var(--wb-ease-smooth);
          z-index: 200;
        }
        .wb-closed .wb-cover-front, .wb-closing .wb-cover-front {
          transform: translateZ(calc(var(--wb-page-depth) / 2)) rotateY(0deg);
          cursor: pointer;
        }
        .wb-opening .wb-cover-front, .wb-open .wb-cover-front,
        .wb-flipping-forward .wb-cover-front, .wb-flipping-back .wb-cover-front {
          transform: translateZ(calc(var(--wb-page-depth) / 2)) rotateY(-180deg);
          cursor: default;
        }
        .wb-closed .wb-cover-front .wb-cover-face-front {
          box-shadow: 6px 6px 20px rgba(130, 120, 115, 0.25), inset 1px 1px 2px rgba(255, 255, 255, 0.8);
        }
        .wb-cover-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          overflow: hidden;
        }
        .wb-cover-face-front { border-radius: 0 var(--wb-radius-cover) var(--wb-radius-cover) 0; }
        .wb-cover-face-back {
          transform: rotateY(180deg);
          border-radius: var(--wb-radius-cover) 0 0 var(--wb-radius-cover);
          background: #FFFFFF;
        }
        .wb-cover-face-back::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 40px;
          background: linear-gradient(to left, var(--wb-page-edge-shadow), transparent);
          opacity: 0.3;
        }

        /* ── Pages ── */
        .wb-page-sheet {
          position: absolute;
          left: var(--wb-page-w); top: var(--wb-cover-overhang);
          width: var(--wb-page-w); height: var(--wb-page-h);
          transform-style: preserve-3d;
        }
        .wb-page-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          background: var(--wb-page-paper);
          overflow: hidden;
        }
        .wb-page-face-back { transform: rotateY(-180deg); }
        .wb-base-right {
          transform: translateZ(8px);
          box-shadow: inset 10px 0 20px rgba(0,0,0,0.02);
          border-radius: 0 var(--wb-radius-page) var(--wb-radius-page) 0;
          z-index: 10;
        }
        .wb-base-left {
          transform-origin: left center;
          transition: transform var(--wb-duration-open) var(--wb-ease-smooth);
          z-index: 20;
        }
        .wb-closed .wb-base-left, .wb-closing .wb-base-left {
          transform: translateZ(10px) rotateY(0deg);
          pointer-events: none;
        }
        .wb-opening .wb-base-left, .wb-open .wb-base-left,
        .wb-flipping-forward .wb-base-left, .wb-flipping-back .wb-base-left {
          transform: translateZ(14px) rotateY(-180deg);
          pointer-events: auto;
        }
        .wb-base-left .wb-page-face-back {
          box-shadow: inset -10px 0 20px rgba(0,0,0,0.02);
          border-radius: var(--wb-radius-page) 0 0 var(--wb-radius-page);
          opacity: 0;
          transition: opacity 400ms;
        }
        .wb-open .wb-base-left .wb-page-face-back,
        .wb-flipping-forward .wb-base-left .wb-page-face-back,
        .wb-flipping-back .wb-base-left .wb-page-face-back { opacity: 1; }

        /* ── Flipping Engine ── */
        .wb-flipping-page {
          transform-origin: left center;
          transition: transform var(--wb-duration-flip) var(--wb-ease-flip);
          transform: translateZ(16px) rotateY(var(--wb-flip-angle, 0deg));
          pointer-events: none;
          z-index: 100;
        }
        .wb-flipping-page .wb-page-face-front {
          box-shadow: inset 10px 0 20px rgba(0,0,0,0.02), 8px 0 20px rgba(0,0,0,0.06);
          border-radius: 0 var(--wb-radius-page) var(--wb-radius-page) 0;
        }
        .wb-flipping-page .wb-page-face-back {
          box-shadow: inset -10px 0 20px rgba(0,0,0,0.02), -8px 0 20px rgba(0,0,0,0.06);
          border-radius: var(--wb-radius-page) 0 0 var(--wb-radius-page);
        }
        .wb-binding-shadow {
          position: absolute; top: 0; bottom: 0; width: 32px; pointer-events: none;
        }
        .wb-binding-right { left: 0; background: linear-gradient(90deg, rgba(0,0,0,0.05) 0%, transparent 100%); }
        .wb-binding-left { right: 0; background: linear-gradient(-90deg, rgba(0,0,0,0.05) 0%, transparent 100%); }

        /* ── PAGE CONTENT ── */
        .wb-page-content {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          overflow: hidden;
          background: var(--wb-page-paper);
          padding: 24px;
        }
        .wb-is-right { padding-left: 16px; padding-right: 32px; }
        .wb-is-left { padding-left: 32px; padding-right: 16px; }
        .wb-header {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 8px; margin-bottom: 12px;
          border-bottom: 1px solid var(--wb-divider);
          font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em;
          color: var(--wb-text-light); font-weight: 500;
        }
        .wb-page-num {
          margin-top: auto; padding-top: 8px;
          text-align: center; font-weight: 700;
          color: var(--wb-accent); font-size: 14px;
        }

        /* ── Typography ── */
        .wb-title { font-size: 18px; color: var(--wb-text-primary); margin-bottom: 4px; line-height: 1.3; }
        .wb-subtitle { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--wb-accent); font-weight: 600; margin-bottom: 6px; }
        .wb-text-p { font-size: 11px; line-height: 1.6; color: var(--wb-text-secondary); margin-bottom: 8px; }
        .wb-quote p { font-size: 18px; font-style: italic; color: var(--wb-accent-dark); text-align: center; margin: 16px 0; padding: 0 8px; line-height: 1.3; white-space: pre-line; }
        .wb-text-block { margin-bottom: 12px; }
        .wb-text-title { font-weight: 700; font-size: 16px; margin-bottom: 4px; color: var(--wb-text-primary); }

        /* ── Phase Block ── */
        .wb-block-phase {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          padding: 12px; border-radius: 12px; margin-bottom: 12px;
          background: var(--wb-box-pink); border: 1px solid var(--wb-border-pink);
        }
        .wb-step-num {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%;
          font-size: 18px; font-style: italic; color: var(--wb-accent-dark);
          background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          margin-bottom: 8px;
        }

        /* ── NLP Block ── */
        .wb-block-nlp {
          position: relative; padding: 16px 16px 12px; border-radius: 12px; margin-bottom: 12px;
          background: var(--wb-box-purple); border: 1px solid var(--wb-border-purple);
          padding-top: 24px;
        }
        .wb-block-nlp::before {
          content: 'NLP TOOL';
          position: absolute; top: 0; left: 16px;
          padding: 2px 8px; background: white;
          border-radius: 0 0 4px 4px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.1em;
          color: #A396BE; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .wb-nlp-title { font-weight: 700; font-size: 14px; color: #6B5A8E; margin-bottom: 4px; }
        .wb-nlp-text { font-size: 11px; color: #867B99; line-height: 1.5; white-space: pre-line; }

        /* ── Prompt Block ── */
        .wb-block-prompt { display: flex; flex-direction: column; gap: 2px; margin-bottom: 6px; margin-top: 6px; }
        .wb-prompt-header { display: flex; align-items: center; gap: 6px; }
        .wb-prompt-num {
          display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--wb-accent); color: white;
          font-weight: 700; font-size: 9px; flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .wb-prompt-title { font-size: 15px; font-weight: 700; color: var(--wb-text-primary); line-height: 1.2; }
        .wb-prompt-subtitle { font-size: 10px; color: var(--wb-text-secondary); margin-top: 2px; margin-left: 26px; }

        /* ── Tan Box ── */
        .wb-block-tan {
          padding: 12px; border-radius: 12px; margin-bottom: 12px; text-align: center;
          background: var(--wb-box-tan); border: 1px solid #EFEBE6;
        }
        .wb-tan-text { font-size: 14px; font-style: italic; color: #6A5E55; font-weight: 500; line-height: 1.3; }

        /* ── Write Lines ── */
        .wb-write-lines { display: flex; flex-direction: column; gap: 16px; width: 100%; margin-bottom: 8px; margin-top: 4px; }
        .wb-write-line { width: 100%; border-bottom: 1px solid var(--wb-divider); position: relative; }
        .wb-write-line::before {
          content: '';
          position: absolute; left: -4px; bottom: -3px;
          width: 6px; height: 6px; border-radius: 50%; background: var(--wb-divider);
        }

        /* ── Cover Inner ── */
        .wb-cover-inner {
          position: absolute; inset: 0;
          background: var(--wb-cover-bg);
          display: flex; flex-direction: column; align-items: center;
          padding: 24px; text-align: center;
          border: 1px solid rgba(0,0,0,0.03);
          border-radius: 0 var(--wb-radius-cover) var(--wb-radius-cover) 0;
          overflow: hidden;
        }
        .wb-cover-gradient {
          position: absolute; top: 0; right: 0; width: 100%; height: 50%;
          background: linear-gradient(to bottom, #FDF2F4, transparent);
          opacity: 0.6;
        }
        .wb-cover-blob {
          position: absolute; left: -80px; bottom: 0;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: #F4EFE6;
          opacity: 0.6;
          filter: blur(80px);
          pointer-events: none;
        }
        .wb-cover-content { margin-top: 48px; margin-bottom: 32px; z-index: 10; }
        .wb-cover-title {
          font-size: 64px; font-weight: 900; text-transform: uppercase;
          color: #B88686; line-height: 1; letter-spacing: 0.05em;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .wb-cover-tagline {
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--wb-text-light); margin-top: 12px;
        }
        .wb-cover-divider { width: 48px; height: 2px; background: var(--wb-accent); margin-bottom: 32px; z-index: 10; opacity: 0.6; }
        .wb-cover-book-title {
          font-size: 40px; font-weight: 700;
          color: var(--wb-text-primary); margin-bottom: 8px; z-index: 10; line-height: 1;
        }
        .wb-cover-subtitle {
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--wb-accent); z-index: 10;
        }
        .wb-cover-footer {
          position: absolute; bottom: 32px;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--wb-text-light); z-index: 10;
        }

        /* ── Navigation ── */
        .wb-nav {
          position: absolute; bottom: 24px; left: 0; right: 0;
          display: flex; justify-content: center; align-items: center; gap: 12px;
          opacity: 0; transform: translateY(20px);
          transition: all 0.5s ease;
          pointer-events: none;
          z-index: 50;
        }
        .wb-nav-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .wb-nav-btn {
          display: flex; align-items: center; justify-content: center;
          height: 44px; border-radius: 22px;
          background: var(--wb-nav-bg);
          border: 1px solid var(--wb-nav-border);
          color: var(--wb-nav-text);
          font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .wb-nav-btn:hover:not(:disabled) {
          background: white;
          border-color: var(--wb-accent);
          color: var(--wb-accent);
          box-shadow: 0 4px 12px rgba(212, 163, 163, 0.3);
        }
        .wb-nav-btn:active:not(:disabled) { transform: scale(0.96); }
        .wb-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }

        /* ── Tap to open hint ── */
        .wb-hint {
          position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--wb-text-light);
          transition: opacity 0.6s ease;
          pointer-events: none;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .wb-hint-line {
          width: 1px; height: 20px;
          background: linear-gradient(to bottom, var(--wb-text-light), transparent);
          opacity: 0.5;
        }
      `}</style>

      {/* 3D BOOK CONTAINER */}
      <div className={`wb-book wb-${bookState}`} style={bookTransformStyle}>
        <div className="wb-book-shadow" />

        <div className="wb-cover wb-cover-back">
          <div className="wb-cover-inner wb-cover-face-back-content">
            <div className="wb-cover-footer">hirahsafi@gmail.com</div>
          </div>
        </div>

        {/* Paper Edges */}
        <div className="wb-paper-edge wb-paper-edge-right" />
        <div className="wb-paper-edge wb-paper-edge-top" />
        <div className="wb-paper-edge wb-paper-edge-bottom" />

        {/* Base Right Page */}
        <div className="wb-page-sheet wb-base-right">
          <PageContentView content={getRightPage(baseRightSpreadIndex)} isRightSide />
          <div className="wb-binding-shadow wb-binding-right" />
        </div>

        {/* Base Left Page */}
        <div className="wb-page-sheet wb-base-left">
          <div className="wb-page-face wb-page-face-back">
            <PageContentView content={getLeftPage(baseLeftSpreadIndex)} />
            <div className="wb-binding-shadow wb-binding-left" />
          </div>
        </div>

        {/* Flipping Page */}
        {isFlipping && (
          <div className="wb-page-sheet wb-flipping-page" style={{ '--wb-flip-angle': `${flipAngle}deg` } as React.CSSProperties}>
            <div className="wb-page-face wb-page-face-front">
              <PageContentView content={isFlipping ? getRightPage(flipFrontIndex) : null} isRightSide />
              <div className="wb-binding-shadow wb-binding-right" />
            </div>
            <div className="wb-page-face wb-page-face-back">
              <PageContentView content={isFlipping ? getLeftPage(flipBackIndex) : null} />
              <div className="wb-binding-shadow wb-binding-left" />
            </div>
          </div>
        )}

        <div className="wb-spine" />

        {/* Front Cover */}
        <div className="wb-cover wb-cover-front" onClick={bookState === 'closed' && !animLock ? openBook : undefined}>
          <div className="wb-cover-face wb-cover-face-front">
            <CoverDesign />
          </div>
          <div className="wb-cover-face wb-cover-face-back" />
        </div>
      </div>

      {/* Navigation UI */}
      <div className={`wb-nav ${isOpen ? 'wb-nav-visible' : ''}`}>
        <button onClick={goPrev} disabled={currentSpread <= 0 || animLock} aria-label="Previous Page" className="wb-nav-btn" style={{ width: 44 }}>
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button onClick={closeBook} disabled={animLock} className="wb-nav-btn" style={{ padding: '0 20px' }}>
          <X size={14} className="mr-2" strokeWidth={2} /> Close
        </button>
        <button onClick={goNext} disabled={currentSpread >= TOTAL_SPREADS - 1 || animLock} aria-label="Next Page" className="wb-nav-btn" style={{ width: 44 }}>
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Tap to open hint */}
      <div className={`wb-hint ${bookState === 'closed' ? '' : ''}`} style={{ opacity: bookState === 'closed' ? 1 : 0 }}>
        <span>Tap to Open Workbook</span>
        <div className="wb-hint-line" />
      </div>
    </div>
  );
}
