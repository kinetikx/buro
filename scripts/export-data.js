/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    console.log('Veriler dışa aktarılıyor...')

    const users = await prisma.user.findMany()
    const categories = await prisma.category.findMany()
    const tags = await prisma.tag.findMany()
    const posts = await prisma.blogPost.findMany({
        include: {
            categories: true,
            tags: true,
        }
    })
    const contactMessages = await prisma.contactMessage.findMany()
    const siteSettings = await prisma.siteSettings.findMany()

    const data = {
        users,
        categories,
        tags,
        posts,
        contactMessages,
        siteSettings
    }

    const outputPath = path.join(__dirname, '../prisma/data.json')
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    console.log(`Veriler ${outputPath} konumuna kaydedildi.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
