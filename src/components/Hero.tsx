import type { HeroContent } from "@/lib/content-defaults";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8"
      aria-labelledby="hero-heading"
    >
      {/* Tło — gradientowe orby + dekoracyjna grafika */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-20 h-[500px] w-[500px] rounded-full bg-pt-yellow/12 blur-[100px] pt-glow-animate" />
        <div className="absolute -bottom-20 -right-1/4 h-[400px] w-[400px] rounded-full bg-pt-yellow/8 blur-[80px] pt-glow-animate" style={{ animationDelay: "1s" }} />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-pt-muted/10 blur-3xl" />
      </div>

      {/* Abstrakcyjna grafika AI — połączone węzły (connectivity) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <svg
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(255,213,0)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(255,213,0)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Centralny węzeł */}
          <circle cx="200" cy="200" r="4" fill="rgb(255,213,0)" opacity="0.6" />
          {/* Otaczające węzły połączone liniami */}
          {[0, 72, 144, 216, 288].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = 200 + 120 * Math.cos(rad);
            const y = 200 + 120 * Math.sin(rad);
            return (
              <g key={i}>
                <line x1="200" y1="200" x2={x} y2={y} stroke="url(#hero-line-grad)" strokeWidth="0.5" />
                <circle cx={x} cy={y} r="2" fill="rgb(255,213,0)" opacity="0.3" />
              </g>
            );
          })}
          {[36, 108, 180, 252, 324].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = 200 + 80 * Math.cos(rad);
            const y = 200 + 80 * Math.sin(rad);
            return (
              <circle key={`inner-${i}`} cx={x} cy={y} r="1.5" fill="rgb(255,213,0)" opacity="0.2" />
            );
          })}
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-block rounded-full border border-pt-yellow/40 bg-pt-yellow/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-pt-yellow">
          {content.badge}
        </span>
        <h1
          id="hero-heading"
          className="text-balance text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {content.title}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-pt-light/95 sm:text-xl">
          {content.tagline}
        </p>
        <p className="mx-auto mt-5 max-w-xl text-base text-pt-muted">
          {content.subtitle}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <a
            href="#narzedzia"
            className="group inline-flex min-h-14 min-w-[220px] items-center justify-center rounded-xl bg-pt-yellow px-8 py-3.5 text-base font-semibold text-pt-black-deep shadow-lg shadow-pt-yellow/25 transition-all hover:scale-[1.02] hover:shadow-pt-yellow/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-yellow"
          >
            {content.ctaPrimary}
            <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#o-narzedziu"
            className="inline-flex min-h-14 min-w-[220px] items-center justify-center rounded-xl border-2 border-pt-border bg-pt-surface/60 px-8 py-3.5 text-base font-medium text-pt-light backdrop-blur-sm transition-all hover:border-pt-yellow/60 hover:bg-pt-surface/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-yellow"
          >
            {content.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
