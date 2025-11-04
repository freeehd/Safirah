"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import FlowerBloom from "./FlowerBloom";
import GardenStem from "./GardenStem";
import GrassWave from "./GrassWave";
import "./QuizCTA.css"; // keep your existing css (class hooks are preserved)

const wateringCanGif = "/assets/watering-can.gif";

interface QuizCTAProps {
  onStartQuiz: () => void;
}

const QuizCTA: React.FC<QuizCTAProps> = ({ onStartQuiz }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });
  const [isBlooming, setIsBlooming] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [bloomTrigger, setBloomTrigger] = useState(0);
  const [bloomShown, setBloomShown] = useState(false);
  const [showWateringCan, setShowWateringCan] = useState(false);
  const [wateringCanPos, setWateringCanPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [floaters, setFloaters] = useState<Array<{ id: number; dx: number; dy: number; size: number; dur: number }>>([]);
  const [gardenBlooms, setGardenBlooms] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      rot: number;
      scale: number;
      delay: number;
      z: number;
      petalStart: string;
      petalEnd: string;
      centerStart: string;
      centerEnd: string;
    }>
  >([]);
  const floaterIdRef = useRef(0);

  // — Reveal animation —
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector("h2");
    const paragraph = section.querySelector("p.section-subtitle");
    const cards = section.querySelectorAll(".bullet-card");
    const icons = section.querySelectorAll(".bullet-card .card-icon");
    const buttonContainer = section.querySelector(".button-container");

    gsap.set([heading, paragraph, buttonContainer], { autoAlpha: 0, y: 40 });
    (cards as NodeListOf<HTMLElement>).forEach((c) => c.classList.add("no-breathe"));

    gsap.set(cards, {
      autoAlpha: 0,
      y: 28,
      scale: 0.96,
      filter: "blur(10px)",
      transformOrigin: "50% 50%",
    });
    gsap.set(icons, {
      autoAlpha: 0,
      y: 8,
      scale: 0.6,
      filter: "blur(4px)",
      transformOrigin: "50% 50%",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.34, 1.56, 0.64, 1)" } });
          tl.to(heading, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" })
            .to(paragraph, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
            .to(
              cards,
              {
                keyframes: [
                  { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1.02, duration: 0.55, ease: "back.out(1.6)" },
                  { scale: 1.0, duration: 0.18, ease: "power1.out" },
                ],
                stagger: { each: 0.12, from: "start" },
              },
              ">+0.05"
            )
            .to(
              icons,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.55,
                ease: "back.out(2)",
                stagger: { each: 0.12, from: "start" },
              },
              "<+0.06"
            )
            .add(() => (cards as NodeListOf<HTMLElement>).forEach((c) => c.classList.remove("no-breathe")), ">-=0.05")
            .to(buttonContainer, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" }, ">+0.05");

          observer.unobserve(section);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // — Smart mouse tracking (throttled) —
  const rafRef = useRef<number | null>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOrbPosition({ x, y });

    const mx = x / rect.width - 0.5;
    const my = y / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      sectionRef.current?.style.setProperty("--mx", String(mx));
      sectionRef.current?.style.setProperty("--my", String(my));
    });
  };

  // — Orb presentation —
  const orbStyle: React.CSSProperties = {
    transform: `translate(calc(${orbPosition.x}px - 50%), calc(${orbPosition.y}px - 50%))`,
    width: isHoveringButton ? "560px" : "380px",
    height: isHoveringButton ? "560px" : "380px",
    opacity: isMouseInside ? (isHoveringButton ? 0.95 : 0.85) : 0.18,
  };

  // — Watering can follows the button hover —
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    setWateringCanPos({ x: cursorX - 100, y: cursorY - 100 });
  };

  const triggerMainBloom = () => {
    setBloomShown(true);
    setBloomTrigger((v) => v + 1);
  };

  // — Ambient floating blooms —
  const spawnFloatingBlooms = (count = 2) => {
    const items: Array<{ id: number; dx: number; dy: number; size: number; dur: number }> = [];
    for (let i = 0; i < count; i++) {
      const id = ++floaterIdRef.current;
      items.push({
        id,
        dx: (Math.random() - 0.5) * 140,
        dy: (Math.random() - 0.5) * 50,
        size: 100 + Math.random() * 60,
        dur: 1.8 + Math.random() * 0.5,
      });
    }
    setFloaters((prev) => [...prev, ...items]);
    const maxDur = Math.max(...items.map((i) => i.dur));
    window.setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => !items.some((i) => i.id === f.id)));
    }, (maxDur + 0.25) * 1000);
  };

  // — Launch the quiz with a blooming garden moment —
  const onGo = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
    const count = isMobile ? 6 : 8;
    const palette = { petalStart: "#9FD7C7", petalEnd: "#2A7F62", centerStart: "#FFE5A8", centerEnd: "#F4C95D" };

    const items: Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      rot: number;
      scale: number;
      delay: number;
      z: number;
      petalStart: string;
      petalEnd: string;
      centerStart: string;
      centerEnd: string;
    }> = [];

    const start = 20;
    const span = 60;
    const baseY = [96.8, 94.2];

    for (let i = 0; i < count; i++) {
      const id = ++floaterIdRef.current;
      const row = i % 2;
      const t = i / (count - 1);
      const arcY = 4 * (1 - Math.pow(2 * t - 1, 2));
      const x = start + span * t + (Math.random() - 0.5) * 0.8;
      const y = baseY[row] - arcY + (Math.random() - 0.5) * 0.4;

      const baseSize = row === 0 ? (isMobile ? 100 : 120) : isMobile ? 80 : 100;
      const varSize = row === 0 ? (isMobile ? 40 : 55) : isMobile ? 30 : 40;
      const size = baseSize + Math.random() * varSize;

      items.push({
        id,
        x,
        y,
        size,
        rot: (Math.random() - 0.5) * 8,
        scale: row === 0 ? 1.0 : 0.92,
        delay: i * 0.08 + Math.random() * 0.03,
        z: row === 0 ? 2 : 1,
        ...palette,
      });
    }

    setGardenBlooms(items);
    setIsBlooming(true);
    spawnFloatingBlooms(2);

    window.setTimeout(() => {
      setGardenBlooms([]);
      setIsBlooming(false);
      onStartQuiz();
    }, 1600);
  };

  return (
    <section
      ref={sectionRef}
      className="
        quiz-cta-section relative overflow-hidden
        px-5 sm:px-8 py-16 md:py-20
        mx-auto max-w-7xl
        rounded-3xl
        ring-1 shadow-sm
        bg-[rgba(255,255,255,0.65)] backdrop-blur
      "
      style={{ borderColor: "rgba(42,127,98,0.28)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
      aria-labelledby="quiz-cta-heading"
    >
      {/* soft gradient halo that follows the cursor */}
      <div className="mindful-orb" style={orbStyle} aria-hidden />

      {/* ambient soft background glow */}
      <div className="ambient-glow" aria-hidden />

      {/* whimsical watering can that follows the CTA hover */}
      <img
        src={wateringCanGif}
        alt=""
        aria-hidden
        className="watering-can pointer-events-none"
        style={{
          transform: `translate(${wateringCanPos.x}px, ${wateringCanPos.y}px) scale(${showWateringCan ? 1 : 0.85})`,
          opacity: showWateringCan ? 1 : 0,
        }}
      />

      {/* subtle bokeh only when not blooming */}
      {!isBlooming && (
        <div className="bokeh-layer" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={`bokeh b${i + 1}`} />
          ))}
        </div>
      )}

      {/* ground layer */}
      <GrassWave className="grass-wave" />

      {/* garden blooms layer */}
      <div className="garden-layer" aria-hidden>
        {gardenBlooms.map((g) => (
          <div
            key={g.id}
            className="garden-bloom"
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              transform: `translate(-50%, -50%) rotate(${g.rot}deg) scale(${g.scale})`,
              zIndex: g.z,
            }}
          >
            <GardenStem
              className="garden-stem"
              width={Math.max(40, g.size * 0.18)}
              height={Math.max(90, g.size * 0.62)}
              variant={g.z === 3 ? "both" : g.z === 2 ? "left" : "right"}
            />
            <span className="ground-shadow" />
            <FlowerBloom
              className="flower"
              playTrigger={g.id}
              size={g.size}
              delay={g.delay}
              glow={false}
              showRing={false}
              idSuffix={g.id}
            />
          </div>
        ))}
      </div>

      {/* content */}
      <div className="quiz-cta-text relative z-10 text-center max-w-5xl mx-auto">
        {/* Prominent top heading to emphasize the quiz */}
        <div className="mx-auto mb-3 sm:mb-4 max-w-fit">
          <h3
            className="inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-lg sm:text-xl font-semibold tracking-wide text-[color:var(--text-color,#2A7F62)] bg-[rgba(42,127,98,0.12)] ring-1 ring-[rgba(42,127,98,0.35)] shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2l1.9 4.6L19 7.2l-3.3 3 0.9 4.8L12 13.9 7.4 15l0.9-4.8L5 7.2l5.1-0.6L12 2z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span>Take the Quiz Now</span>
          </h3>
        </div>
        {/* NEW: clear quiz badge */}
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-semibold ring-2 tracking-wide shadow-sm"
          style={{
            color: "var(--text-color,#2A7F62)",
            backgroundColor: "rgba(42,127,98,0.18)",
            borderColor: "rgba(42,127,98,0.5)",
            boxShadow: "0 4px 14px rgba(42,127,98,0.16), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
          aria-label="Interactive Quiz"
        >
          {/* tiny sparkle/quiz icon (inline SVG, no new deps) */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2l1.9 4.6L19 7.2l-3.3 3 0.9 4.8L12 13.9 7.4 15l0.9-4.8L5 7.2l5.1-0.6L12 2z"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
          <span>Interactive Quiz</span>
        </div>

        <h2
          id="quiz-cta-heading"
          className="font-playfair text-4xl sm:text-5xl leading-tight tracking-tight text-[color:var(--text-color,#57534E)] mt-3"
        >
          Discover Your Path to Inner Peace &amp; Abundance
        </h2>
        <p className="section-subtitle font-lato text-base sm:text-lg mt-4 opacity-90 text-[color:var(--text-color,#57534E)]">
          A short, insightful quiz crafted to reveal where you are — and what you need next.
        </p>

        {/* bullets */}
        <div className="bullet-cards mt-8 grid gap-3 sm:gap-4 sm:grid-cols-3">
          {[
            "Gain self-awareness about your inner blocks and strengths as a female business owner",
            "Get tailored advice that resonates with your unique journey",
            "Access free tools to begin transforming your mindset and attracting more blessings",
          ].map((text, i) => (
            <div
              key={i}
              className="
                bullet-card rounded-2xl px-4 py-4 sm:px-5 sm:py-5
                bg-white/80 backdrop-blur ring-1 shadow-sm
                text-left
              "
              style={{ borderColor: "rgba(42,127,98,0.28)" }}
            >
              <span className="card-icon mr-2 inline-flex" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <defs>
                    <radialGradient id="cardPetalGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#9FD7C7" />
                      <stop offset="100%" stopColor="#2A7F62" />
                    </radialGradient>
                  </defs>
                  <g fill="url(#cardPetalGrad)">
                    <ellipse cx="12" cy="7" rx="3" ry="5" />
                    <ellipse cx="12" cy="17" rx="3" ry="5" />
                    <ellipse cx="7" cy="12" rx="5" ry="3" />
                    <ellipse cx="17" cy="12" rx="5" ry="3" />
                  </g>
                  <circle cx="12" cy="12" r="2.6" fill="#F4C95D" />
                </svg>
              </span>
              <span className="font-lato text-sm sm:text-[15px] leading-relaxed text-[color:var(--text-color,#57534E)]">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="button-container mt-8 sm:mt-10">
          {bloomShown && <FlowerBloom className="bloom-animation pointer-events-none" size={300} playTrigger={bloomTrigger} />}

          <div className="bloom-floaters pointer-events-none" aria-hidden>
            {floaters.map((f) => (
              <div
                key={f.id}
                className="bloom-floater"
                style={
                  {
                    ["--dx" as any]: `${f.dx}px`,
                    ["--dy" as any]: `${f.dy}px`,
                    ["--bloom-dur" as any]: `${f.dur}s`,
                  } as React.CSSProperties
                }
              >
                <FlowerBloom playTrigger={f.id} size={f.size} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="
              cta-button relative inline-flex items-center justify-center
              rounded-full px-7 py-3
              text-white font-medium
              transition-transform
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              shadow-sm
            "
            style={{
              backgroundColor: "#2A7F62",
              color: "#ffffff",
            }}
            aria-label="Start the Mindset Quiz now"
            onClick={onGo}
            onFocus={triggerMainBloom}
            onMouseEnter={(e) => {
              triggerMainBloom();
              setIsHoveringButton(true);
              setShowWateringCan(true);
              handleButtonMouseMove(e);
            }}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={() => {
              setIsHoveringButton(false);
              setShowWateringCan(false);
            }}
            onTouchStart={triggerMainBloom}
          >
            Enter The Garden
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizCTA;
