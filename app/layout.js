import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/app-shell";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CRCNP",
  description:
    "A platform for Nepali citizens to report complaints to the official authorities",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` h-full  `}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-950">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
