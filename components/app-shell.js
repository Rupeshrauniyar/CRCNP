"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const hideNav = pathname === "/";

  return (
    <>
      {!hideNav && <Navbar />}
      <div className={hideNav ? "min-h-screen" : "min-h-screen pb-20 md:pb-0 md:pl-72"}>
        <main className={hideNav ? "" : "mx-auto w-full max-w-6xl py-6"}>
          {children}
        </main>
      </div>
    </>
  );
}

