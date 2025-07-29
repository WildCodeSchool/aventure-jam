import { NextRequest, NextResponse } from "next/server";

const PAGE_PROTECTED_PATHS = [/^\/histoire\/\d+\/etape\/\d+$/];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  const isProtected = PAGE_PROTECTED_PATHS.some((path) =>
    typeof path === "string" ? pathname === path : path.test(pathname)
  );

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/histoire/:path*/etape/:path*/", "/histoire/:path*"],
};
