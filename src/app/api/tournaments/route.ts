import { NextResponse } from "next/server";
import { createSupabaseRequestClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { tournamentCreateSchema } from "@/lib/validators/tournament";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tournaments")
    .select("id,name,game,format,status,prize_pool,max_teams,entry_fee,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = tournamentCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const supabase = await createSupabaseRequestClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = parsed.data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("tournaments")
    .insert({
      organizer_id: user.id,
      name: parsed.data.name,
      slug,
      game: parsed.data.game,
      format: parsed.data.format,
      max_teams: parsed.data.maxTeams,
      prize_pool: parsed.data.prizePool,
      entry_fee: parsed.data.entryFee,
      description: parsed.data.description ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
