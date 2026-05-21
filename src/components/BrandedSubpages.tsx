/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import upiQrImage from "@/assets/images/UPI.png";
import { 
  Building2, Landmark, QrCode, PhoneCall, Mail, MapPin, 
  Send, Sparkles, CheckCircle2, ShieldAlert, BadgeInfo, FileCheck, CircleDollarSign
} from "lucide-react";
import { siteConfig } from "@/lib/site";

interface SubpageProps {
  currentView: "about" | "contact" | "payment" | "terms";
}

export default function BrandedSubpages({ currentView }: SubpageProps) {
  
  // States for Contact form
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("Kashmir Valley");
  const [message, setMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !email.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      // Clear fields
      setFullname("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 selection:bg-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back Link Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs font-bold text-[#f27a21] hover:text-[#e06512] flex items-center space-x-1 uppercase tracking-wider cursor-pointer font-sans"
          >
            <span>← Return to Voyage Planner</span>
          </Link>
        </div>

        {/* 1. ABOUT PAGE */}
        {currentView === "about" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Card */}
            <div className="bg-[#1b2e3c] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-y-6 translate-x-6 pointer-events-none">
                <Sparkles className="w-96 h-96 text-orange-400" />
              </div>
              
              <div className="max-w-3xl">
                <span className="bg-[#f27a21] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                  Who We Are
                </span>
                <h1 className="font-sans font-black text-3xl md:text-5xl tracking-tight mt-4 leading-tight">
                  Urban Yatras: Currating the Soul of India.
                </h1>
                <p className="text-gray-300 text-sm md:text-base mt-4 leading-relaxed font-sans">
                  Founded with a singular passion to showcase the unparalleled majesty of India, Urban Yatras delivers premium hand-curated experiences. From the misty heights of Kashmir to the tranquil riverine backwaters of Kerala, we unlock authentic cultural journeys integrated seamlessly with predictive smart technology.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold">
                  <span className="text-[#f27a21] uppercase tracking-wider">● EXPLORE MORE. LIVE MORE.</span>
                </div>
              </div>
            </div>

            {/* Core Values Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-[#f27a21]/15 text-[#f27a21] w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Landmark className="w-5 h-5 text-[#f27a21]" />
                </div>
                <h3 className="font-bold text-base text-[#1b2e3c] mb-2">Heritage Specialization</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  We don't specialize in standard tourist paths. Every destination on Urban Yatras is thoroughly vetted for historical integrity and cultural weight.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-[#1b2e3c]/10 text-[#1b2e3c] w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-[#f27a21]" />
                </div>
                <h3 className="font-bold text-base text-[#1b2e3c] mb-2">Intelligent Technology</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Our live AI compiler combines physical meteorological feedback, cultural festival dates, and crowd parameters to propose perfect daily itineraries.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-[#f27a21]/15 text-[#f27a21] w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#f27a21]" />
                </div>
                <h3 className="font-bold text-base text-[#1b2e3c] mb-2">Absolute Local Safety</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  We verify transport services, local drivers, and hotel chains to ensure premium comfort, secure UPI accessibility, and safe family voyages.
                </p>
              </div>
            </div>

            {/* Company Statistics Numbers */}
            <div className="bg-white rounded-3xl p-8 border border-gray-150 shadow-xs">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="p-4">
                  <span className="font-black text-3xl md:text-4xl text-[#1b2e3c] block">12,500+</span>
                  <span className="text-gray-400 text-[10px] font-bold block uppercase tracking-wider mt-1">Voyagers Assisted</span>
                </div>
                <div className="p-4">
                  <span className="font-black text-3xl md:text-4xl text-[#f27a21] block">150+</span>
                  <span className="text-gray-400 text-[10px] font-bold block uppercase tracking-wider mt-1">Heritage Properties</span>
                </div>
                <div className="p-4">
                  <span className="font-black text-3xl md:text-4xl text-[#1b2e3c] block">4.9 / 5</span>
                  <span className="text-gray-400 text-[10px] font-bold block uppercase tracking-wider mt-1">Service Rating</span>
                </div>
                <div className="p-4">
                  <span className="font-black text-3xl md:text-4xl text-[#f27a21] block">15+ States</span>
                  <span className="text-gray-400 text-[10px] font-bold block uppercase tracking-wider mt-1">Pan-India Regions</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PAYMENT PAGE */}
        {currentView === "payment" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
              <div className="max-w-2xl">
                <span className="bg-[#f27a21] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                  Voyage Settlement
                </span>
                <h1 className="font-sans font-black text-2xl md:text-3xl text-[#1b2e3c] mt-4">
                  Secure Bank Transfer & Instant UPI Scan
                </h1>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed font-sans font-medium">
                  We prioritize direct, zero-fee payment schemes. Please settle your itinerary package amount using any of the authenticated corporate bank details or scan the verified Indian UPI QR module.
                </p>
              </div>

              {/* Bank Details vs QR Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 pt-8 border-t border-gray-150">
                
                {/* Bank details - 7 Columns */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center space-x-2 text-[#1b2e3c] font-bold block mb-3 text-xs uppercase tracking-wider">
                    <Building2 className="w-4.5 h-4.5 text-[#f27a21]" />
                    <span>Corporate Bank Account Particulars</span>
                  </div>

                  <div className="bg-slate-50 border border-gray-150 p-6 rounded-2xl space-y-4">
                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200/60 pb-3 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Beneficiary Name</span>
                      <span className="col-span-2 font-black text-[#1b2e3c]">: {siteConfig.bank.accountName}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200/60 pb-3 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Bank Institution</span>
                      <span className="col-span-2 font-black text-slate-800">: Kotak Mahindra Bank</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200/60 pb-3 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Account Number</span>
                      <span className="col-span-2 font-mono font-black text-[#f27a21]">: {siteConfig.bank.accountNumber}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200/60 pb-3 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">RTGS / IFSC Code</span>
                      <span className="col-span-2 font-mono font-black text-slate-800">: {siteConfig.bank.ifsc}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200/60 pb-3 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">MMID</span>
                      <span className="col-span-2 font-mono font-black text-slate-800">: {siteConfig.bank.mmid}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200/60 pb-3 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Bank Branch</span>
                      <span className="col-span-2 font-black text-slate-800">: {siteConfig.bank.branch}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">UPI</span>
                      <span className="col-span-2 font-black text-emerald-600">: {siteConfig.bank.upi}</span>
                    </div>
                  </div>

                  {/* Transfer instruction guidelines */}
                  <div className="flex items-start space-x-3 bg-blue-50 text-blue-800 border border-blue-100 p-4 rounded-xl text-xs leading-relaxed">
                    <BadgeInfo className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black uppercase tracking-wider text-[10px]">Settlement Directive</p>
                      <p className="mt-1">
                        Post initiating your bank transfer, please share the transaction ID, date, and reference code or receipt screen capture with our travel counselor via the **Contact Form** or support mail to activate booking vouchers instantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR details - 5 Columns */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#1b2e3c] text-white rounded-3xl relative overflow-hidden">
                  <div className="relative z-10 text-center w-full max-w-[280px]">
                    <div className="flex items-center justify-center mx-auto mb-4 bg-white/10 p-2.5 rounded-full w-12 h-12 text-[#f27a21]">
                      <QrCode className="w-6 h-6 animate-pulse" />
                    </div>
                    
                    <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-[#f27a21]">G-Pay / BHIM UPI Scan</h4>
                    <p className="text-[10px] text-gray-300 mb-6">Scan using any standard Indian bank interface</p>

                    <div className="bg-white p-3 rounded-2xl shadow-xl border-4 border-[#f27a21] mx-auto w-[260px] max-w-full">
                      <Image
                        src={upiQrImage}
                        alt="Urban Yatras UPI QR Code"
                        className="w-full h-auto rounded-xl"
                        priority
                      />
                    </div>

                    <div className="mt-5 space-y-1 block text-center font-mono">
                      <span className="text-[10px] text-gray-300 font-black block">UPI ID: <strong className="text-white">{siteConfig.bank.upi}</strong></span>
                      <span className="text-[9px] text-[#f27a21] font-bold block uppercase tracking-wider">Instant Authorization Enabled</span>
                    </div>
                  </div>

                  {/* Aesthetic Background Grid lines */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 3. CONTACT PAGE */}
        {currentView === "contact" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column info - 5 Columns */}
              <div className="lg:col-span-5 bg-[#1b2e3c] text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-6">
                  <div>
                    <span className="bg-[#f27a21] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                      Connect Direct
                    </span>
                    <h2 className="font-sans font-black text-2xl md:text-3xl text-white mt-4">
                      Let's Custom Tailor Your Holiday.
                    </h2>
                    <p className="text-gray-300 text-xs mt-2 leading-relaxed font-sans font-medium">
                      Fill out our premium corporate intake form and a certified travel specialist representing Urban Yatras will follow up within 3 hours.
                    </p>
                  </div>

                  {/* Standard contact nodes */}
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="flex items-center space-x-3.5 text-xs">
                      <div className="bg-white/5 p-2 rounded-xl text-[#f27a21]">
                        <PhoneCall className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-bold">Call / WhatsApp Info</span>
                        <span className="font-mono text-white font-bold block">{siteConfig.displayPhone}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 text-xs">
                      <div className="bg-white/5 p-2 rounded-xl text-[#f27a21]">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-bold">Corporate Inquiries</span>
                        <span className="font-mono text-white font-bold block">{siteConfig.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 text-xs">
                      <div className="bg-white/5 p-2 rounded-xl text-[#f27a21]">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-bold">HQ Office Address</span>
                        <span className="text-white font-bold block">{siteConfig.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 mt-8 lg:mt-0">
                  <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase block">EXPLORE MORE. LIVE MORE.</span>
                </div>

                {/* Decorative circle ornament */}
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#f27a21]/20 rounded-full filter blur-xl"></div>
              </div>

              {/* Right Column Form - 7 Columns */}
              <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-gray-150 shadow-sm">
                
                {contactSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fadeIn space-y-4">
                    <div className="bg-emerald-50 text-emerald-500 p-4 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-8 h-8 animate-bounce" />
                    </div>
                    <div className="max-w-md">
                      <h3 className="font-sans font-black text-lg text-[#1b2e3c]">Itinerary Ingestion Active</h3>
                      <p className="text-gray-500 text-xs mt-1.5 leading-relaxed font-sans font-medium">
                        Thank you for contacting Urban Yatras. Your voyage parameters for <strong className="text-[#f27a21]">{destination}</strong> have been logged. A regional expert will review and correspond back with a proposal dossier.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-450 block text-gray-400">ID: UY-${Math.floor(Math.random() * 90000) + 10000} • Success Code 200</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <h3 className="font-sans font-black text-[#1b2e3c] text-lg uppercase tracking-tight">Voyage Intake Questionnaire</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          placeholder="e.g. Advika Sharma"
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f27a21] text-slate-800 font-bold"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. advika@domain.com"
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f27a21] text-slate-800 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Contact Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f27a21] text-slate-800 font-bold"
                        />
                      </div>

                      {/* Preferred sanctuary destination */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Preferred Indian Region</label>
                        <select
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f27a21] text-slate-800 font-bold cursor-pointer h-[38px]"
                        >
                          <option value="Kashmir Valley">Kashmir Valley (Mountains/Snow)</option>
                          <option value="Kerala Backwaters">Kerala Backwaters (Canals/Tea)</option>
                          <option value="Rajasthan Forts">Jaipur & Udaipur (Forts/Palaces)</option>
                          <option value="Spiritual Varanasi">Varanasi Ganga (Spiritual)</option>
                          <option value="Goa Coastline">Goa (Sandy Beaches & Leisure)</option>
                          <option value="Leh-Ladakh Heights">Leh & Ladakh (High Passes)</option>
                        </select>
                      </div>
                    </div>

                    {/* Detailed message */}
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Specific Requests / Custom Packing / Bank Reference</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Mention any custom specifications, travel dates, medical directives or details of your bank transfer..."
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#f27a21] text-slate-800 font-bold leading-relaxed"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#f27a21] hover:bg-[#e06512] text-white font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md shadow-orange-500/15 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>Transmit Intake Form</span>
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        )}

        {/* 4. TERMS & CONDITIONS PAGE */}
        {currentView === "terms" && (
          <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 md:p-10 animate-fadeIn space-y-8 select-text">
            <div>
              <span className="bg-[#1b2e3c] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                Regulatory Parameters
              </span>
              <h1 className="font-sans font-black text-2xl md:text-3xl text-[#1b2e3c] mt-4">
                Terms and Conditions of Travel Layouts
              </h1>
              <p className="text-gray-450 text-xs mt-1 text-gray-450">Last Revised: May 2026</p>
            </div>

            <div className="space-y-6 text-[#1b2e3c]/90 text-xs leading-relaxed font-sans font-medium border-t border-gray-100 pt-6">
              
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#1b2e3c] uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#f27a21]" />
                  <span>1. Agreement & Platform Intent</span>
                </h3>
                <p>
                  By accessing the itineraries compiled by **Urban Yatras**, you agree to these Terms. All schedules, weather assumptions, and transit routes are designed leveraging server-side models representing cultural best practices. Though highly accurate, the ultimate on-ground execution stays at the user's personal discretion.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#1b2e3c] uppercase tracking-wider flex items-center gap-1.5">
                  <CircleDollarSign className="w-4 h-4 text-[#f27a21]" />
                  <span>2. Payment, Clearances & Verification</span>
                </h3>
                <p>
                  Vouchers and travel booking assets are only authorized once direct bank transfers clearing the total package amount are verified against our declared bank details, or standard **UPI ID** transfers to **{siteConfig.bank.upi}** output valid confirmation telemetry. Urban Yatras reserves the absolute right to freeze or suspend dynamic reservations if balance settlement failures occur.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#1b2e3c] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#f27a21]" />
                  <span>3. Cancellations & Refund Metrics</span>
                </h3>
                <p>
                  We coordinate with luxury heritage partners across India. Cancellations received more than 15 calendar days before active voyage departure are granted a ninety percent (90%) total refund. Cancellations triggered between 7 to 14 days before journey slot are subject to fifty percent (50%) refund. No monetary refunds can be cleared for local cancel requests initiated within 6 days of departure.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#1b2e3c] uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#f27a21]" />
                  <span>4. High-Altitude and Regional Advisory</span>
                </h3>
                <p>
                  Voyages focusing on Ladakh or Kashmir might cross high elevations exceeding 11,000 feet. Travelers agree to self-regulate respiratory health, secure adequate physical checks, and follow mandatory acclimatization advice (e.g., resting for the first 24 hours in Leh city) before attempting heavy routes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#1b2e3c] uppercase tracking-wider flex items-center gap-1.5">
                  <BadgeInfo className="w-4 h-4 text-[#f27a21]" />
                  <span>5. Advisory Jurisdiction</span>
                </h3>
                <p>
                  Any legal claims or procedural disputes arising under these Indian Voyage itineraries will belong under the exclusive municipal court authority applicable to our registered office location in Greater Noida West, Uttar Pradesh.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
