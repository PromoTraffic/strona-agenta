export type Tool = {
  id: string;
  name: string;
  description: string;
  url: string;
};

/** Domyślna lista — dopisz kolejne wpisy tutaj lub nadpisz przez NEXT_PUBLIC_TOOLS_JSON. */
const TOOLS_SEED: Tool[] = [
  {
    id: "mediapulse",
    name: "MediaPulse",
    description:
      "Krótki opis narzędzia — zostanie uzupełniony. Planowanie i analityka mediów.",
    url: "",
  },
  {
    id: "product-gen",
    name: "PROduct GEN",
    description:
      "Krótki opis narzędzia — zostanie uzupełniony. Generowanie i optymalizacja produktów pod kampanie.",
    url: "",
  },
  {
    id: "promarketer",
    name: "ProMarketer",
    description:
      "Krótki opis narzędzia — zostanie uzupełniony. Wsparcie strategii marketingowych.",
    url: "",
  },
  {
    id: "promotion-ai",
    name: "PromotionAI",
    description:
      "Krótki opis narzędzia — zostanie uzupełniony. Automatyzacja promocji i kreacji.",
    url: "",
  },
];

function envUrlsById(): Record<string, string> {
  return {
    mediapulse: process.env.NEXT_PUBLIC_TOOL_MEDIAPULSE_URL?.trim() ?? "",
    "product-gen": process.env.NEXT_PUBLIC_TOOL_PRODUCT_GEN_URL?.trim() ?? "",
    promarketer: process.env.NEXT_PUBLIC_TOOL_PROMARKETER_URL?.trim() ?? "",
    "promotion-ai":
      process.env.NEXT_PUBLIC_TOOL_PROMOTION_AI_URL?.trim() ?? "",
  };
}

function normalizeTool(entry: unknown): Tool | null {
  if (!entry || typeof entry !== "object") return null;
  const o = entry as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id.trim() : "";
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const description =
    typeof o.description === "string" ? o.description.trim() : "";
  const url = typeof o.url === "string" ? o.url.trim() : "";
  if (!id || !name) return null;
  return { id, name, description, url };
}

/**
 * Zwraca listę narzędzi z URL-ami.
 * Priorytet: NEXT_PUBLIC_TOOLS_JSON (tablica JSON) — pełna lista z Coolify bez commitu.
 * Fallback: TOOLS_SEED + osobne NEXT_PUBLIC_TOOL_*_URL.
 */
export function getResolvedTools(): Tool[] {
  const rawJson = process.env.NEXT_PUBLIC_TOOLS_JSON?.trim();
  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson) as unknown;
      if (!Array.isArray(parsed)) {
        throw new Error("Oczekiwano tablicy narzędzi.");
      }
      const fromJson = parsed
        .map(normalizeTool)
        .filter((t): t is Tool => t !== null);
      if (fromJson.length === 0) {
        throw new Error("Tablica narzędzi jest pusta po walidacji.");
      }
      const envMap = envUrlsById();
      return fromJson.map((t) => ({
        ...t,
        url: t.url || envMap[t.id] || "",
      }));
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "[promotraffic-ai-landing] NEXT_PUBLIC_TOOLS_JSON — błąd parsowania, używam listy domyślnej:",
          e,
        );
      }
    }
  }

  const envMap = envUrlsById();
  return TOOLS_SEED.map((t) => ({
    ...t,
    url: envMap[t.id] || t.url,
  }));
}
