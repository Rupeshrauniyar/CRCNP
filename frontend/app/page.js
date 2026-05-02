"use client";
import { useState, useEffect, useRef } from "react";

const stats = [
  { value: "12,400+", label: "Reports Filed" },
  { value: "77", label: "Districts Covered" },
  { value: "3,200+", label: "Issues Resolved" },
  { value: "98K+", label: "Citizens Active" },
];

const categories = [
  { icon: "🚧", label: "Roads & Infrastructure", count: "3.2K reports" },
  { icon: "💧", label: "Water & Sanitation", count: "1.8K reports" },
  { icon: "⚡", label: "Electricity", count: "2.1K reports" },
  { icon: "🌳", label: "Environment", count: "980 reports" },
  { icon: "🏥", label: "Health Services", count: "1.5K reports" },
  { icon: "🎓", label: "Education", count: "760 reports" },
];

const recentReports = [
  {
    id: "RPT-2847",
    title: "Broken road near Bhrikuti Mandap",
    location: "Kathmandu, Bagmati",
    status: "Under Review",
    time: "2h ago",
    category: "Roads",
  },
  {
    id: "RPT-2846",
    title: "Water supply disruption for 3 days",
    location: "Pokhara-14, Gandaki",
    status: "Assigned",
    time: "5h ago",
    category: "Water",
  },
  {
    id: "RPT-2845",
    title: "Street lights not working on main road",
    location: "Biratnagar-4, Koshi",
    status: "Resolved",
    time: "1d ago",
    category: "Electricity",
  },
];

