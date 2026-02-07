"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COPY } from "@/lib/copy";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-muted-foreground">You are not signed in.</p>
        <Link href="/" className="text-primary hover:underline">
          {COPY.dashboard.backToHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-2xl font-bold">{COPY.dashboard.title}</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as <strong className="text-foreground">{user.email}</strong>
      </p>
      <p className="mt-6 text-muted-foreground">{COPY.dashboard.welcome}</p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        {COPY.dashboard.backToHome}
      </Link>
    </div>
  );
}
