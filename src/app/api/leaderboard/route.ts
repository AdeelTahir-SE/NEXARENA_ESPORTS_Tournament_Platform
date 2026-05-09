import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game = searchParams.get("game");

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("leaderboard_entries")
    .select("id,user_id,game,points,wins,losses,tournaments_played,best_placement,updated_at")
    .order("points", { ascending: false })
    .order("wins", { ascending: false });

  if (game && game !== "global") {
    query = query.eq("game", game);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
