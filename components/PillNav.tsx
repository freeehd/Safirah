"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string | { src: string };
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  logoBackgroundColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
  mobileBreakpoint?: number;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#000000',
  pillColor = '#f8bdda',
  hoveredPillTextColor = '#ffffff',
  pillTextColor,
  logoBackgroundColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  mobileBreakpoint = 768
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const resolvedLogoBackground = logoBackgroundColor ?? pillColor;
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const layout = useCallback(() => {
    circleRefs.current.forEach((circle, index) => {
      if (!circle?.parentElement) return;

      const pill = circle.parentElement as HTMLElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      
      if (w === 0 || h === 0) return;
      
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const label = pill.querySelector<HTMLElement>('.pill-label');
      const white = pill.querySelector<HTMLElement>('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      tlRefs.current[index]?.kill();
      
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { 
        scale: 1.2, 
        xPercent: -50, 
        duration: 0.5, 
        ease: 'power2.out', 
        overwrite: 'auto' 
      }, 0);

      if (label) {
        tl.to(label, { 
          y: -(h + 8), 
          duration: 0.5, 
          ease: 'power2.out', 
          overwrite: 'auto' 
        }, 0);
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(white, { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: 'power2.out', 
          overwrite: 'auto' 
        }, 0);
      }

      tlRefs.current[index] = tl;
    });
  }, [ease]);

  useEffect(() => {
    setIsMounted(true);
    
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden' });
    }

    layout();

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.fromTo(logoEl, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)', delay: 0.1 }
        );
      }

      if (navItems) {
        gsap.fromTo(navItems,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
        );
      }
    }

    if (document.fonts) {
      document.fonts.ready.then(() => {
        setTimeout(layout, 50);
      }).catch(() => {});
    }
  }, [layout, ease, initialLoadAnimation]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(layout, 150);

      // Close mobile menu if resized past breakpoint
      if (window.innerWidth >= mobileBreakpoint && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        const hamburger = hamburgerRef.current;
        if (hamburger) {
          const lines = hamburger.querySelectorAll('.hamburger-line');
          gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.2 });
          gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.2 });
        }
        const menu = mobileMenuRef.current;
        if (menu) {
          gsap.set(menu, { visibility: 'hidden' });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [layout, mobileBreakpoint, isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      tlRefs.current.forEach(tl => tl?.kill());
      activeTweenRefs.current.forEach(tween => tween?.kill());
      logoTweenRef.current?.kill();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleEnter = useCallback((i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [ease]);

  const handleLeave = useCallback((i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [ease]);

  const handleLogoEnter = useCallback(() => {
    const img = logoImgRef.current;
    if (!img) return;
    
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 4, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(lines[1], { rotation: -45, y: -4, duration: 0.3, ease: 'power2.inOut' });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    }

    if (menu) {
      const panel = menu.querySelector<HTMLElement>('.mobile-menu-panel');
      const backdrop = menu.querySelector<HTMLElement>('.mobile-menu-backdrop');
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        if (backdrop) {
          gsap.set(backdrop, { opacity: 0 });
          gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
        if (panel) {
          gsap.fromTo(
            panel,
            { x: '100%' },
            { x: '0%', duration: 0.4, ease: 'power3.out' }
          );
        }
      } else {
        if (backdrop) {
          gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.in' });
        }
        if (panel) {
          gsap.to(panel, {
            x: '100%',
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(menu, { visibility: 'hidden' });
            }
          });
        } else {
          gsap.to(menu, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(menu, { visibility: 'hidden' });
            }
          });
        }
      }
    }

    onMobileMenuClick?.();
  }, [isMobileMenuOpen, ease, onMobileMenuClick]);

  const closeMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  }, [isMobileMenuOpen, toggleMobileMenu]);

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor,
    '--logo-bg': resolvedLogoBackground,
  } as React.CSSProperties;

  const logoSrc = typeof logo === 'string' ? logo : logo.src;
  const homeHref = items?.[0]?.href || '/';

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        .glass-nav {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 
            0 0 0 0.5px rgba(255, 255, 255, 0.8) inset,
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 20px 60px rgba(0, 0, 0, 0.05);
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-nav:hover {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 
            0 0 0 0.5px rgba(255, 255, 255, 0.9) inset,
            0 12px 48px rgba(0, 0, 0, 0.12),
            0 1px 0 rgba(255, 255, 255, 1) inset,
            0 24px 80px rgba(0, 0, 0, 0.08);
        }

        .glass-logo {
          background: linear-gradient(135deg, rgba(248, 189, 218, 0.85), rgba(248, 189, 218, 0.65));
          backdrop-filter: blur(10px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 4px 16px rgba(248, 189, 218, 0.4),
            0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-logo:hover {
          background: linear-gradient(135deg, rgba(248, 189, 218, 0.95), rgba(248, 189, 218, 0.75));
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.7) inset,
            0 6px 24px rgba(248, 189, 218, 0.5),
            0 2px 12px rgba(0, 0, 0, 0.15);
          transform: scale(1.05);
        }

        .glass-pill {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-pill:hover {
          background: rgba(248, 189, 218, 0.6);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.4) inset,
            0 4px 16px rgba(248, 189, 218, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .glass-pill-active {
          background: rgba(248, 189, 218, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 4px 20px rgba(248, 189, 218, 0.4),
            0 0 30px rgba(248, 189, 218, 0.2);
        }

        .glass-mobile-menu {
          background: linear-gradient(185deg, rgba(247, 244, 241, 0.98) 0%, rgba(236, 217, 210, 0.96) 50%, rgba(224, 197, 187, 0.92) 100%);
          backdrop-filter: blur(30px) saturate(150%);
          -webkit-backdrop-filter: blur(30px) saturate(150%);
          border-left: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow:
            -8px 0 40px rgba(210, 154, 137, 0.18),
            -2px 0 12px rgba(0, 0, 0, 0.06),
            inset 0 0 0 0.5px rgba(255, 255, 255, 0.5);
        }

        .glass-mobile-item {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          font-family: 'Lato', sans-serif;
        }

        .glass-mobile-item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(248, 189, 218, 0.15), rgba(210, 154, 137, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .glass-mobile-item:hover::before {
          opacity: 1;
        }

        .mobile-menu-brand {
          font-family: 'Playfair Display', serif;
          color: #57534E;
        }

        .active-glow {
          position: relative;
        }

        .active-glow::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
          border-radius: 50%;
          animation: glow 2s ease-in-out infinite;
          filter: blur(1px);
        }

        .nav-item-float {
          animation: float 3s ease-in-out infinite;
        }

        .nav-item-float:nth-child(2) { animation-delay: 0.2s; }
        .nav-item-float:nth-child(3) { animation-delay: 0.4s; }
        .nav-item-float:nth-child(4) { animation-delay: 0.6s; }
        .nav-item-float:nth-child(5) { animation-delay: 0.8s; }
      `}</style>

      {/* Separate Logo Pill - Left Side (desktop), now clickable */}
      <div className="hidden md:block fixed left-20 top-10 pointer-events-auto">
        {isRouterLink(homeHref) ? (
          <Link href={homeHref} className="glass-pill px-5 py-3 rounded-full no-underline">
            <span className="text-xl font-serif font font-semibold -tracking-tight" style={{ color: resolvedPillTextColor }}>
              Hirah Safi Coaching
            </span>
          </Link>
        ) : (
          <a href={homeHref} className="glass-pill px-5 py-3 rounded-full no-underline">
            <span className="text-xl font-serif font font-semibold -tracking-tight" style={{ color: resolvedPillTextColor }}>
              Hirah Safi Coaching
            </span>
          </a>
        )}
      </div>

      <div className="fixed left-1/2 top-6 -translate-x-1/2 pointer-events-auto">
        <nav
          className={`glass-nav flex items-center rounded-full px-3 py-2 ${className}`}
          aria-label="Primary"
          style={cssVars}
        >
          {/* Logo */}
          {isRouterLink(homeHref) ? (
            <Link
              href={homeHref}
              aria-label={logoAlt}
              onMouseEnter={handleLogoEnter}
              ref={el => { logoRef.current = el; }}
              className="glass-logo rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
              style={{ width: '48px', height: '48px' }}
            >
              <img 
                src={logoSrc} 
                alt={logoAlt} 
                ref={logoImgRef} 
                className="w-full h-full object-contain block"
                loading="eager"
              />
            </Link>
          ) : (
            <a
              href={homeHref}
              aria-label={logoAlt}
              onMouseEnter={handleLogoEnter}
              ref={el => { logoRef.current = el; }}
              className="glass-logo rounded-full inline-flex items-center justify-center overflow-hidden"
              style={{ width: '48px', height: '48px', padding: '10px' }}
            >
              <img 
                src={logoSrc} 
                alt={logoAlt} 
                ref={logoImgRef} 
                className="w-full h-full object-contain block"
                loading="eager"
              />
            </a>
          )}

          {/* Brand text pill (mobile) */}
          <div className="md:hidden ml-2">
            {isRouterLink(homeHref) ? (
              <Link href={homeHref} className="glass-pill px-4 py-2 rounded-full no-underline inline-flex items-center">
                <span className="text-sm font-serif font font-semibold -tracking-tight" style={{ color: resolvedPillTextColor }}>
                  Hirah Safi Coaching
                </span>
              </Link>
            ) : (
              <a href={homeHref} className="glass-pill px-4 py-2 rounded-full no-underline inline-flex items-center">
                <span className="text-sm font-serif font font-semibold -tracking-tight" style={{ color: resolvedPillTextColor }}>
                  Hirah Safi Coaching
                </span>
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <div
            ref={navItemsRef}
            className="hidden md:flex items-center ml-2 gap-2"
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: '#d29a89',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack relative inline-block leading-none z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-none"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block leading-none"
                      style={{
                        color: '#ffffff',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                </>
              );

              const basePillClasses = `${isActive ? 'glass-pill-active active-glow' : 'glass-pill'} nav-item-float relative overflow-hidden inline-flex items-center justify-center h-10 px-5 no-underline rounded-full font-semibold text-sm tracking-wide whitespace-nowrap cursor-pointer`;

              return (
                <div key={`${item.href}-${i}`} className="flex h-full relative">
                  {isRouterLink(item.href) ? (
                    <Link
                      href={item.href}
                      className={basePillClasses}
                      style={{ color: resolvedPillTextColor }}
                      aria-label={item.ariaLabel || item.label}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={basePillClasses}
                      style={{ color: resolvedPillTextColor }}
                      aria-label={item.ariaLabel || item.label}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      {...(isExternalLink(item.href) && {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      })}
                    >
                      {PillContent}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
           <span className="text-xl font-serif font font-semibold -tracking-tight" style={{ color: resolvedPillTextColor }}>
          </span>
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden ml-auto glass-logo rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            style={{ width: '48px', height: '48px' }}
          >
            <span
              className="hamburger-line rounded-full origin-center"
              style={{ 
                width: '18px',
                height: '2px',
                background: '#000',
                display: 'block'
              }}
            />
            <span
              className="hamburger-line rounded-full origin-center"
              style={{ 
                width: '18px',
                height: '2px',
                background: '#000',
                display: 'block'
              }}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu — Fullscreen Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[9998] md:hidden pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop — warm tinted blur, tap to close */}
        <div
          className="mobile-menu-backdrop absolute inset-0 bg-[#ecd9d2]/30 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        {/* Menu panel — slides in from the right */}
        <div className="mobile-menu-panel glass-mobile-menu absolute top-0 right-0 bottom-0 w-[min(85vw,380px)] px-6 py-8 flex flex-col overflow-y-auto"
          style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        >
          {/* Brand header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full w-10 h-10"
                style={{ background: 'linear-gradient(135deg, rgba(248, 189, 218, 0.85), rgba(248, 189, 218, 0.65))' }}
              >
                <img src={logoSrc} alt={logoAlt} className="w-6 h-6 object-contain" />
              </span>
              <span className="mobile-menu-brand text-lg font-bold tracking-tight">Hirah Safi</span>
            </div>
            {/* Close button */}
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-full hover:bg-[#d29a89]/15 transition-colors"
              style={{ color: '#57534E' }}
              aria-label="Close navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {items.map((item, idx) => {
              const isActive = activeHref === item.href;

              const linkClasses = `glass-mobile-item block py-4 px-6 text-lg font-semibold rounded-2xl no-underline transition-all ${
                isActive
                  ? 'bg-[#F8BaaA]/40 text-[#57534E] shadow-[inset_0_0_0_1px_rgba(248,186,170,0.3)]'
                  : 'text-[#57534E]/80 hover:text-[#57534E] hover:bg-[#F8BaaA]/15 active:scale-[0.98]'
              }`;

              return (
                <li key={`mobile-${item.href}-${idx}`}>
                  {isRouterLink(item.href) ? (
                    <Link
                      href={item.href}
                      className={linkClasses}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={linkClasses}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={closeMobileMenu}
                      {...(isExternalLink(item.href) && {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      })}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer decoration */}
          <div className="mt-auto pt-8 text-center">
            <div className="inline-block h-px w-16 mb-3 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #d29a89, transparent)' }}
            />
            <p className="text-xs tracking-wide" style={{ color: '#57534E', opacity: 0.5 }}>
              Hirah Safi Coaching
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillNav;
