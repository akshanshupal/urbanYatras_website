/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Animated hero for the home page: an auto-rotating image slider showcasing
 * India's top destinations with a glassmorphism enquiry form on the right.
 */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { CURATED_DESTINATIONS } from "../data";
import type { Destination } from "../types";

const SLIDE_IDS = [
  "agra-taj",
  "srinagar-kashmir",
  "alleppey-boat",
  "leh-ladakh",
  "jaisalmer-golden",
  "munnar-hills",
];

const SLIDE_COPY: Record<string, { eyebrow: string; title: string }> = {
  "agra-taj": { eyebrow: "Agra, Uttar Pradesh", title: "The Eternal Taj" },
  "srinagar-kashmir": { eyebrow: "Srinagar, Kashmir", title: "Paradise on Earth" },
  "alleppey-boat": { eyebrow: "Alleppey, Kerala", title: "Backwater Serenity" },
  "leh-ladakh": { eyebrow: "Leh, Ladakh", title: "Land of High Passes" },
  "jaisalmer-golden": { eyebrow: "Jaisalmer, Rajasthan", title: "The Golden City" },
  "munnar-hills": { eyebrow: "Munnar, Kerala", title: "Rolling Tea Hills" },
};

const CATEGORY_LABELS: Record<Destination["category"], string> = {
  mountains: "Mountains & Hills",
  beaches: "Beaches & Islands",
  culture: "Heritage & Culture",
  nature: "Wildlife & Nature",
  historic: "Spiritual & Historic",
  culinary: "Culinary",
};

const SLIDE_MS = 5500;

