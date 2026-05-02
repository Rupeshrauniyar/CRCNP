export default function SearchPage() {
  const samples = [
    { title: "Broken road near main market", status: "Open", tag: "Infrastructure" },
    { title: "Garbage pickup delay in Ward 3", status: "In review", tag: "Sanitation" },
    { title: "Streetlight outage on Ring Road", status: "Resolved", tag: "Utilities" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <header className="mx-auto w-full max-w-[1200px]">
        <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
          Community Reports
        </div>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
          Search public issues
        </h1>
        <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[620px]">
          Find similar complaints to follow progress and avoid duplicates.
        </p>
      </header>

      <section className="mx-auto mt-8 w-full max-w-[1200px] rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex-1">
            <label className="text-sm font-semibold text-[#1C1917]">Keyword</label>
            <input
              placeholder="Search by title, location, category..."
              className="mt-2 w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            />
          </div>
          <div className="md:w-56">
            <label className="text-sm font-semibold text-[#1C1917]">Status</label>
            <select className="mt-2 w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10">
              <option>Any</option>
              <option>Open</option>
              <option>In review</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {samples.map((r) => (
            <div
              key={r.title}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-black/10 bg-[#FDFBF7] p-4 md:flex-row md:items-center hover:border-[#C0392B]/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[#1C1917]">{r.title}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#6B6560]">
                  <span className="rounded-full border border-black/10 bg-white px-2 py-1">{r.tag}</span>
                  <span className="rounded-full border border-black/10 bg-white px-2 py-1">{r.status}</span>
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-[#C0392B] hover:bg-[#922B21] text-white px-5 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(192,57,43,0.25)] md:shrink-0">
                View
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

