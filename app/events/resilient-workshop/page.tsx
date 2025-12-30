'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    CalendarDays,
    MapPin,
    Clock,
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
    ArrowRight,
    ChevronDown
} from 'lucide-react';

const theme = {
    bg: '#F0EBE8',       // Lightest beige/grey
    accent1: '#DAC7C5',  // Soft mauve/taupe
    accent2: '#CFBCAD',  // Warm beige/tan
    highlight: '#C5A29C',// Stronger rosy brown
    text: '#57534E',     // Warm dark grey
};

const container = 'mx-auto max-w-7xl px-4 sm:px-6 md:px-8';
const sectionY = 'py-16 md:py-24 lg:py-32';

/* ---------- event info ---------- */
const EVENT_INFO = {
    dateLabel: 'Saturday, Jan 31, 2026',
    // timeLabel removed
    placeLabel: 'Toronto, Ontario (Venue TBD)',
    mapUrl: 'https://www.google.com/maps',
};

const ONLINE_INFO = {
    dateLabel: 'Sunday, Feb 1, 2026',
    // timeLabel removed
    placeLabel: 'Online • Join link emailed 24h before',
};

// Placeholder links
const LINKS = {
    inPerson: 'https://shop.hirahsaficoach.com/products/resilient-workshop-in-person',
    online: 'https://shop.hirahsaficoach.com/products/resilient-workshop-online-person',
};

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
        initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: prefersReduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom ease
    } as const;
}

/* ---------- primitives ---------- */
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 shadow-sm backdrop-blur-md"
            style={{
                color: theme.text,
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderColor: theme.accent1,
            }}
        >
            {children}
        </div>
    );
}

function ImagePlaceholder({
    ratio = '16/9',
    src,
}: {
    ratio?: '1/1' | '4/3' | '16/9';
    src?: string;
}) {
    const paddingMap: Record<string, string> = {
        '1/1': 'pb-[100%]',
        '4/3': 'pb-[75%]',
        '16/9': 'pb-[56.25%]',
    };
    return (
        <div
            className={`relative w-full ${paddingMap[ratio]} rounded-[2rem] overflow-hidden group border shadow-lg bg-white transition-all duration-700 hover:shadow-2xl`}
            style={{ borderColor: hexToRgba(theme.accent1, 0.3) }}
        >
            {src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={src}
                    alt="Resilient Workshop hero"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="eager"
                />
            ) : (
                <div
                    className="absolute inset-0 grid place-items-center text-sm opacity-60 gap-2"
                    style={{ color: theme.text }}
                >
                    <Camera className="h-5 w-5 opacity-50" />
                </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem] pointer-events-none" />
        </div>
    );
}



function QuoteBlock() {
    return (
        <div className="relative py-24 md:py-32 text-center px-4 overflow-hidden">
            <div
                className="absolute inset-0 -z-10 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at center, ${hexToRgba(theme.highlight, 0.15)} 0%, transparent 60%)`
                }}
            />
            {/* Decorative quote mark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none">
                <span className="font-playfair text-[20rem] leading-none" style={{ color: theme.text }}>“</span>
            </div>

            <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl italic leading-relaxed max-w-5xl mx-auto drop-shadow-sm" style={{ color: theme.text }}>
                &quot;Resilience isn&apos;t about bouncing back to who you were before. It&apos;s about expanding into who you are becoming.&quot;
            </h3>
        </div>
    );
}

function TimelineItem({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="flex gap-6 sm:gap-8 relative pb-12 last:pb-0 group">
            {/* Line */}
            <div className="absolute left-[20px] sm:left-[24px] top-12 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent last:hidden opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex-shrink-0 relative z-10">
                <div
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center ring-4 ring-white shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: theme.accent1, color: theme.text }}
                >
                    {icon}
                </div>
            </div>
            <div className="pt-1 sm:pt-2">
                <h4 className="font-playfair text-xl sm:text-2xl mt-1 mb-2" style={{ color: theme.text }}>
                    {title}
                </h4>
                <p className="font-lato text-base opacity-80 leading-relaxed max-w-lg" style={{ color: theme.text }}>
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
        <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="h-full">
            <div
                className="rounded-[2rem] bg-white/40 p-8 shadow-sm ring-1 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:bg-white/80 backdrop-blur-sm"
                style={{ borderColor: hexToRgba(theme.accent1, 0.4) }}
            >
                <span
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-6 shadow-sm"
                    style={{ backgroundColor: '#fff', color: theme.text }}
                >
                    {icon}
                </span>
                <div className="font-playfair text-2xl sm:text-2xl mb-4" style={{ color: theme.text }}>
                    {title}
                </div>
                <div className="font-lato text-base opacity-80 leading-relaxed max-w-xs" style={{ color: theme.text }}>
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
        <motion.div whileHover={{ y: -4 }} className="h-full">
            <div
                className="rounded-[2rem] bg-white/60 p-8 shadow-sm ring-1 h-full border-t-4 transition-all hover:shadow-lg hover:bg-white/90"
                style={{ borderColor: hexToRgba(theme.accent1, 0.3), borderTopColor: theme.highlight }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 font-playfair text-base font-bold shadow-inner bg-stone-50"
                        style={{ color: theme.text }}
                        aria-hidden
                    >
                        {number}
                    </span>
                    <div className="font-playfair text-xl sm:text-2xl" style={{ color: theme.text }}>
                        {title}
                    </div>
                </div>
                <div className="font-lato text-base opacity-80 leading-relaxed pl-14" style={{ color: theme.text }}>
                    {description}
                </div>
            </div>
        </motion.div>
    );
}


