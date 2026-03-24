"use client";

import type { Tool } from "@/lib/tools";
import { useCallback, useState } from "react";

type AdminToolsEditorProps = {
  initialTools: Tool[];
};

/** Klucz React — stabilny, nie zmienia się przy edycji (zapobiega utracie focusa) */
type ToolWithEditKey = Tool & { _editKey: string };

function slugify(text: string): string {
  const pl: Record<string, string> = {
    ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
  };
  return text
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => pl[c] ?? c)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || "narzedzie";
}

function withEditKey(tool: Tool, editKey: string): ToolWithEditKey {
  return { ...tool, _editKey: editKey };
}

export function AdminToolsEditor({ initialTools }: AdminToolsEditorProps) {
  const [tools, setTools] = useState<ToolWithEditKey[]>(() =>
    initialTools.map((t, i) => withEditKey(t, `tool-${i}-${t.id}`))
  );
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const addTool = useCallback(() => {
    const newTool: ToolWithEditKey = withEditKey(
      {
        id: `narzedzie-${Date.now()}`,
        name: "Nowe narzędzie",
        description: "Opis — edytuj tutaj.",
        url: "",
      },
      `tool-new-${Date.now()}`,
    );
    setTools((prev) => [...prev, newTool]);
    setFeedback("Dodano narzędzie. Ustaw nazwę i ID (sluge).");
  }, []);

  const updateTool = useCallback(
    (index: number, field: keyof Tool, value: string) => {
      setTools((prev) => {
        const next = [...prev];
        const current = next[index];
        const t: ToolWithEditKey = {
          ...current,
          [field]: value,
          _editKey: current._editKey,
        };
        if (field === "name") {
          t.id = slugify(value) || t.id;
        }
        next[index] = t;
        return next;
      });
      setFeedback(null);
    },
    [],
  );

  const removeTool = useCallback((index: number) => {
    setTools((prev) => prev.filter((_, i) => i !== index));
    setFeedback("Usunięto narzędzie.");
  }, []);

  const getConfigJson = useCallback(() => {
    return JSON.stringify(
      tools.map(({ id, name, description, url }) => ({
        id,
        name,
        description,
        url,
      })),
      null,
      2,
    );
  }, [tools]);

  const copyToClipboard = useCallback(async () => {
    const json = getConfigJson();
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setFeedback("Skopiowano do schowka. Wklej w Coolify → NEXT_PUBLIC_TOOLS_JSON");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setFeedback("Błąd kopiowania. Użyj przycisku „Pobierz plik”.");
    }
  }, [getConfigJson]);

  const saveToDb = useCallback(async () => {
    setSaving(true);
    setFeedback(null);
      try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "tools",
          value: tools.map(({ _editKey: _, ...t }) => t),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error || "Błąd zapisu.");
        return;
      }
      setFeedback("Zapisano w bazie. Odśwież stronę, aby zobaczyć zmiany.");
    } catch {
      setFeedback("Błąd połączenia z serwerem.");
    } finally {
      setSaving(false);
    }
  }, [tools]);

  const downloadFile = useCallback(() => {
    const json = getConfigJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tools-config.json";
    a.click();
    URL.revokeObjectURL(url);
    setFeedback(
      "Pobrano plik. Umieść jego zawartość w zmiennej NEXT_PUBLIC_TOOLS_JSON w Coolify.",
    );
  }, [getConfigJson]);

  return (
    <div className="space-y-8">
      <p className="text-pt-muted">
        Edytuj listę narzędzi. ID generuje się z nazwy (małe litery, myślniki).
        Po zapisie skopiuj konfigurację JSON do Coolify lub użyj pobranego pliku.
      </p>

      {feedback && (
        <div
          role="status"
          className="rounded-lg border border-pt-border/50 bg-pt-surface/60 px-4 py-3 text-sm text-pt-light"
        >
          {feedback}
        </div>
      )}

      <div className="space-y-6">
        {tools.map((tool, index) => (
          <article
            key={tool._editKey}
            className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-pt-muted">
                Narzędzie {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeTool(index)}
                className="text-sm text-red-400 transition hover:text-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow"
              >
                Usuń
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-pt-muted">
                  Nazwa
                </span>
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(index, "name", e.target.value)}
                  className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white placeholder:text-pt-muted focus:border-pt-yellow focus:outline-none focus:ring-1 focus:ring-pt-yellow"
                  placeholder="np. MediaPulse"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-pt-muted">
                  ID (slug, auto z nazwy)
                </span>
                <input
                  type="text"
                  value={tool.id}
                  onChange={(e) => updateTool(index, "id", e.target.value)}
                  className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 font-mono text-sm text-pt-light placeholder:text-pt-muted focus:border-pt-yellow focus:outline-none focus:ring-1 focus:ring-pt-yellow"
                  placeholder="mediapulse"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-medium text-pt-muted">
                Opis
              </span>
              <textarea
                value={tool.description}
                onChange={(e) => updateTool(index, "description", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white placeholder:text-pt-muted focus:border-pt-yellow focus:outline-none focus:ring-1 focus:ring-pt-yellow"
                placeholder="Krótki opis narzędzia"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-medium text-pt-muted">
                URL (opcjonalnie — pusty = przycisk „Wkrótce”)
              </span>
              <input
                type="url"
                value={tool.url}
                onChange={(e) => updateTool(index, "url", e.target.value)}
                className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white placeholder:text-pt-muted focus:border-pt-yellow focus:outline-none focus:ring-1 focus:ring-pt-yellow"
                placeholder="https://..."
              />
            </label>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={addTool}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pt-border py-6 text-pt-muted transition hover:border-pt-yellow hover:text-pt-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow sm:w-auto sm:min-w-[240px]"
      >
        <span className="text-lg">+</span> Dodaj narzędzie
      </button>

      <div className="flex flex-wrap gap-4 border-t border-pt-border/40 pt-8">
        <button
          type="button"
          onClick={saveToDb}
          disabled={saving}
          className="rounded-lg bg-pt-yellow px-6 py-2.5 text-sm font-semibold text-pt-black-deep transition hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow"
        >
          {saving ? "Zapisywanie…" : "Zapisz w bazie"}
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="rounded-lg border border-pt-border bg-pt-surface/80 px-6 py-2.5 text-sm font-medium text-pt-light transition hover:border-pt-yellow hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow"
        >
          {copied ? "Skopiowano!" : "Kopiuj JSON"}
        </button>
        <button
          type="button"
          onClick={downloadFile}
          className="rounded-lg border border-pt-border bg-pt-surface/80 px-6 py-2.5 text-sm font-medium text-pt-light transition hover:border-pt-yellow hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow"
        >
          Pobierz tools-config.json
        </button>
      </div>

      <details className="rounded-lg border border-pt-border/40 bg-pt-black/50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-pt-light">
          Jak wkleić konfigurację w Coolify
        </summary>
        <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-pt-muted">
          <li>Kliknij „Kopiuj konfigurację JSON” lub pobierz plik.</li>
          <li>W Coolify → aplikacja → Variables dodaj lub edytuj zmienną.</li>
          <li>
            Nazwa: <code className="text-pt-yellow">NEXT_PUBLIC_TOOLS_JSON</code>
          </li>
          <li>
            Wartość: wklej całą zawartość JSON (tablica obiektów).
          </li>
          <li>Zrestartuj aplikację.</li>
        </ol>
      </details>
    </div>
  );
}
