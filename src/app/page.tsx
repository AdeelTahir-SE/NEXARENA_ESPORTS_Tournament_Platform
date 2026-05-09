"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Trophy,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const games = [
    { name: "Valorant", emoji: "⚔️" },
    { name: "CS2", emoji: "🎮" },
    { name: "LoL", emoji: "👑" },
    { name: "Dota 2", emoji: "🌑" },
    { name: "OW2", emoji: "🎯" },
    { name: "Apex", emoji: "🚀" },
  ];

  const stats = [
    { label: "Active Tournaments", value: "2,847", icon: Trophy },
    { label: "Competing Players", value: "125K+", icon: Users },
    { label: "Total Prize Pool", value: "$5.2M", icon: TrendingUp },
  ];

  const steps = [
    {
      icon: Sparkles,
      number: "01",
      title: "Create Tournament",
      description: "Set up bracket formats, prize pools, and invite teams",
    },
    {
      icon: Trophy,
      number: "02",
      title: "Live Competition",
      description: "Real-time matches with instant bracket updates",
    },
    {
      icon: TrendingUp,
      number: "03",
      title: "Track & Earn",
      description: "Climb leaderboards and win prizes",
    },
  ];

  const featuredTournaments = [
    {
      id: 1,
      name: "Valorant Pro Championship",
      game: "Valorant",
      status: "live" as const,
      prizePool: "$500K",
      teams: "32/32",
      viewers: "45K",
    },
    {
      id: 2,
      name: "CS2 Masters Spring",
      game: "Counter-Strike 2",
      status: "upcoming" as const,
      prizePool: "$250K",
      teams: "24/32",
      viewers: "0",
    },
    {
      id: 3,
      name: "LoL World Series",
      game: "League of Legends",
      status: "live" as const,
      prizePool: "$1M",
      teams: "12/12",
      viewers: "120K",
    },
    {
      id: 4,
      name: "Dota 2 International",
      game: "Dota 2",
      status: "upcoming" as const,
      prizePool: "$750K",
      teams: "18/32",
      viewers: "0",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 md:py-40 lg:py-56 border-b border-border/50">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated gradient blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl opacity-30" />
            <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl opacity-20" />
          </div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #7C3AED 1px, transparent 1px), linear-gradient(#7C3AED 1px, transparent 1px)',
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-7xl mx-auto text-center">
            {/* Pre-heading Badge */}
            <div className="flex justify-center mb-6">
              <Badge variant="primary">
                <Sparkles size={14} />
                Welcome to Competitive Gaming
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-bold tracking-wider mb-6 leading-tight">
              The Future of <span className="text-gradient-primary">Esports</span>
            </h1>

            {/* Subheading */}
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              Create, manage, and compete in tournaments across your favorite games.
              Real-time brackets, instant results, and a thriving competitive community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/tournaments">
                <Button size="lg" className="group">
                  Browse Tournaments
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/tournaments/create">
                <Button variant="secondary" size="lg">
                  <Zap size={20} />
                  Create Tournament
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Tournaments Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-14">
              <div className="inline-block mb-4">
                <Badge variant="primary">Featured</Badge>
              </div>
              <h2 className="text-h1 font-display font-bold tracking-wide mb-3">
                Live & Upcoming
              </h2>
              <p className="text-text-secondary text-body-lg">
                Top tournaments happening right now
              </p>
            </div>

            {/* Tournaments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredTournaments.map((tournament) => (
                <Link
                  key={tournament.id}
                  href={`/tournaments/${tournament.id}`}
                >
                  <Card hover className="relative overflow-hidden h-full group">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge
                        variant={
                          tournament.status === "live" ? "live" : "upcoming"
                        }
                      >
                        {tournament.status === "live" ? "LIVE" : "SOON"}
                      </Badge>
                    </div>

                    {/* Banner */}
                    <div className="aspect-video bg-gradient-to-br from-primary/30 to-cyan/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <Trophy
                        size={56}
                        className="text-primary/30 group-hover:text-primary/50 transition-colors"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-h3 font-display font-bold line-clamp-2">
                        {tournament.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <p className="text-text-secondary text-sm font-medium">
                          {tournament.game}
                        </p>
                        {tournament.viewers && tournament.status === "live" && (
                          <p className="text-status-live text-xs font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-status-live animate-pulse" />
                            {tournament.viewers} watching
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-text-secondary text-xs font-medium">
                            Prize Pool
                          </span>
                          <span className="text-accent-gold font-mono font-bold">
                            {tournament.prizePool}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary text-xs font-medium">
                            Teams
                          </span>
                          <span className="text-text-primary text-xs font-semibold">
                            {tournament.teams}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-10">
              <Link href="/tournaments">
                <Button variant="secondary">
                  View All Tournaments <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-20 bg-background-surface/50 border-y border-border/50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Badge variant="primary">Process</Badge>
              </div>
              <h2 className="text-h1 font-display font-bold tracking-wide mb-3">
                How It Works
              </h2>
              <p className="text-text-secondary text-body-lg">
                Get started in three simple steps
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Connector Line */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/4 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}

                  <Card className="h-full text-center">
                    {/* Number Badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 text-primary font-mono font-bold text-lg mb-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                      <step.icon
                        size={40}
                        className="text-primary/50 mx-auto group-hover:text-primary transition-colors"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-h3 font-display font-bold mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <Card key={idx} className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/20 text-primary mb-4">
                    <stat.icon size={28} />
                  </div>
                  <p className="text-5xl lg:text-6xl font-mono font-bold text-text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-text-secondary font-medium">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Games Section */}
        <section className="px-6 py-20 bg-background-surface/50 border-y border-border/50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-14">
              <div className="inline-block mb-4">
                <Badge variant="primary">Games</Badge>
              </div>
              <h2 className="text-h1 font-display font-bold tracking-wide mb-3">
                Supported Titles
              </h2>
              <p className="text-text-secondary text-body-lg">
                Tournaments for all your favorite games
              </p>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {games.map((game) => (
                <Card
                  key={game.name}
                  className="flex flex-col items-center justify-center py-8 group hover:border-primary"
                >
                  <div className="text-6xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  <p className="text-sm font-semibold text-text-primary text-center">
                    {game.name}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl p-12 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
              }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40" />
              </div>

              <div className="relative">
                <Badge variant="primary" className="mb-4">
                  For Organizers
                </Badge>
                <h2 className="text-h1 font-display font-bold tracking-wide mb-4">
                  Host Your Tournament
                </h2>
                <p className="text-text-secondary text-body-lg max-w-2xl mx-auto mb-8">
                  Build your competitive community. Create custom brackets, manage teams,
                  and distribute prizes with our powerful tournament platform.
                </p>
                <Link href="/tournaments/create">
                  <Button size="lg">
                    <Zap size={20} />
                    Create Tournament
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
