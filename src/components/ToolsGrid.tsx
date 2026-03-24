import type { Tool } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

type ToolsGridProps = {
  tools: Tool[];
};

export function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <section
      id="narzedzia"
      className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="tools-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-pt-black/30 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <div>
          <h2
            id="tools-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Narzędzia w ekosystemie
          </h2>
          <p className="mt-4 max-w-2xl text-pt-muted">
            Moduły podłączone do agenta — możesz przechodzić między nimi w miarę
            rozwoju produktu.
          </p>
        </div>
        <ul className="mt-12 flex list-none flex-col gap-4 sm:gap-5">
          {tools.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
