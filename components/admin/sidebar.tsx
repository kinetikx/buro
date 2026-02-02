'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    PenSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Blog Yazıları', href: '/admin/blog', icon: FileText },
    { name: 'Mesajlar', href: '/admin/mesajlar', icon: MessageSquare },
    { name: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 bg-navy-900 min-h-screen text-white fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-navy-800">
                <div className="font-heading font-bold text-2xl">
                    KOMLU<span className="text-gold-400">PANEL</span>
                </div>
            </div>

            <div className="p-4">
                <Link href="/admin/blog/yeni">
                    <Button variant="secondary" className="w-full gap-2 mb-6">
                        <PenSquare className="w-4 h-4" />
                        Yeni Yazı Ekle
                    </Button>
                </Link>

                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                    isActive
                                        ? "bg-navy-800 text-gold-400"
                                        : "text-gray-300 hover:bg-navy-800 hover:text-white"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-navy-800">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-3"
                    onClick={() => signOut()}
                >
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                </Button>
            </div>
        </div>
    )
}
