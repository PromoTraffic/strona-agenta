import Link from "next/link";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    redirect("/admin/setup");
  }

  return (
    <div className="pt-page-bg flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-pt-border/60 bg-pt-surface/80 p-8 shadow-xl">
        <h1 className="text-xl font-semibold text-white">Logowanie do panelu</h1>
        <p className="mt-2 text-sm text-pt-muted">
          Zaloguj się, aby edytować treści i narzędzia.
        </p>
        <LoginForm />
      </div>
      <Link
        href="/"
        className="mt-6 text-sm text-pt-muted hover:text-pt-yellow"
      >
        ← Powrót na stronę
      </Link>
    </div>
  );
}
