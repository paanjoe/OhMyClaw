import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-bold">Contact Support</h1>
      <p className="mt-2 text-muted-foreground">
        Need help? Reach out and we&apos;ll get back to you.
      </p>
      <Link
        href="/"
        className="mt-8 text-primary hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
