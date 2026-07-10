"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BadgeIndianRupee, MapPinned, ShieldCheck, Sparkles, Users2, ArrowRight } from "lucide-react";
import DestinationBoard from "@/components/DestinationBoard";
import HeroSlider from "@/components/HeroSlider";
import { useFavorites } from "@/hooks/useFavorites";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Stays",
    text: "Every hotel and homestay is physically audited by our local teams before you book.",
  },
  {
icon: BadgeIndianRupee,
title: "Flexible Pricing",
text: "Customize your trip with packages that match your budget, preferences, and travel needs.",
  },
  {
    icon: Users2,
    title: "Local Experts",
    text: "Authorised regional operators craft each route so you travel like an insider.",
  },
  {
    icon: MapPinned,
    title: "Fully Customised",
    text: "50+ destinations tailored to your dates, budget, pace and family needs.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HomePage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-slate-50 text-[#1b2e3c] font-sans leading-normal">
      <HeroSlider />

      {/* ---- Why Urban Yatras (animated feature band) ---- */}
      <section className="relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-6 transition-shadow"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#f27a21]/10 text-[#f27a21] mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-base text-[#1b2e3c] mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- Section intro ---- */}
      <section className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-2 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-[#f27a21]/10 text-[#f27a21] text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Curated Indian Voyages
          </span>
          <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-[#1b2e3c] mb-3">
            Explore India by Experience
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
            From Himalayan snowscapes to sun-drenched southern coasts, browse our handpicked
            destinations and let us build the perfect itinerary for you.
          </p>
        </motion.div>
      </section>

      {/* ---- Destinations ---- */}
      <div id="curated-regions">
        <DestinationBoard favorites={favorites} onToggleFavorite={toggleFavorite} />
      </div>

      {/* ---- Blog CTA strip ---- */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-[#12212c] text-white p-8 md:p-12"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#f27a21]/20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-sans font-black text-2xl md:text-3xl mb-2">Need travel inspiration?</h3>
              <p className="text-gray-300 text-sm md:text-base max-w-xl">
                Read our India travel guides — itineraries, best-time tips and insider stories for
                every kind of traveller.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#f27a21] hover:bg-[#e06512] text-white font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-2xl hover:scale-[1.03] transition-all shadow-xl shadow-orange-900/30 whitespace-nowrap"
            >
              Explore the Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
