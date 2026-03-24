import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import type { SessionData } from "@/lib/session";

function getSessionOptions() {
  const secret = process.env.SESSION_SECRET?.trim();
  if (process.env.NODE_ENV === "production" && (!secret || secret.length < 32)) {
    throw new Error("SESSION_SECRET wymagany w produkcji (min. 32 znaki)");
  }
  return {
    password: secret || "dev-secret-min-32-characters-long!!",
    cookieName: "pt_admin_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax" as const,
    },
  };
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin/login" || path === "/admin/setup") {
    return NextResponse.next();
  }

  if (path.startsWith("/admin")) {
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(request, res, getSessionOptions());
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
