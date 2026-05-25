import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Middleware berjalan di server, jadi kita baca cookie "token"
  // (bukan localStorage karena middleware tidak bisa akses localStorage)
  const token = request.cookies.get("token");

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  // BELUM LOGIN → paksa ke /login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // SUDAH LOGIN → jangan bisa akses /login atau /register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
