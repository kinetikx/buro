'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, AlertCircle } from 'lucide-react'

function LoginContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams.get('callbackUrl') || '/admin'
    const error = searchParams.get('error')

    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setLoginError('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                setLoginError('Giriş başarısız. Bilgilerinizi kontrol edin.')
                setIsLoading(false)
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (error) {
            setLoginError('Bir hata oluştu.')
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-center bg-navy-50 border-b border-gray-100">
                    <div className="font-heading font-bold text-2xl text-navy-900 mb-2">
                        KOMLU<span className="text-gold-400">HUKUK</span>
                    </div>
                    <p className="text-gray-500 text-sm">Yönetim Paneli Girişi</p>
                </div>

                <div className="p-8 space-y-6">
                    {/* Error Message */}
                    {(error || loginError) && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {loginError || (error === 'AccessDenied'
                                ? 'Bu hesaba erişim izni verilmemiş.'
                                : 'Giriş yapılamadı.')}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="email">
                                E-posta Adresi
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                disabled={isLoading}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="password">
                                Şifre
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                                className="w-full"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Giriş Yap
                        </Button>
                    </form>
                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
                    &copy; 2026 Komlu Hukuk Bürosu. Tüm hakları saklıdır.
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-navy-900 flex items-center justify-center text-white">Yükleniyor...</div>}>
            <LoginContent />
        </Suspense>
    )
}
