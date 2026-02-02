'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface BlogPost {
    id: string
    title: string
    category: { name: string }
    status: 'published' | 'draft'
    published: boolean
    createdAt: string
}

export default function BlogManagementPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchPosts = () => {
        setLoading(true)
        fetch('/api/blog?limit=100') // Fetch all for now
            .then(res => res.json())
            .then(data => {
                if (data.posts) {
                    setPosts(data.posts)
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id))
            } else {
                alert('Silme işlemi başarısız.')
            }
        } catch (error) {
            console.error(error)
            alert('Silme işlemi sırasında hata oluştu.')
        }
    }

    const filteredPosts = posts.filter(post => {
        const status = post.published ? 'published' : 'draft'
        const matchesFilter = filter === 'all' || status === filter
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-navy-900">Blog Yazıları</h1>
                <Link href="/admin/blog/yeni">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Yeni Yazı Ekle
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Yazı ara..."
                        className="pl-10 bg-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                >
                    <option value="all">Tümü</option>
                    <option value="published">Yayında</option>
                    <option value="draft">Taslak</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Başlık</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Durum</th>
                            <th className="px-6 py-4">Tarih</th>
                            <th className="px-6 py-4 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center">Yükleniyor...</td></tr>
                        ) : filteredPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-navy-900">{post.title}</td>
                                <td className="px-6 py-4">{post.category?.name || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2 py-1 rounded text-xs font-medium",
                                        post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                    )}>
                                        {post.published ? 'Yayında' : 'Taslak'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/blog/duzenle/${post.id}`}>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Düzenle">
                                                <Edit className="w-4 h-4 text-blue-600" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            title="Sil"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!loading && filteredPosts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Yazı bulunamadı.
                    </div>
                )}
            </div>
        </div>
    )
}
