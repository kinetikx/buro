import NextAuth from "next-auth"
import { auth } from "@/auth"

export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = nextUrl.pathname === '/admin/giris'

  // Allow API auth routes
  if (isApiAuthRoute) {
    return
  }

  // Redirect logged-in users away from login page
  if (isLoginRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/admin/blog', nextUrl)) // Redirect to dashboard/blog
    }
    return
  }

  // Protect Admin Routes
  if (isAdminRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    return Response.redirect(new URL(`/admin/giris?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl))
  }
})
