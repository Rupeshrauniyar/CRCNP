"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onGoogle = async () => {
    setError("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local."
      );
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const onSignin = async (e) => {
    e.preventDefault();
    setError("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local."
      );
      return;
    }
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        throw signInError;
      }
      router.push("/profile");
      router.refresh();
    } catch (err) {
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8">
          <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
            Account Access
          </div>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
            Welcome back to CRCNP
          </h1>
          <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[520px]">
            Sign in and continue reporting local civic issues with your community.
          </p>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <form onSubmit={onSignin} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C0392B] hover:bg-[#922B21] disabled:opacity-70 text-white px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.4)]"
            >
              {loading ? "Signing in..." : "Sign in with email"}
            </button>
          </form>

          {error && (
            <div className="mt-3 rounded-2xl border border-[#C0392B]/30 bg-[#FDF2F2] p-3 text-xs text-[#922B21]">
              {error}
            </div>
          )}

          <div className="my-5 h-px bg-black/10" />

          <button
            onClick={onGoogle}
            className="w-full inline-flex items-center justify-center gap-3 bg-[#C0392B] hover:bg-[#922B21] text-white px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.4)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.42c-.22 1.41-1.62 4.14-5.42 4.14-3.26 0-5.92-2.7-5.92-6.03S8.74 6.28 12 6.28c1.86 0 3.1.8 3.81 1.48l2.6-2.5C16.82 3.75 14.64 2.7 12 2.7 6.95 2.7 2.85 6.83 2.85 12.31S6.95 21.92 12 21.92c5.76 0 9.57-4.05 9.57-9.75 0-.66-.07-1.16-.16-1.67H12z"
              />
              <path
                fill="#FBBC05"
                d="M2.85 12.31c0 .98.2 1.91.55 2.76l3.43-2.64a6.2 6.2 0 0 1-.03-.62c0-.22.02-.43.05-.65L3.4 8.42a9.3 9.3 0 0 0-.55 3.89z"
              />
              <path
                fill="#34A853"
                d="M12 21.92c2.64 0 4.86-.88 6.48-2.39l-3.16-2.45c-.85.6-2 1.05-3.32 1.05-2.47 0-4.56-1.68-5.31-3.94L3.42 16.9C4.93 19.74 8.13 21.92 12 21.92z"
              />
              <path
                fill="#4285F4"
                d="M21.41 10.49H12v3.9h5.42c-.32 1.96-1.93 3.37-3.1 4.14l3.16 2.45c1.83-1.7 2.89-4.19 2.89-7.71 0-.66-.07-1.16-.16-1.67z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 rounded-2xl bg-[#FDFBF7] border border-black/10 p-4 text-xs leading-5 text-[#6B6560]">
            By continuing, you agree to our Terms & Privacy Policy.
          </div>

          <div className="mt-5 text-center text-sm text-[#6B6560]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[#1C1917] underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

