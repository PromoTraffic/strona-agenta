"use client";

/**
 * Nagłówek do wklejenia w inne narzędzia (PROduct GEN, MediaPulse itd.)
 *
 * INSTRUKCJA:
 * 1. Skopiuj ten plik do projektu narzędzia
 * 2. Upewnij się, że masz Tailwind z kolorami:
 *    --pt-black, --pt-yellow, --pt-muted, --pt-light, --pt-surface, --pt-border
 * 3. Ustaw zmienne środowiskowe:
 *    - NEXT_PUBLIC_TOOLS_JSON (lista narzędzi - ten sam JSON co na stronie agenta)
 *    - NEXT_PUBLIC_LANDING_URL (URL strony agenta, np. https://agent.promotraffic.pl)
 * 4. Użyj: <PromoTrafficAppHeader user={user} /> w layoutcie
 */

import Link from "next/link";

type Tool = { id: string; name: string; description: string; url: string };

function parseToolsFromEnv(): Tool[] {
  const raw = process.env.NEXT_PUBLIC_TOOLS_JSON?.trim();
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw) as unknown[];
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((o): o is Record<string, unknown> => o && typeof o === "object")
      .map((o) => ({
        id: String(o.id ?? "").trim() || "?",
        name: String(o.name ?? "").trim() || "?",
        description: String(o.description ?? "").trim(),
        url: String(o.url ?? "").trim(),
      }))
      .filter((t) => t.id && t.name);
  } catch {
    return [];
  }
}

function getLandingUrl(): string {
  return process.env.NEXT_PUBLIC_LANDING_URL?.trim() || "/";
}

type PromoTrafficAppHeaderProps = {
  /** Email zalogowanego użytkownika (opcjonalnie) */
  user?: { email: string } | null;
  /** Callback przy wylogowaniu (opcjonalnie) */
  onLogout?: () => void;
  /** URL do głównej strony agenta (nadpisuje env) */
  landingUrl?: string;
};

export function PromoTrafficAppHeader({
  user,
  onLogout,
  landingUrl,
}: PromoTrafficAppHeaderProps) {
  const tools = parseToolsFromEnv();
  const baseUrl = landingUrl || getLandingUrl();
  const allToolsHref = baseUrl + (baseUrl.endsWith("/") ? "" : "/") + "#narzedzia";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--pt-border,#5d6062)]/30 bg-[var(--pt-black,#0f0f0f)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href={baseUrl}
            className="text-lg font-semibold tracking-tight text-white transition hover:text-[var(--pt-yellow,#ffd500)] focus:outline focus:outline-2 focus:outline-offset-4"
          >
            PromoTraffic
          </Link>
          <Link
            href={`${baseUrl}/admin`}
            className="rounded-lg border border-[var(--pt-yellow,#ffd500)] px-3 py-1.5 text-sm font-medium text-[var(--pt-yellow,#ffd500)] transition hover:bg-[var(--pt-yellow,#ffd500)]/10 focus:outline focus:outline-2 focus:outline-offset-2"
          >
            Panel główny
          </Link>
          <ToolsDropdown tools={tools} allToolsHref={allToolsHref} />
        </div>
        <div className="flex items-center gap-4">
          {user?.email && (
            <span className="text-sm text-[var(--pt-muted,#8f9599)]">
              {user.email}
            </span>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-[var(--pt-border,#5d6062)] px-3 py-1.5 text-sm text-[var(--pt-light,#c1cacf)] transition hover:border-white hover:text-white focus:outline focus:outline-2 focus:outline-offset-2"
            >
              Wyloguj
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function ToolsDropdown({
  tools,
  allToolsHref,
}: {
  tools: Tool[];
  allToolsHref: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg border border-[var(--pt-yellow,#ffd500)] px-3 py-1.5 text-sm font-medium text-[var(--pt-yellow,#ffd500)] transition hover:bg-[var(--pt-yellow,#ffd500)]/10 focus:outline focus:outline-2 focus:outline-offset-2"
        aria-haspopup="true"
        aria-label="Narzędzia w ekosystemie"
      >
        Narzędzia
        <ChevronIcon className="h-4 w-4" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-[var(--pt-border,#5d6062)]/60 bg-[var(--pt-black,#0f0f0f)] py-1 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="max-h-[min(60vh,400px)] overflow-y-auto" role="menu">
          <li className="border-b border-[var(--pt-border,#5d6062)]/40" role="none">
            <Link
              href={allToolsHref}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-medium text-[var(--pt-yellow,#ffd500)] transition hover:bg-[var(--pt-surface,#1c1c1c)] focus:outline-none"
            >
              Wszystkie narzędzia
            </Link>
          </li>
          {tools.map((tool) => (
            <li key={tool.id} role="none">
              {tool.url ? (
                <Link
                  href={tool.url}
                  role="menuitem"
                  target={tool.url.startsWith("http") ? "_blank" : undefined}
                  rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block px-4 py-2.5 text-sm text-[var(--pt-light,#c1cacf)] transition hover:bg-[var(--pt-surface,#1c1c1c)] hover:text-white focus:outline-none"
                >
                  {tool.name}
                </Link>
              ) : (
                <span className="block cursor-default px-4 py-2.5 text-sm text-[var(--pt-muted,#8f9599)]">
                  {tool.name} <span className="text-xs">(wkrótce)</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
