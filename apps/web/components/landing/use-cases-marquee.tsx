const USE_CASES = [
  "Read & summarize email",
  "Draft replies and follow-ups",
  "Translate messages in real time",
  "Organize your inbox",
  "Answer support tickets",
  "Summarize long documents",
  "Notify before a meeting",
  "Schedule meetings from chat",
  "Remind you of deadlines",
  "Plan your week",
  "Take meeting notes",
  "Sync across time zones",
  "Do your taxes",
  "Track expenses and receipts",
  "Compare insurance quotes",
  "Manage subscriptions",
  "Run payroll calculations",
  "Negotiate refunds",
  "Find coupons",
  "Find best prices online",
  "Find discount codes",
  "Price-drop alerts",
  "Compare product specs",
  "Negotiate deals",
  "Write contracts and NDAs",
  "Research competitors",
  "Screen and prioritize leads",
  "Generate invoices",
  "Create presentations from bullet points",
  "Book travel and hotels",
  "Find recipes from ingredients",
  "Draft social posts",
  "Monitor news and alerts",
  "Set and track goals",
  "Screen cold outreach",
  "Draft job descriptions",
  "Run standup summaries",
  "Track OKRs and KPIs",
];

export function UseCasesMarquee() {
  const duplicated = [...USE_CASES, ...USE_CASES];
  return (
    <section className="overflow-hidden border-t border-border/50 py-16">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          What can OpenClaw do for you?
        </h2>
        <p className="mt-2 text-muted-foreground">
          One assistant, thousands of use cases
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
        You can add as many use cases as you want via natural language.
      </p>
    </section>
  );
}
