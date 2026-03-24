"use client";

import Link from "next/link";
import type { Tool } from "@/lib/tools";

type ToolsNavDropdownProps = {
  tools: Tool[];
  /** Wariant stylu: 'header' (żółty przycisk) lub 'admin' (tekst z obramowaniem) */
  variant?: "header" | "admin";
};

export function ToolsNavDropdown({ tools, variant = "header" }: ToolsNavDropdownProps) {
  const triggerClass =
    variant === "header"
      ? "inline-flex items-center gap-1 rounded-md bg-pt-yellow px-3 py-1.5 font-medium text-pt-black-deep transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-yellow"
      : "inline-flex items-center gap-1 rounded-lg border border-pt-yellow px-3 py-1.5 text-sm font-medium text-pt-yellow transition hover:bg-pt-yellow/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow";

  return (
    <div className="group relative">
      <button
        type="button"
        className={triggerClass}
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="Narzędzia w ekosystemie"
      >
        Narzędzia
        <ChevronDownIcon className="h-4 w-4 shrink-0" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-pt-border/60 bg-pt-black py-1 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {tools.length === 0 ? (
          <div className="px-4 py-3 text-sm text-pt-muted">Brak skonfigurowanych narzędzi</div>
        ) : (
          <ul className="max-h-[min(60vh,400px)] overflow-y-auto" role="menu">
            {tools.length > 0 && (
              <li className="border-b border-pt-border/40" role="none">
                <Link
                  href="/#narzedzia"
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm font-medium text-pt-yellow transition hover:bg-pt-surface focus:bg-pt-surface focus:outline-none"
                >
                  Wszystkie narzędzia
                </Link>
              </li>
            )}
            {tools.map((tool) => {
              const hasUrl = Boolean(tool.url);
              const isExternal = hasUrl && /^https?:\/\//i.test(tool.url);

              return (
                <li key={tool.id} role="none">
                  {hasUrl ? (
                    <Link
                      href={tool.url}
                      role="menuitem"
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block px-4 py-2.5 text-sm text-pt-light transition hover:bg-pt-surface hover:text-white focus:bg-pt-surface focus:text-white focus:outline-none"
                    >
                      {tool.name}
                    </Link>
                  ) : (
                    <span
                      role="menuitem"
                      className="block cursor-default px-4 py-2.5 text-sm text-pt-muted"
                    >
                      {tool.name}
                      <span className="ml-2 text-xs">(wkrótce)</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
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
