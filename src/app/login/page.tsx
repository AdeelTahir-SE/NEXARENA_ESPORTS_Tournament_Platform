"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
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
    <main className="min-h-screen px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Badge variant="primary" className="mb-4">
            Secure Access
          </Badge>
          <h1 className="text-h1 font-display font-bold tracking-wide mb-2">Sign In</h1>
          <p className="text-text-secondary">Access tournaments, teams, and your profile.</p>
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
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={<Lock size={16} />}
              error={formError.password?.[0]}
            />
            {error && <p className="text-sm text-status-cancelled">{error}</p>}
            <Button type="submit" size="lg" fullWidth disabled={loading}>
              <LogIn size={18} />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-text-secondary text-center">
            Need an account? <Link href="/register" className="text-primary hover:underline">Create one</Link>
          </p>
          <p className="mt-3 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
              Back to home <ArrowRight size={14} />
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
