import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CornerVineProps {
  playTrigger: number;
  position?: 'top-left' | 'bottom-right';
  className?: string;
}

const CornerVine: React.FC<CornerVineProps> = ({ playTrigger, position = 'top-left', className }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const leavesRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const leaves = leavesRef.current;
    if (!path || !leaves) return;

    const length = (path as SVGPathElement).getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    gsap.set(leaves.querySelectorAll('circle'), { scale: 0, transformOrigin: '50% 50%', opacity: 0 });

    const tl = gsap.timeline();
    tl.to(path, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.out' })
      .to(leaves.querySelectorAll('circle'), {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
        stagger: 0.08,
      }, '-=0.6');

    return () => { tl.kill(); };
  }, [playTrigger]);

  return (
    <div className={`corner-vine ${position} ${className || ''}`.trim()}>
      <svg viewBox="0 0 300 300" width="100%" height="100%">
        <defs>
          <linearGradient id="vineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7FC17F" />
            <stop offset="100%" stopColor="#3E8B3E" />
          </linearGradient>
        </defs>
        {/* Vine path */}
        <path
          ref={pathRef}
          d={position === 'top-left'
            ? 'M10,290 C40,250 60,220 80,200 C110,170 140,160 170,130 C190,110 220,70 290,10'
            : 'M290,10 C250,40 220,60 200,80 C170,110 160,140 130,170 C110,190 70,220 10,290'}
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
        />
        {/* Leaves as small circles along the vine */}
        <g ref={leavesRef}>
          {Array.from({ length: 10 }).map((_, i) => {
            const t = i / 9; // 0..1
            const x = position === 'top-left' ? 10 + 280 * t : 290 - 280 * t;
            const y = position === 'top-left' ? 290 - 280 * t : 10 + 280 * t;
            return <circle key={i} cx={x} cy={y} r={5} fill="#7FC17F" opacity={0} />;
          })}
        </g>
      </svg>
    </div>
  );
};

export default CornerVine;

