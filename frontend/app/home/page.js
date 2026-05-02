import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12">
        <div className="mx-auto w-full max-w-[1200px] rounded-3xl border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl font-bold text-[#1C1917]">Submitted Reports</h1>
          <p className="mt-3 text-sm text-[#6B6560]">
            Supabase is not configured. Add project URL and anon key in `.env.local`.
          </p>
        </div>
      </div>
    );
  }

  const { data: reports = [] } = await supabase
    .from("reports")
    .select("id, user_id, title, category, location, status, created_at")
    .eq("status", "submitted")
    .order("created_at", { ascending: false })
    .limit(30);

  const userIds = [...new Set(reports.map((r) => r.user_id).filter(Boolean))];
  const { data: profiles = [] } = userIds.length
    ? await supabase.from("profiles").select("id, username, email").in("id", userIds)
    : { data: [] };

  const nameMap = new Map(
    profiles.map((p) => [p.id, p.username ? `@${p.username}` : p.email || "Unknown user"])
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="mx-auto w-full max-w-[1200px] rounded-3xl border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
          Community Feed
        </div>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
          Submitted reports by users
        </h1>
        <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[700px]">
          Latest submitted complaints from the community, including reporter names.
        </p>

        <div className="mt-8 grid gap-3">
          {reports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/20 bg-[#FDFBF7] p-4 text-sm text-[#6B6560]">
              No submitted reports found yet.
            </div>
          ) : (
            reports.map((report) => (
              <article
                key={report.id}
                className="rounded-2xl border border-black/10 bg-[#FDFBF7] p-4 hover:border-[#C0392B]/40 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-[#1C1917]">{report.title}</h2>
                  <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs text-[#4D4641]">
                    {report.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#6B6560]">{report.location}</p>
                <div className="mt-2 text-xs text-[#8B7C6F]">
                  By {nameMap.get(report.user_id) || "Unknown user"} •{" "}
                  {new Date(report.created_at).toLocaleString()}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
