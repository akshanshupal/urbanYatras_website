/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Reusable enquiry form used across the blog (listing + articles).
 * Mirrors the Hero form behaviour (POST /api/enquiry + localStorage) but
 * replaces the free-text destination with a dropdown of ALL curated Indian
 * destinations, grouped by category.
 */

"use client";

import React, { useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Compass, Sparkles } from "lucide-react";
import { CURATED_DESTINATIONS } from "../data";
import type { Destination } from "../types";

interface EnquiryFormProps {
  /** Analytics/source tag stored with the enquiry. */
  source?: string;
  /** Pre-select a destination name (e.g. from a blog post). */
  defaultDestination?: string;
  heading?: string;
  subheading?: string;
}

const CATEGORY_LABELS: Record<Destination["category"], string> = {
  mountains: "Mountains & Hills",
  beaches: "Beaches & Islands",
  culture: "Heritage & Culture",
  nature: "Wildlife & Nature",
  historic: "Spiritual & Historic",
  culinary: "Culinary",
};

export default function EnquiryForm({
  source = "blog",
  defaultDestination = "",
  heading = "Plan Your Indian Getaway",
  subheading = "Tell us where you want to go and we will craft a custom package with verified stays and transparent pricing.",
}: EnquiryFormProps) {
  const [destination, setDestination] = useState(defaultDestination);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [duration, setDuration] = useState(6);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group all curated destinations by category for the dropdown.
  const grouped = useMemo(() => {
    const map = new Map<Destination["category"], Destination[]>();
    for (const dest of CURATED_DESTINATIONS) {
      const list = map.get(dest.category) ?? [];
      list.push(dest);
      map.set(dest.category, list);
    }
    return Array.from(map.entries());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination.trim()) {
      setErrorMsg("Please select an Indian destination you want to explore.");
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name for booking registration.");
      return;
    }
    if (!mobile.trim() || mobile.length < 8) {
      setErrorMsg("Please enter a valid mobile number so our team can contact you.");
      return;
    }
    if (!travelDate) {
      setErrorMsg("Please choose your tentative departure date.");
      return;
    }

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
          message: additionalRequests.trim(),
          source,
          pageUrl,
          meta,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || "Failed to submit enquiry");
      }
    } catch (err) {
      console.error("Enquiry submit error:", err);
      setErrorMsg("Unable to submit enquiry right now. Please try again.");
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
    }

    const newEnquiry = {
      id: source + "_" + Date.now().toString(),
      destination: destination.trim(),
      fullName: fullName.trim(),
      mobile: "+91 " + mobile.trim(),
      travelDate,
      days: duration,
      adults,
      kids,
      details: additionalRequests.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = localStorage.getItem("urban_enquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.push(newEnquiry);
      localStorage.setItem("urban_enquiries", JSON.stringify(list));
    } catch (err) {
      console.error("Local storage error during enquiry write:", err);
    }

    setIsSubmitted(true);
  };

  return (
    <section
      id="blog-enquiry"
      className="relative overflow-hidden rounded-3xl bg-[#12212c] text-white border border-white/10 shadow-2xl shadow-black/20"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#f27a21] filter blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#1b2e3c] filter blur-2xl" />
      </div>

      <div className="relative z-10 p-6 md:p-10">
        <div className="max-w-2xl mb-7">
          <div className="inline-flex items-center space-x-1.5 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wide text-orange-300 border border-white/10 mb-4 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Free Custom Itinerary</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-white mb-3">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">{subheading}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md text-[#1b2e3c] rounded-3xl p-6 md:p-8 border border-gray-100">
          {isSubmitted ? (
            <div className="text-center py-6 md:py-10">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-4 border border-emerald-100">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-sans font-black text-xl text-gray-950">Enquiry Successfully Registered!</h3>
              <div className="bg-emerald-50/75 border border-emerald-100 rounded-2xl p-5 max-w-xl mx-auto my-5">
                <p className="text-xs text-emerald-800 font-extrabold leading-relaxed">
                  We will customise the package as per your need and contact you soon.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 max-w-md mx-auto text-left font-mono text-[11px] space-y-2 text-slate-700">
                <div><strong className="text-slate-400">Destination:</strong> {destination}</div>
                <div><strong className="text-slate-400">Lead Visitor:</strong> {fullName}</div>
                <div><strong className="text-slate-400">Contact Mobile:</strong> +91 {mobile}</div>
                <div><strong className="text-slate-400">Date of Travel:</strong> {travelDate}</div>
                <div><strong className="text-slate-400">Duration:</strong> {duration} Days ({adults} Adults, {kids} Kids)</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setDestination(defaultDestination);
                  setFullName("");
                  setMobile("");
                  setTravelDate("");
                  setAdditionalRequests("");
                }}
                className="mt-6 bg-[#1b2e3c] hover:bg-[#f27a21] text-white text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                {/* Destination dropdown */}
                <div className="md:col-span-4 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Destination *
                  </label>
                  <div className="relative">
                    <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1b2e3c]/60 pointer-events-none" />
                    <select
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-bold transition-all text-[#1b2e3c] appearance-none cursor-pointer"
                    >
                      <option value="">Select a destination</option>
                      {grouped.map(([category, list]) => (
                        <optgroup key={category} label={CATEGORY_LABELS[category] ?? category}>
                          {list.map((dest) => (
                            <option key={dest.id} value={dest.name}>
                              {dest.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="Other / Not sure yet">Other / Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Full name */}
                <div className="md:col-span-4 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Traveller Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-bold transition-all text-[#1b2e3c]"
                  />
                </div>

                {/* Mobile */}
                <div className="md:col-span-4 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Contact Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="99999 88888"
                      maxLength={10}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-bold font-mono transition-all text-[#1b2e3c]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                {/* Date */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Date of Departure *
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#f27a21] h-[46px] transition-all text-[#1b2e3c]"
                  />
                </div>

                {/* Duration */}
                <div className="md:col-span-3 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2 flex justify-between">
                    <span>Duration:</span>
                    <span className="text-[#f27a21] font-black">{duration} Days</span>
                  </label>
                  <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 h-[46px]">
                    <input
                      type="range"
                      min="2"
                      max="14"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full accent-[#f27a21] h-1.5 cursor-pointer rounded-lg"
                    />
                  </div>
                </div>

                {/* Adults */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Adult Travelers
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#f27a21] h-[46px] cursor-pointer text-[#1b2e3c]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} Adults</option>
                    ))}
                  </select>
                </div>

                {/* Kids */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Kids (2-12 years)
                  </label>
                  <select
                    value={kids}
                    onChange={(e) => setKids(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#f27a21] h-[46px] cursor-pointer text-[#1b2e3c]"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} Children</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special requests */}
              <div className="text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                  Special Travel Desires / Additional Details
                </label>
                <input
                  type="text"
                  value={additionalRequests}
                  onChange={(e) => setAdditionalRequests(e.target.value)}
                  placeholder="e.g. 4-Star stays, pure-veg meals, private cab, senior-friendly pace..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-medium transition-all text-[#1b2e3c]"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-2 text-rose-600 justify-start text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 font-mono flex items-center">
                  🇮🇳 Curated by Authorized Local Operators • Transparent Pricing
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#f27a21] hover:bg-[#e06512] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl hover:scale-[1.01] transition-all shadow-xl shadow-orange-500/10 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{isSubmitting ? "Submitting..." : "Get My Custom Package"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
