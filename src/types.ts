/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Destination {
  id: string;
  name: string;
  country: string;
  category: "beaches" | "mountains" | "culture" | "culinary" | "historic" | "nature";
  image: string;
  description: string;
  rating: number;
  priceLevel: "$$" | "$$$" | "$$$$";
  startPrice: number;
  highlights: string[];
  bestTime: string;
  locations?: string[];
  longSummary?: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  location?: string;
  estimatedCost?: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  activities: ItineraryActivity[];
}

export interface TravelItinerary {
  destination: string;
  durationDays: number;
  budgetLevel: string;
  travelStyle: string;
  summary: string;
  packingSuggestions: string[];
  days: ItineraryDay[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: "essentials" | "clothing" | "toiletries" | "gear" | "documents";
  packed: boolean;
}

export interface CurrencyConversion {
  from: string;
  to: string;
  rate: number;
}
