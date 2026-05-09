"use client";

import { useEffect, useState, useCallback } from "react";
import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { BarChart2, Trophy, Medal, RefreshCw, AlertTriangle, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  user_id: string;
  game: string;
  points: number;
  wins: number;
  losses: number;
  tournaments_played: number;
  best_placement: number | null;
  updated_at: string;
  // joined from profiles
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
}

const GAME_FILTERS = [
  { value: "global", label: "Global" },
  { value: "valorant", label: "VALORANT" },
  { value: "cs2", label: "CS2" },
  { value: "lol", label: "LoL" },
  { value: "dota2", label: "Dota 2" },
  { value: "apex", label: "Apex" },
];

function getMedalIcon(rank: number) {
  if (rank === 1) return <Trophy size={20} className="text-accent-gold" />;
  if (rank === 2) return <Medal size={20} className="text-accent-silver" />;
  if (rank === 3) return <Medal size={20} className="text-accent-bronze" />;
  return null;
}

function getRankColor(rank: number) {
  if (rank === 1) return "text-accent-gold";
  if (rank === 2) return "text-accent-silver";
  if (rank === 3) return "text-accent-bronze";
  return "text-text-secondary";
}

function getDisplayName(entry: LeaderboardEntry) {
  return entry.username ?? entry.full_name ?? `Player ${entry.user_id.slice(0, 6)}`;
}

