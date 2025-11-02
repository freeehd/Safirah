import React from 'react';

interface GardenStemProps {
  height: number; // px
  width?: number; // px
  variant?: 'left' | 'right' | 'both';
  className?: string;
  opacity?: number;
}

// A leafy, curved stem used under each garden bloom
const GardenStem: React.FC<GardenStemProps> = ({
  height,
  width,
  variant = 'both',
  className,
  opacity = 0.55,
}) => {
  const w = Math.max(60, width ?? Math.floor(height * 0.28));
  const h = Math.max(100, height);

  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox="0 0 100 300"
      preserveAspectRatio="xMidYMin meet"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#88C98D" />
          <stop offset="100%" stopColor="#4E9F55" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8D5A9" />
          <stop offset="100%" stopColor="#6FBF7A" />
        </linearGradient>
        <filter id="leafSoft">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      {/* Curved stem from flower downward (thicker with subtle highlight) */}
      <path d="M50,0 C53,45 47,95 52,150 C48,190 53,235 50,300" fill="none" stroke="#3C8A43" strokeOpacity="0.18" strokeWidth={7} strokeLinecap="round" />
      <path d="M50,0 C53,45 47,95 52,150 C48,190 53,235 50,300" fill="none" stroke="url(#stemGrad)" strokeWidth={5} strokeLinecap="round" />
      <path d="M50,2 C53,46 47,96 52,150 C48,190 53,235 50,298" fill="none" stroke="#BFE7C1" strokeOpacity="0.5" strokeWidth={1.4} strokeLinecap="round" />

      {/* Leaf path shape reusable via <path> with transforms */}
      {/* Left leaves */}
      {(variant === 'left' || variant === 'both') && (
        <g className="leaf leaf--left" filter="url(#leafSoft)">
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="url(#leafGrad)" transform="translate(16,68) rotate(-28) scale(0.95)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="url(#leafGrad)" transform="translate(12,133) rotate(-21) scale(0.9)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="url(#leafGrad)" transform="translate(10,198) rotate(-16) scale(0.85)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="none" stroke="#3C8A43" strokeOpacity="0.25" strokeWidth="0.8" transform="translate(16,68) rotate(-28) scale(0.95)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="none" stroke="#3C8A43" strokeOpacity="0.25" strokeWidth="0.8" transform="translate(12,133) rotate(-21) scale(0.9)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="none" stroke="#3C8A43" strokeOpacity="0.25" strokeWidth="0.8" transform="translate(10,198) rotate(-16) scale(0.85)" />
        </g>
      )}
      {/* Right leaves */}
      {(variant === 'right' || variant === 'both') && (
        <g className="leaf leaf--right" filter="url(#leafSoft)">
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="url(#leafGrad)" transform="translate(58,93) rotate(26) scale(0.95)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="url(#leafGrad)" transform="translate(62,163) rotate(20) scale(0.9)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="url(#leafGrad)" transform="translate(60,228) rotate(16) scale(0.85)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="none" stroke="#3C8A43" strokeOpacity="0.25" strokeWidth="0.8" transform="translate(58,93) rotate(26) scale(0.95)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="none" stroke="#3C8A43" strokeOpacity="0.25" strokeWidth="0.8" transform="translate(62,163) rotate(20) scale(0.9)" />
          <path d="M0,0 C16,-10 30,-10 44,0 C28,8 16,8 0,0 Z" fill="none" stroke="#3C8A43" strokeOpacity="0.25" strokeWidth="0.8" transform="translate(60,228) rotate(16) scale(0.85)" />
        </g>
      )}
    </svg>
  );
};

export default GardenStem;
