import { NextRequest, NextResponse } from 'next/server'

import { sessaoEValida } from '@/services/auth'

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

const rotasPublicas = ['/login', '/cadastro']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const sessao = await sessaoEValida()
  if (!rotasPublicas.includes(pathname) && !sessao) {
    const loginURL = new URL('/login', req.url)
    return NextResponse.redirect(loginURL)
  }

  return NextResponse.next()
}
