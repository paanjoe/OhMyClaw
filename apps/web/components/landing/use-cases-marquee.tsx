import { COPY } from "@/lib/copy";

export function UseCasesMarquee() {
  const duplicated = [...COPY.useCases.items, ...COPY.useCases.items];
  return (
    <section className="overflow-hidden border-t border-border/50 py-16">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {COPY.useCases.heading}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {COPY.useCases.subheading}
        </p>
      </div>
      <div className="relative flex w-full">
        <div className="animate-marquee flex shrink-0 gap-4">
          {duplicated.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="shrink-0 rounded-full border border-border/50 bg-card px-4 py-2 text-sm text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {COPY.useCases.footnote}
      </p>
    </section>
  );
}
