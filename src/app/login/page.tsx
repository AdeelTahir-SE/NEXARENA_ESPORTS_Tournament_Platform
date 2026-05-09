"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowLeft, Eye, EyeOff, Zap } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { loginSchema } from "@/lib/validators/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setFormError({});

    const values = Object.fromEntries(formData.entries());
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      setFormError(parsed.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next") ?? "/profile";
    router.push(nextPath);
    router.refresh();
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl opacity-30" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #7C3AED 1px, transparent 1px), linear-gradient(#7C3AED 1px, transparent 1px)',
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-glow-primary group-hover:shadow-[0_0_24px_rgba(124,58,237,0.6)] transition-all">
              <Zap size={20} className="text-white" fill="white" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider">
              NEX<span className="text-primary">ARENA</span>
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Badge variant="primary">
              <Lock size={12} /> Secure Access
            </Badge>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-wide mb-2">Welcome Back</h1>
          <p className="text-text-secondary">
            Sign in to access your tournaments, teams, and profile.
          </p>
        </div>

        <Card elevated className="p-8">
          <form action={handleSubmit} className="space-y-5">
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              icon={<Mail size={16} />}
              error={formError.email?.[0]}
              autoComplete="email"
            />
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
                error={formError.password?.[0]}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[34px] text-text-muted hover:text-text-secondary transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-status-cancelled/10 border border-status-cancelled/20">
                <p className="text-sm text-status-cancelled">{error}</p>
              </div>
            )}

            <Button type="submit" size="lg" fullWidth disabled={loading}>
              <LogIn size={18} />
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <p className="text-sm text-text-secondary text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:text-primary-light font-semibold transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </Card>

        <p className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
