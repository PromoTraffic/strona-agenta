"use client";

import { useCallback, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  createdAt: string;
};

export function AdminUsersEditor() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      setFeedback("Błąd ładowania listy.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    setAdding(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error || "Błąd dodawania.");
        return;
      }
      setEmail("");
      setPassword("");
      setFeedback("Dodano użytkownika.");
      fetchUsers();
    } catch {
      setFeedback("Błąd połączenia.");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: string) {
    if (!confirm("Czy na pewno usunąć tego użytkownika?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error || "Błąd usuwania.");
        return;
      }
      setFeedback("Usunięto użytkownika.");
      fetchUsers();
    } catch {
      setFeedback("Błąd połączenia.");
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-pt-muted">
        Dodawaj i usuwaj osoby z dostępem do panelu. Każdy edytor loguje się
        emailem i hasłem.
      </p>

      {feedback && (
        <div className="rounded-lg border border-pt-border/50 bg-pt-surface/60 px-4 py-3 text-sm text-pt-light">
          {feedback}
        </div>
      )}

      <section className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6">
        <h2 className="text-lg font-semibold text-white">Dodaj edytora</h2>
        <form onSubmit={handleAddUser} className="mt-4 flex flex-wrap gap-4">
          <label>
            <span className="mb-1 block text-xs text-pt-muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <label>
            <span className="mb-1 block text-xs text-pt-muted">
              Hasło (min. 8 znaków)
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={adding}
              className="rounded-lg bg-pt-yellow px-4 py-2 text-sm font-medium text-pt-black-deep disabled:opacity-50"
            >
              {adding ? "Dodawanie…" : "Dodaj"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6">
        <h2 className="text-lg font-semibold text-white">Edytorzy</h2>
        {loading ? (
          <p className="mt-4 text-pt-muted">Ładowanie…</p>
        ) : users.length === 0 ? (
          <p className="mt-4 text-pt-muted">Brak użytkowników.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between rounded-lg border border-pt-border/50 px-4 py-3"
              >
                <span className="text-pt-light">{u.email}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(u.id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
