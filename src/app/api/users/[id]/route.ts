import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
    }

    const { id } = await params;

    if (id === session.userId) {
      return NextResponse.json(
        { error: "Nie możesz usunąć swojego konta z tego poziomu." },
        { status: 400 },
      );
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[users DELETE]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
