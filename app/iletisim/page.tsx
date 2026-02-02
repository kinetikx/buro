'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Contact validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
    email: z.string().email('Geçerli bir e-mail adresi giriniz'),
    phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
    subject: z.string().min(1, 'Bir konu seçiniz'),
    message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
    kvkk: z.boolean().refine((val) => val === true, {
        message: 'KVKK metnini onaylamanız gerekmektedir',
    }),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            kvkk: false,
        },
    })

    const onSubmit = async (data: ContactFormValues) => {
        // TODO: Implement API call
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Mesajınız başarıyla gönderildi!')
        reset()
    }

    return (
        <main className="min-h-screen pt-20">
            <Header />

            <section className="bg-navy-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                        İletişim
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Hukuki problemleriniz için yanınızdayız. Detaylı bilgi için
                        bizimle iletişime geçin.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Contact Info */}
                        <div className="lg:w-1/3 space-y-10">
                            <div>
                                <h3 className="text-2xl font-bold text-navy-900 mb-6 font-heading">
                                    İletişim Bilgileri
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Ofisimize gelerek yüz yüze görüşebilir veya telefon/mail yoluyla
                                    bize ulaşabilirsiniz.
                                </p>

                                <div className="space-y-6">
                                    <ContactItem
                                        icon={MapPin}
                                        title="Adres"
                                        content="Vaniefendi mahallesi, Haşılefendi caddesi Akgül iş merkezi kat:4 no:11, 25000 Yakutiye/Erzurum"
                                    />
                                    <ContactItem
                                        icon={Phone}
                                        title="Telefon"
                                        content={(
                                            <a href="tel:05416255626" className="hover:text-gold-600 transition">
                                                0541 625 56 26
                                            </a>
                                        )}
                                    />
                                    <ContactItem
                                        icon={Send}  // Using Send icon for WhatsApp as it's similar/available, or MessageCircle if imported
                                        title="WhatsApp"
                                        content={(
                                            <a href="https://wa.me/905416255626" target="_blank" className="hover:text-gold-600 transition text-green-600 font-medium">
                                                WhatsApp'tan Yazın
                                            </a>
                                        )}
                                    />
                                    <ContactItem
                                        icon={Mail}
                                        title="E-Posta"
                                        content={(
                                            <a href="mailto:info@komluhukuk.com" className="hover:text-gold-600 transition">
                                                info@komluhukuk.com
                                            </a>
                                        )}
                                    />
                                    <ContactItem
                                        icon={Clock}
                                        title="Çalışma Saatleri"
                                        content="Hafta İçi: 10.00 - 17.30"
                                    />
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-200 h-64 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.882434440236!2d41.26863731114972!3d39.90346907481525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406e5f1566810843%3A0x600460c5c363290!2zVmFuaWVmZW5kaSwgSGHFn8SxbGVmZW5kaSBDZC4gTm86MTEsIDI1MTAwIFlha3V0aXllL0VyenVydW0!5e0!3m2!1str!2str!4v1714856627000!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:w-2/3">
                            <div className="bg-navy-50 p-8 md:p-12 rounded-2xl">
                                <h3 className="text-2xl font-bold text-navy-900 mb-6 font-heading">
                                    Bize Mesaj Gönderin
                                </h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-navy-900">Ad Soyad</label>
                                            <Input {...register('name')} placeholder="Adınız Soyadınız" />
                                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-navy-900">Telefon</label>
                                            <Input {...register('phone')} placeholder="05XX XXX XX XX" />
                                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-navy-900">E-Posta</label>
                                            <Input {...register('email')} type="email" placeholder="ornek@email.com" />
                                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-navy-900">Konu</label>
                                            <select
                                                {...register('subject')}
                                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Seçiniz</option>
                                                <option value="Boşanma">Boşanma & Aile</option>
                                                <option value="Ceza">Ceza Hukuku</option>
                                                <option value="İş">İş Hukuku</option>
                                                <option value="Miras">Miras Hukuku</option>
                                                <option value="Diğer">Diğer</option>
                                            </select>
                                            {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-navy-900">Mesajınız</label>
                                        <textarea
                                            {...register('message')}
                                            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Hukuki sorununuzdan kısaca bahsedin..."
                                        />
                                        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <input
                                                type="checkbox"
                                                {...register('kvkk')}
                                                id="kvkk"
                                                className="mt-1 h-4 w-4 rounded border-gray-300 text-navy-600 focus:ring-navy-600"
                                            />
                                            <label htmlFor="kvkk" className="text-sm text-gray-600 leading-tight">
                                                <Link href="/kvkk" className="text-navy-900 font-medium underline">
                                                    KVKK Aydınlatma Metni
                                                </Link>
                                                'ni okudum, kişisel verilerimin işlenmesini kabul ediyorum.
                                            </label>
                                        </div>
                                        {errors.kvkk && <span className="text-red-500 text-sm">{errors.kvkk.message}</span>}
                                    </div>

                                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto px-8 gap-2">
                                        <span>{isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
                                        {!isSubmitting && <Send className="w-4 h-4" />}
                                    </Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function ContactItem({ icon: Icon, title, content }: { icon: any, title: string, content: React.ReactNode }) {
    return (
        <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-navy-50 text-navy-900 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-navy-900 mb-1">{title}</h4>
                <div className="text-gray-600">{content}</div>
            </div>
        </div>
    )
}
