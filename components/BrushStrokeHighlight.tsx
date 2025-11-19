'use client';
import React from 'react';

interface BrushStrokeHighlightProps {
  children: React.ReactNode;
  colorStart?: string;
  colorEnd?: string;
  waveWidthPercent?: number;
  animationDuration?: string;
  opacity?: number;
  blurred?: boolean;
  height?: string;
  rounded?: string;
  width?: string;
}

const BrushStrokeHighlight: React.FC<BrushStrokeHighlightProps> = ({
  children,
  colorStart = '#f8bdda',
  colorEnd = '#ffd1e6',
  waveWidthPercent = 50,
  animationDuration = '25s',
  opacity = 0.5,
  blurred = false,
  height = '1.5em',
  rounded = '0.25em',
  width = 'fit-content',
}) => {
  const encodedPath = encodeURIComponent(
    `M0,14 C10,8 20,20 30,14 C40,8 50,20 60,14 C70,8 80,20 90,14 
     C100,8 110,20 120,14 L120,30 C110,36 100,24 90,30 C80,36 
     70,24 60,30 C50,36 40,24 30,30 C20,36 10,24 0,30 Z`
  );

  const maskUrl = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40' preserveAspectRatio='none'%3e%3cpath d='${encodedPath}' fill='%23000'/%3e%3c/svg%3e")`;

  const highlightStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%) translateZ(0)',
    zIndex: -1,
    background: `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskRepeat: 'repeat-x',
    maskRepeat: 'repeat-x',
    WebkitMaskSize: `${waveWidthPercent}% 100%`,
    maskSize: `${waveWidthPercent}% 100%`,
    WebkitMaskPosition: '0% 50%',
    maskPosition: '0% 50%',
    animation: `waveScroll ${animationDuration} linear infinite`,
    willChange: 'mask-position, -webkit-mask-position',
    opacity,
    height,
    borderRadius: rounded,
    width: '100%',
    filter: blurred ? 'blur(4px)' : undefined,
    pointerEvents: 'none',
  };

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width,
      }}
    >
      <style>
        {`
          @keyframes waveScroll {
            0% {
              mask-position: 0% 50%;
              -webkit-mask-position: 0% 50%;
            }
            100% {
              mask-position: 100% 50%;
              -webkit-mask-position: 100% 50%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .brush-slow-anim {
              animation: none !important;
            }
          }
        `}
      </style>
      <span
        aria-hidden="true"
        className="brush-slow-anim"
        style={highlightStyle}
      />
      {children}
    </span>
  );
};

export default BrushStrokeHighlight;
