/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Clock, DollarSign, X, Landmark, Compass, RefreshCw } from "lucide-react";
import { CURRENCY_LIST, MOCK_RATES, WORLD_CLOCKS } from "../data";

interface TravelToolboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TravelToolbox({ isOpen, onClose }: TravelToolboxProps) {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [currAmount, setCurrAmount] = useState<number>(1000);
  const [currFrom, setCurrFrom] = useState<string>("INR");
  const [currTo, setCurrTo] = useState<string>("USD");
  const [convertedVal, setConvertedVal] = useState<number>(12);

  // Maintain local ticking clock for listed cities
  useEffect(() => {
    const updateTime = () => {
      const calculated: Record<string, string> = {};
      WORLD_CLOCKS.forEach((clock) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: clock.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          });
          calculated[clock.city] = formatter.format(new Date());
        } catch (e) {
          calculated[clock.city] = "N/A";
        }
      });
      setTimes(calculated);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync conversions
  useEffect(() => {
    if (currFrom === currTo) {
      setConvertedVal(currAmount);
      return;
    }
    const key = `${currFrom}_${currTo}`;
    if (MOCK_RATES[key]) {
      setConvertedVal(parseFloat((currAmount * MOCK_RATES[key]).toFixed(2)));
    } else {
      const revKey = `${currTo}_${currFrom}`;
      if (MOCK_RATES[revKey]) {
        const derivedRate = 1 / MOCK_RATES[revKey];
        setConvertedVal(parseFloat((currAmount * derivedRate).toFixed(3)));
      } else {
        setConvertedVal(currAmount);
      }
    }
  }, [currAmount, currFrom, currTo]);

  const handleSwap = () => {
    const prevFrom = currFrom;
    setCurrFrom(currTo);
    setCurrTo(prevFrom);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/40 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-100 py-6 px-5 transition-all">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-50 p-1.5 rounded-xl text-[#f27a21]">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <h3 className="font-sans font-black text-xs text-[#1b2e3c] uppercase tracking-wider">Companion Tools</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 animate-pulse" />
            </button>
          </div>

          {/* Component 1: WORLD CLOCK */}
          <div className="mb-8">
            <div className="flex items-center space-x-1.5 mb-3.5">
              <Clock className="w-4 h-4 text-[#f27a21]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Regional Clocks</span>
            </div>

            <div className="space-y-2">
              {WORLD_CLOCKS.map((clock) => (
                <div 
                  key={clock.city}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100/80 hover:border-orange-100 transition-all"
                >
                  <span className="text-xs font-bold text-gray-700">{clock.city}</span>
                  <span className="font-mono text-xs font-bold text-white bg-[#1b2e3c] px-2 py-0.5 rounded-md">
                    {times[clock.city] || "--:--:--"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Component 2: EXCHANGE CALC */}
          <div>
            <div className="flex items-center space-x-1.5 mb-3.5">
              <Landmark className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">FX Calculator</span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-150 space-y-4">
              
              {/* Amount Input */}
              <div>
                <label className="block text-[9px] font-black uppercase text-gray-400 mb-1">Convert Sum</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono font-bold">∑</span>
                  <input
                    type="number"
                    value={currAmount}
                    onChange={(e) => setCurrAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-7 pr-3 py-2 text-xs font-mono font-black focus:outline-none focus:ring-1 focus:ring-[#f27a21] text-[#1b2e3c]"
                  />
                </div>
              </div>

              {/* FX Swap selector layout */}
              <div className="flex items-center justify-between gap-1">
                
                {/* From currency */}
                <div className="flex-1">
                  <span className="text-[9px] uppercase font-black text-gray-400 block mb-0.5">From</span>
                  <select
                    value={currFrom}
                    onChange={(e) => setCurrFrom(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg p-1.5 text-xs font-bold w-full focus:outline-none cursor-pointer text-[#1b2e3c]"
                  >
                    {CURRENCY_LIST.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                    ))}
                  </select>
                </div>

                {/* FX Swap trigger block */}
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-[#f27a21] transition-all cursor-pointer mt-3 shrink-0"
                  title="Swap currencies"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {/* To currency */}
                <div className="flex-1">
                  <span className="text-[9px] uppercase font-black text-gray-400 block mb-0.5">To</span>
                  <select
                    value={currTo}
                    onChange={(e) => setCurrTo(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg p-1.5 text-xs font-bold w-full focus:outline-none cursor-pointer text-[#1b2e3c]"
                  >
                    {CURRENCY_LIST.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Conversion Display Output */}
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-center">
                <span className="text-[9px] font-black text-emerald-700 uppercase block">Estimated Value</span>
                <span className="font-mono text-sm font-black text-emerald-800 mt-0.5 block">
                  {convertedVal} {currTo}
                </span>
                <span className="text-[8px] text-gray-400 block mt-1 font-mono font-bold">Standard Indian Exchange Ratios</span>
              </div>

            </div>
          </div>

        </div>

        {/* Companion Disclaimer */}
        <div className="text-center pt-4">
          <span className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-widest block">Urban Yatras Toolkit v2.0</span>
        </div>

      </div>

    </div>
  );
}
