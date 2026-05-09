"use client";

import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useState } from "react";
import { Users, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterTournamentPage({
  params,
}: {
  params: { id: string };
}) {
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState("");

  const userTeams = [
    { id: "1", name: "Eternal Knights", members: 5 },
    { id: "2", name: "Shadow Team", members: 4 },
  ];

  const handleRegister = () => {
    if (step === 1 && selectedTeam) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-h1 font-display font-bold mb-2">
              Tournament Registration
            </h1>
            <p className="text-text-secondary">
              Register your team for Valorant Champions 2026
            </p>
          </div>
        </section>

        {/* Stepper */}
        <section className="px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 md:gap-4 justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1">
                  <div
                    className={`h-2 rounded-full mb-2 ${
                      s <= step
                        ? "bg-primary"
                        : "bg-border"
                    }`}
                  />
                  <p className={`text-xs font-semibold ${
                    s <= step ? "text-primary" : "text-text-secondary"
                  }`}>
                    {s === 1 ? "Select Team" : s === 2 ? "Confirm Details" : "Complete"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Select Team */}
            {step === 1 && (
              <Card>
                <h2 className="text-h2 font-display font-bold mb-6">Select Team</h2>
                <div className="space-y-3 mb-6">
                  {userTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => setSelectedTeam(team.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTeam === team.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold text-text-primary">{team.name}</p>
                      <p className="text-sm text-text-secondary">
                        {team.members} members
                      </p>
                    </button>
                  ))}
                </div>
                <p className="text-text-secondary text-sm mb-6">
                  Don't have a team?{" "}
                  <Link href="/teams" className="text-primary hover:underline">
                    Create one now
                  </Link>
                </p>
                <div className="flex gap-3">
                  <Link href={`/tournaments/${params.id}`} className="flex-1">
                    <Button variant="secondary" fullWidth>
                      Cancel
                    </Button>
                  </Link>
                  <button className="flex-1" onClick={handleRegister}>
                    <Button fullWidth disabled={!selectedTeam}>
                      Continue
                    </Button>
                  </button>
                </div>
              </Card>
            )}

            {/* Step 2: Confirm Details */}
            {step === 2 && (
              <Card>
                <h2 className="text-h2 font-display font-bold mb-6">
                  Confirm Registration
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="bg-background-elevated rounded-lg p-4">
                    <p className="text-text-secondary text-sm mb-1">Team</p>
                    <p className="text-text-primary font-semibold">
                      {userTeams.find((t) => t.id === selectedTeam)?.name}
                    </p>
                  </div>
                  <div className="bg-background-elevated rounded-lg p-4">
                    <p className="text-text-secondary text-sm mb-1">Tournament</p>
                    <p className="text-text-primary font-semibold">
                      Valorant Champions 2026
                    </p>
                  </div>
                  <div className="bg-background-elevated rounded-lg p-4">
                    <p className="text-text-secondary text-sm mb-1">Entry Fee</p>
                    <p className="text-text-primary font-mono font-bold">$5,000</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-6">
                  By confirming, you agree to the tournament rules and terms of service.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1" onClick={() => setStep(1)}>
                    <Button variant="secondary" fullWidth>
                      Back
                    </Button>
                  </button>
                  <button className="flex-1" onClick={handleRegister}>
                    <Button fullWidth>Confirm Registration</Button>
                  </button>
                </div>
              </Card>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <Card className="text-center">
                <CheckCircle size={64} className="text-primary mx-auto mb-4" />
                <h2 className="text-h2 font-display font-bold mb-2">
                  Registration Complete!
                </h2>
                <p className="text-text-secondary mb-8">
                  Your team has been successfully registered for the tournament.
                </p>
                <div className="bg-background-elevated rounded-lg p-4 mb-6 text-left">
                  <p className="text-text-secondary text-sm mb-1">Next Steps</p>
                  <ul className="space-y-2 text-text-primary text-sm">
                    <li>✓ View bracket when tournament starts</li>
                    <li>✓ Check match schedules</li>
                    <li>✓ Submit scores after each match</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Link href={`/tournaments/${params.id}`} className="flex-1">
                    <Button variant="secondary" fullWidth>
                      View Tournament
                    </Button>
                  </Link>
                  <Link href="/tournaments" className="flex-1">
                    <Button fullWidth>Browse More</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
