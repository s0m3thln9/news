import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)

  const pathname = request.nextUrl.pathname
  headers.set("x-pathname", pathname)

  return NextResponse.next({ headers })
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
