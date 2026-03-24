import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateEmail, validatePassword } from "@/lib/security";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(users);
  } catch (e) {
    console.error("[users GET]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
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

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Użytkownik z tym adresem email już istnieje." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, passwordHash },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[users POST]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