/* ---------- sticky mobile buy bar ---------- */
function MobileBuyBar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-500">
            <div
                className="rounded-2xl ring-1 bg-white/95 backdrop-blur-xl p-3 shadow-2xl flex gap-3"
                style={{ borderColor: hexToRgba(theme.highlight, 0.2) }}
            >
                <Button
                    asChild
                    className="w-1/2 rounded-xl h-12 text-xs sm:text-sm font-semibold shadow-md"
                    style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                    <a href={LINKS.inPerson}>
                        In-Person (Feb 7)
                    </a>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="w-1/2 rounded-xl h-12 text-xs sm:text-sm font-semibold border-2"
                    style={{ borderColor: theme.accent2, color: theme.text }}
                >
                    <a href={LINKS.online}>
                        Online (Feb 8)
                    </a>
                </Button>
            </div>
        </div>
    );
}

function TicketSelector() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <div className="flex flex-col gap-2">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-full px-10 h-14 text-base font-semibold shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl z-20 relative"
                    style={{ backgroundColor: theme.highlight, color: '#fff' }}
                >
                    Get Tickets <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
                <div className="text-center font-bold text-sm opacity-60" style={{ color: theme.text }}>
                    Only $11 CAD
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-3 w-72 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden z-30 origin-top-left"
                    >
                        <div className="p-2 space-y-1">
                            <a
                                href={LINKS.inPerson}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-200">
                                    <MapPin className="h-5 w-5 opacity-70" style={{ color: theme.text }} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm" style={{ color: theme.text }}>In-Person Ticket</div>
                                    <div className="text-xs opacity-60">Feb 7 • Toronto • $11 CAD</div>
                                </div>
                            </a>
                            <div className="h-px bg-stone-100 mx-2" />
                            <a
                                href={LINKS.online}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-200">
                                    <Users className="h-5 w-5 opacity-70" style={{ color: theme.text }} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm" style={{ color: theme.text }}>Online Ticket</div>
                                    <div className="text-xs opacity-60">Feb 8 • Zoom • $11 CAD</div>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

