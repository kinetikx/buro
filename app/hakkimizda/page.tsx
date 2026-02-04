import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Scale, Shield, Users, Award, ChevronRight } from 'lucide-react'

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy-900 text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-image.png" // Fallback or specific hero image
                        alt="Komlu Hukuk Ofisi"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-900" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                        Hakkımızda
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Adalet, dürüstlük ve profesyonellik ilkeleriyle hukuki süreçlerinizde yanınızdayız.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/hero-image.png"
                                alt="Komlu Hukuk Ofisi"
                                fill
                                className="object-cover"
                            />
                        </div>


                        <div className="space-y-6">
                            <h2 className="text-gold-600 font-bold tracking-wider uppercase text-sm">
                                Biz Kimiz?
                            </h2>
                            <h3 className="text-3xl lg:text-4xl font-bold text-navy-900 font-heading leading-tight">
                                Hukuki Mücadelenizde Güçlü Çözüm Ortağınız
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Komlu Hukuk Bürosu olarak, müvekkillerimize en yüksek standartlarda hukuki hizmet sunmayı ilke edindik. Karmaşık hukuki süreçleri basitleştirerek, sonuç odaklı ve şeffaf bir yaklaşımla hareket ediyoruz.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Her müvekkilimizin durumu benzersizdir ve özel ilgi gerektirir. Bu nedenle, hukuki stratejilerimizi kişiye ve olaya özel olarak kurguluyoruz. Amacımız, sadece dava kazanmak değil, müvekkillerimizin haklarını en etkin şekilde korumak ve gelecekte karşılaşabilecekleri sorunları önlemektir.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 pt-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0 text-gold-600">
                                        <Scale className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-900 mb-1">Adil Yaklaşım</h4>
                                        <p className="text-sm text-gray-600">Her davada hakkaniyet ve adalet prensiplerine bağlılık.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0 text-gold-600">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy-900 mb-1">Güvenilirlik</h4>
                                        <p className="text-sm text-gray-600">Gizlilik ve şeffaflık temelinde güvene dayalı ilişki.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Link href="/iletisim">
                                    <Button size="lg" className="gap-2">
                                        İletişime Geçin
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values / Vision */}
            <section className="py-20 bg-navy-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-navy-900 font-heading mb-4">
                            Değerlerimiz
                        </h2>
                        <p className="text-gray-600">
                            Bizi biz yapan ve her davada rehber edindiğimiz temel prensiplerimiz.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: "Müvekkil Odaklılık",
                                description: "İhtiyaçlarınızı dinliyor, anlıyor ve size özel çözümler üretiyoruz."
                            },
                            {
                                icon: Award,
                                title: "Uzmanlık",
                                description: "Alanında uzman kadromuzla, güncel hukuki gelişmeleri yakından takip ediyoruz."
                            },
                            {
                                icon: Shield,
                                title: "Şeffaflık",
                                description: "Sürecin her aşamasında sizi bilgilendiriyor, ulaşılabilir olmaya özen gösteriyoruz."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="w-14 h-14 rounded-lg bg-navy-900 flex items-center justify-center text-white mb-6">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
