/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Clock, MapPin, Star, Calendar, Check, Compass, Sparkles, CheckCircle2, Phone, ShieldCheck, Heart, Share2 } from "lucide-react";
import { Destination } from "../types";
import { siteConfig } from "@/lib/site";
import { useFavorites } from "@/hooks/useFavorites";

interface PackageDetailsPageProps {
  packageData: Destination;
}

export default function PackageDetailsPage({
  packageData
}: PackageDetailsPageProps) {
  const { favorites, toggleFavorite } = useFavorites();
  // Enquiry state
  const [isCopied, setIsCopied] = useState(false);
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryMobile, setEnquiryMobile] = useState("");
  const [enquiryNotes, setEnquiryNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [packageData]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryMobile.trim()) {
      alert("Please enter your name and contact mobile number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const apiBase = (process.env.NEXT_PUBLIC_ENQUIRY_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.urbanyatras.in").replace(/\/+$/, "");
      console.log("apiBase:", apiBase);
      const pageUrl = window.location.href;
      const url = new URL(pageUrl);
      const meta = {
        referrer: document.referrer || "",
        userAgent: navigator.userAgent || "",
        utm: Object.fromEntries(url.searchParams.entries()),
        destinationId: packageData.id,
        destinationCategory: packageData.category,
      };

      const response = await fetch(`${apiBase}/api/enquiry`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: enquiryName.trim(),
          mobile: enquiryMobile.trim(),
          message: enquiryNotes.trim(),
          destination: packageData.name,
          packageName: packageData.name,
          source: "package-details",
          pageUrl,
          meta,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || "Failed to submit enquiry");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Enquiry submit error:", err);
      alert("Unable to submit enquiry right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const isFavorited = favorites.includes(packageData.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 py-8 select-none"
    >
      {/* Navigation & Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-[#1b2e3c] font-black text-xs uppercase hover:text-[#f27a21] transition-all cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#f27a21]" />
          <span>Back to Indian Odysseys</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleFavorite(packageData.id)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-bold leading-none ${
              isFavorited
                ? "bg-rose-550 border-rose-500 bg-rose-500 text-white"
                : "bg-white border-gray-100 text-gray-700 hover:border-rose-300"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current text-white" : "text-rose-500"}`} />
            <span className="hidden sm:inline">{isFavorited ? "My Favorite" : "Save Package"}</span>
          </button>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className="p-2.5 rounded-xl border bg-white border-gray-100 text-gray-600 hover:bg-gray-50 cursor-pointer transition-all flex items-center space-x-1.5 text-xs font-bold font-sans"
            title="Share with loved ones"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-gray-500" />
                <span className="hidden sm:inline text-gray-700">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Package Header Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left 7 Columns: Hero Cover & Location list / long narration */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Visual Carousel Cover */}
          <div className="relative h-[320px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={packageData.image}
              alt={packageData.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Absolute Gradients */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/80 via-gray-950/25 to-transparent h-2/3"></div>

            {/* Float tags */}
            <div className="absolute top-4 left-4 bg-[#1b2e3c] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow">
              {packageData.category} EXPEDITION
            </div>

            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-mono font-black tracking-widest px-3 py-1.5 rounded-xl shadow-md uppercase">
              Starting from ₹{packageData.startPrice.toLocaleString("en-IN")}
            </div>

            {/* Visual Title Details inside hero cover */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <div className="flex flex-wrap items-center gap-3 mb-2.5">
                <span className="flex items-center space-x-1.5 bg-amber-500 text-slate-900 font-mono font-black text-xs px-2.5 py-1 rounded-xl shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                  <span>{packageData.rating} Verified Rating</span>
                </span>
                
                <span className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#f27a21]" />
                  <span>Incredible India Route</span>
                </span>
              </div>

              <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tight text-white drop-shadow-md">
                {packageData.name} Package Details
              </h1>
              <p className="text-gray-200 text-xs md:text-sm mt-2 max-w-2xl font-medium line-clamp-2 md:line-clamp-none">
                {packageData.description}
              </p>
            </div>
          </div>

          {/* Quick Specifications Banner Row */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-xs">
            <div className="border-r border-gray-100 last:border-0 py-1 text-left px-3">
              <span className="text-[10px] text-gray-400 font-black uppercase block">Best Season</span>
              <span className="text-[#1b2e3c] font-extrabold text-xs mt-1 block truncate" title={packageData.bestTime}>
                {packageData.bestTime}
              </span>
            </div>
            <div className="border-r border-gray-100 last:border-0 py-1 text-left px-3">
              <span className="text-[10px] text-gray-400 font-black uppercase block">Min. Tier Cost</span>
              <span className="text-[#f27a21] font-black text-md mt-0.5 block font-mono">
                ₹{packageData.startPrice.toLocaleString("en-IN")} <span className="text-[9px] text-gray-450 font-sans font-bold text-gray-500">/couple</span>
              </span>
            </div>
            <div className="border-r border-gray-100 last:border-0 py-1 text-left px-3">
              <span className="text-[10px] text-gray-400 font-black uppercase block">Standard Duration</span>
              <span className="text-[#1b2e3c] font-black text-xs mt-1 block font-mono">
                5 Nights / 6 Days
              </span>
            </div>
            <div className="py-1 text-left px-3">
              <span className="text-[10px] text-gray-400 font-black uppercase block">Transit Support</span>
              <span className="text-[#1b2e3c] font-black text-xs mt-1 block font-mono">
                Private SUV Included
              </span>
            </div>
          </div>

          {/* Detailed Narrative Package Summary */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 text-left shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="w-5 h-5 text-[#f27a21] animate-spin-slow" />
              <h2 className="font-sans font-black text-lg text-[#1b2e3c] uppercase tracking-wide">
                Tour Package Narrative
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-medium mb-6">
              {packageData.longSummary || `Embark on an authentic exploration of ${packageData.name}. Unearth unique cultural sites, experience personalized hospitality, and settle into carefully curated handpicked boutique hotels. Our route engineers have mapped this tour to optimize daylight scenery timings and capture incredible local flavors. This full packages incorporates daily breakfast spreads, guided sightseeing in comfortable dedicated cabs, and on-job coordinator services.`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#f27a21] block">Standard Inclusions</span>
                <ul className="space-y-2 text-xs font-bold text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-500 shrink-0" /> Selected 4-Star Accommodations</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-500 shrink-0" /> Private AC SUV Transfers via Local Drivers</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-500 shrink-0" /> Daily Healthy Breakfast & Gala Welcome Dinner</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-500 shrink-0" /> Dedicated 24/7 Telephone Concierge</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Highlights Checklist</span>
                <ul className="space-y-2 text-xs font-bold text-gray-600">
                  {packageData.highlights.map((h, i) => (
                    <li key={i} className="flex items-center text-slate-800">
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />
                      <span className="truncate">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Location Route Checkpoints (The summary of the location list of that package) */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 text-left shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-50">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#f27a21]" />
                <h2 className="font-sans font-black text-lg text-[#1b2e3c] uppercase tracking-wide">
                  Locations Included in Package
                </h2>
              </div>
              <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg uppercase">
                {packageData.locations?.length || 4} Core Stops
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-6 font-medium">
              This package includes comprehensive transport transfers and overnight halts across the following iconic regions. See the exact locations included in this custom tour plan:
            </p>

            {/* Custom stylized step line timeline of stops */}
            <div className="relative pl-6 border-l-2 border-dashed border-orange-100 space-y-6">
              {(packageData.locations || [
                `${packageData.name} Central Gateway`,
                "Heritage Landmarks Walk",
                "Scenic Observation Points",
                "Local Bazaars & Sunset Return"
              ]).map((loc, idx) => {
                // Parse city name vs subtitle
                const parts = loc.split(" ");
                const title = parts[0] + " " + (parts[1] || "");
                const suffix = loc.slice(title.length);

                return (
                  <div key={idx} className="relative text-left">
                    {/* Floating map spot icon indicator */}
                    <div className="absolute -left-[31px] top-0.5 bg-orange-50 border-2 border-[#f27a21] rounded-full p-1 text-[#f27a21] shadow-xs">
                      <span className="font-mono text-[9px] font-black leading-none w-3.5 h-3.5 flex items-center justify-center">
                        {idx + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-sans font-black text-xs text-[#1b2e3c]">
                        {loc}
                      </h4>
                      <p className="text-gray-550 text-xs text-gray-500 font-semibold mt-0.5 leading-relaxed">
                        Complete sightseeing tour transfers, evening culinary visits, and curated entry permits are covered under your custom itinerary choice.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 5 Columns: Dynamic Enquiry Desk */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 bg-white border border-gray-100 rounded-3xl p-6 shadow-md text-left space-y-6">
            
            <div className="pb-4 border-b border-gray-50">
              <div className="inline-flex items-center space-x-1.5 bg-[#f27a21]/5 text-[#f27a21] px-2.5 py-1 rounded-xl text-[9px] font-black uppercase mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Instant Consultation Request</span>
              </div>
              <h3 className="font-sans font-black text-md text-[#1b2e3c]">Consultation Desk</h3>
              <p className="text-gray-450 text-[11px] text-gray-500 mt-0.5 leading-relaxed font-bold">
                Drop your contact details to receive a customized physical tour plan from our regional coordinator.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 px-2 animate-fade-in">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-50 mb-4 border border-emerald-100">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </div>
                
                <h4 className="text-base font-black text-[#1b2e3c] tracking-tight mb-1">
                  Enquiry Submitted!
                </h4>
                
                {/* The specific response requested by USER: */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 my-4">
                  <p className="text-xs text-emerald-800 font-bold leading-relaxed">
                    We will customise the package as per your need and will contact you soon.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 text-left font-mono text-[10px] space-y-1.5 text-gray-700">
                  <div><strong className="text-gray-400">Destination:</strong> {packageData.name}</div>
                  <div><strong className="text-gray-400">Lead Visitor:</strong> {enquiryName}</div>
                  <div><strong className="text-gray-400">Contact No:</strong> +91 {enquiryMobile}</div>
                  {enquiryNotes && <div><strong className="text-gray-400">Special Notes:</strong> {enquiryNotes}</div>}
                </div>

                <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-left font-mono text-[10px] space-y-1.5 text-gray-700 mt-3">
                  <div><strong className="text-gray-400">Contact:</strong> {siteConfig.displayPhone}</div>
                  <div><strong className="text-gray-400">Email:</strong> {siteConfig.email}</div>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-[#1b2e3c] text-white hover:bg-[#f27a21] text-xs font-black uppercase tracking-wider py-2.5 px-4 rounded-xl mt-4 cursor-pointer transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                
                {/* Form fields */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Traveller Name"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-xl text-xs font-bold text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                    Contact Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="99999 88888"
                      value={enquiryMobile}
                      onChange={(e) => setEnquiryMobile(e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      className="w-full bg-gray-50 border border-gray-200 py-2.5 pl-9 pr-3 rounded-xl text-xs font-mono font-black text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                    Special Solicitations / Notes
                  </label>
                  <textarea
                    placeholder="e.g. Pure vegetarian meal planning, require extra wheel-chair support, 5-Star luxury resort upgrade..."
                    value={enquiryNotes}
                    onChange={(e) => setEnquiryNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 py-2 px-3 rounded-xl text-xs font-bold text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f27a21] hover:bg-[#d86111] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-white animate-pulse" />
                  <span>Request Custom Iteration Plan</span>
                </button>

              </form>
            )}

            {/* Direct support assurances */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-start space-x-3 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <h5 className="font-sans font-black text-[10px] text-[#1b2e3c] uppercase">Secure Consultation Guarantee</h5>
                <p className="text-[9.5px] text-gray-500 font-semibold leading-relaxed mt-0.5">
                  Urban Yatras connects you directly to state government-licensed local tour agents. Zero hidden brokerage, and real physical verification.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </motion.div>
  );
}
