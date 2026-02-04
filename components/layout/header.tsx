'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const isTransparentPage = pathname === '/' || pathname === '/hakkimizda'
    const showSolidHeader = scrolled || !isTransparentPage

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                showSolidHeader
                    ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <div className={cn(
                        "font-heading font-bold text-2xl transition-colors",
                        showSolidHeader ? "text-navy-900" : "text-white"
                    )}>
                        KOMLU<span className="text-gold-400">HUKUK</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-gold-400',
                                pathname === item.href
                                    ? 'text-gold-400'
                                    : showSolidHeader ? 'text-[#1a365d]' : 'text-gray-200'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link href="https://wa.me/905416255626" target="_blank">
                        <Button
                            variant={showSolidHeader ? 'primary' : 'secondary'}
                            size="sm"
                            className="gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            <span>0541 625 56 26</span>
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "lg:hidden relative z-50 p-2",
                        isOpen ? "text-white" : showSolidHeader ? "text-navy-900" : "text-white"
                    )}
                    aria-label="Menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-0 bg-navy-900 z-40 lg:hidden flex flex-col pt-24 px-6"
                        >
                            <nav className="flex flex-col gap-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "text-2xl font-heading font-medium transition-colors",
                                            pathname === item.href ? "text-gold-400" : "text-white hover:text-gold-400"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-6 border-t border-navy-600">
                                    <Link href="https://wa.me/905416255626" target="_blank" className="w-full">
                                        <Button variant="secondary" className="w-full gap-2 text-lg py-6">
                                            <Phone className="w-5 h-5" />
                                            <span>0541 625 56 26</span>
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
