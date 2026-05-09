"use client";

import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Settings,
  Trophy,
  Swords,
  BarChart2,
  Users,
  Shield,
  LogOut,
  Edit2,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: "Pro_Legend",
    title: "Competitive Player",
    rank: 1,
    team: "Eternal Knights",
    totalEarnings: "$125,000",
    winRate: "82%",
    joinDate: "January 2024",
    avatar: "PL",
  };

  const stats = [
    { label: "Matches Played", value: "156", icon: Swords },
    { label: "Total Wins", value: "128", icon: Trophy },
    { label: "Tournaments", value: "24", icon: Users },
    { label: "Best Placement", value: "1st", icon: BarChart2 },
  ];

  const achievements = [
    { title: "Champion", description: "Won 5 tournaments" },
    { title: "Legendary", description: "Reached rank 1" },
    { title: "Team Leader", description: "Led 3 teams to victory" },
    { title: "Consistent", description: "Maintained 75%+ win rate" },
    { title: "Rise Up", description: "Climbed 50 ranks" },
    { title: "Showdown", description: "Won 10 consecutive matches" },
  ];

  const matchHistory = [
    {
      id: 1,
      opponent: "Phoenix Rising",
      tournament: "Valorant Cup #1",
      result: "WON",
      score: "2-1",
      date: "2026-05-15",
    },
    {
      id: 2,
      opponent: "Dragon Force",
      tournament: "Valorant Cup #1",
      result: "WON",
      score: "2-0",
      date: "2026-05-14",
    },
    {
      id: 3,
      opponent: "Void Legends",
      tournament: "Valorant Cup #1",
      result: "LOST",
      score: "1-2",
      date: "2026-05-13",
    },
    {
      id: 4,
      opponent: "Cosmic Legends",
      tournament: "Spring Split",
      result: "WON",
      score: "2-0",
      date: "2026-05-10",
    },
  ];

  const teams = [
    { name: "Eternal Knights", role: "Captain", joinDate: "Jan 2024" },
    { name: "Fire Masters", role: "Member", joinDate: "Mar 2024" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Profile Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar name={profile.name} size="lg" />
                <div>
                  <h1 className="text-h1 font-display font-bold mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-text-secondary mb-3">{profile.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Rank #{profile.rank}</Badge>
                    <Badge variant="gold">{profile.team}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                  <Edit2 size={16} />
                  Edit Profile
                </Button>
                <Button variant="secondary">
                  <Settings size={16} />
                  Settings
                </Button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div>
                <p className="text-text-secondary text-sm mb-1">Total Earnings</p>
                <p className="text-h3 font-display font-bold text-accent-gold">
                  {profile.totalEarnings}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Win Rate</p>
                <p className="text-h3 font-display font-bold text-primary">
                  {profile.winRate}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Current Team</p>
                <p className="text-h3 font-display font-bold">{profile.team}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Member Since</p>
                <p className="text-h3 font-display font-bold">{profile.joinDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-text-secondary text-sm font-semibold">
                      {stat.label}
                    </h3>
                    <stat.icon size={24} className="text-primary/50" />
                  </div>
                  <p className="text-4xl font-mono font-bold text-primary">
                    {stat.value}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="px-6 py-12 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, idx) => (
                <Card key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Trophy size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-text-primary font-semibold">
                      {achievement.title}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Active Teams */}
        <section className="px-6 py-12 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Your Teams</h2>
            <div className="space-y-3">
              {teams.map((team, idx) => (
                <Card key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="text-text-primary font-semibold">{team.name}</p>
                    <p className="text-text-secondary text-sm">
                      {team.role} • Joined {team.joinDate}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    View Team
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Match History */}
        <section className="px-6 py-12 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Recent Matches</h2>
            <Card className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-text-secondary text-sm font-semibold">
                      Opponent
                    </th>
                    <th className="text-left py-4 px-4 text-text-secondary text-sm font-semibold">
                      Tournament
                    </th>
                    <th className="text-center py-4 px-4 text-text-secondary text-sm font-semibold">
                      Score
                    </th>
                    <th className="text-center py-4 px-4 text-text-secondary text-sm font-semibold">
                      Result
                    </th>
                    <th className="text-right py-4 px-4 text-text-secondary text-sm font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matchHistory.map((match) => (
                    <tr
                      key={match.id}
                      className="border-b border-border last:border-0 hover:bg-background-elevated transition-colors"
                    >
                      <td className="py-4 px-4 text-text-primary font-semibold">
                        {match.opponent}
                      </td>
                      <td className="py-4 px-4 text-text-secondary">
                        {match.tournament}
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-bold text-text-primary">
                        {match.score}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant={match.result === "WON" ? "live" : "cancelled"}
                        >
                          {match.result}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right text-text-secondary text-sm">
                        {new Date(match.date).toLocaleDateString()}
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
