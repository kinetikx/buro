import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/db"
import { z } from "zod"

import { loginRateLimiter } from "@/lib/rate-limit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email as string
                const password = credentials?.password as string

                if (!email || !password) return null

                // 1. Check if email is allowed
                const defaultEmails = "yavuzselim252009@gmail.com,ahmetbugrakomlu@gmail.com"
                const allowedEmails = (process.env.ADMIN_EMAILS || defaultEmails).split(',').map(e => e.trim())
                if (!allowedEmails.includes(email)) {
                    console.log("Email not allowed:", email)
                    return null
                }

                // 2. Check password
                const envPassword = process.env.ADMIN_PASSWORD
                if (!envPassword || password !== envPassword) {
                    console.log("Invalid password")
                    return null
                }

                // 3. Find or Create User in DB
                try {
                    let user = await prisma.user.findUnique({ where: { email } })

                    if (!user) {
                        // Create new admin user
                        user = await prisma.user.create({
                            data: {
                                email,
                                name: 'Admin',
                                role: 'ADMIN',
                                passwordHash: '', // Not used for this simple auth
                            }
                        })
                    }
                    return user as any
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/admin/giris',
        error: '/admin/giris',
    },
    callbacks: {
        // signIn callback removed as authorize handles validation

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            // For Google login, we need to fetch role from DB if it's not present (on subsequent sessions)
            if (!token.role && token.email) {
                const dbUser = await prisma.user.findUnique({ where: { email: token.email } })
                if (dbUser) {
                    token.role = dbUser.role
                    token.id = dbUser.id
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as any;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
