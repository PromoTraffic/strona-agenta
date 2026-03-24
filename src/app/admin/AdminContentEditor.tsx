"use client";

import { useCallback, useState } from "react";
import type {
  HeroContent,
  AboutContent,
  BenefitsContent,
  FooterContent,
  BenefitItem,
} from "@/lib/content-defaults";

type AdminContentEditorProps = {
  initialHero: HeroContent;
  initialAbout: AboutContent;
  initialBenefits: BenefitsContent;
  initialFooter: FooterContent;
};

export function AdminContentEditor({
  initialHero,
  initialAbout,
  initialBenefits,
  initialFooter,
}: AdminContentEditorProps) {
  const [hero, setHero] = useState(initialHero);
  const [about, setAbout] = useState(initialAbout);
  const [benefits, setBenefits] = useState(initialBenefits);
  const [footer, setFooter] = useState(initialFooter);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const save = useCallback(
    async (key: string, value: unknown) => {
      setSaving(key);
      setFeedback(null);
      try {
        const res = await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
        const data = await res.json();
        if (!res.ok) {
          setFeedback(data.error || "Błąd zapisu.");
          return;
        }
        setFeedback(`Zapisano ${key}.`);
      } catch {
        setFeedback("Błąd połączenia z serwerem.");
      } finally {
        setSaving(null);
      }
    },
    [],
  );

  const updateBenefit = useCallback(
    (index: number, field: keyof BenefitItem, value: string) => {
      setBenefits((prev) => {
        const next = { ...prev, items: [...prev.items] };
        next.items[index] = { ...next.items[index], [field]: value };
        return next;
      });
    },
    [],
  );

  const addBenefit = useCallback(() => {
    setBenefits((prev) => ({
      ...prev,
      items: [...prev.items, { title: "Nowa korzyść", body: "Opis." }],
    }));
  }, []);

  const removeBenefit = useCallback((index: number) => {
    setBenefits((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  return (
    <div className="space-y-10">
      {feedback && (
        <div className="rounded-lg border border-pt-border/50 bg-pt-surface/60 px-4 py-3 text-sm text-pt-light">
          {feedback}
        </div>
      )}

      <section className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6">
        <h2 className="text-lg font-semibold text-white">Hero</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Badge</span>
            <input
              type="text"
              value={hero.badge}
              onChange={(e) => setHero((p) => ({ ...p, badge: e.target.value }))}
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Tytuł (nazwa agenta)</span>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Tagline</span>
            <textarea
              value={hero.tagline}
              onChange={(e) => setHero((p) => ({ ...p, tagline: e.target.value }))}
              rows={2}
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Podtytuł</span>
            <textarea
              value={hero.subtitle}
              onChange={(e) => setHero((p) => ({ ...p, subtitle: e.target.value }))}
              rows={2}
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <div className="flex gap-4">
            <label className="flex-1">
              <span className="mb-1 block text-xs text-pt-muted">CTA 1</span>
              <input
                type="text"
                value={hero.ctaPrimary}
                onChange={(e) =>
                  setHero((p) => ({ ...p, ctaPrimary: e.target.value }))
                }
                className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
              />
            </label>
            <label className="flex-1">
              <span className="mb-1 block text-xs text-pt-muted">CTA 2</span>
              <input
                type="text"
                value={hero.ctaSecondary}
                onChange={(e) =>
                  setHero((p) => ({ ...p, ctaSecondary: e.target.value }))
                }
                className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => save("hero", hero)}
            disabled={saving === "hero"}
            className="rounded-lg bg-pt-yellow px-4 py-2 text-sm font-medium text-pt-black-deep disabled:opacity-50"
          >
            {saving === "hero" ? "Zapisywanie…" : "Zapisz Hero"}
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6">
        <h2 className="text-lg font-semibold text-white">O nas (About)</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Tytuł</span>
            <input
              type="text"
              value={about.title}
              onChange={(e) =>
                setAbout((p) => ({ ...p, title: e.target.value }))
              }
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          {about.paragraphs.map((p, i) => (
            <label key={i} className="block">
              <span className="mb-1 block text-xs text-pt-muted">
                Akapit {i + 1}
              </span>
              <textarea
                value={p}
                onChange={(e) => {
                  const next = [...about.paragraphs];
                  next[i] = e.target.value;
                  setAbout((prev) => ({ ...prev, paragraphs: next }));
                }}
                rows={3}
                className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
              />
            </label>
          ))}
          <button
            type="button"
            onClick={() => save("about", about)}
            disabled={saving === "about"}
            className="rounded-lg bg-pt-yellow px-4 py-2 text-sm font-medium text-pt-black-deep disabled:opacity-50"
          >
            {saving === "about" ? "Zapisywanie…" : "Zapisz About"}
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6">
        <h2 className="text-lg font-semibold text-white">Korzyści</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Tytuł</span>
            <input
              type="text"
              value={benefits.title}
              onChange={(e) =>
                setBenefits((p) => ({ ...p, title: e.target.value }))
              }
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">Podtytuł</span>
            <input
              type="text"
              value={benefits.subtitle}
              onChange={(e) =>
                setBenefits((p) => ({ ...p, subtitle: e.target.value }))
              }
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          {benefits.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border border-pt-border/50 p-4"
            >
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    updateBenefit(i, "title", e.target.value)
                  }
                  placeholder="Tytuł"
                  className="w-full rounded border border-pt-border bg-pt-black px-3 py-2 text-white"
                />
                <textarea
                  value={item.body}
                  onChange={(e) =>
                    updateBenefit(i, "body", e.target.value)
                  }
                  rows={2}
                  placeholder="Opis"
                  className="w-full rounded border border-pt-border bg-pt-black px-3 py-2 text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => removeBenefit(i)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Usuń
              </button>
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={addBenefit}
              className="rounded-lg border border-dashed border-pt-border px-4 py-2 text-sm text-pt-muted hover:border-pt-yellow hover:text-pt-yellow"
            >
              + Dodaj korzyść
            </button>
            <button
              type="button"
              onClick={() => save("benefits", benefits)}
              disabled={saving === "benefits"}
              className="rounded-lg bg-pt-yellow px-4 py-2 text-sm font-medium text-pt-black-deep disabled:opacity-50"
            >
              {saving === "benefits" ? "Zapisywanie…" : "Zapisz korzyści"}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-pt-border/60 bg-pt-surface/60 p-6">
        <h2 className="text-lg font-semibold text-white">Stopka</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">
              Tekst copyright
            </span>
            <input
              type="text"
              value={footer.copyrightText}
              onChange={(e) =>
                setFooter((p) => ({ ...p, copyrightText: e.target.value }))
              }
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-pt-muted">
              Link do strony głównej (URL)
            </span>
            <input
              type="url"
              value={footer.primarySiteUrl}
              onChange={(e) =>
                setFooter((p) => ({ ...p, primarySiteUrl: e.target.value }))
              }
              placeholder="https://..."
              className="w-full rounded-lg border border-pt-border bg-pt-black px-3 py-2 text-white"
            />
          </label>
          <button
            type="button"
            onClick={() => save("footer", footer)}
            disabled={saving === "footer"}
            className="rounded-lg bg-pt-yellow px-4 py-2 text-sm font-medium text-pt-black-deep disabled:opacity-50"
          >
            {saving === "footer" ? "Zapisywanie…" : "Zapisz stopkę"}
          </button>
        </div>
      </section>
    </div>
  );
}
