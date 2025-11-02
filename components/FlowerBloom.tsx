import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FlowerBloomProps {
  playTrigger: number;
  size?: number;
  className?: string;
  delay?: number;
  petalStart?: string;
  petalEnd?: string;
  centerStart?: string;
  centerEnd?: string;
  glow?: boolean;
  showRing?: boolean;
  idSuffix?: string | number;
}

// SVG + GSAP flower bloom animation. Petals scale/rotate in with a glow.
const FlowerBloom: React.FC<FlowerBloomProps> = ({
  playTrigger,
  size = 350,
  className,
  delay = 0,
  petalStart = '#FFB3C1',
  petalEnd = '#E85480',
  centerStart = '#FFE5A8',
  centerEnd = '#F4C95D',
  glow = true,
  showRing = true,
  idSuffix = '',
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const petalsRef = useRef<SVGGElement | null>(null);
  const centerRef = useRef<SVGCircleElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const delayedRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!rootRef.current || !petalsRef.current || !centerRef.current) return;
    const petals = Array.from(petalsRef.current.querySelectorAll('ellipse')) as SVGEllipseElement[];

    // Create a timeline once
    if (!tlRef.current) {
      const tl = gsap.timeline({ paused: true });

      // Reset to initial state
      tl.set(petals, { scale: 0, transformOrigin: '50% 50%', opacity: 0 });
      tl.set(centerRef.current, { scale: 0, transformOrigin: '50% 50%', opacity: 0 });
      if (ringRef.current) tl.set(ringRef.current, { scale: 0.2, transformOrigin: '50% 50%', opacity: 0 });

      // Petals bloom in a stagger
      tl.to(petals, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.8)',
        stagger: 0.06,
      });

      // Center pops in
      tl.to(centerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.8)',
      }, '-=0.35');

      // Glow ring expands and fades (optional)
      if (ringRef.current) {
        tl.to(ringRef.current, {
          scale: 1.15,
          opacity: 0.7,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.45')
        .to(ringRef.current, {
          scale: 1.4,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        }, '-=0.1');
      }

      // No idle loop to ensure it appears only on trigger

      tlRef.current = tl;
    }

    // Play anew on trigger change with optional delay
    if (delayedRef.current) {
      delayedRef.current.kill();
      delayedRef.current = null;
    }
    const play = () => {
      tlRef.current?.restart();
    };
    delayedRef.current = delay > 0 ? gsap.delayedCall(delay, play) : gsap.to({}, { duration: 0, onComplete: play });
  }, [playTrigger]);

  return (
    <div ref={rootRef} className={className} style={{ width: size, height: size }}>
      <svg viewBox="0 0 500 500" width="100%" height="100%">
        <defs>
          <filter id={`softGlow-${idSuffix}`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`petalGrad-${idSuffix}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={petalStart} />
            <stop offset="100%" stopColor={petalEnd} />
          </radialGradient>
          <radialGradient id={`centerGrad-${idSuffix}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={centerStart} />
            <stop offset="100%" stopColor={centerEnd} />
          </radialGradient>
        </defs>

        {/* Petals group */}
        <g ref={petalsRef} filter={glow ? `url(#softGlow-${idSuffix})` : undefined}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <ellipse
                key={i}
                cx={250}
                cy={250}
                rx={40}
                ry={120}
                fill={`url(#petalGrad-${idSuffix})`}
                transform={`rotate(${angle} 250 250)`}
                opacity={0}
              />
            );
          })}
        </g>

        {/* Flower center */}
        <circle ref={centerRef} cx={250} cy={250} r={34} fill={`url(#centerGrad-${idSuffix})`} opacity={0} />

        {/* Glow ring */}
        {showRing && (
          <circle ref={ringRef} cx={250} cy={250} r={80} fill="none" stroke="#E85480" strokeWidth={6} opacity={0} />
        )}
      </svg>
    </div>
  );
};

export default FlowerBloom;
