import React, { useEffect, useRef, useState } from 'react';
import BrushStrokeHighlight from './BrushStrokeHighlight';

const Hero = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [motionScale, setMotionScale] = useState(1);

  const highlightColor = 'var(--highlight-color, #f8bdda)';
  const textColor = 'var(--text-color, #2a1f29)';
  const textOnAccent = 'var(--text-on-accent, #ffffff)';
  const bgColor = 'var(--bg-color, #fff7fb)';
  const backgroundLayers =
    'radial-gradient(circle at 15% 15%, rgba(255, 200, 224, 0.45), transparent 55%), radial-gradient(circle at 85% 25%, rgba(255, 216, 233, 0.4), transparent 55%), radial-gradient(circle at 20% 85%, rgba(255, 232, 242, 0.5), transparent 60%)';

  useEffect(() => {
    setIsVisible(true);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const smallScreen =
      typeof window !== 'undefined' && window.innerWidth < 640;

    setMotionScale(prefersReduced || smallScreen ? 0 : 1);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced || smallScreen) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 15;
      const y = (clientY / window.innerHeight - 0.5) * 15;
      setMousePosition({ x, y });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen  w-full overflow-hidden  mx-auto"
      style={{ backgroundColor: bgColor, backgroundImage: backgroundLayers }}
    >
      {/* Pastel blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hidden md:block absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(248, 189, 218, 0.75) 0%, rgba(248, 189, 218, 0.05) 70%)',
            opacity: 0.45,
            transform: `translate(${mousePosition.x * motionScale}px, ${mousePosition.y * motionScale}px)`,
            transition: 'transform 0.6s ease-out',
            willChange: 'transform'
          }}
        />
        <div
          className="hidden md:block absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 206, 230, 0.6) 0%, rgba(255, 206, 230, 0.05) 70%)',
            opacity: 0.35,
            transform: `translate(${-mousePosition.x * motionScale}px, ${-mousePosition.y * motionScale}px)`,
            transition: 'transform 0.6s ease-out',
            animationDelay: '1.5s',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-24 xl:px-32 py-10">
        <div className="max-w-screen-xl mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-40">
          {/* IMAGE */}
          <div
            className="relative order-1 lg:order-2 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-full">
              <div
                className="relative overflow-hidden rounded-[2rem]"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.25 * motionScale}deg) rotateX(${-mousePosition.y * 0.25 * motionScale}deg)`,
                  transition: 'transform 0.3s ease-out',
                  willChange: 'transform'
                }}
              >
                <img
                  src="/assets/1.webp"
                  alt="Hirah Safi, life and success coach"
                  className="w-full h-[58vh] sm:h-[64vh] lg:h-[620px] object-cover"
                />
                <div
                  className="absolute inset-0 opacity-40 sm:opacity-30"
                  style={{
                    background:
                      'linear-gradient(to top, var(--highlight-color, #f8bdda), transparent 55%)'
                  }}
                />
              </div>

              {/* 🩷 Floating “Hi I'm Hirah” card (RESTORED) */}
              <div
                className="absolute -bottom-8 -left-8 rounded-2xl p-5 sm:p-6 backdrop-blur-md border"
                style={{
                  backgroundColor: highlightColor,
                  color: textOnAccent,
                  borderColor: 'rgba(255,255,255,0.35)',
                  transform: `translate(${mousePosition.x * 0.4 * motionScale}px, ${mousePosition.y * 0.4 * motionScale}px)`,
                  transition: 'transform 0.3s ease-out',
                  willChange: 'transform'
                }}
              >
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-serif font-bold">
                    Hi, I&apos;m Hirah!
                  </div>
                  <div className="text-xs uppercase tracking-widest opacity-95">
                    Your Lifestyle Coach
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div
            className="order-2 lg:order-1 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <div className="space-y-8">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border-2 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(248,189,218,0.15)',
                  borderColor: highlightColor
                }}
              >
                <span
                  className="block h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: highlightColor }}
                />
                <span
                  className="text-sm font-semibold tracking-wide uppercase"
                  style={{ color: textColor }}
                >
                  From Struggle to Success
                </span>
              </div>

              {/* Heading */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight w-full"
                style={{ color: textColor }}
              >
                Building the{' '}
                <span className="relative inline-block">
                  <span style={{ color: highlightColor }} className="font-semibold">
      <BrushStrokeHighlight
  colorStart="#f8bdda"
  colorEnd="#ffdce2"
  waveWidthPercent={80}
  animationDuration="4s"
  width="fit-content"
  height="8rem"
  rounded='20rem'
  blurred={true}
>
Mindset  </BrushStrokeHighlight>
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="14"
                    viewBox="0 0 200 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 10C60 3 140 3 198 10"
                      stroke={highlightColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                  </svg>
                </span>{' '}
                for Your Dream Business
              </h1>

              {/* Paragraphs */}
              <div className="space-y-5 max-w-[70ch]">
                <p className="text-lg leading-relaxed" style={{ color: textColor, opacity: 0.9 }}>
                  I'm <strong>Hirah Safi</strong>, your life and success coach. I
                  spent three years feeling stuck in self-doubt, anxiety, and
                  frustration, wrestling with every obstacle that keeps ambitious
                  women from their dreams.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: textColor, opacity: 0.9 }}>
                  What I discovered changed everything: strategy blooms when it is
                  paired with softness. Real transformation needs willpower,
                  healing, and a little joyful sparkle so you can become the woman
                  your dreams are waiting for.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  className="group relative overflow-hidden rounded-full px-8 py-4 font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, var(--highlight-color, #f8bdda) 0%, rgba(255, 203, 229, 0.85) 100%)',
                    color: textOnAccent
                  }}
                >
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                    style={{
                      background:
                        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 60%)'
                    }} />
                  <span className="relative z-10">Start Your Transformation</span>
                </button>

                <a
                  href="/about"
                  className="group rounded-full px-8 py-4 font-semibold transition-all hover:scale-105 border-2 inline-flex items-center"
                  style={{
                    borderColor: highlightColor,
                    color: textColor,
                    backgroundColor: 'rgba(248, 189, 218, 0.08)'
                  }}
                >
                  Learn My Story
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* Trust Stats */}
              <div
                className="flex flex-wrap gap-8 pt-6 border-t"
                style={{ borderColor: 'rgba(0,0,0,0.1)' }}
              >
                {[
                  { stat: '500+', label: 'Women Empowered' },
                  { stat: '10+', label: 'Years Experience' },
                  { stat: '98%', label: 'Success Rate' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl font-bold" style={{ color: textColor }}>
                      {item.stat}
                    </div>
                    <div className="text-sm" style={{ color: textColor }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
