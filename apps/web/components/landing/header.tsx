import Link from "next/link";
import { COPY } from "@/lib/copy";
import { NavAuth } from "./nav-auth";

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
        <NavAuth />
      </div>
    </header>
  );
}
