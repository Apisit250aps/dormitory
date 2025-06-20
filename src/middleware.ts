import NextAuth from 'next-auth'
import { authConfig } from './config'
import { NextResponse } from 'next/server';

const { auth } = NextAuth({ ...authConfig })

export default auth(async () => {
  // req.auth

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
