"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const INITIAL_FORM = {
  title: "",
  category: "Infrastructure",
  location: "",
  description: "",
};

export default function CreatePage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSaveDraft = () => {
    localStorage.setItem("reportDraft", JSON.stringify(form));
    setMessage("Draft saved locally in this browser.");
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      setError("Please fill title, location, and description.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local."
      );
      return;
    }

    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user?.id) {
        setError("You need to sign in before submitting a report.");
        return;
      }

      const { error: insertError } = await supabase.from("reports").insert({
        user_id: user.id,
        title: form.title.trim(),
        category: form.category,
        location: form.location.trim(),
        description: form.description.trim(),
        status: "submitted",
      });

      if (insertError) throw insertError;

      setForm(INITIAL_FORM);
      localStorage.removeItem("reportDraft");
      setMessage("Report submitted successfully.");
    } catch (err) {
      setError(err.message || "Could not submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <header className="mx-auto w-full max-w-[1200px]">
        <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#C0392B] mb-3">
          New Complaint
        </div>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.1]">
          Create a civic report
        </h1>
        <p className="mt-3 text-base text-[#6B6560] leading-[1.65] max-w-[620px]">
          Provide clear details so the issue can be routed to the right authority.
        </p>
      </header>

      <section className="mx-auto mt-8 w-full max-w-[1200px] rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#1C1917]">Title</label>
            <input
              value={form.title}
              onChange={onChange("title")}
              placeholder="e.g. Streetlight not working near Ward 5"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#1C1917]">Category</label>
            <select
              value={form.category}
              onChange={onChange("category")}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            >
              <option>Infrastructure</option>
              <option>Public safety</option>
              <option>Sanitation</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#1C1917]">Location</label>
            <input
              value={form.location}
              onChange={onChange("location")}
              placeholder="City, ward, landmark"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#1C1917]">Description</label>
            <textarea
              rows={6}
              value={form.description}
              onChange={onChange("description")}
              placeholder="Describe what happened, when, and any evidence..."
              className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[#FDFBF7] px-4 py-3 text-sm text-[#1C1917] outline-none transition focus:border-[#C0392B]/40 focus:ring-4 focus:ring-[#C0392B]/10"
            />
          </div>

          <div className="md:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onSaveDraft}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1C1917] px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold border border-black/10 hover:border-[#1C1917] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
            >
              Save draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[#C0392B] hover:bg-[#922B21] disabled:opacity-70 text-white px-7 py-3.5 rounded-[14px] text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.4)]"
            >
              {loading ? "Submitting..." : "Submit complaint"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-2xl border border-[#C0392B]/30 bg-[#FDF2F2] p-3 text-sm text-[#922B21]">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </div>
        )}
      </section>
    </div>
  );
}

