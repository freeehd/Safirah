'use client';

import { useEffect, useRef } from 'react';

const colors = ['#E0c5bb', '#d29a89', '#ecd9d2', '#f7f4f1', '#FFB5A7', '#FCD5CE'];

type Piece = {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  r: number; // rotation
  vr: number; // rotation velocity
  color: string;
};

function ConfettiCanvas({ durationMs = 6000, density = 180 }: { durationMs?: number; density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const pieces: Piece[] = [];
    const makePiece = (): Piece => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h,
      w: 6 + Math.random() * 8,
      h: 10 + Math.random() * 12,
      vx: -1.5 + Math.random() * 3,
      vy: 2 + Math.random() * 3.5,
      r: Math.random() * Math.PI,
      vr: (-0.15 + Math.random() * 0.3),
      color: colors[(Math.random() * colors.length) | 0]
    });

    for (let i = 0; i < density; i++) pieces.push(makePiece());

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const now = performance.now();
      const t = now - start;
      ctx.clearRect(0, 0, w, h);

      // spawn a few new while running
      if (!stopRef.current && pieces.length < density) {
        for (let i = 0; i < 4; i++) pieces.push(makePiece());
      }

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.x += p.vx + Math.sin((t + i * 25) / 700) * 0.6;
        p.y += p.vy;
        p.r += p.vr;

        // recycle when out of view
        if (p.y - 20 > h) {
          if (stopRef.current) {
            pieces.splice(i, 1);
            i--;
            continue;
          }
          pieces[i] = makePiece();
          pieces[i].y = -20;
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
      // stop spawning after duration
      if (!stopRef.current && t > durationMs) stopRef.current = true;
      // end animation after all pieces disappear
      if (stopRef.current && pieces.length === 0) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      stopRef.current = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [durationMs, density]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden
    />
  );
}

export default function CongratsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ backgroundColor: 'var(--background-color)' }}>
      <ConfettiCanvas />
      <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl" style={{ color: 'var(--text-color)' }}>
        Congratulations!
      </h1>
      <p className="font-lato mt-4 opacity-90 max-w-2xl" style={{ color: 'var(--text-color)' }}>
        Your purchase is complete. Check your email for details and next steps.
      </p>
      <div className="mt-8 flex gap-3 flex-wrap items-center justify-center">
        <a href="/" className="rounded-full px-6 py-3" style={{ backgroundColor: 'var(--cta-color)', color: 'var(--cta-text-color)' }}>
          Go Home
        </a>
        <a href="/events" className="rounded-full px-6 py-3 ring-1" style={{ color: 'var(--text-color)', borderColor: 'rgba(0,0,0,0.08)' }}>
          Browse Events
        </a>
      </div>
    </main>
  );
}

