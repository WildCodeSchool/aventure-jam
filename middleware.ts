import { NextResponse, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/histoire/:path*/etape/:path*/", "/histoire/:path*/etape/:path*"],
};
