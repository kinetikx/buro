import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Scale, Users, Briefcase, Gavel, FileText, Shield, HeartHandshake, Calculator } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Hizmetlerimiz | Komlu Hukuk Bürosu Erzurum',
    description: 'Ceza, Aile, İş, Miras ve Gayrimenkul hukuku alanlarında uzman avukatlık ve danışmanlık hizmetleri.',
}

const services = [
    {
        icon: Scale,
        title: 'İcra ve İflas Hukuku',
        description: 'Alacağın tahsili, icra takibi başlatılması, itirazın iptali, iflas ve konkordato süreçleri.',
        slug: 'icra-ve-iflas-hukuku'
    },
    {
        icon: Users,
        title: 'Aile Hukuku',
        description: 'Anlaşmalı ve çekişmeli boşanma, nafaka, velayet, maddi ve manevi tazminat, mal rejiminin tasfiyesi davaları.',
        slug: 'aile-hukuku'
    },
    {
        icon: Briefcase,
        title: 'İş Hukuku',
        description: 'İşe iade, kıdem tazminatı, ihbar tazminatı, fazla mesai ücreti, iş kazası ve meslek hastalığı kaynaklı tazminat davaları.',
        slug: 'is-hukuku'
    },
    {
        icon: Gavel,
        title: 'Miras Hukuku',
        description: 'Veraset ilamı, vasiyetname düzenlenmesi, muris muvazaası, tenkis ve mirasın paylaştırılması davaları.',
        slug: 'miras-hukuku'
    },
    {
        icon: FileText,
        title: 'Gayrimenkul Hukuku',
        description: 'Tapu iptal ve tescil davaları, kira tespit ve tahliye davaları, izale-i şuyu (ortaklığın giderilmesi) davaları.',
        slug: 'gayrimenkul-hukuku'
    },
    {
        icon: Shield,
        title: 'Tazminat Hukuku',
        description: 'Trafik kazalarından doğan tazminat davaları, haksız fiil tazminatları, sigorta uyuşmazlıkları.',
        slug: 'tazminat-hukuku'
    },
    {
        icon: Calculator,
        title: 'Vergi Hukuku',
        description: 'Vergi cezalarının iptali, ödeme emrinin iptali davaları ve vergi uyuşmazlıkları.',
        slug: 'vergi-hukuku'
    },
    {
        icon: Scale,
        title: 'Ceza Hukuku',
        description: 'Ağır Ceza ve Asliye Ceza Mahkemelerinin görev alanına giren suçlarda soruşturma ve kovuşturma aşamalarında hukuki destek.',
        slug: 'ceza-hukuku'
    }
]

export default function ServicesPage() {
    return (
        <main className="min-h-screen pt-20">
            <Header />

            {/* Page Header */}
            <section className="bg-navy-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                        Uzmanlık Alanlarımız
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Erzurum merkezli ofisimizde, hukukun çeşitli alanlarında
                        kapsamlı ve güvenilir çözümler sunuyoruz.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/hizmetler/${service.slug}`}
                                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold-400"
                            >
                                <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-gold-400 transition-colors">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <span className="text-navy-600 text-sm font-medium group-hover:underline decoration-gold-400">
                                    Detaylı İncele &rarr;
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 bg-white p-8 md:p-12 rounded-2xl shadow-lg border-l-8 border-gold-400 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                Hukuki Desteğe mi İhtiyacınız Var?
                            </h3>
                            <p className="text-gray-600">
                                Vakit kaybetmeden uzman avukatlarımızla iletişime geçin, sürecinizi profesyonelce yönetelim.
                            </p>
                        </div>
                        <Link href="/iletisim">
                            <Button size="lg" className="whitespace-nowrap px-8">
                                Hemen İletişime Geçin
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
