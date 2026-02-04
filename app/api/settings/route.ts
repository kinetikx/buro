import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET: Fetch settings
export async function GET() {
    try {
        const settings = await prisma.siteSettings.findFirst()
        return NextResponse.json(settings || {})
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// POST: Update settings
export async function POST(request: Request) {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const { id, ...data } = body

        // Upsert: update if exists, create if not
        const settings = await prisma.siteSettings.upsert({
            where: { id: id || 'default' }, // Use a fixed ID or provided ID
            update: data,
            create: data,
        })

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Settings Update Error", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
