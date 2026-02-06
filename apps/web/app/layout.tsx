import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OhMyClaw — Deploy OpenClaw under 1 Minute",
  description:
    "Avoid all technical complexity and one click deploy your own 24/7 active OpenClaw instance under 1 minute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
