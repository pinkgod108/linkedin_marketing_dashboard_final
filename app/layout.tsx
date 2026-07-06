import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkedIn Marketing Dashboard",
  description:
    "A friendly dashboard tracking LinkedIn post performance for the Summer of AI GTM learning project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream font-sans">{children}</body>
    </html>
  );
}
