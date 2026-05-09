import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game = searchParams.get("game");
  const limit = parseInt(searchParams.get("limit") ?? "50", 10);

  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("leaderboard_entries")
    .select(
      `id,
       user_id,
       game,
       points,
       wins,
       losses,
       tournaments_played,
       best_placement,
       updated_at,
       profiles:user_id ( username, full_name, avatar_url )`
    )
    .order("points", { ascending: false })
    .order("wins", { ascending: false })
    .limit(limit);

  if (game && game !== "global") {
    query = query.eq("game", game);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Flatten profile join
  const rows = (data ?? []).map((row: Record<string, unknown>) => {
    const profile = row.profiles as { username?: string; full_name?: string; avatar_url?: string } | null;
    return {
      id: row.id,
      user_id: row.user_id,
      game: row.game,
      points: row.points,
      wins: row.wins,
      losses: row.losses,
      tournaments_played: row.tournaments_played,
      best_placement: row.best_placement,
      updated_at: row.updated_at,
      username: profile?.username ?? null,
      full_name: profile?.full_name ?? null,
      avatar_url: profile?.avatar_url ?? null,
    };
  });

  return NextResponse.json({ data: rows });
}
