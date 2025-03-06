import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = [
    "/"
]

const publicRoutes = ["/login", "/signup", "/forgotpassword"]

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const tokenExp = request.cookies.get("token_exp")?.value || null
    const isAuthenticated = tokenExp && new Date(tokenExp) > new Date()

    // Protected routes check
    if (protectedRoutes.includes(path)) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    // Public routes check
    if (publicRoutes.includes(path) && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [...protectedRoutes, ...publicRoutes]
}
