// middleware.ts (đặt ở root project)
import { NextRequest, NextResponse } from "next/server";
import { routes, navigationItems } from "./route";

const PROTECTED_ROUTES = navigationItems.map((item) => item.href);

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refresh_Token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = pathname.startsWith(routes.login);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(routes.login, req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(routes.dashboard, req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*"],
};