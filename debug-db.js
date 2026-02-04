
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const count = await prisma.blogPost.count();
        console.log(`Successfully connected. Total blog posts found: ${count}`);

        if (count > 0) {
            const posts = await prisma.blogPost.findMany({ select: { slug: true, title: true } });
            console.log('Posts:', JSON.stringify(posts, null, 2));
        }
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
