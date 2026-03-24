import type { Tool } from "@/lib/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  const hasUrl = Boolean(tool.url);
  const href = tool.url;
  const isExternal = hasUrl && /^https?:\/\//i.test(href);

  return (
    <article className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-pt-border/50 bg-gradient-to-b from-pt-surface/80 to-pt-black/90 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-pt-yellow/50 hover:shadow-xl hover:shadow-pt-yellow/5">
      {/* Dolna poświata (Glow Modules — brandbook) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-pt-yellow/30 via-pt-yellow/8 to-transparent opacity-90 transition group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <h3 className="shrink-0 text-xl font-semibold tracking-tight text-white">
          {tool.name}
        </h3>
        <p className="mt-3 min-h-[72px] flex-1 text-sm leading-relaxed text-pt-muted line-clamp-3 sm:text-base">
          {tool.description}
        </p>
        <div className="mt-6 shrink-0">
          {hasUrl ? (
            <a
              href={href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-pt-yellow px-4 py-2.5 text-sm font-semibold text-pt-black-deep transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-yellow sm:w-auto sm:min-w-[160px]"
            >
              Otwórz narzędzie
            </a>
          ) : (
            <span
              className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-lg border border-dashed border-pt-border bg-pt-black/40 px-4 py-2.5 text-sm font-medium text-pt-muted sm:w-auto"
              title="Link zostanie podany w konfiguracji"
            >
              Wkrótce
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
