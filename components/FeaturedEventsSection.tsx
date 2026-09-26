'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const events = [
  {
    title: 'Bloom & Belong',
    eyebrow: 'Flower Circle · Thursday, Oct 22, 2026',
    description:
      'An afternoon for women tired of doing “new year, new me” alone. Build bouquets for one another in a real circle — mindset work disguised as making something beautiful.',
    date: 'Thursday, Oct 22',
    location: 'Limberlost Place · Toronto',
    price: '$25',
    image: '/assets/hirah-1.jpeg',
    href: '/events/bloom-and-belong#register',
    accent: '#846A6C',
    background: 'linear-gradient(135deg, #F9F3EA 0%, #EADCD8 100%)',
    badge: 'Small Circle',
  },
  {
    title: 'The Becoming',
    eyebrow: '6-Week Program',
    description:
      "A transformative 6-week journey to realign your life, career, and Deen. This isn't another course — it's a 6-week transformation.",
    date: 'Now registering',
    location: 'Online · Zoom',
    price: '$475',
    image: '/assets/8.webp',
    href: '/events/6-week-program#pricing',
    accent: '#725853',
    background: 'linear-gradient(135deg, #FBE8E2 0%, #E8C5B8 100%)',
    badge: 'Save over 60%',
  },
];

export default function FeaturedEventsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-5"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-700 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#A05A4A]" />
              Featured events
            </div>
            <h2 className="font-playfair text-4xl font-bold leading-tight text-[#332521] sm:text-5xl">
              Make space for your becoming.
            </h2>
            <p className="mt-3 max-w-2xl font-lato text-base leading-relaxed text-[#4F4541] sm:text-lg">
              Gather in community, do the deeper work, and leave with something that
              stays with you.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-[#846A6C]/40 bg-white/70 px-5 py-3 font-lato text-sm font-bold text-[#604E48] transition hover:-translate-y-0.5 hover:bg-white"
          >
            View all events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-[0_18px_50px_-24px_rgba(74,59,54,0.45)] backdrop-blur-xl"
            >
              <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-64 overflow-hidden p-5 sm:min-h-full" style={{ background: event.background }}>
                  <Image
                    src={event.image}
                    alt=""
                    width={800}
                    height={600}
                    className="h-full min-h-64 w-full rounded-[1.4rem] object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    className="absolute bottom-8 left-8 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                    style={{ color: event.accent }}
                  >
                    {event.badge}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <p className="font-lato text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: event.accent }}>
                    {event.eyebrow}
                  </p>
                  <h3 className="mt-3 font-playfair text-3xl font-bold text-[#332521] sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 font-lato text-sm leading-relaxed text-[#4F4541] sm:text-base">
                    {event.description}
                  </p>
                  <div className="mt-5 grid gap-2 border-y border-stone-200/80 py-4 font-lato text-sm text-[#604E48]">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" style={{ color: event.accent }} />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" style={{ color: event.accent }} />
                      {event.location}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="font-playfair text-2xl font-bold text-[#332521]">{event.price}</span>
                    <Link
                      href={event.href}
                      className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-lato text-sm font-bold text-white transition hover:-translate-y-0.5"
                      style={{ backgroundColor: event.accent }}
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
