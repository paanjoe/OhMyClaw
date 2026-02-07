import Link from "next/link";
import { COPY } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-8">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className="text-sm text-muted-foreground">
            {COPY.footer.builtBy}
          </p>
          <p className="text-xs text-muted-foreground/80">
            {COPY.footer.openSource} · {COPY.footer.privacyFirst}
          </p>
        </div>
        <Link
          href="/contact"
          className="text-sm text-primary hover:underline"
        >
          {COPY.footer.contactSupport}
        </Link>
      </div>
    </footer>
  );
}
