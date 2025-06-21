import NextAuth, { type NextAuthRequest } from 'next-auth'

import { NextResponse } from 'next/server'
import authConfig from './auth.config'

const { auth } = NextAuth({ ...authConfig })

export default auth(async (req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname
  // middleware
  try {
    if (pathname.startsWith('/login')) {
      if (req.auth) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
      }
    }

    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    if (pathname.startsWith('/dashboard')) {
      if (!req.auth) {
        return NextResponse.redirect(
          new URL(`/login?callback=${pathname}`, req.nextUrl)
        )
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.next()
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
