import Link from "next/link";
import { Github } from "lucide-react";
import { COPY } from "@/lib/copy";

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight bg-gradient-brand bg-clip-text text-transparent hover:opacity-90"
        >
          {COPY.site.brand}
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main">
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {COPY.site.nav.pricing}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {COPY.site.nav.contactSupport}
          </Link>
          <a
            href={COPY.site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub (open source)"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
