"use client";

import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { BarChart2, Trophy, Medal, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function LeaderboardPage() {
  const [selectedGame, setSelectedGame] = useState("global");

  const games = ["global", "valorant", "cs2", "lol", "dota2"];

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Pro_Legend",
      team: "Eternal Knights",
      matches: 156,
      wins: 128,
      points: 4850,
      medal: "gold",
    },
    {
      rank: 2,
      name: "Shadow.Elite",
      team: "Phoenix Rising",
      matches: 142,
      wins: 118,
      points: 4620,
      medal: "silver",
    },
    {
      rank: 3,
      name: "Storm_Master",
      team: "Dragon Force",
      matches: 138,
      wins: 112,
      points: 4380,
      medal: "bronze",
    },
    {
      rank: 4,
      name: "Apex_Hunter",
      team: "Void Legends",
      matches: 135,
      wins: 108,
      points: 4120,
      medal: null,
    },
    {
      rank: 5,
      name: "Nova_Strike",
      team: "Cosmic Legends",
      matches: 128,
      wins: 102,
      points: 3950,
      medal: null,
    },
    {
      rank: 6,
      name: "Titan_Void",
      team: "Shadow Hunters",
      matches: 125,
      wins: 98,
      points: 3780,
      medal: null,
    },
    {
      rank: 7,
      name: "Blaze_King",
      team: "Fire Masters",
      matches: 120,
      wins: 94,
      points: 3650,
      medal: null,
    },
    {
      rank: 8,
      name: "Frost_Queen",
      team: "Ice Dynasty",
      matches: 118,
      wins: 91,
      points: 3520,
      medal: null,
    },
  ];

  const getMedalIcon = (medal: string | null) => {
    switch (medal) {
      case "gold":
        return <Trophy size={20} className="text-accent-gold" />;
      case "silver":
        return <Medal size={20} className="text-accent-silver" />;
      case "bronze":
        return <Medal size={20} className="text-accent-bronze" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-accent-gold";
      case 2:
        return "text-accent-silver";
      case 3:
        return "text-accent-bronze";
      default:
        return "text-text-secondary";
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
              <BarChart2 size={32} className="text-primary" />
              <h1 className="text-h1 font-display font-bold">Leaderboard</h1>
            </div>
            <p className="text-text-secondary">
              See the top competitive players and teams on NEXARENA
            </p>
          </div>
        </section>

        {/* Game Filters */}
        <section className="px-6 py-6 border-b border-border bg-background-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {games.map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedGame === game
                      ? "bg-primary text-white"
                      : "bg-background-surface border border-border text-text-secondary hover:border-primary"
                  }`}
                >
                  {game === "global" ? "Global" : game.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Podium - Top 3 */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-8">Top Competitors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {leaderboardData.slice(0, 3).map((player, idx) => (
                <div key={player.rank}>
                  <Card
                    className={`h-full text-center border-2 ${
                      player.medal === "gold"
                        ? "border-accent-gold"
                        : player.medal === "silver"
                        ? "border-accent-silver"
                        : player.medal === "bronze"
                        ? "border-accent-bronze"
                        : "border-border"
                    }`}
                  >
                    <div className="mb-4">
                      {player.medal && (
                        <div className="flex justify-center mb-4">
                          {getMedalIcon(player.medal)}
                        </div>
                      )}
                      <Avatar name={player.name} size="lg" />
                      <h3 className="text-h3 font-display font-bold mt-4 mb-1">
                        {player.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4">{player.team}</p>
                    </div>

                    <div className={`text-5xl font-mono font-bold ${getRankColor(player.rank)} mb-4`}>
                      #{player.rank}
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-mono font-bold text-primary">
                            {player.wins}
                          </p>
                          <p className="text-xs text-text-secondary">Wins</p>
                        </div>
                        <div>
                          <p className="text-2xl font-mono font-bold text-primary">
                            {player.matches}
                          </p>
                          <p className="text-xs text-text-secondary">Matches</p>
                        </div>
                        <div>
                          <p className="text-2xl font-mono font-bold text-primary">
                            {Math.round((player.wins / player.matches) * 100)}%
                          </p>
                          <p className="text-xs text-text-secondary">Win Rate</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Leaderboard Table */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Full Rankings</h2>
            <Card className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-text-secondary text-sm font-semibold">
                      Rank
                    </th>
                    <th className="text-left py-4 px-4 text-text-secondary text-sm font-semibold">
                      Player
                    </th>
                    <th className="text-left py-4 px-4 text-text-secondary text-sm font-semibold">
                      Team
                    </th>
                    <th className="text-center py-4 px-4 text-text-secondary text-sm font-semibold">
                      Matches
                    </th>
                    <th className="text-center py-4 px-4 text-text-secondary text-sm font-semibold">
                      Wins
                    </th>
                    <th className="text-center py-4 px-4 text-text-secondary text-sm font-semibold">
                      Win Rate
                    </th>
                    <th className="text-right py-4 px-4 text-text-secondary text-sm font-semibold">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, idx) => (
                    <tr
                      key={player.rank}
                      className={`border-b border-border last:border-0 hover:bg-background-elevated transition-colors ${
                        player.rank <= 3
                          ? "bg-background-elevated/50"
                          : ""
                      }`}
                    >
                      <td
                        className={`py-4 px-4 font-mono font-bold text-lg ${getRankColor(
                          player.rank
                        )}`}
                      >
                        {player.medal && getMedalIcon(player.medal)}
                        {!player.medal && `#${player.rank}`}
                      </td>
                      <td className="py-4 px-4 font-semibold text-text-primary">
                        {player.name}
                      </td>
                      <td className="py-4 px-4 text-text-secondary">{player.team}</td>
                      <td className="py-4 px-4 text-center text-text-secondary">
                        {player.matches}
                      </td>
                      <td className="py-4 px-4 text-center text-text-secondary">
                        {player.wins}
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-bold text-primary">
                        {Math.round((player.wins / player.matches) * 100)}%
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-bold text-text-primary">
                        {player.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