/* ---------- page ---------- */
export default function ResilientWorkshopPage() {
    const fadeUp = useFadeUp();
    useReducedMotion();

    return (
        <div className="page-wrapper min-h-screen font-sans" style={{ backgroundColor: theme.bg }}>
            {/* HERO */}
            <section className={`relative isolate min-h-[95vh] flex items-center ${sectionY} pt-32 pb-0`}>
                {/* backdrop blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full blur-[100px] -z-10 opacity-50 mix-blend-multiply"
                        style={{ background: `radial-gradient(circle, ${hexToRgba(theme.highlight, 0.5)}, transparent 70%)` }}
                        animate={{
                            scale: [1, 1.1, 1],
                            translateY: [0, 20, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-[-20%] left-[-10%] h-[900px] w-[900px] rounded-full blur-[100px] -z-10 opacity-40 mix-blend-multiply"
                        style={{ background: `radial-gradient(circle, ${hexToRgba(theme.accent1, 0.4)}, transparent 70%)` }}
                        animate={{
                            scale: [1, 1.2, 1],
                            translateY: [0, -30, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className={container}>
                    <div className="grid gap-16 lg:gap-24 lg:grid-cols-2 lg:items-center">
                        {/* Text Content */}
                        <motion.div {...fadeUp} className="space-y-8 lg:space-y-10 order-2 lg:order-1 relative z-10">
                            {/* Decorative line */}
                            <div className="absolute top-2 left-0 -ml-8 w-[1px] h-32 bg-stone-400/30 hidden lg:block" />

                            <div className="space-y-6">
                                <div
                                    className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-semibold tracking-wide uppercase shadow-sm bg-white/40 backdrop-blur-md transition-all hover:bg-white/60"
                                    style={{
                                        borderColor: theme.accent2,
                                        color: theme.text,
                                    }}
                                >
                                    <Sparkles className="h-3.5 w-3.5 fill-current opacity-70" />
                                    <span>A Sacred Space for Connection</span>
                                </div>

                                <h1
                                    className="font-playfair text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight"
                                    style={{ color: theme.text }}
                                >
                                    The <br />
                                    <span
                                        className="text-transparent bg-clip-text"
                                        style={{
                                            backgroundImage: `linear-gradient(135deg, ${theme.highlight}, ${theme.text})`
                                        }}
                                    >
                                        Resilient
                                    </span>{' '}
                                    <span className="italic relative z-10 font-normal inline-block">
                                        Workshop
                                        <svg className="absolute w-[110%] h-4 -bottom-2 -left-1 text-white/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </h1>
                            </div>

                            <p
                                className="font-lato text-xl sm:text-2xl leading-relaxed opacity-85 max-w-lg font-light"
                                style={{ color: theme.text }}
                            >
                                Shed the weight of isolation. <br className="hidden sm:block" />
                                Build unshakeable internal strength. <br className="hidden sm:block" />
                                Find your lifelong sisterhood.
                            </p>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm font-lato pt-4 border-l-2 pl-6" style={{ borderColor: hexToRgba(theme.accent2, 0.5) }}>
                                <div className="space-y-3">
                                    <h4 className="font-bold uppercase tracking-wider text-xs opacity-50 mb-1">Experience In-Person</h4>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-lg">{EVENT_INFO.dateLabel}</span>
                                        <div className="flex items-center gap-2 opacity-80"><MapPin className="h-4 w-4" /> Toronto, Ontario</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold uppercase tracking-wider text-xs opacity-50 mb-1">Experience Online</h4>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-lg">{ONLINE_INFO.dateLabel}</span>
                                        <div className="flex items-center gap-2 opacity-80"><Users className="h-4 w-4" /> Live on Zoom</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <TicketSelector />
                                <Button
                                    variant="ghost"
                                    className="rounded-full px-8 h-14 text-base font-medium hover:bg-white/40"
                                    style={{ color: theme.text }}
                                    onClick={() =>
                                        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                >
                                    See the Agenda
                                </Button>
                            </div>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            {...fadeUp}
                            transition={{ delay: 0.2, duration: 1 }}
                            className="relative order-1 lg:order-2 h-full min-h-[500px] flex items-center justify-center pointer-events-none"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative z-10 w-full pointer-events-auto"
                            >
                                <div className="absolute inset-0 bg-stone-900/5 rounded-[2.5rem] transform translate-x-8 translate-y-8 -z-10 blur-xl" />
                                <ImagePlaceholder ratio="4/3" src="/assets/resilient-workshop.png" />

                                {/* Floating badges */}
                                <div className="absolute -bottom-8 -left-8 z-20 flex flex-col gap-3">
                                    <Badge><Heart className="h-3.5 w-3.5 fill-rose-300 text-rose-400" /> Authentic Connection</Badge>
                                    <Badge><Shield className="h-3.5 w-3.5 fill-emerald-100 text-emerald-600" /> Safe Space</Badge>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <QuoteBlock />

            {/* MISSION / PROBLEM */}
            <section className={`${container} ${sectionY} pt-0`}>
                <motion.div {...fadeUp} className="max-w-5xl mx-auto">
                    <Card
                        className="border-0 bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl ring-1 overflow-hidden"
                        style={{ borderColor: theme.accent1 }}
                    >
                        <div className="h-2 w-full" style={{ background: `linear-gradient(to right, ${theme.highlight}, ${theme.accent2}, ${theme.bg})` }} />
                        <CardHeader className="text-center pt-12 md:pt-16 pb-0">
                            <div className="mx-auto bg-stone-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <Anchor className="h-8 w-8 opacity-50" style={{ color: theme.text }} />
                            </div>
                            <CardTitle className="font-playfair text-4xl sm:text-5xl" style={{ color: theme.text }}>
                                The Designated Pause
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 font-lato text-center py-12 px-6 sm:px-16 text-lg sm:text-xl leading-relaxed">
                            <p className="opacity-80">
                                In a world that demands Muslim women be <strong>&quot;everything to everyone,&quot;</strong> we often lose ourselves in the noise of expectations.
                            </p>
                            <p className="opacity-80">
                                Most of us fail over and over in different life stages, yet we keep getting up. But resilience isn&apos;t just about surviving—it&apos;s about <em>thriving</em> with a heart that is whole.
                            </p>
                            <div className="py-2">
                                <Separator className="w-16 h-1 mx-auto rounded-full opacity-40" style={{ backgroundColor: theme.highlight }} />
                            </div>
                            <p className="font-medium text-xl sm:text-2xl" style={{ color: theme.highlight }}>
                                This is the only space designed to combine <br className="hidden sm:block" /> high-level mindset coaching with deep, spiritual networking.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            {/* CORE PILLARS */}
            <section id="pillars" className={`${container} ${sectionY}`}>
                <motion.div {...fadeUp}>
                    <div className="text-center mb-16 flex flex-col items-center">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-50" style={{ color: theme.text }}>Our Foundation</span>
                        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl mb-6" style={{ color: theme.text }}>
                            Three Pillars of Growth
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <VisionCard icon={<Users className="h-8 w-8" />} title="Deep Connection">
                            Moving beyond surface-level small talk to build genuine, soul-level friendships with like-minded Muslim women who truly <em>get it</em>.
                        </VisionCard>
                        <VisionCard icon={<Sparkles className="h-8 w-8" />} title="Mindset Mastery">
                            Expert-led coaching sessions focused on overcoming life’s pressures, emotional regulation, and moving from &quot;surviving&quot; to &quot;thriving.&quot;
                        </VisionCard>
                        <VisionCard icon={<Anchor className="h-8 w-8" />} title="Spiritual Alignment">
                            Grounding personal growth in Islamic values, teaching resilience as a form of Sabr (patience) and Tawakkul (trust in Allah).
                        </VisionCard>
                    </div>
                </motion.div>
            </section>

            {/* THE EXPERIENCE TIMELINE */}
            <section id="experience" className={`${sectionY} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent pointer-events-none" />
                <div className={container}>
                    <motion.div {...fadeUp} className="max-w-5xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="font-playfair text-4xl sm:text-5xl mb-4" style={{ color: theme.text }}>
                                The Experience
                            </h2>
                            <p className="opacity-70 text-lg">A curated flow designed for rest, reflection, and release.</p>
                        </div>

                        <div className="bg-white/50 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-14 border shadow-2xl relative overflow-hidden" style={{ borderColor: theme.accent1 }}>
                            <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-white/80 to-transparent rounded-bl-full pointer-events-none opacity-50" />

                            <TimelineItem
                                title="Welcome & Grounding"
                                desc="Arrive, settle in with refreshments, and disconnect from the outside world. We start with a collective intention setting."
                                icon={<Coffee className="h-5 w-5" />}
                            />
                            <TimelineItem
                                title="Mindset Masterclass"
                                desc="Deep-dive coaching on the psychology of resilience. Identify your blocks and learn tools to clear them."
                                icon={<BookOpen className="h-5 w-5" />}
                            />
                            <TimelineItem
                                title="Sisterhood Circles"
                                desc="Guided small-group discussions to practice vulnerability and build safe connections. No small talk allowed."
                                icon={<MessageCircle className="h-5 w-5" />}
                            />
                            <TimelineItem
                                title="Closing & Dua"
                                desc="Seal the day with a powerful group Dua and a clear action plan for your week ahead."
                                icon={<Sparkles className="h-5 w-5" />}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* OUTCOMES */}
            <section className={`${container} ${sectionY} pb-32`}>
                <motion.div {...fadeUp}>
                    <div className="mb-16 text-center">
                        <h2 className="font-playfair text-4xl sm:text-5xl" style={{ color: theme.text }}>
                            You Will Walk Away With
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        <TransformationStep
                            number="01"
                            title="Resilience Toolkit"
                            description="A personalized set of mindset skills and new concepts of failure/success to help you navigate life&apos;s storms with grace."
                        />
                        <TransformationStep
                            number="02"
                            title="Sisterhood Circle"
                            description="New, lasting friendships. You will leave with a support system of women who are cheering for your growth."
                        />
                        <TransformationStep
                            number="03"
                            title="Renewed Clarity"
                            description="A sense of lightness. You&apos;ve unloaded the mental weight and have a clear path forward."
                        />
                    </div>
                </motion.div>
            </section>

            {/* TICKETS */}
            <section id="tickets" className={`${container} pb-32`}>
                <Card
                    className="border-0 rounded-[3rem] overflow-hidden shadow-2xl relative bg-[#fff] transform transition-transform hover:scale-[1.01] duration-700"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                        {/* Visual Side */}
                        <div className="lg:col-span-5 relative h-80 lg:h-auto overflow-hidden group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/resilient-workshop.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Workshop atmosphere" />
                            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-700" />
                        </div>

                        {/* Content Side */}
                        <div className="lg:col-span-7 p-10 sm:p-16 lg:p-20 flex flex-col justify-center relative bg-white">
                            <div
                                className="absolute top-0 right-0 w-96 h-96 opacity-40 pointer-events-none"
                                style={{ background: `radial-gradient(circle at top right, ${hexToRgba(theme.accent2, 0.4)}, transparent 70%)` }}
                            />

                            <span className="font-bold tracking-[0.2em] text-xs uppercase mb-6 opacity-60" style={{ color: theme.text }}>
                                Limited Capacity Event
                            </span>

                            <h3 className="font-playfair text-5xl sm:text-6xl mb-8 leading-tight" style={{ color: theme.text }}>
                                Secure Your Seat
                            </h3>

                            <p className="font-lato text-xl opacity-80 mb-12 max-w-md font-light" style={{ color: theme.text }}>
                                Choose the format that serves you best. Both offer the same transformative curriculum.
                            </p>

                            <div className="grid gap-6 w-full max-w-xl">
                                <div
                                    className="p-6 rounded-[2rem] border bg-stone-50/50 flex items-center justify-between hover:border-stone-400 hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                                    onClick={() => window.location.href = LINKS.inPerson}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 rounded-full bg-white shadow-sm ring-1 ring-stone-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MapPin className="h-6 w-6" color={theme.text} />
                                        </div>
                                        <div>
                                            <div className="font-playfair text-xl font-bold mb-1" style={{ color: theme.text }}>In-Person Ticket</div>
                                            <div className="text-sm opacity-60">Feb 7 • Toronto • $11 CAD</div>
                                        </div>
                                    </div>
                                    <Button size="lg" className="rounded-full px-8 shadow-md" style={{ backgroundColor: theme.highlight }}>Book</Button>
                                </div>

                                <div
                                    className="p-6 rounded-[2rem] border bg-stone-50/50 flex items-center justify-between hover:border-stone-400 hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                                    onClick={() => window.location.href = LINKS.online}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 rounded-full bg-white shadow-sm ring-1 ring-stone-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Users className="h-6 w-6" color={theme.text} />
                                        </div>
                                        <div>
                                            <div className="font-playfair text-xl font-bold mb-1" style={{ color: theme.text }}>Online Ticket</div>
                                            <div className="text-sm opacity-60">Feb 8 • Zoom • $11 CAD</div>
                                        </div>
                                    </div>
                                    <Button size="lg" variant="outline" className="rounded-full px-8 border-2" style={{ borderColor: theme.accent1, color: theme.text }}>Book</Button>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center gap-2 text-xs opacity-40 font-medium tracking-wide uppercase" style={{ color: theme.text }}>
                                <Shield className="h-3 w-3" /> Secure Payment processed via Stripe
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            <Separator className="opacity-0" />

            {/* Sticky mobile buy bar */}
            <MobileBuyBar />
        </div>
    );
}
