"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, LogOut } from "lucide-react";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

export function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" }).then(() => {
      setUser(null);
      window.location.href = "/";
    });
  };

  return (
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
      {loading ? (
        <span className="h-8 w-8 animate-pulse rounded-full bg-muted" aria-hidden />
      ) : user ? (
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
              />
            ) : (
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary"
                )}
              >
                {user.email.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="hidden max-w-[120px] truncate text-foreground sm:inline">
              {user.name || user.email}
            </span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={COPY.site.nav.signOut}
          >
            <LogOut className="h-4 w-4" />
            {COPY.site.nav.signOut}
          </button>
        </div>
      ) : (
        <a
          href={`${API_URL}/auth/google`}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {COPY.site.nav.signIn}
        </a>
      )}
    </nav>
  );
}
