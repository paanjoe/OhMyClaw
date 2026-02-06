import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-8">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Built with care by the OhMyClaw team
        </p>
        <Link
          href="/contact"
          className="text-sm text-primary hover:underline"
        >
          Contact Support
        </Link>
      </div>
    </footer>
  );
}
