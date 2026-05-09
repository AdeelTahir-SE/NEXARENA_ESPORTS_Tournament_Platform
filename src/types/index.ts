export type UserRole = "player" | "organizer" | "admin";
export type TournamentStatus = "draft" | "upcoming" | "live" | "completed" | "cancelled";
export type TournamentFormat = "single_elimination" | "double_elimination" | "round_robin";
export type MatchStatus = "scheduled" | "live" | "completed" | "disputed";

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
}

export interface Team {
  id: string;
  name: string;
  tag: string | null;
  primary_game: string;
  owner_id: string;
  description: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  game: string;
  format: TournamentFormat;
  status: TournamentStatus;
  prize_pool: number;
  max_teams: number;
  entry_fee: number;
}

export interface Match {
  id: string;
  tournament_id: string;
  round_number: number;
  status: MatchStatus;
}
