"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const TABS = [
  { id: "tools", label: "Narzędzia", href: "/admin?tab=tools" },
  { id: "content", label: "Treści", href: "/admin?tab=content" },
  { id: "users", label: "Użytkownicy", href: "/admin?tab=users" },
] as const;

export function AdminTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("tab") || "tools";

  return (
    <nav className="flex gap-2" role="tablist">
      {TABS.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          role="tab"
          aria-selected={current === tab.id}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            current === tab.id
              ? "bg-pt-yellow text-pt-black-deep"
              : "text-pt-muted hover:bg-pt-surface hover:text-pt-light"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
