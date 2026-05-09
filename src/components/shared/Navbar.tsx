"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Users, BarChart2, Bell, Menu, X, Zap } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart2 },
  { href: "/teams", label: "Teams", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-display text-[22px] font-bold tracking-wider text-[#F1F0FF]">
            NEX<span className="text-[#7C3AED]">ARENA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  active
                    ? "text-[#7C3AED] bg-[#7C3AED]/10"
                    : "text-[#9B99B8] hover:text-[#F1F0FF] hover:bg-[#1A1A26]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-notifications"
            className="relative w-9 h-9 rounded-lg bg-[#1A1A26] border border-[#2A2A3D] flex items-center justify-center text-[#9B99B8] hover:text-[#F1F0FF] hover:border-[#4A4A6A] transition-all"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C3AED]" />
          </button>
          <Link
            href="/profile"
            id="nav-profile"
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg bg-[#1A1A26] border border-[#2A2A3D] hover:border-[#4A4A6A] transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA] text-xs font-bold font-display">
              P
            </div>
            <span className="text-sm font-medium text-[#F1F0FF]">Player</span>
          </Link>
          <Link
            href="/tournaments/create"
            id="nav-create-tournament"
            className="px-4 py-2 rounded-md bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold transition-all duration-150"
            style={{ boxShadow: "0 0 12px rgba(124,58,237,0.4)" }}
          >
            + Create
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-9 h-9 rounded-lg bg-[#1A1A26] border border-[#2A2A3D] flex items-center justify-center text-[#9B99B8]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2A2A3D] bg-[#12121A] px-6 py-4 flex flex-col gap-1 animate-slide-up">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  active
                    ? "text-[#7C3AED] bg-[#7C3AED]/10"
                    : "text-[#9B99B8] hover:text-[#F1F0FF] hover:bg-[#1A1A26]"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
          <hr className="border-[#2A2A3D] my-2" />
          <Link
            href="/tournaments/create"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center px-4 py-2 rounded-md bg-[#7C3AED] text-white text-sm font-semibold"
          >
            + Create Tournament
          </Link>
        </div>
      )}
    </nav>
  );
}
