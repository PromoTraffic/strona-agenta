import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();
    session.userId = "";
    session.email = "";
    session.isLoggedIn = false;
    await session.save();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[auth/logout]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
