export default function HistoryPage() {
  const items = [
    {
      id: "RPT-3119",
      title: "Street drainage blocked in Ward 8",
      status: "In review",
      date: "Apr 27, 2026",
    },
    {
      id: "RPT-3076",
      title: "Streetlight outage near bus park",
      status: "Resolved",
      date: "Apr 20, 2026",
    },
    {
      id: "RPT-3011",
      title: "Road shoulder damaged after rainfall",
      status: "Submitted",
      date: "Apr 12, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <header className="mx-auto w-full max-w-[1200px]">
        <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
          Activity
        </div>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
          Report history
        </h1>
        <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[620px]">
          A timeline of your previous reports and current resolution status.
        </p>
      </header>

      <section className="mx-auto mt-8 w-full max-w-[1200px] rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="grid gap-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-black/10 bg-[#FDFBF7] p-4 transition-all hover:-translate-y-0.5 hover:border-[#C0392B]/35"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#8B7C6F]">{item.id}</p>
                  <h2 className="mt-1 text-sm font-semibold text-[#1C1917]">{item.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs rounded-full border border-black/10 bg-white px-2.5 py-1 text-[#4D4641]">
                    {item.status}
                  </p>
                  <p className="mt-1 text-xs text-[#8B7C6F]">{item.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

