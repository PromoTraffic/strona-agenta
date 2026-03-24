import Link from "next/link";
import type { FooterContent } from "@/lib/content-defaults";

type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-pt-border/40 bg-pt-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-pt-muted sm:text-left">
          © {year} {content.copyrightText}
        </p>
        {content.primarySiteUrl ? (
          <Link
            href={content.primarySiteUrl}
            className="text-sm font-medium text-pt-light transition hover:text-pt-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-yellow"
          >
            Strona główna PromoTraffic
          </Link>
        ) : null}
      </div>
    </footer>
  );
}
