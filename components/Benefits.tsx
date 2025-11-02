import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const pastel = {
  accent: 'var(--highlight-color, #e8b4a8)',
  text: 'var(--text-color, #57534E)',
  subtle: 'var(--subtle-accent, #FCD5CE)'
};

const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('h2');
    const sub = section.querySelector('.benefits-sub');
    const chips = section.querySelectorAll('.benefit-chip');
    const cards = section.querySelectorAll('.benefit-card');

    gsap.set([heading, sub], { autoAlpha: 0, y: 36 });
    gsap.set(chips, { autoAlpha: 0, y: 16, scale: 0.96, filter: 'blur(6px)' });
    gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.98, filter: 'blur(10px)' });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          tl.to(heading, { autoAlpha: 1, y: 0, duration: 0.9 })
            .to(sub, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.6')
            .to(chips, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.08 }, '-=0.4')
            .to(cards, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, stagger: 0.12 }, '-=0.2');
          io.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden py-16 md:py-20
      "
      aria-labelledby="benefits-title"
    >
      {/* floating pastel halos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full blur-3xl -z-10"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(252,213,206,0.55), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(250,210,225,0.5), transparent)' }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header block */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm font-medium ring-1 benefit-chip"
          style={{ color: pastel.text, backgroundColor: 'rgba(232,180,168,0.10)', borderColor: 'rgba(232,180,168,0.35)' }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
          Gentle, Sustainable Success
        </div>

        <h2
          id="benefits-title"
          className="mt-4 font-playfair text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
          style={{ color: pastel.text }}
        >
          Create a Business and Life You Genuinely Love
        </h2>

        <p
          className="benefits-sub mt-3 max-w-3xl font-lato text-base sm:text-lg opacity-90"
          style={{ color: pastel.text }}
        >
          Designed for ambitious Muslim women who want clarity, honest support, and growth without burnout.
        </p>

        {/* benefits grid */}
        <div className="mt-8 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BenefitCard
            accent="from-[#fde2e4] to-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            }
            title="Clarity & Confidence"
            text="Cut through the noise. Identify your unique strengths and the real problem to solve, so you move with certainty."
          />

          <BenefitCard
            accent="from-[#fad2e1] to-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            }
            title="Honest Guidance"
            text="A dedicated partner who shares what truly works. Clear, actionable steps — no fluff, no overwhelm."
          />

          <BenefitCard
            accent="from-[#f9dcc4] to-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>
            }
            title="Sustainable Growth"
            text="Systems and boundaries that protect your peace. Grow profit with ease — not exhaustion."
          />
        </div>

        {/* trust chips / quick hits */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {['Faith-aligned', 'Kind accountability', 'Nervous-system aware', 'No hustle guilt'].map((c, i) => (
            <span
              key={i}
              className="benefit-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm font-medium ring-1"
              style={{ color: pastel.text, backgroundColor: 'rgba(232,180,168,0.10)', borderColor: 'rgba(232,180,168,0.28)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pastel.accent }} />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

function BenefitCard({
  accent,
  icon,
  title,
  text
}: {
  accent: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article
      className="
        benefit-card group relative rounded-3xl overflow-hidden
        bg-white/85 backdrop-blur ring-1 shadow-sm
        transition-transform hover:-translate-y-1 focus-within:-translate-y-1
      "
      style={{ borderColor: 'rgba(232,180,168,0.28)' }}
      tabIndex={-1}
    >
      {/* top accent line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

      {/* soft hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(232,180,168,0.18), transparent 70%)' }}
      />

      <div className="relative p-6 sm:p-7">
        <div
          className="mb-4 grid h-12 w-12 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-3"
          style={{ backgroundColor: `${pastel.subtle}B3`, color: pastel.text }}
        >
          {icon}
        </div>

        <h3 className="font-playfair text-xl sm:text-2xl" style={{ color: pastel.text }}>
          {title}
        </h3>
        <p className="mt-2 font-lato text-sm sm:text-[15px] leading-relaxed opacity-90" style={{ color: pastel.text }}>
          {text}
        </p>

        {/* subtle underline micro-interaction */}
        <span
          aria-hidden
          className="mt-4 block h-px w-0 bg-[color:var(--highlight-color,#e8b4a8)] transition-all duration-500 group-hover:w-24"
        />
      </div>
    </article>
  );
}

export default Benefits;
