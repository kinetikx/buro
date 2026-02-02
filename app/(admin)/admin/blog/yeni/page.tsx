'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import BlogEditor from '@/components/blog/blog-editor'

const BlogEditor = dynamic(() => import('@/components/blog/blog-editor'), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-50 animate-pulse rounded-lg border border-gray-200" />,
})

interface Category {
    id: string
    name: string
}

export default function NewBlogPage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [status, setStatus] = useState('draft')
    const [metaTitle, setMetaTitle] = useState('')
    const [metaDesc, setMetaDesc] = useState('')

    const [categories, setCategories] = useState<Category[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        // Fetch categories
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Failed to fetch categories', err))
    }, [])

    const handleSave = async () => {
        if (!title || !content || !categoryId) {
            alert('Lütfen başlık, içerik ve kategori alanlarını doldurunuz.')
            return
        }

        setIsSubmitting(true)

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                    categoryId,
                    status,
                    metaTitle,
                    metaDesc
                })
            })

            if (!res.ok) throw new Error('Failed to create post')

            alert('Yazı başarıyla oluşturuldu!')
            router.push('/admin/blog')
        } catch (error) {
            console.error(error)
            alert('Yazı oluşturulurken bir hata oluştu.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/blog">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Geri Dön
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-navy-900">Yeni Yazı Ekle</h1>
            </div>

            <div className="grid gap-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Başlık</label>
                            <Input
                                placeholder="Yazı başlığı..."
                                className="text-lg font-bold"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">İçerik</label>
                            <BlogEditor content={content} onChange={setContent} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                            <h3 className="font-bold text-navy-900 border-b pb-2">Yayın Ayarları</h3>

                            <div>
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Seçiniz</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Durum</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="draft">Taslak</option>
                                    <option value="published">Yayında</option>
                                </select>
                            </div>

                            <div className="pt-4">
                                <Button onClick={handleSave} disabled={isSubmitting} className="w-full gap-2">
                                    <Save className="w-4 h-4" />
                                    {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                            <h3 className="font-bold text-navy-900 border-b pb-2">SEO Ayarları</h3>

                            <div>
                                <label className="block text-sm font-medium mb-1">Meta Başlık</label>
                                <Input
                                    placeholder="SEO başlığı..."
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Meta Açıklama</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Kısa açıklama..."
                                    value={metaDesc}
                                    onChange={(e) => setMetaDesc(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
