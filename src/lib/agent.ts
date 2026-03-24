/**
 * Publiczna nazwa agenta — ustaw NEXT_PUBLIC_AGENT_NAME w .env (Coolify).
 */
export function getAgentName(): string {
  const raw = process.env.NEXT_PUBLIC_AGENT_NAME;
  const name = typeof raw === "string" ? raw.trim() : "";
  if (!name && process.env.NODE_ENV === "development") {
    console.warn(
      "[promotraffic-ai-landing] NEXT_PUBLIC_AGENT_NAME jest puste — używam nazwy domyślnej.",
    );
  }
  return name || "Agent AI PromoTraffic";
}

export function getPrimarySiteUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_PRIMARY_SITE_URL?.trim();
  return u || undefined;
}
