import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Trophy } from "lucide-react";
import Link from "next/link";

interface TournamentCardProps {
  id: number;
  name: string;
  game: string;
  format: string;
  status: "live" | "upcoming" | "completed";
  prizePool: string;
  teams: number;
  maxTeams: number;
}

export default function TournamentCard({
  id,
  name,
  game,
  format,
  status,
  prizePool,
  teams,
  maxTeams,
}: TournamentCardProps) {
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
    <Link href={`/tournaments/${id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-cyan/10 rounded-lg mb-4 flex items-center justify-center">
          <Trophy size={48} className="text-primary/40" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-h3 font-display font-bold line-clamp-2">
              {name}
            </h3>
            <Badge variant={getStatusBadgeVariant(status)}>
              {status === "live"
                ? "LIVE"
                : status === "upcoming"
                ? "SOON"
                : "DONE"}
            </Badge>
          </div>
          <p className="text-text-secondary text-sm">
            {game} • {format}
          </p>
          <p className="text-accent-gold text-sm font-mono font-bold">
            {prizePool}
          </p>
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
              <span>Teams registered</span>
              <span>
                {teams}/{maxTeams}
              </span>
            </div>
            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${(teams / maxTeams) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
