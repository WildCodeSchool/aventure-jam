import { NextRequest, NextResponse } from "next/server";

const PAGE_PROTECTED_PATHS = [/^\/histoire\/[1-9]$/, /^\/histoire\/[1-9]\/etape\/\d+$/];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userToken = request.cookies.get("user-token");

  const isProtected = PAGE_PROTECTED_PATHS.some((path) =>
    typeof path === "string" ? pathname === path : path.test(pathname)
  );

  if (isProtected && !userToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/histoire/:path*/etape/:path*/", "/histoire/:path*"],
};
