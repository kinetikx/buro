'use client'

import { motion } from 'framer-motion'
import { Scale, Users, Briefcase, Gavel, FileText, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const services = [
    {
        icon: Scale,
        title: 'İcra ve İflas Hukuku',
        description: 'Borç tahsilatı, icra takibi başlatma, itirazın iptali davaları, ihtiyati haciz, iflas erteleme, konkordato süreçlerinin yönetimi, menfi tespit ve istirdat davaları, borçtan kurtulma davaları ve yedieminlik işlemleri gibi konularda kapsamlı hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.',
    },
    {
        icon: Users,
        title: 'Boşanma & Aile Hukuku',
        description: 'Anlaşmalı ve çekişmeli boşanma davaları, velayet ve nafaka uyuşmazlıkları, mal rejimi tasfiyesi, maddi ve manevi tazminat talepleri, soybağı davaları, evlat edinme işlemleri ve ailenin korunmasına dair tedbir kararları konularında hassas ve çözüm odaklı hukuki destek sağlıyoruz.',
    },
    {
        icon: Briefcase,
        title: 'İş ve Sosyal Güvenlik Hukuku',
        description: 'İşe iade davaları, kıdem ve ihbar tazminatı hesaplamaları ve tahsili, fazla mesai ücretleri, mobbing (bezdiri) davaları, iş kazası ve meslek hastalığından kaynaklanan tazminat davaları, hizmet tespiti davaları ve iş sözleşmelerinin hazırlanması/feshi süreçlerinde müvekkillerimizi temsil ediyoruz.',
    },
    {
        icon: Gavel,
        title: 'Miras Hukuku',
        description: 'Veraset ilamı (mirasçılık belgesi) alınması, vasiyetname düzenlenmesi ve iptali, miras paylaşımı ve taksim sözleşmeleri, tenkis davaları, muris muvazaası (mirastan mal kaçırma) davaları ve reddi miras işlemleri konularında uzman hukuki danışmanlık hizmeti veriyoruz.',
    },
    {
        icon: FileText,
        title: 'Gayrimenkul Hukuku',
        description: 'Tapu iptal ve tescil davaları, kira tespit ve tahliye davaları, izale-i şüyu (ortaklığın giderilmesi) davaları, kamulaştırma ve kamulaştırmasız el atma davaları, kat karşılığı inşaat sözleşmeleri ve gayrimenkul satış vaadi sözleşmelerinden doğan uyuşmazlıklarda yanınızdayız.',
    },
    {
        icon: Shield,
        title: 'Tazminat ve Sigorta Hukuku',
        description: 'Trafik kazalarından kaynaklanan maddi ve manevi tazminat davaları, destekten yoksun kalma tazminatı, değer kaybı başvuruları, sigorta tahkim komisyonu başvuruları, haksız fiilden doğan tazminat talepleri ve mesleki sorumluluk sigortası uyuşmazlıklarında haklarınızı koruyoruz.',
    },
    {
        icon: Scale,
        title: 'Ceza Hukuku',
        description: 'Ağır Ceza ve Asliye Ceza Mahkemelerinde sanık müdafiliği ve katılan vekilliği, soruşturma aşamasında ifade ve sorgu işlemleri, tutuklamaya itiraz, istinaf ve temyiz başvuruları, infaz hukuku ve cezaevi süreçlerinde müvekkillerimizin adil yargılanma hakkını savunuyoruz.',
    }
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function Services() {
    return (
        <section className="py-24 bg-navy-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-gold-600 font-medium uppercase tracking-wider text-sm mb-2 block">
                        Uzmanlık Alanlarımız
                    </span>
                    <h2 className="text-4xl font-bold text-navy-900 mb-6 font-heading">
                        Size Nasıl Yardımcı Olabiliriz?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Hukukun çeşitli alanlarında uzmanlaşmış kadromuzla, karmaşık hukuki süreçlerde
                        en iyi sonucu almanız için çalışıyoruz.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={item}>
                            <div className="block h-full">
                                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100 group hover:border-gold-400/30 hover:-translate-y-1 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-navy-50 rounded-bl-full -mr-12 -mt-12 transition-colors group-hover:bg-gold-100/50" />

                                    <div className="w-14 h-14 bg-navy-100 text-navy-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-gold-400 transition-colors">
                                        <service.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-12">
                    <Link href="/hizmetler">
                        <Button variant="outline" size="lg" className="px-8">
                            Tüm Hizmetlerimizi İnceleyin
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
