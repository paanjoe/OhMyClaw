import Link from "next/link";
import { COPY } from "@/lib/copy";

export default function PricingPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-bold">{COPY.pricing.title}</h1>
      <p className="mt-2 text-muted-foreground">
        {COPY.pricing.description}
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        {COPY.pricing.comingSoon}
      </p>
      <Link href="/" className="mt-8 text-primary hover:underline">
        {COPY.pricing.backToHome}
      </Link>
    </div>
  );
}
