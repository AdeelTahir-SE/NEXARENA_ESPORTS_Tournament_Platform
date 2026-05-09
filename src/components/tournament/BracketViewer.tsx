"use client";

import Card from "@/components/ui/Card";
import { ChevronRight } from "lucide-react";

interface Match {
  id: string;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  winner?: string;
}

interface BracketRound {
  name: string;
  matches: Match[];
}

interface BracketViewerProps {
  rounds: BracketRound[];
}

export default function BracketViewer({ rounds }: BracketViewerProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-8 min-w-max p-6">
        {rounds.map((round, roundIdx) => (
          <div key={roundIdx} className="w-64 flex-shrink-0">
            <h3 className="text-sm font-semibold text-text-secondary mb-4 px-4">
              {round.name}
            </h3>
            <div className="space-y-6">
              {round.matches.map((match) => (
                <div key={match.id} className="relative">
                  <Card
                    className={`p-3 ${
                      match.winner
                        ? "border-primary/50"
                        : "border-border"
                    }`}
                  >
                    {/* Team 1 */}
                    <div
                      className={`pb-2 border-b border-border mb-2 ${
                        match.winner === match.team1
                          ? "bg-primary/10 rounded px-2 py-1"
                          : ""
                      }`}
                    >
                      <p className="text-text-primary font-semibold text-sm truncate">
                        {match.team1}
                      </p>
                      {match.score1 !== undefined && (
                        <p className="text-primary font-mono text-lg">
                          {match.score1}
                        </p>
                      )}
                    </div>

                    {/* Team 2 */}
                    <div
                      className={`pt-2 ${
                        match.winner === match.team2
                          ? "bg-primary/10 rounded px-2 py-1"
                          : ""
                      }`}
                    >
                      <p className="text-text-primary font-semibold text-sm truncate">
                        {match.team2}
                      </p>
                      {match.score2 !== undefined && (
                        <p className="text-primary font-mono text-lg">
                          {match.score2}
                        </p>
                      )}
                    </div>
                  </Card>

                  {/* Connector line */}
                  {roundIdx < rounds.length - 1 && (
                    <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-border translate-y-[-1px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
