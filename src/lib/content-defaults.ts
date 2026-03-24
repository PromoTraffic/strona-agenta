import type { Tool } from "./tools";

export type HeroContent = {
  badge: string;
  title: string;
  tagline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type AboutContent = {
  title: string;
  paragraphs: string[];
};

export type BenefitItem = {
  title: string;
  body: string;
};

export type BenefitsContent = {
  title: string;
  subtitle: string;
  items: BenefitItem[];
};

export type FooterContent = {
  copyrightText: string;
  primarySiteUrl: string;
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  benefits: BenefitsContent;
  footer: FooterContent;
  tools: Tool[];
};

export function getDefaultHero(): HeroContent {
  const agent = process.env.NEXT_PUBLIC_AGENT_NAME?.trim() || "Agent AI PromoTraffic";
  return {
    badge: "PromoTraffic · AI",
    title: agent,
    tagline:
      "Jedno inteligentne centrum decyzji dla Twojego performance marketingu — szybciej od insightu do działania, z narzędziami PromoTraffic pod jednym dachem.",
    subtitle:
      "Łączy dane, kontekst kampanii i automatyzację — tak, żebyś skupił się na wyniku, nie na logistyce narzędzi.",
    ctaPrimary: "Poznaj narzędzia",
    ctaSecondary: "Czym jest agent",
  };
}

export function getDefaultAbout(): AboutContent {
  return {
    title: "Czym jest ten agent",
    paragraphs: [
      'To dedykowany agent AI w ekosystemie PromoTraffic — zaprojektowany tak, by wspierać zespoły od performance marketingu w codziennej pracy: od analizy i rekomendacji po koordynację działań między narzędziami.',
      'Nie zastępuje strategii ani ludzkiej oceny — dostarcza spójność, tempo i skalowalność: jeden punkt wejścia do narzędzi, które już budujecie w PromoTraffic.',
      "Poniżej znajdziesz podłączone moduły. Każdy można rozwijać osobno — agent trzyma kontekst i ułatwia przejście między nimi.",
    ],
  };
}

export function getDefaultBenefits(): BenefitsContent {
  return {
    title: "Dlaczego warto",
    subtitle:
      "Krótko i konkretnie — pod kątem zespołów performance i rozwoju narzędzi w PromoTraffic.",
    items: [
      {
        title: "Szybszy time-to-action",
        body: "Skracasz drogę od sygnału w danych do decyzji i wdrożenia — mniej przełączania kontekstu.",
      },
      {
        title: "Spójność w ekosystemie",
        body: "Jedna logika współpracy narzędzi PromoTraffic zamiast rozproszonych wysp informacji.",
      },
      {
        title: "Skalowalne kampanie",
        body: "Wsparcie przy powtarzalnych zadaniach i większej skali — bez utraty kontroli nad jakością.",
      },
      {
        title: "Focus na KPI",
        body: "Akcent na wynikach mierzalnych: efektywność budżetu, konwersje i przejrzyste priorytety.",
      },
    ],
  };
}

export function getDefaultFooter(): FooterContent {
  return {
    copyrightText: "PromoTraffic. Wszystkie prawa zastrzeżone.",
    primarySiteUrl: process.env.NEXT_PUBLIC_PRIMARY_SITE_URL?.trim() || "",
  };
}
