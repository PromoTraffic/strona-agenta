import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { ToolsNavDropdown } from "./ToolsNavDropdown";

type SiteHeaderProps = {
  primarySiteUrl?: string;
  tools?: Tool[];
};

export function SiteHeader({ primarySiteUrl, tools = [] }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-pt-border/30 bg-pt-black-deep/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-2">
          {primarySiteUrl ? (
            <Link
              href={primarySiteUrl}
              className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-pt-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-yellow"
            >
              PromoTraffic
            </Link>
          ) : (
            <span className="text-lg font-semibold tracking-tight text-white">
              PromoTraffic
            </span>
          )}
          <span className="hidden text-sm text-pt-muted sm:inline">
            Agent AI
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="#o-narzedziu"
            className="text-pt-light/90 transition-colors hover:text-pt-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-yellow"
          >
            O agencie
          </a>
          <ToolsNavDropdown tools={tools} variant="header" />
        </nav>
      </div>
    </header>
  );
}
