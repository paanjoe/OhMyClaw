import { Card, CardContent } from "@/components/ui/card";
import { Clock, Zap } from "lucide-react";

const TRADITIONAL_STEPS = [
  { label: "Purchase local virtual machine", min: 10 },
  { label: "Creating SSH keys and storing securely", min: 3 },
  { label: "Connecting to the server via SSH", min: 3 },
  { label: "Installing Node.js and NPM", min: 5 },
  { label: "Installing OpenClaw", min: 2 },
  { label: "Setting up OpenClaw", min: 5 },
  { label: "Connecting to Telegram", min: 2 },
];

export function ComparisonSection() {
  return (
    <section className="border-t border-border/50 bg-muted/20 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="font-heading mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Traditional Method vs OhMyClaw
        </h2>
        <p className="text-center text-muted-foreground">
          Same result. One path takes half an hour. The other takes under a minute.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card className="border-amber-500/20 bg-amber-950/10">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="font-heading font-semibold">Traditional</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {TRADITIONAL_STEPS.map((s) => (
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
                Total — 30 min
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-heading font-semibold">OhMyClaw</span>
              </div>
              <p className="text-2xl font-bold text-primary">&lt;1 min</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Pick a model, connect Telegram, deploy — done under 1 minute.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Servers, SSH and OpenClaw environment are already set up and
                waiting to get assigned. Simple, secure and fast connection to
                your bot.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
