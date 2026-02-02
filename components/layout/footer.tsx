import Link from 'next/link'
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-navy-900 text-white pt-20 pb-10">
            <div className="container">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <div className="font-heading font-bold text-2xl">
                                KOMLU<span className="text-gold-400">HUKUK</span>
                            </div>
                        </Link>
                        <p className="text-navy-100 mb-6 leading-relaxed">
                            Erzurum'dan tüm Türkiye'ye uzanan hukuki deneyim. Haklarınızı korumak ve adalete ulaşmanız için yanınızdayız.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading text-xl font-bold mb-6 text-gold-400">Hızlı Erişim</h3>
                        <ul className="space-y-4 text-navy-100">
                            <li><Link href="/hakkimizda" className="hover:text-gold-400 transition">Hakkımızda</Link></li>
                            <li><Link href="/hizmetler" className="hover:text-gold-400 transition">Hizmetlerimiz</Link></li>
                            <li><Link href="/blog" className="hover:text-gold-400 transition">Blog & Makaleler</Link></li>
                            <li><Link href="/iletisim" className="hover:text-gold-400 transition">İletişim</Link></li>

                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-heading text-xl font-bold mb-6 text-gold-400">Çalışma Alanları</h3>
                        <ul className="space-y-4 text-navy-100">
                            <li><span className="text-navy-100 hover:text-gold-400 transition cursor-default">Ceza Hukuku</span></li>
                            <li><span className="text-navy-100 hover:text-gold-400 transition cursor-default">Aile Hukuku</span></li>
                            <li><span className="text-navy-100 hover:text-gold-400 transition cursor-default">İş Hukuku</span></li>
                            <li><span className="text-navy-100 hover:text-gold-400 transition cursor-default">Miras Hukuku</span></li>
                            <li><span className="text-navy-100 hover:text-gold-400 transition cursor-default">Tazminat Hukuku</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading text-xl font-bold mb-6 text-gold-400">İletişim</h3>
                        <ul className="space-y-4 text-navy-100">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
                                <span>Vaniefendi mahallesi, Haşılefendi caddesi<br />Akgül iş merkezi kat:4 no:11<br />25000 Yakutiye/Erzurum</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                                <a href="tel:05416255626" className="hover:text-white transition">0541 625 56 26</a>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                                <a href="mailto:info@komluhukuk.com" className="hover:text-white transition">info@komluhukuk.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-navy-600 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-navy-100">
                    <p>&copy; {new Date().getFullYear()} Komlu Hukuk Bürosu. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    )
}

function SocialLink({ icon: Icon, href }: { icon: any, href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-all"
        >
            <Icon className="w-5 h-5" />
        </a>
    )
}
