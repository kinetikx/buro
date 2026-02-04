import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET: Fetch all messages
export async function GET() {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(messages)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// PUT: Mark as read
export async function PUT(request: Request) {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { id, isRead } = await request.json()
        const message = await prisma.contactMessage.update({
            where: { id },
            data: { isRead }
        })
        return NextResponse.json(message)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
