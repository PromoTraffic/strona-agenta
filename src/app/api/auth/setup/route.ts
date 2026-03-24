import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateEmail, validatePassword } from "@/lib/security";

/** Tworzy pierwszego użytkownika — dostępne tylko gdy nie ma żadnego użytkownika. */
export async function POST(request: Request) {
  try {
    const count = await prisma.user.count();
    if (count > 0) {
      return NextResponse.json(
        { error: "Setup już wykonany. Użyj logowania." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    const emailCheck = validateEmail(email);
    if (!emailCheck.ok) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }
    const passCheck = validatePassword(password);
    if (!passCheck.ok) {
      return NextResponse.json({ error: passCheck.error }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash },
    });

    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[auth/setup]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
