import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('admin123', 12)

    const user = await prisma.user.upsert({
        where: { email: 'admin@komluhukuk.com' },
        update: {},
        create: {
            email: 'admin@komluhukuk.com',
            name: 'Kürşat Komlu',
            passwordHash: password,
            role: 'ADMIN',
        },
    })

    console.log({ user })

    const categories = [
        'Aile Hukuku',
        'Ceza Hukuku',
        'İş Hukuku',
        'Miras Hukuku',
        'Gayrimenkul Hukuku',
        'İcra ve İflas Hukuku',
        'Sigorta Hukuku',
        'Tazminat Hukuku',
        'Vergi Hukuku'
    ]

    const slugify = (text: string) => text
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/İ/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    for (const cat of categories) {
        const slug = slugify(cat)
        await prisma.category.upsert({
            where: { name: cat },
            update: { slug },
            create: {
                name: cat,
                slug,
            },
        })
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
