import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  const { data: profile } =
    supabase && user
      ? await supabase.from("profiles").select("username").eq("id", user.id).maybeSingle()
      : { data: null };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <header className="mx-auto w-full max-w-[1200px]">
        <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
          Account
        </div>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
          Profile and activity
        </h1>
        <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[620px]">
          Manage your account and track your complaint history.
        </p>
      </header>

      <section className="mx-auto mt-8 w-full max-w-[1200px] rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <div
                className="h-12 w-12 rounded-2xl border border-black/10 bg-cover bg-center shadow-[0_2px_8px_rgba(192,57,43,0.25)]"
                style={{ backgroundImage: `url("${avatarUrl}")` }}
                aria-label="Profile picture"
              />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#C0392B] text-sm font-semibold text-white shadow-[0_2px_8px_rgba(192,57,43,0.35)]">
                {(user?.email?.[0] ?? "U").toUpperCase()}
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-[#1C1917]">
                {user?.user_metadata?.full_name || user?.email || "Guest"}
              </div>
              <div className="text-sm text-[#6B6560]">
                {user ? "Signed in" : "Not signed in"}
              </div>
              {profile?.username ? (
                <div className="text-xs text-[#6B6560] mt-0.5">Username: @{profile.username}</div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {!user ? (
              <>
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center bg-[#C0392B] hover:bg-[#922B21] text-white px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.4)]"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center bg-white text-[#1C1917] px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
                >
                  Create account
                </Link>
              </>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-white text-[#1C1917] px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
              >
                Back to home
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 grid w-full max-w-[1200px] gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_32px_rgba(0,0,0,0.05)]">
          <div className="text-sm font-semibold text-[#1C1917]">Your complaints</div>
          <p className="mt-2 text-sm leading-6 text-[#6B6560]">
            Once signed in, you’ll see your submitted complaints and their status here.
          </p>
          <div className="mt-4">
            <Link
              href="/create"
              className="inline-flex items-center justify-center bg-white text-[#1C1917] px-5 py-2.5 rounded-[12px] text-sm font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5"
            >
              Create a new complaint
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_32px_rgba(0,0,0,0.05)]">
          <div className="text-sm font-semibold text-[#1C1917]">Saved searches</div>
          <p className="mt-2 text-sm leading-6 text-[#6B6560]">
            Pin common queries and quickly re-run them from your profile.
          </p>
          <div className="mt-4">
            <Link
              href="/search"
              className="inline-flex items-center justify-center bg-white text-[#1C1917] px-5 py-2.5 rounded-[12px] text-sm font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore reports
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