export default function HeroSlider() {
  const slides = useMemo(
    () =>
      SLIDE_IDS.map((id) => CURATED_DESTINATIONS.find((d) => d.id === id)).filter(
        (d): d is Destination => Boolean(d)
      ),
    []
  );

  const grouped = useMemo(() => {
    const map = new Map<Destination["category"], Destination[]>();
    for (const dest of CURATED_DESTINATIONS) {
      const list = map.get(dest.category) ?? [];
      list.push(dest);
      map.set(dest.category, list);
    }
    return Array.from(map.entries());
  }, []);

  const [active, setActive] = useState(0);

  // Auto-advance the slider.
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  const current = slides[active];

  // ---- Enquiry form state ----
  const [destination, setDestination] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [duration, setDuration] = useState(6);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return setErrorMsg("Please select a destination.");
    if (!fullName.trim()) return setErrorMsg("Please enter your full name.");
    if (!mobile.trim() || mobile.length < 8) return setErrorMsg("Please enter a valid mobile number.");
    if (!travelDate) return setErrorMsg("Please choose your departure date.");
    setErrorMsg("");

    const apiBase = (
      process.env.NEXT_PUBLIC_ENQUIRY_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.urbanyatras.in"
    ).replace(/\/+$/, "");
    const pageUrl = window.location.href;
    const url = new URL(pageUrl);
    const meta = {
      referrer: document.referrer || "",
      userAgent: navigator.userAgent || "",
      utm: Object.fromEntries(url.searchParams.entries()),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(`${apiBase}/api/enquiry`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobile: mobile.trim(),
          destination: destination.trim(),
          travelDate,
          days: duration,
          adults,
          kids,
          message: "",
          source: "hero-slider",
          pageUrl,
          meta,
        }),
      });
      if (!response.ok) throw new Error(await response.text().catch(() => "Failed"));
    } catch (err) {
      console.error("Enquiry submit error:", err);
      setErrorMsg("Unable to submit right now. Please try again.");
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
    }

    try {
      const existing = localStorage.getItem("urban_enquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        id: "heroslider_" + Date.now().toString(),
        destination: destination.trim(),
        fullName: fullName.trim(),
        mobile: "+91 " + mobile.trim(),
        travelDate,
        days: duration,
        adults,
        kids,
        details: "",
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("urban_enquiries", JSON.stringify(list));
    } catch (err) {
      console.error("Local storage error:", err);
    }
    setIsSubmitted(true);
  };

  const fieldClass =
    "w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white/15 font-semibold transition-all";

  return (
    <section className="relative w-full overflow-hidden bg-[#12212c] text-white">
      {/* ---- Background slider ---- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.2, ease: "linear" } }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c161d]/95 via-[#0c161d]/70 to-[#0c161d]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c161d] via-transparent to-[#0c161d]/30" />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-14 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide text-orange-300 border border-white/15 mb-6 uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Powered by Hospitality Group of Hotels</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-5"
            >
              Discover{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f27a21] via-orange-300 to-amber-200">
                Incredible India
              </span>
              <br /> One Journey at a Time.
            </motion.h1>

            {/* Animated caption tied to current slide */}
            <div className="h-14 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <MapPin className="w-5 h-5 text-[#f27a21]" />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-bold text-orange-200/80">
                      {SLIDE_COPY[current.id]?.eyebrow ?? current.country}
                    </p>
                    <p className="text-xl font-black text-white leading-tight">
                      {SLIDE_COPY[current.id]?.title ?? current.name}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {[
                { icon: ShieldCheck, label: "Verified Stays" },
                { icon: Star, label: "4.9/5 Rated" },
                { icon: Compass, label: "50+ Destinations" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm font-bold text-gray-200">
                  <b.icon className="w-4 h-4 text-[#f27a21]" />
                  {b.label}
                </div>
              ))}
            </motion.div>

            {/* Slide indicators + view package */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Show ${s.name}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? "w-8 bg-[#f27a21]" : "w-3 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <Link
                href={`/destinations/${current.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white hover:text-[#f27a21] transition-colors"
              >
                View this package <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: glass enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/40 p-6 md:p-7">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-400/20 border border-emerald-300/30 mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-300" />
                  </div>
                  <h3 className="font-black text-xl text-white mb-2">Enquiry Registered!</h3>
                  <p className="text-sm text-gray-200 mb-6">
                    Our travel desk will craft your custom {destination} package and contact you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setDestination("");
                      setFullName("");
                      setMobile("");
                      setTravelDate("");
                    }}
                    className="bg-[#f27a21] hover:bg-[#e06512] text-white text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                  >
                    New Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="mb-1">
                    <h2 className="font-sans font-black text-xl text-white">Plan Your Trip</h2>
                    <p className="text-xs text-gray-300 font-medium">Free custom itinerary in 24 hours.</p>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5">
                      Destination *
                    </label>
                    <select
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className={`${fieldClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="text-gray-900">Select a destination</option>
                      {grouped.map(([category, list]) => (
                        <optgroup key={category} label={CATEGORY_LABELS[category] ?? category} className="text-gray-900">
                          {list.map((dest) => (
                            <option key={dest.id} value={dest.name} className="text-gray-900">
                              {dest.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="Other / Not sure yet" className="text-gray-900">Other / Not sure yet</option>
                    </select>
                  </div>

                  {/* Name + mobile */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5">
                        Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="99999 88888"
                        maxLength={10}
                        className={`${fieldClass} font-mono`}
                      />
                    </div>
                  </div>

                  {/* Date + duration */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5">
                        Departure *
                      </label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className={`${fieldClass} [color-scheme:dark]`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5 flex justify-between">
                        <span>Days</span>
                        <span className="text-[#f27a21]">{duration}</span>
                      </label>
                      <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 h-[42px]">
                        <input
                          type="range"
                          min="2"
                          max="14"
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                          className="w-full accent-[#f27a21] h-1.5 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Adults + kids */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5">
                        Adults
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        className={`${fieldClass} cursor-pointer`}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n} className="text-gray-900">{n} Adults</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-300 mb-1.5">
                        Kids
                      </label>
                      <select
                        value={kids}
                        onChange={(e) => setKids(parseInt(e.target.value))}
                        className={`${fieldClass} cursor-pointer`}
                      >
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n} className="text-gray-900">{n} Children</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 text-rose-200 text-xs font-bold bg-rose-500/20 p-2.5 rounded-lg border border-rose-300/30">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f27a21] hover:bg-[#e06512] disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-orange-900/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Get My Custom Package"}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 font-mono">
                    🇮🇳 Transparent pricing • No spam • Local experts
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
