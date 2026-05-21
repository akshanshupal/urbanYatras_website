/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Calendar, Heart, ArrowRight, Compass, X, CheckCircle2, Sparkles, Phone } from "lucide-react";
import { CURATED_DESTINATIONS } from "../data";

interface DestinationBoardProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function DestinationBoard({
  favorites,
  onToggleFavorite
}: DestinationBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Enquiry Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDest, setActiveDest] = useState<typeof CURATED_DESTINATIONS[0] | null>(null);
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryMobile, setEnquiryMobile] = useState("");
  const [enquiryDate, setEnquiryDate] = useState("");
  const [enquiryDays, setEnquiryDays] = useState(5);
  const [enquiryAdults, setEnquiryAdults] = useState(2);
  const [enquiryKids, setEnquiryKids] = useState(0);
  const [isEnquirySubmitted, setIsEnquirySubmitted] = useState(false);

  const categories = [
    { id: "all", label: "All Experiences" },
    { id: "mountains", label: "Mountains & Hills" },
    { id: "beaches", label: "Beaches & Coasts" },
    { id: "culture", label: "Heritage & Royal" },
    { id: "nature", label: "Nature & Wildlife" },
    { id: "historic", label: "Spiritual & Cultural" }
  ];

  const handleOpenEnquiry = (dest: typeof CURATED_DESTINATIONS[0]) => {
    setActiveDest(dest);
    setIsModalOpen(true);
    setIsEnquirySubmitted(false);
    // Autofill nice default values
    setEnquiryName("");
    setEnquiryMobile("");
    setEnquiryDate("");
    setEnquiryDays(5);
    setEnquiryAdults(2);
    setEnquiryKids(0);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryMobile || !enquiryDate) {
      alert("Please enter all required fields including Name, Mobile, and Date.");
      return;
    }

    // Capture inquiry details to localStorage
    const newEnquiry = {
      id: Date.now().toString(),
      destination: activeDest?.name,
      fullName: enquiryName,
      mobile: enquiryMobile,
      travelDate: enquiryDate,
      days: enquiryDays,
      adults: enquiryAdults,
      kids: enquiryKids,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem("urban_enquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.push(newEnquiry);
      localStorage.setItem("urban_enquiries", JSON.stringify(list));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setIsEnquirySubmitted(true);
  };

  const filteredDestinations = CURATED_DESTINATIONS.filter((dest) => {
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-white selection:bg-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title Group with Navy & Orange branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
          <div>
            <span className="text-[#f27a21] text-xs font-black uppercase tracking-widest block mb-1">
              EXCLUSIVE ENCLAVES
            </span>
            <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-[#1b2e3c]">
              Curated Indian Odysseys
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              Explore handpicked, premium escapes designed for deep experiential immersion.
            </p>
          </div>

          {/* Quick Filter Search */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Srinagar, Alleppey houseboat..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#f27a21] font-bold text-[#1b2e3c]"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#1b2e3c] text-white shadow-md shadow-slate-900/10"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-450 text-xs font-bold text-gray-500">No matching heritage retreats.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="text-xs text-[#f27a21] font-black mt-2 hover:underline"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const isFav = favorites.includes(dest.id);
              return (
                <div
                  key={dest.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100/90 hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left"
                >
                  {/* Card Media Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-550 bg-gray-50">
                    <Link
                      href={`/destinations/${dest.id}`}
                      className="block h-full w-full cursor-pointer"
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />

                      <div className="absolute top-3 left-3 bg-[#1b2e3c] text-white text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-lg shadow-sm font-sans">
                        {dest.category}
                      </div>

                      <div className="absolute top-3 right-3 flex items-center">
                        <span className="bg-emerald-500 text-white text-[10px] font-mono px-2 py-1 rounded-md font-black shadow-sm">
                          Min. Price
                        </span>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(dest.id)}
                      className={`absolute bottom-3 right-3 p-1.5 rounded-full backdrop-blur-xs cursor-pointer transition-all ${
                        isFav
                          ? "bg-rose-500 text-white scale-110"
                          : "bg-white/90 text-gray-700 hover:bg-white hover:text-rose-500"
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name Country and Start Price Range */}
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <div>
                          <Link
                            href={`/destinations/${dest.id}`}
                            className="font-sans font-black text-lg text-[#1b2e3c] group-hover:text-[#f27a21] cursor-pointer transition-colors leading-tight"
                          >
                            {dest.name}
                          </Link>
                          <div className="flex items-center text-gray-400 text-xs mt-1 font-semibold">
                            <MapPin className="w-3 h-3 mr-1 text-[#f27a21]" />
                            <span>Incredible India</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-[8px] uppercase font-black text-gray-400 tracking-wider">Start From</span>
                          <span className="text-md font-mono font-black text-[#f27a21]">
                            ₹{dest.startPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Info Row: Stars rating and season */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-lg text-xs font-bold font-mono">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span>{dest.rating}</span>
                        </div>
                        <div className="flex items-center text-[10px] text-gray-500 font-bold">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-[#f27a21]" />
                          <span className="max-w-[150px] truncate">{dest.bestTime}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs leading-relaxed mb-4">
                        {dest.description}
                      </p>

                      {/* Landmarks highlights */}
                      <div className="space-y-1 mb-4 pt-3 border-t border-gray-50">
                        <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block">
                          Iconic Places / Experiences
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {dest.highlights.map((h, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Button footer actions */}
                    <div className="pt-3 border-t border-gray-150 flex items-center justify-between gap-2 mt-auto w-full">
                      <Link
                        href={`/destinations/${dest.id}`}
                        className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 hover:text-[#f27a21] text-[#1b2e3c] rounded-xl text-xs font-black transition-all cursor-pointer border border-gray-100"
                      >
                        View Package
                      </Link>
                      
                      <button
                        onClick={() => handleOpenEnquiry(dest)}
                        className="bg-[#1b2e3c] hover:bg-[#f27a21] text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center space-x-1 transition-all cursor-pointer shadow-sm hover:shadow shrink-0"
                        type="button"
                      >
                        <span>Build Plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Elegant enquiry Form Modal */}
      {isModalOpen && activeDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Modal box */}
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
            {/* Custom Header */}
            <div className="bg-[#1b2e3c] text-white px-6 py-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f27a21]">Customize Travel Package</span>
                <h3 className="text-lg font-black tracking-tight mt-0.5">{activeDest.name} Journey</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {isEnquirySubmitted ? (
                <div className="text-center py-6 px-4 animate-fade-in-up">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-4 border border-emerald-100">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-[#1b2e3c] tracking-tight mb-2">
                    Enquiry Successfully Submitted!
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
                    We will customise the package as per your need and will contact you soon.
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left mb-6 max-w-sm mx-auto">
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider block mb-2">Enquiry Summary</span>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-sans">
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">Client Name</span>
                        <span className="text-[#1b2e3c] font-black">{enquiryName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">Mobile</span>
                        <span className="text-[#1b2e3c] font-black">{enquiryMobile}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">Travel Date</span>
                        <span className="text-[#1b2e3c] font-black">{enquiryDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">Duration</span>
                        <span className="text-[#1b2e3c] font-black">{enquiryDays} Days</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400 font-bold block text-[10px]">Guests</span>
                        <span className="text-[#1b2e3c] font-black">{enquiryAdults} Adults, {enquiryKids} Kids</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto justify-center">
                    <Link
                      href={`/destinations/${activeDest.id}`}
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-[#1b2e3c] hover:bg-[#2c4456] text-white text-xs font-black uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#f27a21]" />
                      <span>View Package Details</span>
                    </Link>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-wider py-3 px-4 rounded-xl border border-gray-200 transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  
                  {/* Lead information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Akshanshu Pal"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-250 py-2.5 px-3 rounded-xl text-xs font-bold text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21] placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={enquiryMobile}
                          onChange={(e) => setEnquiryMobile(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-250 py-2.5 pl-9 pr-3 rounded-xl text-xs font-mono font-black text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21] placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                      Tentative Travel Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={enquiryDate}
                      onChange={(e) => setEnquiryDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 py-2.5 px-3 rounded-xl text-xs font-mono text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21]"
                    />
                  </div>

                  {/* Number of days and Package base price preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">
                        Number of Days
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={enquiryDays}
                        onChange={(e) => setEnquiryDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-gray-50 border border-gray-250 py-2.5 px-3 rounded-xl text-xs font-mono font-black text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                        Est. Package Base Price
                      </label>
                      <div className="bg-orange-50/50 border border-orange-100 rounded-xl py-2 px-3 text-left">
                        <span className="font-mono font-black text-xs text-[#f27a21]">
                          ₹{(activeDest.startPrice * (enquiryDays / 5)).toLocaleString("en-IN", {maximumFractionDigits:0})} per couple
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Number of Adults and Kids counter */}
                  <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#1b2e3c]">Guest Information & Occupancy</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black uppercase text-gray-450 mb-1">Adults (12y+)</label>
                        <select
                          value={enquiryAdults}
                          onChange={(e) => setEnquiryAdults(parseInt(e.target.value))}
                          className="w-full bg-white border border-gray-200 rounded-lg py-1.5 px-2 text-xs font-bold text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21]"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-black uppercase text-gray-450 mb-1">Kids (2-12y)</label>
                        <select
                          value={enquiryKids}
                          onChange={(e) => setEnquiryKids(parseInt(e.target.value))}
                          className="w-full bg-white border border-gray-200 rounded-lg py-1.5 px-2 text-xs font-bold text-[#1b2e3c] focus:outline-none focus:ring-1 focus:ring-[#f27a21]"
                        >
                          {[0, 1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? "Kid" : "Kids"}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#f27a21] hover:bg-[#d86111] text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-md transition-all cursor-pointer"
                    >
                      Submit Custom Enquiry
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* Modal footer disclaimer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100/60 text-center">
              <span className="text-[9px] text-gray-400 font-mono font-bold tracking-widest uppercase">Urban Yatras Verified Partner Network</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
