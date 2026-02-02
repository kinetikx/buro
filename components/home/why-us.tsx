'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'





const benefits = [
    {
        title: 'Erzurum Yerel Deneyimi',
        description: "Erzurum adliyesi ve yerel hukuk pratiğindeki tecrübemizle süreci en iyi şekilde yönetiyoruz."
    },
    {
        title: 'Şeffaf İletişim',
        description: "Dava sürecinizin her aşamasında sizi bilgilendiriyor, anlaşılır bir dille hukuki durumunuzu paylaşıyoruz."
    },
    {
        title: 'Sonuç Odaklı Yaklaşım',
        description: "Hukuki sorunlarınızı en hızlı ve lehinize olacak şekilde çözüme kavuşturmak için stratejik çalışıyoruz."
    },
    {
        title: 'Ulaşılabilirlik',
        description: "Müvekkillerimizin sorularına hızlı dönüş yapıyor, her zaman ulaşılabilir bir avukatlık hizmeti sunuyoruz."
    }
]

export default function WhyUs() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <div className="lg:w-1/2">
                        <span className="text-gold-600 font-medium uppercase tracking-wider text-sm mb-2 block">
                            Neden Biz?
                        </span>
                        <h2 className="text-4xl font-bold text-navy-900 mb-6 font-heading">
                            Adaletin Yanında, <br />
                            Sizin Arkanızdayız
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Komlu Hukuk Bürosu olarak, sadece bir hukuk bürosu değil, aynı zamanda
                            zorlu hukuki süreçlerinizde size rehberlik eden güvenilir bir çözüm ortağıyız.
                        </p>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy-900 mb-1">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="flex flex-col gap-6">
                            {/* WhatsApp Card */}
                            <Link href="https://wa.me/905416255626" target="_blank" className="block group">
                                <div className="bg-[#0f172a] border border-[#fbbf24]/30 p-8 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all group-hover:-translate-y-1 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbbf24]/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                                    <div className="flex items-start gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-full bg-[#fbbf24]/10 flex items-center justify-center shrink-0 group-hover:bg-[#fbbf24] transition-colors">
                                            <MessageCircle className="w-8 h-8 text-[#fbbf24] group-hover:text-[#0f172a] transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 font-heading">WhatsApp Hattı</h3>
                                            <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">Hukuki sorunlarınız için hızlı iletişim kurun.</p>
                                            <span className="inline-flex items-center text-[#fbbf24] font-semibold gap-2">
                                                Mesaj Gönder <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Maps Card */}
                            <Link href="https://www.google.com/maps/search/?api=1&query=39.903469,41.270826" target="_blank" className="block group">
                                <div className="bg-[#0f172a] border border-[#fbbf24]/30 p-8 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all group-hover:-translate-y-1 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbbf24]/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                                    <div className="flex items-start gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-full bg-[#fbbf24]/10 flex items-center justify-center shrink-0 group-hover:bg-[#fbbf24] transition-colors">
                                            <MapPin className="w-8 h-8 text-[#fbbf24] group-hover:text-[#0f172a] transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 font-heading">Ofis Konumu</h3>
                                            <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">Yüz yüze görüşme için ofisimize bekleriz.</p>
                                            <span className="inline-flex items-center text-[#fbbf24] font-semibold gap-2">
                                                Yol Tarifi Al <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
