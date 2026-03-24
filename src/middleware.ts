import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { getSessionOptionsForMiddleware } from "@/lib/session";
import type { SessionData } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin/login" || path === "/admin/setup") {
    return NextResponse.next();
  }

  if (path.startsWith("/admin")) {
    const res = NextResponse.next();
    const opts = getSessionOptionsForMiddleware(request.headers);
    const session = await getIronSession<SessionData>(request, res, opts);
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
