"use client";

import { Navbar, Footer } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Trophy,
  Users,
  Clock,
  DollarSign,
  ArrowRight,
  Swords,
  Share2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TournamentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock tournament data
  const tournament = {
    id: params.id,
    name: "Valorant Champions 2026",
    game: "Valorant",
    format: "Double Elimination",
    status: "live",
    description:
      "The premier competitive Valorant tournament featuring the top teams from around the world. 16 teams compete for glory and a $500,000 prize pool.",
    startDate: "2026-05-15",
    endDate: "2026-06-20",
    prizePool: "$500,000",
    maxTeams: 32,
    registeredTeams: 28,
    entryFee: "$5,000",
    organizer: "NEXARENA Esports",
    location: "Los Angeles, USA",
    prizeBreakdown: [
      { placement: "1st Place", amount: "$200,000" },
      { placement: "2nd Place", amount: "$100,000" },
      { placement: "3rd-4th Place", amount: "$50,000 each" },
      { placement: "5th-8th Place", amount: "$20,000 each" },
    ],
  };

  const rules = [
    "All matches are Best of 3 (BO3) unless otherwise specified.",
    "Teams must register at least 7 days before the tournament start date.",
    "Roster changes are allowed up to 3 days before the tournament.",
    "Use of authorized game clients and settings only.",
    "No cheating, hacking, or exploiting glitches.",
    "Disputes must be filed within 24 hours of the match.",
    "Tournament organizer has final say on all decisions.",
  ];

  const registeredTeams = [
    { rank: 1, name: "Eternal Knights", seed: "1" },
    { rank: 2, name: "Phoenix Rising", seed: "2" },
    { rank: 3, name: "Dragon Force", seed: "3" },
    { rank: 4, name: "Void Legends", seed: "4" },
    { rank: 5, name: "Cosmic Legends", seed: "5" },
    { rank: 6, name: "Shadow Hunters", seed: "6" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Cover Banner */}
        <section className="relative h-64 bg-gradient-to-br from-primary/20 to-cyan/10 border-b border-border flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="glow-blob-violet absolute -top-32 -left-32 blur-3xl" />
          </div>
          <Trophy size={128} className="text-primary/40" />
        </section>

        {/* Tournament Header */}
        <section className="px-6 py-8 border-b border-border bg-background-surface/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-h1 font-display font-bold">
                    {tournament.name}
                  </h1>
                  <Badge
                    variant={
                      tournament.status === "live"
                        ? "live"
                        : tournament.status === "upcoming"
                        ? "upcoming"
                        : tournament.status === "cancelled"
                        ? "cancelled"
                        : "completed"
                    }
                  >
                    {tournament.status === "live"
                      ? "LIVE"
                      : tournament.status === "upcoming"
                      ? "SOON"
                      : "DONE"}
                  </Badge>
                </div>
                <p className="text-text-secondary">
                  {tournament.game} • {tournament.format}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="md">
                  <Share2 size={16} />
                  Share
                </Button>
                <Link href={`/tournaments/${params.id}/register`}>
                  <Button size="md">
                    <Users size={16} />
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-text-secondary text-sm mb-1">Prize Pool</p>
                <p className="text-h3 font-display font-bold text-accent-gold">
                  {tournament.prizePool}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Teams</p>
                <p className="text-h3 font-display font-bold">
                  {tournament.registeredTeams}/{tournament.maxTeams}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Entry Fee</p>
                <p className="text-h3 font-display font-bold">{tournament.entryFee}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Duration</p>
                <p className="text-h3 font-display font-bold">
                  {Math.ceil(
                    (new Date(tournament.endDate).getTime() -
                      new Date(tournament.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-6 border-b border-border sticky top-16 bg-background/80 backdrop-blur-md z-40">
          <div className="max-w-7xl mx-auto flex gap-8">
            {["overview", "bracket", "participants", "rules"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-h2 font-display font-bold mb-4">
                    Tournament Information
                  </h2>
                  <Card>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {tournament.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Organizer</p>
                        <p className="text-text-primary font-semibold">
                          {tournament.organizer}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Location</p>
                        <p className="text-text-primary font-semibold">
                          {tournament.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Start Date</p>
                        <p className="text-text-primary font-semibold">
                          {new Date(tournament.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">End Date</p>
                        <p className="text-text-primary font-semibold">
                          {new Date(tournament.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h2 className="text-h2 font-display font-bold mb-4">
                    Prize Distribution
                  </h2>
                  <div className="space-y-2">
                    {tournament.prizeBreakdown.map((prize, idx) => (
                      <Card key={idx} className="flex items-center justify-between">
                        <span className="text-text-primary font-semibold">
                          {prize.placement}
                        </span>
                        <span className="text-accent-gold font-mono font-bold text-lg">
                          {prize.amount}
                        </span>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bracket Tab */}
            {activeTab === "bracket" && (
              <div>
                <h2 className="text-h2 font-display font-bold mb-4">Bracket</h2>
                <Card className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Swords size={48} className="text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">
                      Bracket will be displayed once tournament starts
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {/* Participants Tab */}
            {activeTab === "participants" && (
              <div>
                <h2 className="text-h2 font-display font-bold mb-4">
                  Registered Teams
                </h2>
                <div className="space-y-2">
                  {registeredTeams.map((team) => (
                    <Card
                      key={team.rank}
                      className="flex items-center justify-between hover:bg-background-elevated"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                            team.rank === 1
                              ? "bg-accent-gold/20 text-accent-gold"
                              : team.rank === 2
                              ? "bg-accent-silver/20 text-accent-silver"
                              : team.rank === 3
                              ? "bg-accent-bronze/20 text-accent-bronze"
                              : "bg-background-elevated text-text-secondary"
                          }`}
                        >
                          {team.rank}
                        </div>
                        <div>
                          <p className="text-text-primary font-semibold">
                            {team.name}
                          </p>
                        </div>
                      </div>
                      <Badge>Seed #{team.seed}</Badge>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Rules Tab */}
            {activeTab === "rules" && (
              <div>
                <h2 className="text-h2 font-display font-bold mb-4">Rules</h2>
                <Card>
                  <ol className="space-y-3">
                    {rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="font-mono font-bold text-primary flex-shrink-0">
                          {idx + 1}.
                        </span>
                        <span className="text-text-secondary">{rule}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
