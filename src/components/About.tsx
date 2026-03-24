import type { AboutContent } from "@/lib/content-defaults";

type AboutProps = {
  content: AboutContent;
};

export function About({ content }: AboutProps) {
  return (
    <section
      id="o-narzedziu"
      className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-pt-yellow/50 to-transparent" />
      <div className="mx-auto max-w-3xl">
        <h2
          id="about-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {content.title}
        </h2>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-pt-light/95 sm:text-lg">
          {content.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
