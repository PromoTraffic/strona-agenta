import type { Tool } from "@/lib/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  const hasUrl = Boolean(tool.url);
  const href = tool.url;
  const isExternal = hasUrl && /^https?:\/\//i.test(href);

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-pt-border/50 bg-gradient-to-b from-pt-surface/80 to-pt-black/90 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-pt-yellow/50 hover:shadow-xl hover:shadow-pt-yellow/5 sm:flex-row sm:items-start sm:gap-6">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-pt-yellow/30 via-pt-yellow/8 to-transparent opacity-90 transition group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <h3 className="shrink-0 text-xl font-semibold tracking-tight text-white">
          {tool.name}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-pt-light sm:mt-3">
          {tool.description || "Brak opisu."}
        </p>
      </div>
      <div className="shrink-0">
        {hasUrl ? (
          <a
            href={href}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex min-h-11 min-w-[140px] items-center justify-center rounded-lg bg-pt-yellow px-4 py-2.5 text-sm font-semibold text-pt-black-deep transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow"
          >
            Otwórz narzędzie
          </a>
        ) : (
          <span
            className="inline-flex min-h-11 min-w-[140px] cursor-not-allowed items-center justify-center rounded-lg border border-dashed border-pt-border bg-pt-black/40 px-4 py-2.5 text-sm font-medium text-pt-muted"
            title="Link zostanie podany w konfiguracji"
          >
            Wkrótce
          </span>
        )}
      </div>
    </article>
  );
}
