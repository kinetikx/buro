import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllBlogPosts } from '@/lib/db'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default async function LatestBlog() {
    const { posts } = await getAllBlogPosts({ limit: 3 })

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-gold-600 font-medium uppercase tracking-wider text-sm mb-2 block">
                            Güncel Bilgiler
                        </span>
                        <h2 className="text-4xl font-bold text-navy-900 font-heading">
                            Hukuk Blogu & Haberler
                        </h2>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline" className="gap-2">
                            Tüm Yazıları Gör
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article key={post.id} className="group bg-navy-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                                <Link href={`/blog/${post.slug}`} className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors z-10" />
                                    {post.coverImage ? (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-navy-200 flex items-center justify-center text-navy-400">
                                            <span className="sr-only">{post.title} Görseli</span>
                                            Görsel Yok
                                        </div>
                                    )}
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="text-gold-600 font-medium bg-gold-100 px-2 py-1 rounded">
                                            {post.category.name}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {post.publishedAt && format(post.publishedAt, 'd MMMM yyyy', { locale: tr })}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-200">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-navy-600 font-medium hover:text-gold-600 transition-colors"
                                        >
                                            Devamını Oku
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            Henüz blog yazısı bulunmamaktadır.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
