import { PrismaClient } from '@prisma/client';
import { cache } from 'react';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Data Fetching Helpers with Cache
export const getAllBlogPosts = cache(async (options?: {
    page?: number,
    limit?: number,
    category?: string
}) => {
    const page = options?.page || 1
    const limit = options?.limit || 10
    const categorySlug = options?.category

    const where = categorySlug ? {
        categories: { some: { slug: categorySlug } },
        published: true,
    } : {
        published: true,
    }

    try {
        const posts = await prisma.blogPost.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                author: true,
                categories: true,
                tags: true,
            },
            orderBy: { publishedAt: 'desc' },
        })

        const total = await prisma.blogPost.count({ where })

        return {
            posts,
            totalPages: Math.ceil(total / limit),
            total
        }
    } catch (error) {
        console.error('Database Error:', error)
        // Return empty if DB not connected
        return { posts: [], totalPages: 0, total: 0 }
    }
})

export const getBlogPost = cache(async (slug: string) => {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: {
                author: true,
                categories: true,
                tags: true,
            },
        })
        return post
    } catch (error) {
        return null
    }
})

export const getCategories = cache(async () => {
    try {
        return await prisma.category.findMany()
    } catch (error) {
        return []
    }
})
