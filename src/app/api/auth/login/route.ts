import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateEmail, validatePassword } from "@/lib/security";
import { checkLoginRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const rateCheck = checkLoginRateLimit(request);
    if (!rateCheck.ok) {
      return NextResponse.json(
        {
          error: `Zbyt wiele prób logowania. Spróbuj ponownie za ${rateCheck.retryAfter} sekund.`,
        },
        { status: 429, headers: { "Retry-After": String(rateCheck.retryAfter) } },
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

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło." },
        { status: 401 },
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło." },
        { status: 401 },
      );
    }

    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[auth/login]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
