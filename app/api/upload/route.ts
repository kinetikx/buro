import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { mkdir } from 'fs/promises'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), 'public/uploads/blog')
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Ignore if exists
        }

        // Create unique filename
        const filename = `blog-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const path = join(uploadDir, filename)

        // Write file
        await writeFile(path, buffer)

        return NextResponse.json({
            url: `/uploads/blog/${filename}`,
            success: true
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
