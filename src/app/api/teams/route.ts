import { NextResponse } from "next/server";
import { createSupabaseRequestClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { teamCreateSchema } from "@/lib/validators/team";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("teams")
    .select("id,name,tag,primary_game,description,owner_id,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = teamCreateSchema.safeParse(body);

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
    .from("teams")
    .insert({
      owner_id: user.id,
      name: parsed.data.name,
      slug,
      tag: parsed.data.tag.toUpperCase(),
      primary_game: parsed.data.primaryGame,
      description: parsed.data.description ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
