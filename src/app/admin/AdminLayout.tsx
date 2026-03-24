"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTabs } from "./AdminTabs";

function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-pt-muted transition hover:text-pt-light"
    >
      Wyloguj
    </button>
  );
}

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="pt-page-bg min-h-screen">
      <header className="border-b border-pt-border/40 bg-pt-black/90 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-semibold text-white">Panel administracyjny</h1>
          <div className="flex items-center gap-4">
            <AdminTabs />
            <Link
              href="/#narzedzia"
              className="text-sm text-pt-yellow transition hover:text-pt-yellow/80"
            >
              Podgląd strony
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
