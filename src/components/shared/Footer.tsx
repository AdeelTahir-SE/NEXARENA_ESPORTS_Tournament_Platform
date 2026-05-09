import Link from "next/link";
import { Zap, Code, Send, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A3D] bg-[#0A0A0F] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <span className="font-display text-[20px] font-bold tracking-wider">
                NEX<span className="text-[#7C3AED]">ARENA</span>
              </span>
            </Link>
            <p className="text-[#9B99B8] text-sm leading-relaxed">
              The premier esports tournament platform. Compete, manage, and rise to the top.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { Icon: Code, href: "#", label: "GitHub" },
                { Icon: Send, href: "#", label: "Email" },
                { Icon: MessageCircle, href: "#", label: "Discord" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[#1A1A26] border border-[#2A2A3D] flex items-center justify-center text-[#9B99B8] hover:text-[#F1F0FF] hover:border-[#4A4A6A] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-display font-semibold text-[#F1F0FF] tracking-wide mb-3">Platform</h3>
            <ul className="space-y-2">
              {["Tournaments", "Leaderboard", "Teams", "Create Tournament"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-[#9B99B8] hover:text-[#F1F0FF] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-[#F1F0FF] tracking-wide mb-3">Support</h3>
            <ul className="space-y-2">
              {["Documentation", "FAQ", "Contact Us", "Report Issue"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#9B99B8] hover:text-[#F1F0FF] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-[#F1F0FF] tracking-wide mb-3">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#9B99B8] hover:text-[#F1F0FF] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2A3D] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#5C5A78] text-xs">
            © 2026 NEXARENA. All rights reserved.
          </p>
          <p className="text-[#5C5A78] text-xs">
            Built for competitive gamers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