export default function LeaderboardPage() {
  const [selectedGame, setSelectedGame] = useState("global");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaderboard = useCallback(async (game: string) => {
    setLoading(true);
    setError("");
    try {
      const params = game !== "global" ? `?game=${encodeURIComponent(game)}` : "";
      const res = await fetch(`/api/leaderboard${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to fetch leaderboard.");
      setEntries(json.data ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard(selectedGame);
  }, [selectedGame, fetchLeaderboard]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  const SkeletonRow = () => (
    <tr className="border-b border-border">
      {[...Array(7)].map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 skeleton rounded w-full" />
        </td>
      ))}
    </tr>
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 rounded-full blur-3xl opacity-40" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-3 mb-3">
              <BarChart2 size={32} className="text-primary" />
              <h1 className="text-h1 font-display font-bold">Leaderboard</h1>
            </div>
            <p className="text-text-secondary">
              The top competitive players ranked by points across all games
            </p>
          </div>
        </section>

        {/* Game Filters */}
        <section className="px-6 py-5 border-b border-border bg-background-surface/30 sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide items-center justify-between">
              <div className="flex gap-2">
                {GAME_FILTERS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setSelectedGame(g.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                      selectedGame === g.value
                        ? "bg-primary text-white shadow-glow-primary"
                        : "bg-background-surface border border-border text-text-secondary hover:border-primary/50 hover:text-text-primary"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => fetchLeaderboard(selectedGame)}
                className="w-8 h-8 rounded-md border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all flex-shrink-0"
                title="Refresh"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </section>

        {error ? (
          <div className="flex-1 flex items-center justify-center py-24 px-6">
            <div className="text-center">
              <AlertTriangle size={48} className="text-status-cancelled mx-auto mb-4" />
              <h2 className="text-h2 font-display font-bold mb-2">Failed to load</h2>
              <p className="text-text-secondary mb-6">{error}</p>
              <Button onClick={() => fetchLeaderboard(selectedGame)}>
                <RefreshCw size={16} /> Retry
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Podium — Top 3 */}
            <section className="px-6 py-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp size={22} className="text-primary" />
                  <h2 className="text-h2 font-display font-bold">Top Competitors</h2>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-64 skeleton rounded-xl" />
                    ))}
                  </div>
                ) : top3.length === 0 ? (
                  <Card className="text-center py-16 mb-12">
                    <Trophy size={64} className="text-text-muted mx-auto mb-4 opacity-30" />
                    <p className="text-text-secondary">No data yet for this category.</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {top3.map((player, idx) => {
                      const rank = idx + 1;
                      const medalBorder =
                        rank === 1
                          ? "border-accent-gold"
                          : rank === 2
                          ? "border-accent-silver"
                          : "border-accent-bronze";
                      const displayName = getDisplayName(player);
                      const winRate =
                        player.wins + player.losses > 0
                          ? Math.round((player.wins / (player.wins + player.losses)) * 100)
                          : 0;

                      return (
                        <Card
                          key={player.id}
                          className={`h-full text-center border-2 ${medalBorder} relative overflow-hidden`}
                        >
                          {rank === 1 && (
                            <div className="absolute inset-0 bg-accent-gold/5 pointer-events-none" />
                          )}
                          <div className="relative mb-4">
                            <div className="flex justify-center mb-3">
                              {getMedalIcon(rank)}
                            </div>
                            <Avatar
                              name={displayName}
                              src={player.avatar_url ?? undefined}
                              size="lg"
                              className="mx-auto"
                            />
                            <h3 className="text-h3 font-display font-bold mt-4 mb-1">
                              {displayName}
                            </h3>
                            <p className="text-text-secondary text-sm capitalize mb-4">
                              {player.game} player
                            </p>
                          </div>

                          <div className={`text-5xl font-mono font-bold ${getRankColor(rank)} mb-4`}>
                            #{rank}
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-2xl font-mono font-bold text-primary">{player.wins}</p>
                              <p className="text-xs text-text-secondary">Wins</p>
                            </div>
                            <div>
                              <p className="text-2xl font-mono font-bold text-primary">
                                {player.tournaments_played}
                              </p>
                              <p className="text-xs text-text-secondary">Tourneys</p>
                            </div>
                            <div>
                              <p className="text-2xl font-mono font-bold text-primary">{winRate}%</p>
                              <p className="text-xs text-text-secondary">Win Rate</p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-border/50">
                            <p className="text-accent-gold font-mono font-bold text-lg">
                              {player.points.toLocaleString()} pts
                            </p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Full Rankings Table */}
            <section className="px-6 py-12 border-t border-border">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-h2 font-display font-bold mb-6">Full Rankings</h2>
                <Card className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Rank", "Player", "Game", "Matches", "Wins", "Win Rate", "Points"].map(
                          (col) => (
                            <th
                              key={col}
                              className={`py-4 px-4 text-text-secondary text-sm font-semibold ${
                                col === "Rank" || col === "Player" ? "text-left" : "text-center"
                              } ${col === "Points" ? "text-right" : ""}`}
                            >
                              {col}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        [...Array(8)].map((_, i) => <SkeletonRow key={i} />)
                      ) : entries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-16 text-center text-text-secondary">
                            No entries for this category yet.
                          </td>
                        </tr>
                      ) : (
                        entries.map((player, idx) => {
                          const rank = idx + 1;
                          const displayName = getDisplayName(player);
                          const winRate =
                            player.wins + player.losses > 0
                              ? Math.round((player.wins / (player.wins + player.losses)) * 100)
                              : 0;
                          const totalMatches = player.wins + player.losses;

                          return (
                            <tr
                              key={player.id}
                              className={`border-b border-border last:border-0 hover:bg-background-elevated transition-colors ${
                                rank <= 3 ? "bg-background-elevated/30" : ""
                              }`}
                            >
                              <td
                                className={`py-4 px-4 font-mono font-bold text-lg ${getRankColor(rank)}`}
                              >
                                {rank <= 3 ? getMedalIcon(rank) : `#${rank}`}
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    name={displayName}
                                    src={player.avatar_url ?? undefined}
                                    size="xs"
                                  />
                                  <span className="font-semibold text-text-primary">{displayName}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <Badge variant="primary" className="capitalize text-xs">
                                  {player.game}
                                </Badge>
                              </td>
                              <td className="py-4 px-4 text-center text-text-secondary">
                                {totalMatches}
                              </td>
                              <td className="py-4 px-4 text-center text-text-secondary">
                                {player.wins}
                              </td>
                              <td className="py-4 px-4 text-center font-mono font-bold text-primary">
                                {winRate}%
                              </td>
                              <td className="py-4 px-4 text-right font-mono font-bold text-accent-gold">
                                {player.points.toLocaleString()}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
