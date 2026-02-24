'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Mail, Sparkles } from 'lucide-react';

interface GoldenPearlFormProps {
    className?: string;
    isInsideHero?: boolean;
}

const theme = {
    accent2: '#D4AF37',  // Classic gold
    highlight: '#9C7A1A',// Rich deeper gold
    text: '#4A3B22',     // Deep bronze/brown
};

export default function GoldenPearlForm({ className = "", isInsideHero = false }: GoldenPearlFormProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border shadow-2xl ${className}`}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
            }}
        >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, #EAD7A1, ${theme.accent2}, #EAD7A1)` }} />

            <div className="relative z-10 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: theme.highlight }}>
                        Join the Golden Pearl
                    </h2>
                    <p className="font-lato text-sm sm:text-base opacity-85" style={{ color: theme.text }}>
                        Claim your free seat below
                    </p>
                </div>

                {/* 
          IMPORTANT: This form connects to Kit (ConvertKit)
          Action: https://app.kit.com/forms/9125548/subscriptions
          UID: f4fdc38c0d
          Form ID: 9125548
        */}
                <form
                    action="https://app.kit.com/forms/9125548/subscriptions"
                    method="post"
                    data-sv-form="9125548"
                    data-uid="f4fdc38c0d"
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        {/* Full Name Field */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#9C7A1A]">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                name="fields[full_name]"
                                placeholder="Full Name"
                                required
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-stone-200 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-lato"
                            />
                        </div>

                        {/* Location Field */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#9C7A1A]">
                                <MapPin size={18} />
                            </div>
                            <input
                                type="text"
                                name="fields[location]"
                                placeholder="Location"
                                required
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-stone-200 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-lato"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#9C7A1A]">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                name="email_address"
                                placeholder="Email Address"
                                required
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-stone-200 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-lato"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full group relative overflow-hidden rounded-full py-5 font-playfair font-bold text-xl text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            background: `linear-gradient(135deg, ${theme.accent2}, ${theme.highlight})`
                        }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Sparkles size={20} />
                            Claim My Free Seat
                        </span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white/40" />
                    </button>

                    <p className="text-[10px] sm:text-xs text-center opacity-60 font-medium" style={{ color: theme.text }}>
                        Free admission • Registration required • Limited capacity
                    </p>
                </form>
            </div>

            {/* Decorative Orbs inside the form glass */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#EAD7A1]/20 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
    );
}
