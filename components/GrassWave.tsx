import React from 'react';

interface GrassWaveProps {
  height?: number; // px
  className?: string;
}

// Decorative layered grass wave at the bottom of the CTA
const GrassWave: React.FC<GrassWaveProps> = ({ height = 80, className }) => {
  return (
    <div className={className} style={{ height }}>
      <svg viewBox="0 0 1200 80" width="100%" height="100%" preserveAspectRatio="none">
        {/* Back layer */}
        <path className="grass-layer back" d="M0,60 C200,40 400,70 600,55 C800,40 1000,70 1200,58 L1200,80 L0,80 Z" fill="rgba(126, 187, 140, 0.25)" />
        {/* Mid layer */}
        <path className="grass-layer mid" d="M0,62 C220,48 420,74 620,62 C820,48 1020,74 1200,62 L1200,80 L0,80 Z" fill="rgba(102, 170, 120, 0.28)" />
        {/* Front layer */}
        <path className="grass-layer front" d="M0,66 C240,54 440,78 640,66 C860,54 1060,78 1200,66 L1200,80 L0,80 Z" fill="rgba(94, 168, 112, 0.34)" />
      </svg>
    </div>
  );
};

export default GrassWave;
