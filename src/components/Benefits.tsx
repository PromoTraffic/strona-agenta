import type { BenefitsContent } from "@/lib/content-defaults";

const ICONS = [BoltIcon, LayersIcon, ChartIcon, TargetIcon];

type BenefitsProps = {
  content: BenefitsContent;
};

export function Benefits({ content }: BenefitsProps) {
  return (
    <section
      className="relative border-y border-pt-border/20 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pt-black/40 via-transparent to-pt-black/40" />
      <div className="relative mx-auto max-w-6xl">
        <h2
          id="benefits-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-pt-muted">
          {content.subtitle}
        </p>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {content.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={i}>
                <article className="group flex gap-5 rounded-2xl border border-pt-border/40 bg-pt-surface/50 p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-pt-yellow/40 hover:bg-pt-surface/70 hover:shadow-lg hover:shadow-pt-yellow/5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pt-yellow/20 to-pt-black text-pt-yellow ring-1 ring-pt-yellow/20 transition group-hover:ring-pt-yellow/40"
                    aria-hidden
                  >
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pt-muted sm:text-base">
                      {item.body}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function BoltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71L13.498 14H6.164a.75.75 0 01-.57-1.23l8.25-10.5a.75.75 0 011.021-.675z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25m11.142 0l-5.571 3-5.571-3"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v4.125c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 17.25v-4.125zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-8.25zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v12.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
