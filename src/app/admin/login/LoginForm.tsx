"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Błąd logowania.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Wystąpił błąd połączenia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {error && (
        <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-pt-muted">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white focus:border-pt-yellow focus:outline-none focus:ring-1 focus:ring-pt-yellow"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-pt-muted">
          Hasło
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white focus:border-pt-yellow focus:outline-none focus:ring-1 focus:ring-pt-yellow"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-pt-yellow py-2.5 font-semibold text-pt-black-deep transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Logowanie…" : "Zaloguj się"}
      </button>
    </form>
  );
}
