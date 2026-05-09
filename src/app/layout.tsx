import type { Metadata } from "next";
import { Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXARENA — Esports Tournament Platform",
  description:
    "Create, manage, and compete in esports tournaments across multiple game titles. Real-time brackets, team management, and live leaderboards.",
  keywords: ["esports", "tournament", "gaming", "bracket", "leaderboard", "competitive gaming"],
  openGraph: {
    title: "NEXARENA — Esports Tournament Platform",
    description: "Compete in esports tournaments with real-time brackets and live leaderboards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
