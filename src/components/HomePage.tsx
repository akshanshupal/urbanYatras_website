"use client";

import DestinationBoard from "@/components/DestinationBoard";
import Hero from "@/components/Hero";
import { useFavorites } from "@/hooks/useFavorites";

export default function HomePage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-slate-50 text-[#1b2e3c] font-sans leading-normal">
      <Hero />
      <div id="curated-regions">
        <DestinationBoard favorites={favorites} onToggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
}
