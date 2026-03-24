import { prisma } from "./db";
import {
  getDefaultAbout,
  getDefaultBenefits,
  getDefaultFooter,
  getDefaultHero,
} from "./content-defaults";
import { getResolvedTools } from "./tools";
import type {
  HeroContent,
  AboutContent,
  BenefitsContent,
  FooterContent,
  SiteContent,
} from "./content-defaults";
import type { Tool } from "./tools";

const CONTENT_KEYS = ["hero", "about", "benefits", "footer", "tools"] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

const parsers: Record<
  ContentKey,
  (raw: string) => HeroContent | AboutContent | BenefitsContent | FooterContent | Tool[]
> = {
  hero: (s) => JSON.parse(s) as HeroContent,
  about: (s) => JSON.parse(s) as AboutContent,
  benefits: (s) => JSON.parse(s) as BenefitsContent,
  footer: (s) => JSON.parse(s) as FooterContent,
  tools: (s) => JSON.parse(s) as Tool[],
};

const defaults: Record<ContentKey, () => unknown> = {
  hero: getDefaultHero,
  about: getDefaultAbout,
  benefits: getDefaultBenefits,
  footer: getDefaultFooter,
  tools: getResolvedTools,
};

export async function getContent<K extends ContentKey>(
  key: K,
): Promise<K extends "hero" ? HeroContent : K extends "about" ? AboutContent : K extends "benefits" ? BenefitsContent : K extends "footer" ? FooterContent : Tool[]> {
  try {
    const row = await prisma.content.findUnique({ where: { key } });
    if (row?.value) {
      return parsers[key](row.value) as never;
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[content] Błąd odczytu "${key}":`, e);
    }
  }
  return defaults[key]() as never;
}

export async function setContent<K extends ContentKey>(
  key: K,
  value: HeroContent | AboutContent | BenefitsContent | FooterContent | Tool[],
): Promise<void> {
  await prisma.content.upsert({
    where: { key },
    create: { key, value: JSON.stringify(value) },
    update: { value: JSON.stringify(value) },
  });
}

export async function getAllContent(): Promise<SiteContent> {
  const [hero, about, benefits, footer, tools] = await Promise.all([
    getContent("hero"),
    getContent("about"),
    getContent("benefits"),
    getContent("footer"),
    getContent("tools"),
  ]);
  return { hero, about, benefits, footer, tools };
}
