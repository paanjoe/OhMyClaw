import { Card, CardContent } from "@/components/ui/card";
import { COPY } from "@/lib/copy";
import { Clock, Zap } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="border-t border-border/50 bg-muted/20 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="font-heading mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {COPY.comparison.heading}
        </h2>
        <p className="text-center text-muted-foreground">
          {COPY.comparison.subheading}
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card className="border-amber-500/20 bg-amber-950/10">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="font-heading font-semibold">
                  {COPY.comparison.traditional}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {COPY.comparison.steps.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span>{s.label}</span>
                    <span className="shrink-0 font-mono text-amber-500/90">
                      {s.min} min
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-heading text-lg font-semibold">
                {COPY.comparison.totalMin}
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-heading font-semibold">
                  {COPY.comparison.ohmyclaw}
                </span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {COPY.comparison.underOneMin}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {COPY.comparison.ohmyclawBlurb1}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {COPY.comparison.ohmyclawBlurb2}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
