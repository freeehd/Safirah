import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UnderlineVineProps {
  playTrigger: number;
  className?: string;
  colorStart?: string;
  colorEnd?: string;
  height?: number;
}

// A small horizontal vine that draws in under text
const UnderlineVine: React.FC<UnderlineVineProps> = ({
  playTrigger,
  className,
  colorStart = '#7FC17F',
  colorEnd = '#3E8B3E',
  height = 16,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const leavesRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const leaves = leavesRef.current;
    if (!path || !leaves) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    gsap.set(leaves.querySelectorAll('ellipse'), { scale: 0, transformOrigin: '50% 50%', opacity: 0 });

    const tl = gsap.timeline();
    tl.to(path, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' })
      .to(
        leaves.querySelectorAll('ellipse'),
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)', stagger: 0.05 },
        '-=0.3'
      );

    return () => { tl.kill(); };
  }, [playTrigger]);

  return (
    <div className={className} style={{ width: '100%', height }}>
      <svg viewBox="0 0 300 40" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="uvGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M5,20 C60,10 120,30 180,18 C220,12 260,22 295,20"
          fill="none"
          stroke="url(#uvGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0"
        />
        <g ref={leavesRef}>
          <ellipse cx="60" cy="18" rx="3.5" ry="2.2" fill="#74b774" opacity="0" />
          <ellipse cx="120" cy="26" rx="3.5" ry="2.2" fill="#74b774" opacity="0" />
          <ellipse cx="190" cy="16" rx="3.5" ry="2.2" fill="#74b774" opacity="0" />
          <ellipse cx="250" cy="23" rx="3.5" ry="2.2" fill="#74b774" opacity="0" />
        </g>
      </svg>
    </div>
  );
};

export default UnderlineVine;

