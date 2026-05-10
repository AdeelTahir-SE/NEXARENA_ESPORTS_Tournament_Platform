import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/profile";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const fallbackName =
        data.user.user_metadata?.full_name ??
        data.user.user_metadata?.name ??
        data.user.email?.split("@")[0] ??
        "";

      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          full_name: fallbackName || null,
        },
        { onConflict: "id" }
      );
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
