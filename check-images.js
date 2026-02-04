const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const posts = await prisma.blogPost.findMany({
        select: {
            id: true,
            title: true,
            coverImage: true,
        }
    })
    console.log(JSON.stringify(posts, null, 2))
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
