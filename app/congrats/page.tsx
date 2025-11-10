'use client';

import { useEffect, useRef } from 'react';
import { CalendarDays, Mail, Sparkles } from 'lucide-react';

const colors = ['#E0c5bb', '#d29a89', '#ecd9d2', '#f7f4f1', '#FFB5A7', '#FCD5CE'];

type Piece = {
  x: number; y: number; w: number; h: number;
  vx: number; vy: number; r: number; vr: number; color: string;
};

function ConfettiCanvas({ durationMs = 6000, density = 180 }: { durationMs?: number; density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const pieces: Piece[] = [];
    const makePiece = (): Piece => ({
      x: Math.random() * w, y: -20 - Math.random() * h,
      w: 6 + Math.random() * 8, h: 10 + Math.random() * 12,
      vx: -1.5 + Math.random() * 3, vy: 2 + Math.random() * 3.5,
      r: Math.random() * Math.PI, vr: -0.15 + Math.random() * 0.3,
      color: colors[(Math.random() * colors.length) | 0],
    });
    for (let i = 0; i < density; i++) pieces.push(makePiece());

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const t = performance.now() - start;
      ctx.clearRect(0, 0, w, h);

      if (!stopRef.current && pieces.length < density) for (let i = 0; i < 4; i++) pieces.push(makePiece());

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.x += p.vx + Math.sin((t + i * 25) / 700) * 0.6;
        p.y += p.vy;
        p.r += p.vr;

        if (p.y - 20 > h) {
          if (stopRef.current) { pieces.splice(i, 1); i--; continue; }
          pieces[i] = makePiece(); pieces[i].y = -20; continue;
        }

        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
      if (!stopRef.current && t > durationMs) stopRef.current = true;
      if (stopRef.current && pieces.length === 0) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(loop);

    return () => { stopRef.current = true; cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [durationMs, density]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-10" aria-hidden />;
}

export default function CongratsPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-5 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <ConfettiCanvas />

      <section
        className="relative w-full max-w-3xl rounded-3xl bg-white/80 backdrop-blur ring-1 shadow-xl text-center p-6 sm:p-10"
        style={{ borderColor: 'rgba(224,197,187,0.45)' }}
      >
        <div
          className="absolute -inset-6 -z-10 blur-3xl opacity-60"
          style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(252,213,206,.6), transparent)' }}
          aria-hidden
        />

        <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl leading-tight" style={{ color: 'var(--text-color)' }}>
          Congratulations—You chose courage.
        </h1>

        <p
          className="font-lato mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed mx-auto max-w-2xl opacity-90"
          style={{ color: 'var(--text-color)' }}
        >
          Today you took a <strong>decisive step toward self-leadership</strong>. You didn’t wait for change—you initiated it.
          Expect a <strong>deep, compassionate, and empowering experience</strong> designed to create real momentum.
          We genuinely can’t wait to welcome you and witness your transformation.
        </p>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 text-left mx-auto max-w-xl">
          <div className="flex items-start gap-3 rounded-xl bg-white/85 ring-1 p-3 sm:p-4" style={{ borderColor: 'rgba(224,197,187,0.4)' }}>
            <Mail className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--text-color)' }} />
            <p className="font-lato text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
              A confirmation email is on its way with all the details and next steps.
              <span className="block mt-1 text-xs sm:text-sm opacity-80">
                If you don’t see it within a few minutes, <strong>check your Junk/Spam/Promotions</strong> folder and mark us as safe.
              </span>
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-white/85 ring-1 p-3 sm:p-4" style={{ borderColor: 'rgba(224,197,187,0.4)' }}>
            <CalendarDays className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--text-color)' }} />
            <p className="font-lato text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
              Add the event to your calendar from the email to protect your time and energy for this important work.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-white/85 ring-1 p-3 sm:p-4" style={{ borderColor: 'rgba(224,197,187,0.4)' }}>
            <Sparkles className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--text-color)' }} />
            <p className="font-lato text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
              Come as you are. We’ll bring the structure and softness—you bring your honest self.
              This is designed to be <strong>life-changing</strong>.
            </p>
          </div>
        </div>

        <p className="mt-5 sm:mt-6 text-xs sm:text-sm font-lato opacity-80" style={{ color: 'var(--text-color)' }}>
          Need help? Email <a className="underline" href="mailto:hello@hirahsaficoach.com">lifestyle@hirahsaficoach.com</a>.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <a
            href="/events/soulmate-workshop"
            className="rounded-full px-6 py-3 w-full sm:w-auto text-center"
            style={{ backgroundColor: 'var(--cta-color)', color: 'var(--cta-text-color)' }}
          >
            Learn About the Workshop
          </a>
          <a
            href="/"
            className="rounded-full px-6 py-3 w-full sm:w-auto text-center ring-1"
            style={{ color: 'var(--text-color)', borderColor: 'rgba(224,197,187,0.45)' }}
          >
            Go Home
          </a>
        </div>
      </section>
    </main>
  );
}
