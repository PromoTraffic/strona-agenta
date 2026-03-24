import { getIronSession, SessionOptions } from "iron-session";
import { getSessionSecret } from "./security";

export type SessionData = {
  userId: string;
  email: string;
  isLoggedIn: boolean;
};

function getOptions(): SessionOptions {
  return {
    password: getSessionSecret(),
  cookieName: "pt_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax" as const,
  },
  };
}

export async function getSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, getOptions());
}
