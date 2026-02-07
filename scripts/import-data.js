/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    const dataPath = path.join(__dirname, '../prisma/data.json')
    if (!fs.existsSync(dataPath)) {
        console.error('HATA: prisma/data.json bulunamadı. Önce export işlemini yapın.')
        process.exit(1)
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    console.log('Veriler içe aktarılıyor... (Sayısı: ' + data.posts.length + ' yazı)')

    // Import Users
    for (const user of data.users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                ...user,
                posts: undefined
            }
        })
    }

    // Import Categories
    for (const cat of data.categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: {
                ...cat,
                posts: undefined
            }
        })
    }

    // Import Tags
    for (const tag of data.tags) {
        await prisma.tag.upsert({
            where: { slug: tag.slug },
            update: {},
            create: {
                ...tag,
                posts: undefined
            }
        })
    }

    // Import SiteSettings
    for (const setting of data.siteSettings) {
        await prisma.siteSettings.upsert({
            where: { id: setting.id },
            update: setting,
            create: setting
        })
    }

    // Import ContactMessages
    for (const msg of data.contactMessages) {
        await prisma.contactMessage.upsert({
            where: { id: msg.id },
            update: {},
            create: msg
        })
    }

    // Import Posts
    for (const post of data.posts) {
        const { categories, tags, authorId, ...postData } = post

        try {
            await prisma.blogPost.upsert({
                where: { slug: postData.slug },
                update: {
                    ...postData,
                    author: { connect: { id: authorId } },
                    categories: {
                        connect: categories.map(c => ({ id: c.id }))
                    },
                    tags: {
                        connect: tags.map(t => ({ id: t.id }))
                    }
                },
                create: {
                    ...postData,
                    author: { connect: { id: authorId } },
                    categories: {
                        connect: categories.map(c => ({ id: c.id }))
                    },
                    tags: {
                        connect: tags.map(t => ({ id: t.id }))
                    }
                }
            })
        } catch (err) {
            console.error(`Hata: ${postData.title} eklenemedi.`, err.message)
        }
    }

    console.log('Veri aktarımı tamamlandı!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
