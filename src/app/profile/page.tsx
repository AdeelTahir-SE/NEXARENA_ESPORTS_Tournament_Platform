"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer, Avatar } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Settings,
  Trophy,
  Swords,
  BarChart2,
  Users,
  LogOut,
  Edit2,
  RefreshCw,
  AlertTriangle,
  Gamepad2,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/useUser";
import type { Profile } from "@/types";

interface LeaderboardEntry {
  id: string;
  game: string;
  points: number;
  wins: number;
  losses: number;
  tournaments_played: number;
  best_placement: number | null;
}

interface TeamMembership {
  teams: {
    id: string;
    name: string;
    tag: string | null;
    primary_game: string;
  };
  role: string;
  joined_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile: authProfile, loading: authLoading } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [teamMemberships, setTeamMemberships] = useState<TeamMembership[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  const fetchProfileData = useCallback(async (uid: string) => {
    const supabase = createSupabaseBrowserClient();
    setLoadingData(true);
    setError("");

    try {
      // Fetch profile (use maybeSingle to avoid errors when duplicates exist)
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id,username,full_name,avatar_url,bio,role")
        .eq("id", uid)
        .maybeSingle();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        // Fallback: try to fetch the first matching row
        const { data: fallback } = await supabase
          .from("profiles")
          .select("id,username,full_name,avatar_url,bio,role")
          .eq("id", uid)
          .limit(1);
        const useProfile = Array.isArray(fallback) ? fallback[0] ?? null : fallback ?? null;
        if (!useProfile) throw new Error(profileError.message);
        setProfile(useProfile as Profile | null);
        setEditName((useProfile as Profile)?.full_name ?? "");
        setEditBio((useProfile as Profile)?.bio ?? "");
      } else {
        setProfile(profileData as Profile | null);
        setEditName((profileData as Profile)?.full_name ?? "");
        setEditBio((profileData as Profile)?.bio ?? "");
      }

      // Fetch leaderboard stats
      const { data: lbData } = await supabase
        .from("leaderboard_entries")
        .select("id,game,points,wins,losses,tournaments_played,best_placement")
        .eq("user_id", uid)
        .order("points", { ascending: false });

      setLeaderboard(lbData ?? []);

      // Fetch team memberships
      const { data: memberData } = await supabase
        .from("team_members")
        .select("role,joined_at,teams(id,name,tag,primary_game)")
        .eq("user_id", uid);

      setTeamMemberships((memberData as unknown as TeamMembership[]) ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load profile data.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?next=/profile");
      return;
    }
    if (user) {
      fetchProfileData(user.id);
    }
  }, [user, authLoading, fetchProfileData, router]);

  async function handleSaveProfile() {
    if (!user) return;
    setSaving(true);
    setSaveError("");
    const supabase = createSupabaseBrowserClient();
    const { data, error: updateError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: editName.trim() || null,
          bio: editBio.trim() || null,
        },
        { onConflict: "id" }
      )
      .select("id,username,full_name,avatar_url,bio,role")
      .single();

    if (!updateError) {
      setProfile((prev) => (data ? { ...(prev ?? {}), ...data } : prev));
      setIsEditing(false);
    } else {
      setSaveError(updateError.message);
    }
    setSaving(false);
  }

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const displayName =
    profile?.username ?? profile?.full_name ?? user?.email?.split("@")[0] ?? "Player";

  const totalWins = leaderboard.reduce((s, e) => s + e.wins, 0);
  const totalLosses = leaderboard.reduce((s, e) => s + e.losses, 0);
  const totalPlayed = leaderboard.reduce((s, e) => s + e.tournaments_played, 0);
  const totalPoints = leaderboard.reduce((s, e) => s + e.points, 0);
  const winRate = totalWins + totalLosses > 0
    ? Math.round((totalWins / (totalWins + totalLosses)) * 100)
    : 0;

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  const stats = [
    { label: "Total Wins", value: String(totalWins), icon: Trophy },
    { label: "Tournaments", value: String(totalPlayed), icon: Users },
    { label: "Win Rate", value: `${winRate}%`, icon: BarChart2 },
    { label: "Points", value: totalPoints.toLocaleString(), icon: Swords },
  ];

  if (authLoading || (user && loadingData)) {
    return (
      <>
        <Navbar />
        <main className="flex-1 px-6 py-12">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Skeleton header */}
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full skeleton" />
              <div className="space-y-2">
                <div className="w-40 h-6 skeleton rounded" />
                <div className="w-24 h-4 skeleton rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 skeleton rounded-xl" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center">
            <AlertTriangle size={48} className="text-status-cancelled mx-auto mb-4" />
            <h2 className="text-h2 font-display font-bold mb-2">Something went wrong</h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <Button onClick={() => user && fetchProfileData(user.id)}>
              <RefreshCw size={16} /> Retry
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Profile Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar
                  name={displayName}
                  src={profile?.avatar_url ?? undefined}
                  size="lg"
                  online
                />
                <div>
                  {isEditing ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="input-nxa text-xl font-bold font-display mb-2 w-64"
                      placeholder="Display name"
                    />
                  ) : (
                    <h1 className="text-h1 font-display font-bold mb-1">{displayName}</h1>
                  )}
                  {isEditing ? (
                    <textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="input-nxa text-sm resize-none w-64 h-16 pt-2"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-text-secondary mb-3">
                      {profile?.bio || "No bio yet."}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{profile?.role ?? "player"}</Badge>
                    {leaderboard[0] && (
                      <Badge variant="gold">
                        <Gamepad2 size={12} /> {leaderboard[0].game}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" onClick={() => setIsEditing(true)}>
                    <Edit2 size={16} /> Edit Profile
                  </Button>
                )}
                <Button variant="secondary" onClick={handleSignOut} disabled={signingOut}>
                  <LogOut size={16} /> {signingOut ? "Signing out..." : "Sign Out"}
                </Button>
              </div>
              {saveError && <p className="mt-3 text-sm text-status-cancelled">{saveError}</p>}
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div>
                <p className="text-text-secondary text-sm mb-1">Points</p>
                <p className="text-h3 font-display font-bold text-accent-gold">
                  {totalPoints.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Win Rate</p>
                <p className="text-h3 font-display font-bold text-primary">{winRate}%</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Teams</p>
                <p className="text-h3 font-display font-bold">{teamMemberships.length}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Member Since</p>
                <p className="text-h3 font-display font-bold">{joinDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-text-secondary text-sm font-semibold">{stat.label}</h3>
                    <stat.icon size={24} className="text-primary/50" />
                  </div>
                  <p className="text-4xl font-mono font-bold text-primary">{stat.value}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Game Stats */}
        {leaderboard.length > 0 && (
          <section className="px-6 py-12 border-t border-border">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-h2 font-display font-bold mb-6">Stats by Game</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaderboard.map((entry) => (
                  <Card key={entry.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Gamepad2 size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-semibold capitalize">{entry.game}</p>
                      <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                        <span>{entry.wins}W / {entry.losses}L</span>
                        <span>•</span>
                        <span className="text-primary font-mono font-bold">
                          {entry.points.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                    {entry.best_placement === 1 && (
                      <Badge variant="gold"><Trophy size={10} /> 1st</Badge>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Teams */}
        <section className="px-6 py-12 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h2 font-display font-bold">Your Teams</h2>
              <Button variant="secondary" size="sm" onClick={() => router.push("/teams/create")}>
                + New Team
              </Button>
            </div>
            {teamMemberships.length === 0 ? (
              <Card className="text-center py-10">
                <Users size={40} className="text-text-muted mx-auto mb-3 opacity-50" />
                <p className="text-text-secondary mb-4">You haven&apos;t joined any teams yet.</p>
                <Button variant="secondary" onClick={() => router.push("/teams")}>
                  Browse Teams
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {teamMemberships.map((m, idx) => (
                  <Card key={idx} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-text-primary font-semibold">{m.teams.name}</p>
                        {m.teams.tag && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono font-bold">
                            [{m.teams.tag}]
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm">
                        {m.role} • {m.teams.primary_game} •{" "}
                        Joined {new Date(m.joined_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/teams/${m.teams.id}`)}
                    >
                      View Team
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Account Info */}
        <section className="px-6 py-12 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-display font-bold mb-6">Account</h2>
            <Card className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-text-secondary text-sm">Email</p>
                  <p className="text-text-primary font-medium">{user?.email}</p>
                </div>
                <Badge variant={user?.email_confirmed_at ? "live" : "upcoming"}>
                  {user?.email_confirmed_at ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-text-secondary text-sm">Account ID</p>
                  <p className="text-text-muted text-xs font-mono">{user?.id}</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-text-secondary text-sm">Last Sign In</p>
                  <p className="text-text-primary font-medium">
                    {user?.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
