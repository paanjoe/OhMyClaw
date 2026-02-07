import { DeployBlock } from "@/components/landing/deploy-block";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { UseCasesMarquee } from "@/components/landing/use-cases-marquee";
import { Footer } from "@/components/landing/footer";
import { COPY } from "@/lib/copy";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Cosmic starfield + gradient glow */}
      <div
        className="starry-bg fixed inset-0 -z-10 bg-background"
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/95"
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 bg-gradient-brand opacity-[0.04] mix-blend-normal"
        aria-hidden
      />

      <main>
        {/* Hero + CTA + Model & Channel */}
        <section className="container mx-auto max-w-5xl px-4 pt-16 pb-24 text-center sm:pt-24">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {COPY.hero.title}{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              {COPY.hero.titleHighlight}
            </span>
          </h1>
          <DeployBlock />
        </section>

        <ComparisonSection />
        <UseCasesMarquee />
      </main>

      <Footer />
    </div>
  );
}
