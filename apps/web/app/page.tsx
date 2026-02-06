import { DeployBlock } from "@/components/landing/deploy-block";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { UseCasesMarquee } from "@/components/landing/use-cases-marquee";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,hsl(var(--background)),hsl(222_47%_4%))]"
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,hsl(var(--primary)/0.03)_0%,transparent_50%)]"
        aria-hidden
      />

      <header className="border-b border-border/50">
        <div className="container mx-auto flex h-14 max-w-5xl items-center px-4">
          <span className="font-heading text-lg font-semibold tracking-tight">
            OhMyClaw
          </span>
        </div>
      </header>

      <main>
        {/* Hero + CTA + Model & Channel */}
        <section className="container mx-auto max-w-5xl px-4 pt-16 pb-24 text-center sm:pt-24">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Deploy OpenClaw under{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              1 minute
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
