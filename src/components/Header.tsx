/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Sparkles, Sliders, Info, MessageSquare, ShieldCheck, CreditCard, Heart, Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: "home" | "about" | "contact" | "payment" | "terms";
  onViewChange: (view: "home" | "about" | "contact" | "payment" | "terms") => void;
  favoritesCount: number;
}

export default function Header({
  currentView,
  onViewChange,
  favoritesCount
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Indian Voyages", icon: Compass },
    { id: "about", label: "Our Story", icon: Info },
    { id: "payment", label: "Secure Payments", icon: CreditCard },
    { id: "contact", label: "Contact Us", icon: MessageSquare }
  ] as const;

  const handleNavClick = (view: "home" | "about" | "contact" | "payment" | "terms") => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-45 w-full bg-[#1b2e3c]/95 border-b border-white/5 backdrop-blur-md px-4 py-3 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Representation with exact Navy/Orange Colors */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          {/* Logo representation styled after the uploaded logo */}
          <div className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
            <span className="font-sans font-black text-lg tracking-tighter flex">
              <span className="text-white">U</span>
              <span className="text-[#f27a21] -translate-x-[2px]">Y</span>
            </span>
            {/* Small dynamic decorative line inside */}
            <div className="absolute bottom-1 w-6 h-[2px] bg-gradient-to-r from-[#f27a21] to-teal-400"></div>
          </div>

          <div>
            <div className="flex items-baseline space-x-1">
              <span className="font-sans font-black text-base sm:text-lg tracking-widest uppercase text-white">
                URBAN
              </span>
              <span className="font-sans font-black text-base sm:text-lg tracking-widest uppercase text-[#f27a21]">
                YATRAS
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-gray-400 block -mt-1 font-semibold">
              EXPLORE MORE. LIVE MORE.
            </span>
          </div>
        </div>

        {/* Global Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold uppercase tracking-wider">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  active
                    ? "bg-[#f27a21] text-white shadow-lg shadow-[#f27a21]/15"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-[#f27a21]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center space-x-3 text-xs font-bold">
          {/* Favorites Count Badge */}
          {favoritesCount > 0 && (
            <div 
              onClick={() => handleNavClick("home")} 
              className="flex items-center space-x-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-rose-500/15 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{favoritesCount}</span>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-white/5 hover:bg-white/10 text-gray-200 rounded-xl cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12212c] border-t border-white/5 py-4 px-3 mt-2 rounded-2xl space-y-1.5 shadow-xl animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs uppercase tracking-wider font-bold transition-all ${
                  active
                    ? "bg-[#f27a21] text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#f27a21]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
