import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function DELETE(
    request: Request, // Fix: Use correct signature for Next.js 15 route handlers if needed, but context is usually 2nd arg
    { params }: { params: Promise<{ id: string }> } // Params needs to be awaited in Next 15
) {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = await params

    try {
        await prisma.contactMessage.delete({
            where: { id }
        })
        return new NextResponse(null, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
