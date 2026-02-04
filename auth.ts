import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/db"
import { z } from "zod"

import { loginRateLimiter } from "@/lib/rate-limit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/admin/giris',
        error: '/admin/giris', // Error code passed in query string as ?error=
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                // Whitelist Logic
                // Load allowed emails from .env (comma separated)
                const allowedEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim())

                const email = user.email || ''

                if (allowedEmails.includes(email)) {
                    // Start: Create or Update user in DB for sync
                    try {
                        const existingUser = await prisma.user.findUnique({ where: { email } })
                        if (!existingUser) {
                            // Create new admin user from Google
                            await prisma.user.create({
                                data: {
                                    email,
                                    name: user.name || 'Admin',
                                    passwordHash: '', // No password for OAuth users
                                    role: 'ADMIN',
                                }
                            })
                        }
                    } catch (err) {
                        console.error("Error creating user from Google Auth", err)
                        return false
                    }
                    return true
                }

                return false // Deny access
            }
            return true // Allow credentials login (logic handled in authorize)
        },
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
