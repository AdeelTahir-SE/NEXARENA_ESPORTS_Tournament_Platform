"use client";

import  Navbar  from "@/components/shared/Navbar";
import  Footer  from "@/components/shared/Footer";
import Button from "@/components/ui/Button";
import { Trophy, Users, Zap, ArrowRight, TrendingUp, Users2, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const games = [
    { name: "Valorant", icon: "⚔️" },
    { name: "Counter-Strike 2", icon: "🎮" },
    { name: "League of Legends", icon: "👑" },
    { name: "Dota 2", icon: "🌑" },
    { name: "Overwatch 2", icon: "🎯" },
    { name: "Apex Legends", icon: "🚀" },
  ];

  const stats = [
    { label: "Active Tournaments", value: "2,847" },
    { label: "Players Competing", value: "125K+" },
    { label: "Prize Pools", value: "$5.2M" },
  ];

  const steps = [
    {
      number: "01",
      title: "Create or Join",
      description: "Organizers create tournaments, players register with a single click.",
    },
    {
      number: "02",
      title: "Play & Progress",
      description: "Compete in real-time with live bracket updates and instant scoring.",
    },
    {
      number: "03",
      title: "Rise to Glory",
      description: "Climb the leaderboards, earn rewards, and build your legacy.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-32 md:py-48">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="glow-blob-violet absolute -top-32 -left-32 blur-3xl" />
            <div className="glow-blob-cyan absolute top-1/3 right-0 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-hero font-display font-bold tracking-wider mb-6">
                The Future of Esports
              </h1>
              <p className="text-body-lg text-text-secondary mb-10">
                Create, manage, and compete in tournaments across your favorite games. Real-time brackets, instant results, and a thriving competitive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tournaments">
                  <Button size="lg">
                    Browse Tournaments <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link href="/tournaments/create">
                  <Button variant="secondary" size="lg">
                    Create Tournament
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tournaments */}
        <section className="px-6 py-16 bg-background-surface/50 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-h1 font-display font-bold tracking-wide mb-2">
                Featured Tournaments
              </h2>
              <p className="text-text-secondary">
                Upcoming tournaments with massive prize pools
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-background-surface border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-glow-primary transition-all duration-200 group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-cyan/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-cyan/20 transition-all">
                    <Trophy size={48} className="text-primary/40" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-h3 font-display font-bold">Valorant Cup #{i}</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-status-live/15 text-status-live text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-status-live animate-pulse" />
                        LIVE
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">5v5 Team Battle</p>
                    <p className="text-primary text-sm font-mono font-bold">$50,000 Prize Pool</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h1 font-display font-bold tracking-wide mb-2">
                How It Works
              </h2>
              <p className="text-text-secondary text-body-lg">
                Get started in three simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="text-6xl font-display font-bold text-primary/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-h2 font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-16 bg-primary/5 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-5xl font-mono font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Games */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h1 font-display font-bold tracking-wide mb-2">
                Supported Games
              </h2>
              <p className="text-text-secondary">
                Tournaments for all your favorite titles
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {games.map((game) => (
                <div
                  key={game.name}
                  className="bg-background-surface border border-border rounded-xl p-6 text-center hover:border-primary hover:bg-background-elevated transition-all group cursor-pointer"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{game.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-6 py-16 bg-gradient-to-r from-primary/10 to-cyan/10 border-y border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h1 font-display font-bold tracking-wide mb-4">
              Ready to Organize?
            </h2>
            <p className="text-body-lg text-text-secondary mb-8">
              Host your own tournament and build a competitive community around your game.
            </p>
            <Link href="/tournaments/create">
              <Button size="lg" className="px-8">
                Create Tournament <Zap size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