const statusStyles = {
  "Under Review": {
    pill: "bg-amber-100 text-amber-900",
    dot: "bg-amber-400",
  },
  Assigned: {
    pill: "bg-blue-100 text-blue-900",
    dot: "bg-blue-500",
  },
  Resolved: {
    pill: "bg-emerald-100 text-emerald-900",
    dot: "bg-emerald-500",
  },
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const statsRef = useRef(null);
  const categoriesRef = useRef(null);
  const reportsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    [
      { ref: statsRef, id: "stats" },
      { ref: categoriesRef, id: "categories" },
      { ref: reportsRef, id: "reports" },
      { ref: ctaRef, id: "cta" },
    ].forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.id = id;
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FDFBF7] font-[Outfit] text-[#1C1917] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Nepali:ital@0;1&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .devanagari { font-family: 'Tiro Devanagari Nepali', serif; }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(1.4); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        .animate-fadeUp { animation: fadeUp 0.6s ease both; }
        .animate-fadeUp-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .animate-fadeUp-2 { animation: fadeUp 0.6s 0.2s ease both; }
        .animate-fadeUp-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .animate-fadeLeft { animation: fadeLeft 0.7s 0.2s ease both; }
        .pulse-dot { animation: pulse-dot 1.8s infinite; }
      `}</style>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-black/10 transition-shadow duration-300 ${
          scrollY > 30 ? "shadow-[0_4px_24px_rgba(0,0,0,0.07)]" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#C0392B] rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-[0_2px_8px_rgba(192,57,43,0.35)] devanagari">
            ना
          </div>
          <span className="font-bold text-base tracking-[0.05em] text-[#1C1917]">
            <span className="text-[#C0392B]">CRC</span>NP
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/search" className="text-sm font-medium text-[#6B6560] hover:text-[#1C1917] transition-colors">
            Browse Reports
          </a>
          <a href="/about" className="text-sm font-medium text-[#6B6560] hover:text-[#1C1917] transition-colors">
            About
          </a>
          <a href="/districts" className="text-sm font-medium text-[#6B6560] hover:text-[#1C1917] transition-colors">
            Districts
          </a>
        </div>

        <a
          href="/create"
          className="bg-[#C0392B] hover:bg-[#922B21] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
        >
          File a Report →
        </a>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(192,57,43,0.06),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(26,58,92,0.05),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(rgba(28,25,23,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="animate-fadeUp inline-flex items-center gap-2 bg-[#FADBD8] border border-[#C0392B]/20 rounded-full px-4 py-1.5 text-[0.75rem] font-semibold text-[#C0392B] uppercase tracking-[0.08em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] pulse-dot" />
              नागरिक आवाज · Citizen Voice
            </div>

            <h1 className="animate-fadeUp-1 text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1C1917]">
              Your locality.<br />
              Your <span className="text-[#C0392B]">voice</span>.<br />
              <span className="devanagari font-normal italic text-[#C0392B]">Nepal सुन्छ।</span>
            </h1>

            <p className="animate-fadeUp-2 mt-5 text-[1.0625rem] leading-[1.7] text-[#6B6560] max-w-[480px]">
              CRCNP connects citizens across all 77 districts of Nepal with the officials responsible for solving local issues — from broken roads to power outages.
            </p>

            <div className="animate-fadeUp-3 mt-9 flex flex-wrap gap-4">
              <a
                href="/create"
                className="inline-flex items-center gap-2 bg-[#C0392B] hover:bg-[#922B21] text-white px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.4)]"
              >
                📝 Report an Issue
              </a>
              <a
                href="/search"
                className="inline-flex items-center gap-2 bg-white text-[#1C1917] px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
              >
                🔍 Browse Reports
              </a>
            </div>
          </div>

          {/* Right — Map Card */}
          <div className="order-first md:order-last animate-fadeLeft">
            <div className="bg-white border border-black/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06)]">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
                <span className="text-[0.8125rem] font-semibold text-[#1C1917]">Live Reports — Nepal</span>
                <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[#C0392B] bg-[#FADBD8] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] pulse-dot" />
                  LIVE
                </span>
              </div>

              {/* SVG Map */}
              <svg
                viewBox="0 0 500 180"
                xmlns="http://www.w3.org/2000/svg"
                className="block w-full h-[220px] bg-gradient-to-br from-[#EEF7F0] to-[#E8F4F8]"
              >
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
                  </filter>
                </defs>
                <path
                  d="M 30 90 Q 60 50 110 45 Q 160 40 200 55 Q 250 65 300 52 Q 360 38 420 55 Q 460 65 475 85 Q 465 110 430 118 Q 380 128 340 122 Q 290 132 240 125 Q 190 118 150 128 Q 100 135 60 120 Q 32 108 30 90 Z"
                  fill="white"
                  stroke="rgba(192,57,43,0.2)"
                  strokeWidth="1.5"
                  filter="url(#shadow)"
                />
                {[
                  { x: 72, y: 93, label: "Sudur Pashchim" },
                  { x: 145, y: 88, label: "Karnali" },
                  { x: 215, y: 90, label: "Lumbini" },
                  { x: 285, y: 84, label: "Gandaki" },
                  { x: 355, y: 82, label: "Bagmati" },
                  { x: 428, y: 90, label: "Koshi" },
                  { x: 245, y: 114, label: "Madhesh" },
                ].map(({ x, y, label }) => (
                  <text key={label} x={x} y={y} fontSize="7" fill="#6B6560" fontFamily="Outfit" textAnchor="middle">
                    {label}
                  </text>
                ))}
                {[
                  { cx: 72, cy: 78, color: "#C0392B" },
                  { cx: 145, cy: 74, color: "#F59E0B" },
                  { cx: 215, cy: 76, color: "#10B981" },
                  { cx: 285, cy: 70, color: "#C0392B" },
                  { cx: 355, cy: 68, color: "#F59E0B" },
                  { cx: 428, cy: 78, color: "#C0392B" },
                  { cx: 200, cy: 105, color: "#10B981" },
                  { cx: 320, cy: 108, color: "#F59E0B" },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r="10" fill={p.color} opacity="0.12" />
                    <circle cx={p.cx} cy={p.cy} r="4" fill={p.color} />
                  </g>
                ))}
              </svg>

              {/* Pin list */}
              <div className="px-5 py-4 flex flex-col gap-2.5">
                {[
                  { name: "Kathmandu", count: "284 reports", color: "#C0392B" },
                  { name: "Pokhara", count: "121 reports", color: "#F59E0B" },
                  { name: "Biratnagar", count: "98 reports", color: "#10B981" },
                ].map((pin) => (
                  <div
                    key={pin.name}
                    className="flex items-center justify-between px-3 py-2 rounded-[10px] bg-[#FDFBF7] border border-black/10 text-[0.8125rem]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: pin.color }} />
                      <span className="font-medium text-[#1C1917]">{pin.name}</span>
                    </div>
                    <span className="text-[0.75rem] text-[#6B6560]">{pin.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div ref={statsRef} className="bg-[#1A3A5C] py-14">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-8 py-4 border-r border-white/10 last:border-r-0 transition-all duration-500 ease-out ${
                  i === 1 ? "md:border-r border-white/10" : ""
                } ${
                  isVisible["stats"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold text-white tracking-[-0.03em]">
                  {s.value}
                </div>
                <div className="text-[0.875rem] text-white/55 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section ref={categoriesRef} className="py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
            Issue Categories
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
            What do you want<br />to report today?
          </h2>
          <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[520px]">
            Choose from a range of civic issues that affect daily life across Nepal&apos;s cities, towns, and villages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {categories.map((cat, i) => (
              <a
                key={cat.label}
                href={`/create?category=${cat.label}`}
                className={`bg-white border border-black/10 rounded-[18px] p-6 flex items-center gap-4 no-underline hover:border-[#C0392B] hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] transition-all duration-200 ${
                  isVisible["categories"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 0.07}s`, transitionProperty: "opacity, transform, border-color, box-shadow" }}
              >
                <span className="text-[1.75rem] leading-none">{cat.icon}</span>
                <div>
                  <div className="text-[0.9375rem] font-semibold text-[#1C1917]">{cat.label}</div>
                  <div className="text-[0.8125rem] text-[#6B6560] mt-0.5">{cat.count}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT REPORTS */}
      <section ref={reportsRef} className="pb-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
            Community Reports
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
            Recent issues filed<br />by citizens
          </h2>

          <div className="flex flex-col gap-3.5 mt-10">
            {recentReports.map((r, i) => {
              const s = statusStyles[r.status];
              return (
                <a
                  key={r.id}
                  href={`/reports/${r.id}`}
                  className={`bg-white border border-black/10 rounded-2xl px-6 py-4.5 flex flex-wrap items-center gap-5 no-underline text-inherit hover:border-[#1A3A5C]/30 hover:translate-x-1 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-200 ${
                    isVisible["reports"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${i * 0.1}s`, transitionProperty: "opacity, transform, border-color, box-shadow", padding: "1.125rem 1.5rem" }}
                >
                  <span className="text-[0.75rem] font-bold text-[#6B6560] font-mono min-w-[70px]">
                    {r.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.9375rem] font-semibold text-[#1C1917] truncate">
                      {r.title}
                    </div>
                    <div className="text-[0.8rem] text-[#6B6560] mt-0.5 flex items-center gap-1.5">
                      📍 {r.location}
                      <span className="before:content-['·'] before:mr-1.5">{r.category}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.75rem] font-semibold whitespace-nowrap ${s.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {r.status}
                  </span>
                  <span className="text-[0.75rem] text-[#6B6560] min-w-[40px] text-right">
                    {r.time}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <a
              href="/search"
              className="inline-flex items-center gap-2 bg-white text-[#1C1917] px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
            >
              View all reports →
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
            How It Works
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
            Three steps to make<br />your voice heard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
            {/* Dashed connector — desktop only */}
            <div
              className="hidden md:block absolute top-6 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #C0392B 0, #C0392B 6px, transparent 6px, transparent 14px)",
              }}
            />

            {[
              {
                n: "1",
                title: "Submit a report",
                body: "Fill out a structured form with your issue details, location, photos, and contact information. Takes less than 3 minutes.",
              },
              {
                n: "2",
                title: "Officials are notified",
                body: "Your report reaches the relevant department automatically — municipal, provincial, or federal — based on the issue type.",
              },
              {
                n: "3",
                title: "Track resolution",
                body: "Follow your complaint's status in real-time. Get notified when it's assigned, in progress, or resolved.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className={`flex flex-col items-start gap-4 transition-all duration-500 ease-out ${
                  isVisible["reports"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#C0392B] text-white flex items-center justify-center text-[1.125rem] font-extrabold relative z-10 shadow-[0_4px_16px_rgba(192,57,43,0.3)]">
                  {step.n}
                </div>
                <div>
                  <div className="text-[1.125rem] font-bold text-[#1C1917]">{step.title}</div>
                  <p className="text-[0.9rem] text-[#6B6560] leading-[1.65] mt-1">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div ref={ctaRef} className="bg-[#1C1917] py-20 text-center relative overflow-hidden">
        {/* Decorative Devanagari */}
        <span
          className="absolute right-[-2rem] top-1/2 -translate-y-1/2 pointer-events-none text-white/[0.04] leading-none devanagari"
          style={{ fontSize: "clamp(5rem,15vw,12rem)" }}
        >
          नागरिक
        </span>

        <div
          className={`relative z-10 max-w-[640px] mx-auto transition-all duration-600 ease-out ${
            isVisible["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
            Every report matters.<br />Start yours today.
          </h2>
          <p className="mt-4 text-base text-white/50 leading-[1.65]">
            Join thousands of Nepali citizens who are already making a difference in their communities through transparent, accountable reporting.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="/create"
              className="inline-flex items-center gap-2 bg-white text-[#1C1917] px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)]"
            >
              📝 File a Report
            </a>
            <a
              href="/search"
              className="inline-flex items-center gap-2 bg-transparent text-white/65 hover:text-white px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold border border-white/15 hover:border-white/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Issues →
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="text-[0.8125rem] text-[#6B6560]">
          © 2025 <strong className="text-[#C0392B]">CRCNP</strong> — Citizen Reporting Centre Nepal. All rights reserved.
        </div>
        <div className="text-[0.8125rem] text-[#6B6560]">Built for Nepal 🇳🇵</div>
      </footer>
    </div>
  );
}