import { getIronSession, SessionOptions } from "iron-session";
import { headers } from "next/headers";
import { getSessionSecret } from "./security";

export type SessionData = {
  userId: string;
  email: string;
  isLoggedIn: boolean;
};

function isSecureConnection(headersList: Headers): boolean {
  const proto = headersList.get("x-forwarded-proto");
  return proto === "https";
}

async function getOptions(): Promise<SessionOptions> {
  const headersList = await headers();
  const secure = isSecureConnection(headersList);
  return {
    password: getSessionSecret(),
    cookieName: "pt_admin_session",
    cookieOptions: {
      secure,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax" as const,
    },
  };
}

export async function getSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const opts = await getOptions();
  return getIronSession<SessionData>(cookieStore, opts);
}

export function getSessionOptionsForMiddleware(requestHeaders: Headers): SessionOptions {
  const proto = requestHeaders.get("x-forwarded-proto");
  const secure = proto === "https";
  return {
    password: getSessionSecret(),
    cookieName: "pt_admin_session",
    cookieOptions: {
      secure,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax" as const,
    },
  };
}
