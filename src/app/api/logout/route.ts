import { NextRequest, NextResponse } from 'next/server'

import { destruirSessao } from '@/services/auth'

export function GET(req: NextRequest) {
  destruirSessao()
  const loginURL = new URL('/login', req.url)
  return NextResponse.redirect(loginURL)
}
