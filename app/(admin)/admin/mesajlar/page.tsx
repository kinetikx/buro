'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Trash, Mail, CheckCircle, Circle, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
    id: string
    name: string
    email: string
    phone: string | null
    subject: string
    message: string
    isRead: boolean
    createdAt: string
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages')
            const data = await res.json()
            setMessages(data)
        } catch (error) {
            console.error('Failed to fetch messages', error)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleRead = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/messages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isRead: !currentStatus })
            })
            if (res.ok) {
                setMessages(messages.map(m => m.id === id ? { ...m, isRead: !currentStatus } : m))
            }
        } catch (error) {
            console.error('Error updating status', error)
        }
    }

    const deleteMessage = async (id: string) => {
        if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return

        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id))
            }
        } catch (error) {
            console.error('Error deleting message', error)
        }
    }

    if (isLoading) return <div className="p-8 text-center">Yükleniyor...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-navy-900">Gelen Mesajlar</h1>
                <div className="text-sm text-gray-500">
                    Toplam {messages.length} mesaj
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        Henüz mesaj bulunmamaktadır.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-6 transition-colors hover:bg-gray-50 ${!msg.isRead ? 'bg-blue-50/50' : ''}`}
                            >
                                <div className="flex flex-col lg:flex-row gap-4 lg:items-start justify-between">
                                    <div className="space-y-2 flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-navy-900 text-lg">{msg.subject}</h3>
                                            {!msg.isRead && (
                                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                                    Yeni
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-400 ml-auto lg:ml-0">
                                                {format(new Date(msg.createdAt), 'd MMMM yyyy HH:mm', { locale: tr })}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {msg.name}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                <a href={`mailto:${msg.email}`} className="hover:text-gold-600 underline">
                                                    {msg.email}
                                                </a>
                                            </div>
                                            {msg.phone && (
                                                <div className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    <a href={`tel:${msg.phone}`} className="hover:text-gold-600">
                                                        {msg.phone}
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-700 bg-white border border-gray-100 p-4 rounded-lg">
                                            {msg.message}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0 self-start lg:self-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleRead(msg.id, msg.isRead)}
                                            title={msg.isRead ? "Okunmadı olarak işaretle" : "Okundu olarak işaretle"}
                                        >
                                            {msg.isRead ? <Circle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteMessage(msg.id)}
                                            title="Sil"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
