'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WatercolorRevealProps {
  text: string;
  className?: string;
  color?: string;
  delay?: number;
}

export default function WatercolorReveal({
  text,
  className = "",
  color = "#B98A82",
  delay = 0
}: WatercolorRevealProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay }}
        className="relative z-10"
      >
        {text}
      </motion.span>
      
      {/* Watercolor Mask Animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'blur(8px)' }}>
        <defs>
          <mask id="watercolorMask">
            <motion.path
              d="M 0,20 Q 50,0 100,20 T 200,20 T 300,20 T 400,20"
              stroke="white"
              strokeWidth="40"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay, ease: "easeInOut" }}
            />
          </mask>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill={color}
          opacity={0.3}
          mask="url(#watercolorMask)"
        />
      </svg>
    </div>
  );
}
