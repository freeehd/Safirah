import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Seat Reserved — Bloom & Belong | Hirah Safi Coaching',
  description:
    'Your seat at Bloom & Belong is reserved. We look forward to blooming with you.',
  robots: { index: false },
  alternates: { canonical: `${SITE_URL}/events/bloom-and-belong/success` },
};

export default function BloomBelongSuccessPage() {
  return (
    <main className="page-wrapper-2 min-h-screen flex items-center justify-center px-5 py-28 text-center">
      <div>
        <div className="mx-auto w-20 h-20 rounded-full bg-[#F6E4DE] flex items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B9705F" strokeWidth="1.5">
            <path d="M12 21s-6.5-4.5-9.5-8.5C.5 9.5 2 5.5 5.5 4.5c2-.6 4 .2 5 2 .4.7.7 1.3 1 2" strokeLinecap="round" />
            <path d="M12 21s6.5-4.5 9.5-8.5c2-3 .5-7-3-8-2-.6-4 .2-5 2-.4.7-.7 1.3-1 2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#332521' }}>
          Your seat is <span className="italic font-light" style={{ color: '#B9705F' }}>reserved</span>
        </h1>
        <p className="font-lato text-lg leading-relaxed max-w-md mx-auto" style={{ color: '#4F4541' }}>
          We can&apos;t wait to bloom with you. Check your email for the event details, and bring
          your whole self — flowers will be waiting.
        </p>
        <a
          href="/events/bloom-and-belong"
          className="inline-block mt-8 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full text-white transition-transform hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #E8B4A8, #B9705F)' }}
        >
          Back to the event
        </a>
      </div>
    </main>
  );
}
