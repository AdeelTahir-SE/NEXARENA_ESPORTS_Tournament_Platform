"use client";

import { useEffect, useState, useCallback } from "react";
import { Navbar, Footer } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Trophy, Search, Zap, RefreshCw, AlertTriangle, Users } from "lucide-react";
import Link from "next/link";
import type { Tournament, TournamentStatus } from "@/types";

interface TournamentWithCount extends Tournament {
  team_count: number;
}

const GAME_OPTIONS = [
  { value: "valorant", label: "Valorant" },
  { value: "cs2", label: "Counter-Strike 2" },
  { value: "lol", label: "League of Legends" },
  { value: "dota2", label: "Dota 2" },
  { value: "apex", label: "Apex Legends" },
  { value: "overwatch2", label: "Overwatch 2" },
];

const FORMAT_OPTIONS = [
  { value: "single_elimination", label: "Single Elimination" },
  { value: "double_elimination", label: "Double Elimination" },
  { value: "round_robin", label: "Round Robin" },
];

const STATUS_OPTIONS = [
  { value: "live", label: "Live" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "draft", label: "Draft" },
];

function formatPrize(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount}`;
}

function statusBadgeVariant(status: TournamentStatus) {
  switch (status) {
    case "live": return "live";
    case "upcoming": return "upcoming";
    case "completed": return "completed";
    case "cancelled": return "cancelled";
    default: return "primary";
  }
}

function statusLabel(status: TournamentStatus) {
  switch (status) {
    case "live": return "LIVE";
    case "upcoming": return "SOON";
    case "completed": return "DONE";
    case "cancelled": return "CANCELLED";
    default: return status.toUpperCase();
  }
}

function formatLabel(format: string) {
  switch (format) {
    case "single_elimination": return "Single Elim";
    case "double_elimination": return "Double Elim";
    case "round_robin": return "Round Robin";
    default: return format;
  }
}

export default function TournamentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameFilter, setGameFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tournaments, setTournaments] = useState<TournamentWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTournaments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tournaments");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to fetch tournaments.");
      setTournaments(
        (json.data ?? []).map((t: Tournament) => ({
          ...t,
          team_count: 0, // will be enriched if needed
        }))
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load tournaments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const filtered = tournaments.filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.game.toLowerCase().includes(q);
    const matchesGame = !gameFilter || t.game.toLowerCase().replace(/\s+/g, "") === gameFilter.replace(/\s+/g, "");
    const matchesFormat = !formatFilter || t.format === formatFilter;
    const matchesStatus = !statusFilter || t.status === statusFilter;
    return matchesSearch && matchesGame && matchesFormat && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-3 mb-3">
              <Trophy size={32} className="text-primary" />
              <h1 className="text-h1 font-display font-bold">Tournaments</h1>
            </div>
            <p className="text-text-secondary">
              Browse active tournaments or create your own competitive event
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 py-8 border-b border-border sticky top-16 z-30 bg-background/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search tournaments or games…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search size={16} />}
                />
              </div>
              <Select
                placeholder="All games"
                options={GAME_OPTIONS}
                value={gameFilter}
                onChange={(e) => setGameFilter(e.target.value)}
              />
              <Select
                placeholder="All formats"
                options={FORMAT_OPTIONS}
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
              />
              <Select
                placeholder="All statuses"
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                {loading ? "Loading…" : `${filtered.length} tournament${filtered.length !== 1 ? "s" : ""} found`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchTournaments}
                  className="w-8 h-8 rounded-md border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all"
                  title="Refresh"
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
                <Link href="/tournaments/create">
                  <Button>
                    <Zap size={16} />
                    Create Tournament
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {error ? (
              <div className="text-center py-16">
                <AlertTriangle size={48} className="text-status-cancelled mx-auto mb-4" />
                <h3 className="text-h3 font-display font-bold mb-2">Failed to load</h3>
                <p className="text-text-secondary mb-6">{error}</p>
                <Button onClick={fetchTournaments}>
                  <RefreshCw size={16} /> Retry
                </Button>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden">
                    <div className="aspect-video skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="w-3/4 h-5 skeleton rounded" />
                      <div className="w-1/2 h-4 skeleton rounded" />
                      <div className="w-1/3 h-4 skeleton rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <Trophy size={64} className="text-text-muted mx-auto mb-4 opacity-40" />
                <h3 className="text-h3 font-display font-bold mb-2">No tournaments found</h3>
                <p className="text-text-secondary mb-6">
                  {tournaments.length === 0
                    ? "No tournaments exist yet. Be the first to create one!"
                    : "Try adjusting your filters."}
                </p>
                <Link href="/tournaments/create">
                  <Button>Create Tournament</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((tournament) => (
                  <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
                    <Card hover className="h-full flex flex-col group">
                      {/* Banner */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-cyan/10 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <Trophy size={48} className="text-primary/40 group-hover:text-primary/60 transition-colors" />
                        <div className="absolute top-3 right-3">
                          <Badge variant={statusBadgeVariant(tournament.status)}>
                            {tournament.status === "live" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block mr-1" />
                            )}
                            {statusLabel(tournament.status)}
                          </Badge>
                        </div>
                        {tournament.entry_fee === 0 && (
                          <div className="absolute bottom-3 left-3">
                            <span className="text-xs px-2 py-0.5 rounded bg-status-live/20 text-status-live font-semibold border border-status-live/30">
                              FREE
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-h3 font-display font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {tournament.name}
                          </h3>
                        </div>
                        <p className="text-text-secondary text-sm capitalize">
                          {tournament.game} • {formatLabel(tournament.format)}
                        </p>

                        {tournament.prize_pool > 0 && (
                          <p className="text-accent-gold text-sm font-mono font-bold">
                            {formatPrize(tournament.prize_pool)} prize pool
                          </p>
                        )}

                        <div className="mt-auto pt-3 border-t border-border/50 space-y-2">
                          <div className="flex items-center justify-between text-xs text-text-secondary">
                            <span className="flex items-center gap-1">
                              <Users size={12} /> Teams
                            </span>
                            <span className="font-semibold text-text-primary">
                              {tournament.team_count}/{tournament.max_teams}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all"
                              style={{
                                width: `${Math.min((tournament.team_count / tournament.max_teams) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          {tournament.entry_fee > 0 && (
                            <p className="text-xs text-text-muted text-right">
                              Entry: ${tournament.entry_fee}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
