/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Compass, AlertCircle, Phone, Calendar, Users, CheckCircle, Sparkles } from "lucide-react";
import { OTHER_RECOMMENDED_PROMPTS } from "../data";

interface HeroProps {
  // Keeping props in signature for safe backward compatibility
  onGenerate?: (destination: string, duration: number, budget: string, style: string) => void;
  loading?: boolean;
}

export default function Hero({ onGenerate, loading }: HeroProps) {
  const [destination, setDestination] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setErrorMsg("Please specify an Indian destination you want to explore.");
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name for booking registration.");
      return;
    }
    if (!mobile.trim() || mobile.length < 8) {
      setErrorMsg("Please enter a valid mobile number so our destination team can contact you.");
      return;
    }
    if (!travelDate) {
      setErrorMsg("Please choose your tentative departure date.");
      return;
    }

    setErrorMsg("");

    const apiBase = (process.env.NEXT_PUBLIC_ENQUIRY_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.urbanyatras.in").replace(/\/+$/, "");
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
          source: "hero",
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
      return;
    } finally {
      setIsSubmitting(false);
    }

    // Package the enquiry to localStorage to match the application database
    const newEnquiry = {
      id: "hero_" + Date.now().toString(),
      destination: destination.trim(),
      fullName: fullName.trim(),
      mobile: "+91 " + mobile.trim(),
      travelDate: travelDate,
      days: duration,
      adults: adults,
      kids: kids,
      details: additionalRequests.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem("urban_enquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.push(newEnquiry);
      localStorage.setItem("urban_enquiries", JSON.stringify(list));
    } catch (err) {
      console.error("Local storage error during Hero enquiry write:", err);
    }

    setIsSubmitted(true);
  };

  const handleRecommendClick = (text: string) => {
    let loc = text;
    if (text.includes("through ")) {
      loc = text.split("through ").pop() || text;
    } else if (text.includes("in ")) {
      loc = text.split("in ").pop() || text;
    } else if (text.includes("for ")) {
      loc = text.split("for ").pop() || text;
    }
    setDestination(loc);
  };

  return (
    <div id="hero-banner-main" className="relative w-full overflow-hidden bg-[#12212c] text-white selection:bg-[#f27a21]">
      
      {/* Decorative Geometric Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#f27a21] filter blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full bg-[#1b2e3c] filter blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-20 md:py-24 flex flex-col items-center text-center">
        
        {/* Quality Banner Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide text-orange-300 border border-white/10 mb-6 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Powered by Hospitality Group of Hotels</span>
        </div>

        {/* Headline */}
  
        <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Uncompromised <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f27a21] via-orange-300 to-amber-200">Indian Journeys</span> Tailored for Your Family.
        </h1>

        <p className="font-sans font-medium text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
          Book and plan your customized vacations with authorized local experts. Gain transparent pricing, registered transport, and curated heritage itineraries.
        </p>

        {/* Brand Travel Form Card */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md text-[#1b2e3c] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/30 border border-gray-100">
          {isSubmitted ? (
            <div className="text-center py-6 md:py-10" id="hero-success-block">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-4 border border-emerald-100">
                <CheckCircle className="h-8 w-8 text-emerald-600 animate-bounce" />
              </div>
              <h3 className="font-sans font-black text-xl text-gray-950">Enquiry Successfully Registered!</h3>
              
              <div className="bg-emerald-50/75 border border-emerald-100 rounded-2xl p-5 max-w-xl mx-auto my-5">
                <p className="text-xs text-emerald-800 font-extrabold leading-relaxed">
                  We will customise the package as per your need and will contact you soon.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 max-w-md mx-auto text-left font-mono text-[11px] space-y-2 text-slate-700 shadow-xs">
                <div><strong className="text-slate-400">Destination:</strong> {destination}</div>
                <div><strong className="text-slate-400">Lead Visitor:</strong> {fullName}</div>
                <div><strong className="text-slate-400">Contact Mobile:</strong> +91 {mobile}</div>
                <div><strong className="text-slate-400">Date of Travel:</strong> {travelDate}</div>
                <div><strong className="text-slate-400">Yatra Duration:</strong> {duration} Days ({adults} Adults, {kids} Kids)</div>
                {additionalRequests && <div><strong className="text-slate-400">Special Notes:</strong> {additionalRequests}</div>}
              </div>

              <button
                type="button"
                id="reset-hero-enquiry-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setDestination("");
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
              
              {/* Row 1: Target, Name, Contact */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                
                {/* Destination Input */}
                <div className="md:col-span-4 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Heritage Region / Destination *
                  </label>
                  <div className="relative">
                    <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1b2e3c]/60" />
                    <input
                      type="text"
                      id="hero-enquiry-destination"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Kashmir Valley, Udaipur, Alleppey..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-bold transition-all text-[#1b2e3c]"
                    />
                  </div>
                </div>

                {/* Guest Name */}
                <div className="md:col-span-4 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="hero-enquiry-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Traveller Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-bold transition-all text-[#1b2e3c]"
                  />
                </div>

                {/* Contact Mobile */}
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
                      id="hero-enquiry-mobile"
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

              {/* Row 2: Date, Duration, Adults, Kids */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                
                {/* Tentative Date */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Date of Departure *
                  </label>
                  <input
                    type="date"
                    id="hero-enquiry-date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#f27a21] h-[46px] transition-all text-[#1b2e3c]"
                  />
                </div>

                {/* Duration Days */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2 flex justify-between">
                    <span>Duration:</span> <span className="text-[#f27a21] font-black">{duration} Days</span>
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

                {/* Adults Count */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Adult Travelers
                  </label>
                  <select
                    id="hero-enquiry-adults"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#f27a21] h-[46px] cursor-pointer text-[#1b2e3c]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} Adults</option>
                    ))}
                  </select>
                </div>

                {/* Kids count */}
                <div className="md:col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Kids (2-12 years)
                  </label>
                  <select
                    id="hero-enquiry-kids"
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

              {/* Additional custom desires */}
              <div className="text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                  Special Travel Desires / Additional Details
                </label>
                <input
                  type="text"
                  id="hero-enquiry-requests"
                  value={additionalRequests}
                  onChange={(e) => setAdditionalRequests(e.target.value)}
                  placeholder="e.g. Prefer 4-Star boutique resorts, pure vegetarian meal tracks, private Sedan transfer support..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:focus:ring-2 focus:ring-[#f27a21] focus:bg-white font-medium transition-all text-[#1b2e3c]"
                />
              </div>

              {errorMsg && (
                <div id="hero-validation-error" className="flex items-center space-x-2 text-rose-600 justify-start text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Launch Button */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 font-mono flex items-center">
                  🇮🇳 Curated by Authorized Local Operators • Licensed Physical Audits Done
                </span>
                
                <button
                  type="submit"
                  id="submit-hero-enquiry-btn"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#f27a21] hover:bg-[#e06512] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl hover:scale-[1.01] transition-all shadow-xl shadow-orange-500/10 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Build Custom package Plan</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Suggestion Prompts */}
        <div className="max-w-4xl mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs">
          <span className="text-gray-400 font-bold tracking-wider uppercase text-[10px]">Quick Starters:</span>
          {OTHER_RECOMMENDED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleRecommendClick(prompt)}
              className="bg-[#1b2e3c] hover:bg-[#2b4254] text-orange-200 hover:text-white border border-[#2b4254] px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-bold duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
