"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { registerSchema } from "@/lib/validators/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setMessage("");
    setFormError({});

    const values = Object.fromEntries(formData.entries());
    const parsed = registerSchema.safeParse(values);

    if (!parsed.success) {
      setFormError(parsed.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          full_name: parsed.data.fullName,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setMessage("Account created. Check your email if confirmation is enabled.");
    setLoading(false);
    router.push("/profile");
  }

  return (
    <main className="min-h-screen px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Badge variant="primary" className="mb-4">
            Join the Arena
          </Badge>
          <h1 className="text-h1 font-display font-bold tracking-wide mb-2">Create Account</h1>
          <p className="text-text-secondary">Start competing, organizing, and climbing the ranks.</p>
        </div>

        <Card elevated className="p-8">
          <form action={handleSubmit} className="space-y-5">
            <Input
              name="fullName"
              type="text"
              label="Full Name"
              placeholder="Your name"
              icon={<UserRound size={16} />}
              error={formError.fullName?.[0]}
            />
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
            {message && <p className="text-sm text-status-live">{message}</p>}
            <Button type="submit" size="lg" fullWidth disabled={loading}>
              <UserPlus size={18} />
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-text-secondary text-center">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
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
