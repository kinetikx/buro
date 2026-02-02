import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Search, Tag as TagIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllBlogPosts, getCategories } from '@/lib/db'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export const metadata: Metadata = {
    title: 'Blog & Hukuki Makaleler | Komlu Hukuk Bürosu',
    description: 'Güncel hukuki gelişmeler, pratik bilgiler ve emsal karar incelemeleri.',
}

interface BlogPageProps {
    searchParams: {
        page?: string
        category?: string
    }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const page = Number(searchParams.page) || 1
    const categorySlug = searchParams.category

    const [postsData, categoriesData] = await Promise.all([
        getAllBlogPosts({ page, limit: 10, category: categorySlug }),
        getCategories()
    ])

    // Custom sort order
    const customOrder = ['Sigorta Hukuku', 'İcra ve İflas Hukuku', 'Tazminat Hukuku']
    const categories = categoriesData.sort((a, b) => {
        const indexA = customOrder.indexOf(a.name)
        const indexB = customOrder.indexOf(b.name)

        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return a.name.localeCompare(b.name)
    })

    const { posts, totalPages, total } = postsData

    return (
        <main className="min-h-screen pt-20">
            <Header />

            <section className="bg-navy-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold font-heading text-navy-900 mb-4">
                        Hukuk Blogu
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Hukuki konularda merak ettikleriniz, güncel yargıtay kararları ve bilgilendirici makaleler.
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <Input
                            placeholder="Hangi konuda bilgi arıyorsunuz?"
                            className="pl-12 h-14 rounded-full shadow-sm bg-white"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar */}
                        <aside className="lg:w-1/4">
                            <div className="sticky top-24 space-y-8">
                                <div>
                                    <h3 className="font-bold text-navy-900 mb-4 text-lg">Kategoriler</h3>
                                    <div className="flex flex-wrap lg:flex-col gap-2">
                                        <Link
                                            href="/blog"
                                            className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!categorySlug ? 'bg-navy-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            Tümü
                                        </Link>
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/blog?category=${cat.slug}`}
                                                className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${categorySlug === cat.slug ? 'bg-navy-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="lg:w-3/4">
                            <div className="grid md:grid-cols-2 gap-8">
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <article key={post.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                                            <Link href={`/blog/${post.slug}`} className="relative h-48 bg-gray-200 block">
                                                {post.coverImage ? (
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-navy-50">
                                                        <span className="text-sm">Görsel Yok</span>
                                                    </div>
                                                )}
                                            </Link>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
                                                        {post.category.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {post.publishedAt && format(post.publishedAt, 'd MMMM yyyy', { locale: tr })}
                                                    </span>
                                                </div>

                                                <h2 className="text-xl font-bold text-navy-900 mb-3 hover:text-navy-700 transition-colors line-clamp-2">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        {post.title}
                                                    </Link>
                                                </h2>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {post.tags.slice(0, 2).map((tag) => (
                                                            <span key={tag.id} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                                                                <TagIcon className="w-3 h-3" />
                                                                {tag.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <Link href={`/blog/${post.slug}`} className="text-navy-600 hover:text-gold-600 transition-colors text-sm font-medium flex items-center gap-1">
                                                        Oku <ArrowRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <p className="text-gray-500 text-lg">Bu kategoride henüz yazı bulunmamaktadır.</p>
                                        {categorySlug && (
                                            <Link href="/blog" className="text-gold-600 hover:underline mt-2 inline-block">
                                                Tüm yazıları gör
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    <Link href={`/blog?page=${page - 1}${categorySlug ? `&category=${categorySlug}` : ''}`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={page <= 1}
                                        >
                                            Önceki
                                        </Button>
                                    </Link>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <Link key={p} href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}`}>
                                            <Button
                                                variant={p === page ? "primary" : "outline"}
                                                size="sm"
                                            >
                                                {p}
                                            </Button>
                                        </Link>
                                    ))}

                                    <Link href={`/blog?page=${page + 1}${categorySlug ? `&category=${categorySlug}` : ''}`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={page >= totalPages}
                                        >
                                            Sonraki
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
