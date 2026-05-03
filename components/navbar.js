"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavIcon({ name, className }) {
  const common = {
    className: cn("h-5 w-5", className),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "history":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v4h4" />
          <path d="M12 7v6l4 2" />
        </svg>
      );
    case "report":
      return (
        <svg {...common}>
          <path d="M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="9" r="4" />
        </svg>
      );
    case "signin":
      return (
        <svg {...common}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M21 4v16" />
        </svg>
      );
    case "signup":
      return (
        <svg {...common}>
          <path d="M15 12h6" />
          <path d="M18 9v6" />
          <path d="M4 20a7 7 0 0 1 10-6" />
          <circle cx="9" cy="8" r="4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 12h16" />
        </svg>
      );
  }
}

function NavLink({ href, label, icon, active, compact = false }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        active
          ? "bg-[#C0392B] text-white shadow-[0_8px_24px_rgba(192,57,43,0.35)]"
          : "text-[#4D4641] hover:bg-[#F7EFE7] hover:text-[#1C1917]",
        compact && "flex-col gap-1 px-2 py-2 text-[11px]"
      )}
    >
      <span
        className={cn(
          "grid place-items-center",
          compact ? "h-6 w-6" : "h-9 w-9 rounded-xl bg-[#F7EFE7]",
          active && !compact && "bg-white/10"
        )}
      >
        <NavIcon
          name={icon}
          className={cn(active ? "text-white" : "text-[#6B6560] group-hover:text-[#1C1917]")}
        />
      </span>
      <span className={cn(compact && "leading-none")}>{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const primary = [
    { href: "/home", label: "Home", icon: "home" },
    { href: "/history", label: "History", icon: "history" },
    { href: "/report", label: "Report", icon: "report" },
    { href: "/search", label: "Search", icon: "search" },
    { href: "/profile", label: "Profile", icon: "profile" },
  ];

  const auth = [
    { href: "/signin", label: "Sign in", icon: "signin" },
    { href: "/signup", label: "Sign up", icon: "signup" },
  ];

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:flex md:w-72 md:flex-col md:border-r md:border-[#E6D9CC] md:bg-[#FDFBF7]">
        <div className="flex items-center justify-between px-5 py-6">
          <Link href="/home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#C0392B] text-sm font-semibold text-white shadow-[0_2px_10px_rgba(192,57,43,0.35)]">
              न
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-[0.04em] text-[#1C1917]">
                <span className="text-[#C0392B]">CRC</span>NP
              </div>
              <div className="text-xs text-[#6B6560]">Citizen reporting</div>
            </div>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-4">
          {primary.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        <div className="border-t border-[#E6D9CC] px-4 py-4">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8B7C6F]">
            Account
          </div>
          <div className="grid grid-cols-2 gap-2">
            {auth.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all",
                  isActive(item.href)
                    ? "border-[#C0392B] bg-[#C0392B] text-white"
                    : "border-[#E6D9CC] bg-white text-[#4D4641] hover:bg-[#F7EFE7]"
                )}
              >
                <NavIcon name={item.icon} className={cn("h-4 w-4", isActive(item.href) && "text-white")} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E6D9CC] bg-[#FDFBF7]/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-2 py-2">
          {primary.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(item.href)}
              compact
            />
          ))}
        </div>
      </nav>
    </>
  );
}
