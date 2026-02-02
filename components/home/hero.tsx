'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0f172a]">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1e3a8a] via-[#0f172a] to-[#0f172a] opacity-90" />
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 pt-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-heading leading-tight drop-shadow-2xl">
                                Hukuki Haklarınızın <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] to-[#eab308]">
                                    Savunucusu
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-light">
                                İcra ve İflas, Sigorta, Tazminat ve İş Hukuku davalarında
                                yanınızdayız. <strong className="text-white font-semibold">Profesyonel çözümler, güvenilir danışmanlık.</strong>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/hizmetler">
                                    <Button size="lg" className="text-lg px-8 py-6 bg-[#eab308] hover:bg-[#ca8a04] text-[#0f172a] font-bold border-none shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:scale-105">
                                        Hizmetlerimiz
                                    </Button>
                                </Link>
                                <Link href="/iletisim">
                                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto transition-all">
                                        İletişime Geç
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative translate-x-12"
                    >
                        <div className="relative w-full aspect-square max-w-[700px] ml-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#fbbf24]/20 to-transparent rounded-full blur-3xl opacity-50" />
                            <Image
                                src="/hero-image.png"
                                alt="Hukuk Bürosu Temsili"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#fbbf24]/80 cursor-pointer p-2 hover:text-[#fbbf24] transition-colors"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <ChevronDown className="w-10 h-10" />
            </motion.div>
        </section >
    )
}
