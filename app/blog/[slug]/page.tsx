import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogPosts } from '@/lib/db'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Calendar, Clock, User, Tag as TagIcon, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export async function generateMetadata({
    params
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = await getBlogPost(params.slug)

    if (!post) {
        return {
            title: 'Yazı Bulunamadı',
        }
    }

    return {
        title: post.metaTitle || post.title,
        description: post.metaDesc || post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author.name || 'Komlu Hukuk' }],
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDesc || post.excerpt || '',
            images: [post.coverImage || '/images/default-blog.jpg'],
            type: 'article',
            publishedTime: post.publishedAt?.toISOString(),
            authors: [post.author.name || 'Komlu Hukuk'],
        },
    }
}

export async function generateStaticParams() {
    try {
        const { posts } = await getAllBlogPosts({ limit: 100 })
        if (!posts) return []
        return posts.map((post) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.warn('Could not generate static params for blog posts:', error)
        return []
    }
}

export default async function BlogPostPage({
    params
}: {
    params: { slug: string }
}) {
    const post = await getBlogPost(params.slug)

    if (!post) {
        // For demo/dev purposes if DB is empty, show a mock instead of 404
        // In production this should be notFound()
        // return notFound() 
        return (
            <main className="min-h-screen pt-20">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Demo Modu: Veri Bulunamadı</h1>
                    <p className="mb-8">Veritabanı henüz bağlı değil veya bu slug için yazı yok.</p>
                    <Link href="/blog" className="text-blue-500 hover:underline">Blog Listesine Dön</Link>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <article className="min-h-screen pt-20">
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Navigation */}
                <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-navy-900 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Blog'a Dön
                </Link>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                        <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full font-medium">
                            {post.category.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.publishedAt ? format(post.publishedAt, 'd MMMM yyyy', { locale: tr }) : 'Tarih Yok'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} dk okuma
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-heading text-navy-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {post.author.name[0]}
                        </div>
                        <div>
                            <div className="font-bold text-navy-900">{post.author.name}</div>
                            <div className="text-sm text-gray-600">Avukat</div>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-a:text-gold-600 hover:prose-a:text-gold-500 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag.id}
                                href={`/blog?etiket=${tag.slug}`}
                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <TagIcon className="w-3 h-3" />
                                {tag.name}
                            </Link>
                        ))}
                    </div>
                )}

            </div>

            <Footer />
        </article>
    )
}
