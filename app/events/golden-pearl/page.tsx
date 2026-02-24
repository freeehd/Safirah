'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    MapPin,
    Star,
    Shield,
    Users,
    Sparkles,
    Heart,
    Camera,
    Anchor,
    Coffee,
    BookOpen,
    MessageCircle,
    ChevronDown,
    Gift,
    Award,
    X
} from 'lucide-react';
import Script from 'next/script';
import GoldenPearlForm from '@/components/GoldenPearlForm';

const theme = {
    bg: '#F5EAC8',       // Golden base background
    accent1: '#EAD7A1',  // Soft golden Champagne
    accent2: '#D4AF37',  // Classic gold
    highlight: '#9C7A1A',// Rich deeper gold
    text: '#4A3B22',     // Deep bronze/brown
};

const container = 'mx-auto max-w-7xl px-4 sm:px-6 md:px-8';
const sectionY = 'py-12 md:py-16 lg:py-20';

/* ---------- utils ---------- */
function hexToRgba(hex: string, alpha: number) {
    const h = hex.replace('#', '');
    const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const bigint = parseInt(n, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function useFadeUp() {
    const prefersReduced = useReducedMotion();
    return {
        initial: { opacity: 0, y: prefersReduced ? 0 : 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
    } as const;
}

/* ---------- primitives ---------- */
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide ring-1 shadow-sm backdrop-blur-md ${className}`}
            style={{
                color: theme.text,
                backgroundColor: 'rgba(255,255,255,0.85)',
                borderColor: theme.accent2,
            }}
        >
            {children}
        </div>
    );
}

function QuoteBlock() {
    return (
        <div className="relative py-12 md:py-16 text-center px-4 overflow-hidden my-8 rounded-[3rem] shadow-sm max-w-6xl mx-auto" style={{ backgroundColor: hexToRgba(theme.accent1, 0.3) }}>
            <div
                className="absolute inset-0 -z-10 opacity-40"
                style={{
                    backgroundImage: `radial-gradient(ellipse at center, ${hexToRgba(theme.highlight, 0.2)} 0%, transparent 70%)`
                }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.05] pointer-events-none">
                <span className="font-playfair text-[15rem] leading-none text-yellow-800">“</span>
            </div>

            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl italic leading-snug max-w-4xl mx-auto drop-shadow-sm" style={{ color: theme.text }}>
                &quot;A pearl is formed under pressure, hidden away until it is perfected. You&apos;ve been working hard in silence. Now, it&apos;s time to step into the light.&quot;
            </h3>
        </div>
    );
}

function TimelineItem({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="flex gap-4 sm:gap-6 relative pb-8 last:pb-0 group">
            <div className="absolute left-[18px] sm:left-[22px] top-10 bottom-[-10px] w-px bg-yellow-600/20 last:hidden" />
            <div className="flex-shrink-0 relative z-10">
                <div
                    className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center ring-4 ring-white shadow-md"
                    style={{ backgroundColor: theme.accent2, color: '#fff' }}
                >
                    {icon}
                </div>
            </div>
            <div className="pt-1">
                <h4 className="font-playfair text-lg sm:text-xl font-bold mb-1" style={{ color: theme.text }}>
                    {title}
                </h4>
                <p className="font-lato text-sm sm:text-base opacity-85 leading-relaxed max-w-md" style={{ color: theme.text }}>
                    {desc}
                </p>
            </div>
        </div>
    )
}

function VisionCard({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <motion.div whileHover={{ y: -4 }} className="h-full">
            <div
                className="rounded-[1.5rem] bg-white/80 p-6 shadow-md ring-1 h-full flex flex-col items-center text-center transition-all hover:shadow-xl"
                style={{ borderColor: hexToRgba(theme.accent2, 0.3) }}
            >
                <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-4 shadow-sm"
                    style={{ backgroundColor: theme.accent1, color: theme.highlight }}
                >
                    {icon}
                </span>
                <div className="font-playfair text-xl sm:text-2xl font-bold mb-3" style={{ color: theme.text }}>
                    {title}
                </div>
                <div className="font-lato text-sm sm:text-base opacity-85 leading-relaxed" style={{ color: theme.text }}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

function TransformationStep({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <motion.div whileHover={{ y: -4 }}>
            <div
                className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 border-t-4 transition-all hover:shadow-lg hover:bg-white"
                style={{ borderColor: hexToRgba(theme.accent2, 0.3), borderTopColor: theme.highlight }}
            >
                <div className="flex items-center gap-3 mb-3">
                    <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 font-playfair text-sm font-bold shadow-inner bg-yellow-50"
                        style={{ color: theme.highlight }}
                        aria-hidden
                    >
                        {number}
                    </span>
                    <div className="font-playfair text-lg sm:text-xl font-bold" style={{ color: theme.text }}>
                        {title}
                    </div>
                </div>
                <div className="font-lato text-sm opacity-85 leading-relaxed pl-11" style={{ color: theme.text }}>
                    {description}
                </div>
            </div>
        </motion.div>
    );
}

export default function GoldenPearlPage() {
    const fadeUp = useFadeUp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="page-wrapper-2 min-h-screen font-sans" style={{ backgroundColor: theme.bg }}>
            {/* ConvertKit Script */}
            <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

            {/* CINEMATIC HERO */}
            <section className="relative isolate pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-30 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-yellow-400/10 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

                <div className={container}>
                    <div className="relative flex flex-col items-center text-center">
                        {/* Hero Header */}
                        <motion.div {...fadeUp} className="max-w-4xl space-y-6 mb-12 lg:mb-16">
                            <Badge className="animate-bounce-subtle">
                                <Sparkles className="h-3.5 w-3.5" style={{ color: theme.highlight }} />
                                Volume 3 • Registration is Now Open
                            </Badge>

                            <h1 className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-stone-900">
                                The <span style={{ color: theme.highlight }}>Golden Pearl</span>
                            </h1>

                            <p className="font-lato text-xl sm:text-2xl lg:text-3xl leading-relaxed opacity-90 max-w-3xl mx-auto font-medium text-stone-800">
                                Step into a sanctuary of <span className="text-yellow-800">Faith, Strategy, and Sisterhood</span>.
                                Secure your future by redefining success through your Deen.
                            </p>
                        </motion.div>

                        {/* Cinematic Image + Form Overlay */}
                        <div className="relative w-full max-w-6xl group">
                            {/* The Big Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7] rounded-[3rem] overflow-hidden shadow-gold-3xl border-2"
                                style={{ borderColor: hexToRgba(theme.accent2, 0.3) }}
                            >
                                <img
                                    src="/assets/golden-pearl.webp"
                                    alt="Golden Pearl Hirah Safi"
                                    className="absolute inset-0 h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />

                                {/* Inner Image Badges */}
                                <div className="absolute bottom-8 left-8 flex flex-col gap-3 group-hover:translate-x-2 transition-transform duration-500">
                                    <Badge className="bg-white/90 border-none shadow-xl py-2 px-4">
                                        <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                                        <span className="text-sm">Sisterhood Sanctuary</span>
                                    </Badge>
                                    <Badge className="bg-white/90 border-none shadow-xl py-2 px-4">
                                        <Shield className="h-4 w-4 text-yellow-600" />
                                        <span className="text-sm">Limited Capacity Pass</span>
                                    </Badge>
                                </div>
                            </motion.div>

                            {/* Floating Form CTA (Desktop) */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="hidden lg:block absolute -right-8 -top-12 w-[24rem] z-20 hover:-translate-y-2 transition-transform duration-500"
                            >
                                <GoldenPearlForm />
                            </motion.div>

                            {/* Mobile Registration Button Trigger */}
                            <div className="lg:hidden mt-8 w-full">
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full rounded-2xl h-16 text-xl font-bold shadow-gold-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    style={{ backgroundColor: theme.highlight, color: '#fff' }}
                                >
                                    Claim My Free Seat Now
                                </Button>
                            </div>
                        </div>

                        {/* Event Quick Stats */}
                        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-16 lg:mt-24 w-full max-w-4xl">
                            <div className="space-y-1">
                                <div className="font-bold text-xs uppercase tracking-[0.2em] text-yellow-800 opacity-60">Engagement</div>
                                <div className="font-playfair text-xl font-bold text-stone-900">Online & Local</div>
                            </div>
                            <div className="space-y-1">
                                <div className="font-bold text-xs uppercase tracking-[0.2em] text-yellow-800 opacity-60">Investment</div>
                                <div className="font-playfair text-xl font-bold text-stone-900">FREE Admission</div>
                            </div>
                            <div className="space-y-1">
                                <div className="font-bold text-xs uppercase tracking-[0.2em] text-yellow-800 opacity-60">Resources</div>
                                <div className="font-playfair text-xl font-bold text-stone-900">GP Workbook</div>
                            </div>
                            <div className="space-y-1">
                                <div className="font-bold text-xs uppercase tracking-[0.2em] text-yellow-800 opacity-60">Community</div>
                                <div className="font-playfair text-xl font-bold text-stone-900">Sisterhood-First</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Modal for Mobile / Slide out */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg z-10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute -top-12 right-0 p-2 text-white hover:rotate-90 transition-transform"
                                aria-label="Close"
                            >
                                <X size={32} />
                            </button>
                            <GoldenPearlForm />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <QuoteBlock />

            {/* DETAILS / WHY SECTION */}
            <section id="details" className={`${container} ${sectionY} relative`}>
                <div className="absolute inset-0 top-1/2 -translate-y-1/2 bg-yellow-400/10 blur-[100px] -z-10 rounded-full" />
                <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-2xl border" style={{ borderColor: hexToRgba(theme.accent2, 0.4) }}>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <Anchor className="h-10 w-10 mx-auto opacity-70 mb-2" style={{ color: theme.highlight }} />
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: theme.text }}>
                            The Real Talk
                        </h2>
                        <p className="font-lato text-lg sm:text-xl opacity-90 leading-relaxed text-stone-800">
                            Are you tired of being the <strong>"only one"</strong> in the room? You don't need another generic networking event with cold coffee and stiff handshakes.
                        </p>
                        <p className="font-lato text-lg sm:text-xl opacity-90 leading-relaxed text-stone-800">
                            You can keep trying to figure it out by yourself behind a screen, but you will stay behind—alone. The sisters who go the furthest are the ones who have a community to catch them when they fall and cheer when they fly.
                        </p>
                        <Separator className="w-20 h-1 mx-auto rounded-full bg-yellow-500 my-6 opacity-60" />
                        <p className="font-medium text-xl sm:text-2xl text-yellow-800 drop-shadow-sm">
                            I don't gatekeep. I'm opening the doors and sharing everything I know to help you reach that financial abundance you've been praying for.
                        </p>
                    </div>
                </div>
            </section>

            {/* CORE PILLARS / COACHING */}
            <section className={`${container} ${sectionY}`}>
                <motion.div {...fadeUp}>
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="text-sm font-bold tracking-widest uppercase mb-2 block text-yellow-800 opacity-60">What to Expect</span>
                        <h2 className="font-playfair text-4xl sm:text-6xl font-bold" style={{ color: theme.text }}>
                            Coaching & Pure Value
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <VisionCard icon={<BookOpen className="h-6 w-6" />} title='The "Success Formula"'>
                            Dive deep into a success strategy that puts Allah at the center—attracting wealth, scaling, and managing your home.
                        </VisionCard>
                        <VisionCard icon={<MessageCircle className="h-6 w-6" />} title="Deep-Dive Coaching">
                            Live, high-value coaching solving problems like money mindset and professional-personal balance for the success-minded woman.
                        </VisionCard>
                        <VisionCard icon={<Star className="h-6 w-6" />} title='"No Gatekeeping" Workbook'>
                            Every sister gets a physical Golden Pearl Workbook—your roadmap filled with strategies, contact lists, and growth plans.
                        </VisionCard>
                        <VisionCard icon={<Users className="h-6 w-6" />} title="Collab Hub">
                            Looking for a team, support, or lifelong friends? This is where business besties turn into sisters for life.
                        </VisionCard>
                        <VisionCard icon={<Anchor className="h-6 w-6" />} title="Local Spotlight">
                            We are featuring and collaborating with other local sister-led businesses to build a full ecosystem of support.
                        </VisionCard>
                        <VisionCard icon={<Sparkles className="h-6 w-6" />} title="Pure Gold Energy">
                            Imagine walking into a room draped in Gold. It's classy, warm, and filled with women who want you to win.
                        </VisionCard>
                    </div>
                </motion.div>
            </section>

            {/* TWO COLUMNS: EXTRAS & MUST KNOWS */}
            <section className={`${container} ${sectionY} pt-0`}>
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
                    <motion.div {...fadeUp} className="bg-white/60 backdrop-blur-sm p-8 sm:p-12 rounded-[3rem] border shadow-xl" style={{ borderColor: theme.accent1 }}>
                        <h3 className="font-playfair text-3xl sm:text-4xl font-bold mb-8" style={{ color: theme.text }}>The &quot;Extra&quot; Love</h3>
                        <div className="space-y-4">
                            <TimelineItem title="Free Admission" desc="This is my gift to the community. No barriers to entry." icon={<Heart className="h-4 w-4" />} />
                            <TimelineItem title="Snacks & Refreshments" desc="Light, elegant bites to keep your energy up." icon={<Coffee className="h-4 w-4" />} />
                            <TimelineItem title="The Giveaways" desc="Curated special gifts to celebrate you and your journey." icon={<Gift className="h-4 w-4" />} />
                            <TimelineItem title="Family Welcome" desc="Bring your mom, sister, or best friend with you to share the experience!" icon={<Users className="h-4 w-4" />} />
                        </div>
                    </motion.div>

                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="space-y-6">
                        <div className="mb-4">
                            <h3 className="font-playfair text-3xl sm:text-4xl font-bold mb-3" style={{ color: theme.text }}>The Logistics</h3>
                            <p className="opacity-70 text-lg sm:text-xl">Everything you need to prepare.</p>
                        </div>
                        <TransformationStep
                            number="01"
                            title="Theme & Dress Code"
                            description="Gold & White. Let's look like the royalty we are! Dress your best and shine bright."
                        />
                        <TransformationStep
                            number="02"
                            title="The Core Topic"
                            description="The Success Formula: Faith + Strategy. Redefining success to include Barakah."
                        />
                        <TransformationStep
                            number="03"
                            title="Registration"
                            description="FREE! But Registration is highly mandatory to secure your seat before they are gone."
                        />

                        <div className="pt-6">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full rounded-2xl h-16 text-lg font-bold shadow-2xl hover:scale-[1.02] transition-transform"
                                style={{ backgroundColor: theme.highlight, color: '#fff' }}
                            >
                                Secure My Free Seat Now
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STICKY BOTTOM BAR (Mobile only) */}
            {!isModalOpen && (
                <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full rounded-2xl h-14 text-base font-bold shadow-gold-xl flex items-center justify-center gap-2"
                        style={{ backgroundColor: theme.highlight, color: '#fff', border: '2px solid rgba(255,255,255,0.2)' }}
                    >
                        <Sparkles size={18} /> Register Now
                    </Button>
                </div>
            )}
        </div>
    );
}
