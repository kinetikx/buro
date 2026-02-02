'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
            } else {
                router.refresh()
                router.push('/admin/dashboard')
            }
        } catch (error) {
            setError('Bir hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-navy-900 font-heading">
                            Komlu Hukuk
                        </h1>
                        <p className="text-gray-500 mt-2">Yönetim Paneli Girişi</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy-900">E-Posta Adresi</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="admin@komluhukuk.com"
                                        className="pl-10 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy-900">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-12"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full h-12 text-base" disabled={loading}>
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-500">
                        &copy; 2025 Komlu Hukuk Bürosu
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative bg-navy-900">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800" />
                <div className="absolute inset-0 flex items-center justify-center p-12 text-white">
                    <div className="max-w-lg">
                        <h2 className="text-4xl font-bold font-heading mb-6">
                            Profesyonel Yönetim Paneli
                        </h2>
                        <p className="text-navy-100 text-lg leading-relaxed">
                            İçeriklerinizi kolayca yönetin, müvekkil mesajlarını takip edin ve
                            site istatistiklerini görüntüleyin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
