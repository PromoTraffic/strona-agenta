import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getContent, setContent, type ContentKey } from "@/lib/content";
import { validateContentSize, isSafeUrl } from "@/lib/security";

const VALID_KEYS: ContentKey[] = ["hero", "about", "benefits", "footer", "tools"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key") as ContentKey | null;
    if (key && VALID_KEYS.includes(key)) {
      const value = await getContent(key);
      return NextResponse.json(value);
    }
    return NextResponse.json(
      { error: "Nieprawidłowy klucz." },
      { status: 400 },
    );
  } catch (e) {
    console.error("[content GET]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
    }

    const body = await request.json();
    const key = typeof body.key === "string" ? body.key : "";
    const value = body.value;

    if (!VALID_KEYS.includes(key as ContentKey)) {
      return NextResponse.json(
        { error: "Nieprawidłowy klucz." },
        { status: 400 },
      );
    }

    if (value === undefined) {
      return NextResponse.json(
        { error: "Brak wartości." },
        { status: 400 },
      );
    }

    const bodyStr = JSON.stringify(value);
    const sizeCheck = validateContentSize(bodyStr);
    if (!sizeCheck.ok) {
      return NextResponse.json({ error: sizeCheck.error }, { status: 413 });
    }

    // Walidacja URL-i w narzędziach
    if (key === "tools" && Array.isArray(value)) {
      for (const tool of value) {
        const url = tool?.url;
        if (typeof url === "string" && url.trim() && !isSafeUrl(url)) {
          return NextResponse.json(
            { error: "Nieprawidłowy lub niebezpieczny URL w narzędziu." },
            { status: 400 },
          );
        }
      }
    }

    // Walidacja URL w stopce
    if (key === "footer" && value && typeof value.primarySiteUrl === "string") {
      if (value.primarySiteUrl.trim() && !isSafeUrl(value.primarySiteUrl)) {
        return NextResponse.json(
          { error: "Nieprawidłowy lub niebezpieczny URL w stopce." },
          { status: 400 },
        );
      }
    }

    await setContent(key as ContentKey, value);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[content PUT]", e);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 },
    );
  }
}
