"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { mainNav } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1b2e3c]/95 border-b border-white/5 backdrop-blur-md px-4 py-3 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-3 cursor-pointer group select-none"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
            <span className="font-sans font-black text-lg tracking-tighter flex">
              <span className="text-white">U</span>
              <span className="text-[#f27a21] -translate-x-[2px]">Y</span>
            </span>
            <div className="absolute bottom-1 w-6 h-[2px] bg-gradient-to-r from-[#f27a21] to-teal-400" />
          </div>

          <div>
            <div className="flex items-baseline space-x-1">
              <span className="font-sans font-black text-base sm:text-lg tracking-widest uppercase text-white">
                URBAN
              </span>
              <span className="font-sans font-black text-base sm:text-lg tracking-widest uppercase text-[#f27a21]">
                YATRA
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-gray-400 block -mt-1 font-semibold">
              EXPLORE MORE. LIVE MORE.
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold uppercase tracking-wider">
          {mainNav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3.5 py-2.5 rounded-xl transition-all ${
                  active
                    ? "bg-[#f27a21] text-white shadow-lg shadow-[#f27a21]/15"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 bg-white/5 hover:bg-white/10 text-gray-200 rounded-xl cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12212c] border-t border-white/5 py-4 px-3 mt-2 rounded-2xl space-y-1.5 shadow-xl">
          {mainNav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left text-xs uppercase tracking-wider font-bold transition-all ${
                  active
                    ? "bg-[#f27a21] text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
