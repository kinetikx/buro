import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock Data - In a real app, this could come from a DB or CMS
const servicesData: Record<string, { title: string, content: string, features: string[] }> = {
    'icra-ve-iflas-hukuku': {
        title: 'İcra ve İflas Hukuku',
        content: "Komlu Hukuk Bürosu olarak, alacakların tahsili, icra takipleri, iflas ve konkordato süreçlerinde hem alacaklı hem de borçlu müvekkillerimize kapsamlı hukuki destek sunuyoruz. İcra daireleri ve mahkemeler nezdindeki tüm süreçleri titizlikle yürütüyoruz.",
        features: ['İlamsız İcra Takibi', 'İlamlı İcra Takibi', 'Kambiyo Senetlerine Özgü Takip', 'İflas ve İflas Erteleme', 'Konkordato Süreçleri', 'İtirazın İptali Davaları', 'Menfi Tespit Davaları']
    },
    'ceza-hukuku': {
        title: 'Ceza Hukuku',
        content: "Ceza hukuku, bireylerin özgürlüklerini doğrudan etkileyen en hassas hukuk dalıdır. Komlu Hukuk Bürosu olarak, soruşturma aşamasından kovuşturma ve infaz aşamasına kadar müvekkillerimizin haklarını en etkin şekilde savunuyoruz. Ağır Ceza Mahkemeleri ve Asliye Ceza Mahkemelerinde görülen davalarda, şüpheli/sanık müdafiiliği veya müşteki/katılan vekilliği hizmeti sunmaktayız.",
        features: ['Soruşturma işlemleri', 'Ağır Ceza Davaları', 'Asliye Ceza Davaları', 'Tutukluluğa İtiraz', 'İnfaz Hukuku']
    },
    'aile-hukuku': {
        title: 'Boşanma & Aile Hukuku',
        content: "Aile birliğinin temelden sarsılması, şiddetli geçimsizlik, zina, hayata kast gibi nedenlerle açılacak boşanma davalarında hukuki destek sağlıyoruz. Anlaşmalı ve çekişmeli boşanma süreçlerini, müvekkillerimizin ve çocukların haklarını gözeterek yönetiyoruz.",
        features: ['Anlaşmalı Boşanma', 'Çekişmeli Boşanma', 'Velayet Davaları', 'Nafaka Artırım/Azaltım', 'Mal Rejimi Tasfiyesi']
    },
    'is-hukuku': {
        title: 'İş Hukuku',
        content: "İşçi ve işveren arasındaki uyuşmazlıklarda, iş sözleşmesinin feshi, işe iade, kıdem ve ihbar tazminatı, fazla mesai, yıllık izin ücreti alacakları gibi konularda danışmanlık ve dava takip hizmeti veriyoruz.",
        features: ['İşe İade Davaları', 'Kıdem ve İhbar Tazminatı', 'İş Kazası Tazminatları', 'Mobbing Davaları', 'Hizmet Tespit Davaları']
    },
    'miras-hukuku': {
        title: 'Miras Hukuku',
        content: "Mirasbırakanın vefatı sonrası malvarlığının paylaşımı, vasiyetname düzenlenmesi, mirasçılık belgesi alınması ve mirasın reddi gibi işlemlerde hukuki destek sunuyoruz.",
        features: ['Veraset İlamı', 'İzale-i Şuyu', 'Tenkis Davaları', 'Vasiyetname Hazırlama', 'Miras Taksim Sözleşmeleri']
    },
    'gayrimenkul-hukuku': {
        title: 'Gayrimenkul Hukuku',
        content: "Taşınmaz mülkiyeti, tapu iptal ve tescil, kamulaştırma, kira hukukundan kaynaklanan anlaşmazlıklar ve kat mülkiyeti kanunundan doğan uyuşmazlıklarda hizmet vermekteyiz.",
        features: ['Tapu İptal ve Tescil', 'Kira Tespit ve Tahliye', 'Kamulaştırma Davaları', 'Kat Karşılığı İnşaat Sözleşmeleri', 'Ecrimisil Davaları']
    },
    'tazminat-hukuku': {
        title: 'Tazminat Hukuku',
        content: "Haksız fiil, sözleşmeye aykırılık veya trafik kazası gibi nedenlerle uğranılan maddi ve manevi zararların tazmini için açılacak davaları takip ediyoruz.",
        features: ['Trafik Kazası Tazminatları', 'Maddi Tazminat', 'Manevi Tazminat', 'Destekten Yoksun Kalma', 'Maluliyet Tazminatı']
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const service = servicesData[params.slug]
    if (!service) return { title: 'Hizmet Bulunamadı' }

    return {
        title: `${service.title} | Komlu Hukuk Bürosu`,
        description: service.content.substring(0, 160),
    }
}

export async function generateStaticParams() {
    return Object.keys(servicesData).map((slug) => ({ slug }))
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const service = servicesData[params.slug]

    if (!service) {
        return notFound()
    }

    return (
        <main className="min-h-screen pt-20">
            <Header />

            <section className="bg-navy-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <Link href="/hizmetler" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Hizmetlere Dön
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading">
                        {service.title}
                    </h1>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">

                        <div className="lg:w-2/3">
                            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-8">
                                <h2 className="text-2xl font-bold text-navy-900 mb-6">Genel Bilgi</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                    {service.content}
                                </p>

                                <h3 className="text-xl font-bold text-navy-900 mb-4">Hizmet Kapsamı</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                                            <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                                            <span className="font-medium text-navy-900">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gold-50 p-8 rounded-xl border border-gold-200">
                                <h3 className="text-xl font-bold text-navy-900 mb-2">
                                    Hukuki Danışmanlık Alın
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    {service.title} alanındaki hukuki süreçleriniz için uzman avukatlarımızla görüşebilirsiniz.
                                </p>
                                <Link href="/iletisim">
                                    <Button className="bg-navy-900 text-white hover:bg-navy-800">
                                        İletişime Geçin
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <div className="sticky top-24 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-navy-900 mb-4">Diğer Hizmetler</h3>
                                <nav className="space-y-4">
                                    {Object.entries(servicesData).map(([slug, data]) => (
                                        <Link
                                            key={slug}
                                            href={`/hizmetler/${slug}`}
                                            className={`block text-sm font-medium transition-colors ${slug === params.slug ? 'text-gold-600' : 'text-gray-600 hover:text-navy-900'}`}
                                        >
                                            {data.title}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
