"use client";

import { Navbar, Footer } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Trophy, Search, Filter, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TournamentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameFilter, setGameFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const games = [
    { value: "valorant", label: "Valorant" },
    { value: "cs2", label: "Counter-Strike 2" },
    { value: "lol", label: "League of Legends" },
    { value: "dota2", label: "Dota 2" },
  ];

  const formats = [
    { value: "single", label: "Single Elimination" },
    { value: "double", label: "Double Elimination" },
    { value: "roundrobin", label: "Round Robin" },
  ];

  const statuses = [
    { value: "live", label: "Live" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
  ];

  // Mock tournaments data
  const tournaments = [
    {
      id: 1,
      name: "Valorant Champions 2026",
      game: "Valorant",
      format: "Double Elimination",
      status: "live",
      prizePool: "$500,000",
      teams: 32,
      maxTeams: 32,
    },
    {
      id: 2,
      name: "CS2 Masters",
      game: "Counter-Strike 2",
      format: "Single Elimination",
      status: "upcoming",
      prizePool: "$250,000",
      teams: 16,
      maxTeams: 32,
    },
    {
      id: 3,
      name: "LoL World Series",
      game: "League of Legends",
      format: "Round Robin",
      status: "live",
      prizePool: "$1,000,000",
      teams: 8,
      maxTeams: 12,
    },
    {
      id: 4,
      name: "Dota 2 International",
      game: "Dota 2",
      format: "Double Elimination",
      status: "upcoming",
      prizePool: "$750,000",
      teams: 18,
      maxTeams: 32,
    },
    {
      id: 5,
      name: "Valorant Regional",
      game: "Valorant",
      format: "Single Elimination",
      status: "completed",
      prizePool: "$100,000",
      teams: 24,
      maxTeams: 32,
    },
    {
      id: 6,
      name: "CS2 Community Cup",
      game: "Counter-Strike 2",
      format: "Round Robin",
      status: "live",
      prizePool: "$50,000",
      teams: 12,
      maxTeams: 16,
    },
  ];

  const filteredTournaments = tournaments.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = !gameFilter || t.game.toLowerCase() === gameFilter;
    const matchesFormat =
      !formatFilter ||
      (formatFilter === "single" &&
        t.format === "Single Elimination") ||
      (formatFilter === "double" &&
        t.format === "Double Elimination") ||
      (formatFilter === "roundrobin" &&
        t.format === "Round Robin");
    const matchesStatus = !statusFilter || t.status === statusFilter;

    return matchesSearch && matchesGame && matchesFormat && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "live":
        return "live";
      case "upcoming":
        return "upcoming";
      case "completed":
        return "completed";
      default:
        return "primary";
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Trophy size={32} className="text-primary" />
              <h1 className="text-h1 font-display font-bold">Tournaments</h1>
            </div>
            <p className="text-text-secondary">
              Browse active tournaments or create your own competitive event
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 py-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search tournaments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search size={16} />}
                />
              </div>
              <Select
                placeholder="Filter by game"
                options={games}
                value={gameFilter}
                onChange={(e) => setGameFilter(e.target.value)}
              />
              <Select
                placeholder="Filter by format"
                options={formats}
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
              />
              <Select
                placeholder="Filter by status"
                options={statuses}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                Showing {filteredTournaments.length} tournaments
              </p>
              <Link href="/tournaments/create">
                <Button>
                  <Zap size={16} />
                  Create Tournament
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {filteredTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTournaments.map((tournament) => (
                  <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
                    <Card hover className="h-full flex flex-col">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-cyan/10 rounded-lg mb-4 flex items-center justify-center">
                        <Trophy size={48} className="text-primary/40" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-h3 font-display font-bold line-clamp-2">
                            {tournament.name}
                          </h3>
                          <Badge variant={getStatusBadgeVariant(tournament.status)}>
                            {tournament.status === "live"
                              ? "LIVE"
                              : tournament.status === "upcoming"
                              ? "SOON"
                              : "DONE"}
                          </Badge>
                        </div>
                        <p className="text-text-secondary text-sm">
                          {tournament.game} • {tournament.format}
                        </p>
                        <p className="text-accent-gold text-sm font-mono font-bold">
                          {tournament.prizePool}
                        </p>
                        <div className="mt-auto pt-2">
                          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                            <span>Teams registered</span>
                            <span>
                              {tournament.teams}/{tournament.maxTeams}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${(tournament.teams / tournament.maxTeams) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Trophy size={64} className="text-text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-h3 font-display font-bold mb-2">
                  No tournaments found
                </h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters or create a new tournament
                </p>
                <Link href="/tournaments/create">
                  <Button>Create Tournament</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
