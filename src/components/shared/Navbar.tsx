"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Trophy, Users, BarChart2, Bell, Menu, X, Zap, LogOut, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/useUser";
import { Avatar } from "@/components/shared";

const navLinks = [
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart2 },
  { href: "/teams", label: "Teams", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { user, profile, loading } = useUser();

  const displayName =
    profile?.username ?? profile?.full_name ?? user?.email?.split("@")[0] ?? "Player";

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_16px_rgba(124,58,237,0.6)] transition-all">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-display text-[22px] font-bold tracking-wider text-text-primary">
            NEX<span className="text-primary">ARENA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-elevated/50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <>
                  <button
                    id="nav-notifications"
                    className="relative w-9 h-9 rounded-lg bg-background-elevated border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all"
                  >
                    <Bell size={16} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                  </button>
                  <Link
                    href="/profile"
                    id="nav-profile"
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg bg-background-elevated border border-border/50 hover:border-primary/50 transition-all"
                  >
                    <Avatar name={displayName} size="sm" />
                    <span className="text-sm font-medium text-text-primary max-w-[100px] truncate">
                      {displayName}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    title="Sign out"
                    className="w-9 h-9 rounded-lg bg-background-elevated border border-border/50 flex items-center justify-center text-text-secondary hover:text-status-cancelled hover:border-status-cancelled/50 transition-all"
                  >
                    <LogOut size={16} />
                  </button>
                  <Link
                    href="/tournaments/create"
                    id="nav-create-tournament"
                    className="px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all duration-150 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                  >
                    + Create
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-md hover:bg-background-elevated/50 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all duration-150 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </>
          )}
          {loading && (
            <div className="w-24 h-8 skeleton rounded-md" />
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-9 h-9 rounded-lg bg-background-elevated border border-border/50 flex items-center justify-center text-text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background-surface/50 px-6 py-4 flex flex-col gap-1 animate-slide-up backdrop-blur-sm">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-elevated/50"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
          <hr className="border-border/30 my-2" />
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background-elevated/50 transition-all"
              >
                <UserCircle2 size={16} />
                Profile
              </Link>
              <button
                onClick={() => { handleSignOut(); setMobileOpen(false); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-status-cancelled hover:bg-background-elevated/50 transition-all"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-2 rounded-md border border-border text-text-secondary text-sm font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold"
              >
                Join Now
              </Link>
            </>
          )}
          <Link
            href="/tournaments/create"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold mt-1"
          >
            + Create Tournament
          </Link>
        </div>
      )}
    </nav>
  );
}
