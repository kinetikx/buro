'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ImagePlus } from 'lucide-react'

interface ImageUploadProps {
    value?: string
    onChange: (value: string) => void
    onRemove: () => void
    disabled?: boolean
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
    disabled
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            if (data.url) {
                onChange(data.url)
            } else {
                alert('Yükleme hatası')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Yükleme sırasında hata oluştu')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4 w-full">
            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="secondary"
                    disabled={disabled || isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 flex flex-col gap-2"
                >
                    <ImagePlus className="w-6 h-6 text-gray-500" />
                    <span className="text-gray-500">
                        {isUploading ? 'Yükleniyor...' : 'Kapak Görseli Seç'}
                    </span>
                </Button>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    disabled={disabled || isUploading}
                />
            </div>

            {value && (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 group">
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            type="button"
                            onClick={onRemove}
                            variant="destructive"
                            size="sm"
                        >
                            Sil
                        </Button>
                    </div>
                    <Image
                        fill
                        src={value}
                        alt="Kapak Görseli"
                        className="object-cover"
                    />
                </div>
            )}
        </div>
    )
}
