"use client";

import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Users, Shield, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TeamsPage() {
  const [teams] = useState([
    {
      id: "1",
      name: "Eternal Knights",
      game: "Valorant",
      members: 5,
      maxMembers: 5,
      wins: 28,
      losses: 5,
      tournaments: 12,
      ranking: 1,
      owner: "You",
    },
    {
      id: "2",
      name: "Shadow Team",
      game: "Counter-Strike 2",
      members: 4,
      maxMembers: 5,
      wins: 18,
      losses: 8,
      tournaments: 8,
      ranking: 5,
      owner: "Pro_Legend",
    },
    {
      id: "3",
      name: "Fire Masters",
      game: "League of Legends",
      members: 5,
      maxMembers: 5,
      wins: 22,
      losses: 6,
      tournaments: 10,
      ranking: 3,
      owner: "You",
    },
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users size={32} className="text-primary" />
                <h1 className="text-h1 font-display font-bold">Teams</h1>
              </div>
              <p className="text-text-secondary">
                Manage and view all your competitive teams
              </p>
            </div>
            <Link href="/teams/create">
              <Button>Create Team</Button>
            </Link>
          </div>
        </section>

        {/* Teams Grid */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <Link key={team.id} href={`/teams/${team.id}`}>
                    <Card hover className="h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-h3 font-display font-bold mb-1">
                            {team.name}
                          </h3>
                          <p className="text-text-secondary text-sm">{team.game}</p>
                        </div>
                        {team.owner === "You" && (
                          <Shield size={20} className="text-primary" />
                        )}
                      </div>

                      {/* Members */}
                      <div className="mb-4">
                        <p className="text-text-secondary text-xs mb-2">Members</p>
                        <div className="flex items-center mb-2">
                          {[...Array(Math.min(team.members, 3))].map((_, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background-surface flex items-center justify-center text-xs font-bold text-primary ml-2 first:ml-0"
                            >
                              +
                            </div>
                          ))}
                          {team.members > 3 && (
                            <span className="text-xs text-text-secondary ml-2">
                              +{team.members - 3} more
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary">
                          {team.members}/{team.maxMembers} members
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-background-elevated rounded-lg p-3 text-center">
                          <p className="text-lg font-mono font-bold text-primary">
                            {team.wins}W
                          </p>
                          <p className="text-xs text-text-secondary">Wins</p>
                        </div>
                        <div className="bg-background-elevated rounded-lg p-3 text-center">
                          <p className="text-lg font-mono font-bold text-primary">
                            #{team.ranking}
                          </p>
                          <p className="text-xs text-text-secondary">Rank</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button size="sm" variant="secondary" fullWidth>
                        View Team
                      </Button>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users size={64} className="text-text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-h3 font-display font-bold mb-2">No Teams Yet</h3>
                <p className="text-text-secondary mb-6">
                  Create your first team to start competing
                </p>
                <Link href="/teams/create">
                  <Button>Create Team</Button>
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
