"use client";

import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Shield, Trophy, Users, TrendingUp, Copy } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);

  const team = {
    id: params.id,
    name: "Eternal Knights",
    game: "Valorant",
    description: "A competitive Valorant team aiming for the highest rankings. We focus on teamwork, strategy, and continuous improvement.",
    founded: "January 2024",
    wins: 28,
    losses: 5,
    ranking: 1,
    tournaments: 12,
    inviteCode: "EK-2026-NEXARENA",
  };

  const members = [
    { id: "1", name: "Pro_Legend", role: "Captain", joined: "Jan 2024" },
    { id: "2", name: "Shadow.Elite", role: "IGL", joined: "Jan 2024" },
    { id: "3", name: "Storm_Master", role: "Duelist", joined: "Feb 2024" },
    { id: "4", name: "Apex_Hunter", role: "Sentinel", joined: "Mar 2024" },
    { id: "5", name: "Nova_Strike", role: "Controller", joined: "Mar 2024" },
  ];

  const tournaments = [
    { id: 1, name: "Valorant Champions 2026", placement: "1st", prize: "$50,000" },
    { id: 2, name: "Valorant Cup #1", placement: "2nd", prize: "$25,000" },
    { id: 3, name: "Spring Split", placement: "3rd", prize: "$10,000" },
  ];

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Shield size={32} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-h1 font-display font-bold">{team.name}</h1>
                    <p className="text-text-secondary">{team.game}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <Button variant="secondary">Edit Team</Button>
                <Button>Invite Player</Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-text-secondary text-sm mb-1">Win Rate</p>
                <p className="text-h3 font-display font-bold">
                  {Math.round((team.wins / (team.wins + team.losses)) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Ranking</p>
                <p className="text-h3 font-display font-bold text-primary">
                  #{team.ranking}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Tournaments</p>
                <p className="text-h3 font-display font-bold">{team.tournaments}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Founded</p>
                <p className="text-h3 font-display font-bold">{team.founded}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Invite Code */}
        <section className="px-6 py-6 border-b border-border bg-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-text-secondary mb-1">Invite Code</p>
                <p className="font-mono font-bold text-text-primary">
                  {team.inviteCode}
                </p>
              </div>
              <button
                onClick={copyInviteCode}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* About */}
            <div className="mb-12">
              <h2 className="text-h2 font-display font-bold mb-4">About</h2>
              <Card>
                <p className="text-text-secondary leading-relaxed">{team.description}</p>
              </Card>
            </div>

            {/* Members */}
            <div className="mb-12">
              <h2 className="text-h2 font-display font-bold mb-4">Team Members</h2>
              <div className="space-y-2">
                {members.map((member) => (
                  <Card
                    key={member.id}
                    className="flex items-center justify-between hover:bg-background-elevated"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} size="sm" />
                      <div>
                        <p className="text-text-primary font-semibold">
                          {member.name}
                        </p>
                        <p className="text-text-secondary text-sm">
                          {member.role} • Joined {member.joined}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tournament History */}
            <div>
              <h2 className="text-h2 font-display font-bold mb-4">
                Tournament History
              </h2>
              <div className="space-y-2">
                {tournaments.map((tournament) => (
                  <Card
                    key={tournament.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-text-primary font-semibold">
                        {tournament.name}
                      </p>
                      <p className="text-text-secondary text-sm">
                        Placement: {tournament.placement}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-accent-gold font-mono font-bold">
                        {tournament.prize}
                      </p>
                      <Badge variant="gold">Prize Won</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
