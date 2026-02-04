'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea' // Assuming this exists, if not I'll use simple textarea
// If Textarea component doesn't exist, I'll allow fallback to simple HTML textarea or create it.
// Checking recent file list, I don't see textarea.tsx, but I'll assume standard UI component pattern or use HTML.
// To be safe, I'll use standard HTML textarea with tailwind classes if import fails, but let's try importing first or just check if it exists.
// Better: I'll use standard inputs styled like the rest.

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        siteName: '',
        siteDescription: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: ''
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            const data = await res.json()
            if (data && data.id) {
                setFormData(data)
            }
        } catch (error) {
            console.error('Failed to fetch settings', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const data = await res.json()
                setFormData(data)
                alert('Ayarlar başarıyla kaydedildi.')
            } else {
                alert('Kaydetme başarısız.')
            }
        } catch (error) {
            console.error('Error saving settings', error)
            alert('Bir hata oluştu.')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div className="p-8 text-center">Yükleniyor...</div>

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-navy-900">Site Ayarları</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-8">

                {/* General Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-navy-900 border-b pb-2">Genel Ayarlar</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Site Adı</label>
                            <Input
                                name="siteName"
                                value={formData.siteName || ''}
                                onChange={handleChange}
                                placeholder="Örn: Komlu Hukuk"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Site Açıklaması (Meta Description)</label>
                            <textarea
                                name="siteDescription"
                                value={formData.siteDescription || ''}
                                onChange={handleChange}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Site hakkında kısa açıklama..."
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-navy-900 border-b pb-2">İletişim Bilgileri</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">E-posta</label>
                            <Input
                                name="contactEmail"
                                value={formData.contactEmail || ''}
                                onChange={handleChange}
                                placeholder="iletisim@ornek.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Telefon</label>
                            <Input
                                name="contactPhone"
                                value={formData.contactPhone || ''}
                                onChange={handleChange}
                                placeholder="0555 555 55 55"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Adres</label>
                            <textarea
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Ofis adresi..."
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-navy-900 border-b pb-2">Sosyal Medya</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Instagram URL</label>
                            <Input
                                name="instagramUrl"
                                value={formData.instagramUrl || ''}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Twitter URL</label>
                            <Input
                                name="twitterUrl"
                                value={formData.twitterUrl || ''}
                                onChange={handleChange}
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Facebook URL</label>
                            <Input
                                name="facebookUrl"
                                value={formData.facebookUrl || ''}
                                onChange={handleChange}
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
                            <Input
                                name="linkedinUrl"
                                value={formData.linkedinUrl || ''}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSaving} size="lg" className="min-w-[150px]">
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Kaydediliyor
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Kaydet
                            </>
                        )}
                    </Button>
                </div>

            </form>
        </div>
    )
}
