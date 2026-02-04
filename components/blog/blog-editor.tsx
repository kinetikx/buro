'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from '@/components/ui/button'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Category {
    id: string
    name: string
}

export default function BlogEditor({
    content,
    onChange,
    categories = [],
    selectedCategoryIds = [],
    onCategoryChange
}: {
    content: string
    onChange: (html: string) => void
    categories?: Category[]
    selectedCategoryIds?: string[]
    onCategoryChange?: (ids: string[]) => void
}) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [openCombobox, setOpenCombobox] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] px-4 py-2',
            },
        },
    })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            if (data.url) {
                editor?.chain().focus().setImage({ src: data.url }).run()
            } else {
                alert('Yükleme hatası')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Yükleme sırasında hata oluştu')
        }
    }

    if (!editor) {
        return null
    }

    return (
        <div className="space-y-4">
            {/* Category Selector */}
            {onCategoryChange && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Kategoriler</label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCombobox}
                                className="justify-between w-full md:w-[300px]"
                            >
                                {selectedCategoryIds.length > 0
                                    ? `${selectedCategoryIds.length} kategori seçildi`
                                    : "Kategori seçin..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Kategori ara..." />
                                <CommandList>
                                    <CommandEmpty>Kategori bulunamadı.</CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((category) => (
                                            <CommandItem
                                                key={category.id}
                                                value={category.name}
                                                onSelect={() => {
                                                    const isSelected = selectedCategoryIds.includes(category.id)
                                                    const newIds = isSelected
                                                        ? selectedCategoryIds.filter(id => id !== category.id)
                                                        : [...selectedCategoryIds, category.id]
                                                    onCategoryChange(newIds)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedCategoryIds.includes(category.id) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {category.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCategoryIds.map(id => {
                            const cat = categories.find(c => c.id === id)
                            return cat ? (
                                <Badge key={id} variant="secondary" className="px-2 py-1">
                                    {cat.name}
                                    <button
                                        onClick={() => onCategoryChange(selectedCategoryIds.filter(cid => cid !== id))}
                                        className="ml-2 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            ) : null
                        })}
                    </div>
                </div>
            )}

            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        icon={Bold}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        icon={Italic}
                    />
                    <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        icon={List}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        icon={ListOrdered}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        icon={Quote}
                    />
                    <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
                    <ToolbarButton
                        onClick={() => {
                            const previousUrl = editor.getAttributes('link').href
                            const url = window.prompt('URL', previousUrl)
                            if (url === null) return
                            if (url === '') {
                                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                                return
                            }
                            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
                        }}
                        isActive={editor.isActive('link')}
                        icon={LinkIcon}
                    />
                    <ToolbarButton
                        onClick={() => {
                            const url = window.prompt('Görsel URL')
                            if (url) {
                                editor.chain().focus().setImage({ src: url }).run()
                            }
                        }}
                        isActive={false}
                        icon={ImageIcon}
                    />
                    <div className="relative inline-block">
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                        />
                        <ToolbarButton
                            onClick={() => fileInputRef.current?.click()}
                            isActive={false}
                            icon={Upload}
                        />
                    </div>
                    <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        isActive={false}
                        icon={Undo}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        isActive={false}
                        icon={Redo}
                    />
                </div>

                {/* Content */}
                <EditorContent editor={editor} className="p-4" />
            </div>
        </div>
    )
}

function ToolbarButton({ onClick, isActive, icon: Icon }: { onClick: () => void, isActive: boolean, icon: any }) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            className={cn(
                "p-2 rounded hover:bg-gray-200 transition-colors",
                isActive ? "bg-gray-200 text-navy-900" : "text-gray-600"
            )}
            type="button"
        >
            <Icon className="w-4 h-4" />
        </button>
    )
}
