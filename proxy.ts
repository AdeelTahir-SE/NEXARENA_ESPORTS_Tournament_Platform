import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  /^\/profile(?:\/.*)?$/,
  /^\/teams\/create(?:\/.*)?$/,
  /^\/tournaments\/create(?:\/.*)?$/,
  /^\/tournaments\/[^/]+\/register(?:\/.*)?$/,
];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request: { headers: request.headers } });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  if (!protectedRoutes.some((pattern) => pattern.test(request.nextUrl.pathname))) {
    return response;
  }

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return response;
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profile/:path*", "/teams/create/:path*", "/tournaments/create/:path*", "/tournaments/:path*/register"],
};
