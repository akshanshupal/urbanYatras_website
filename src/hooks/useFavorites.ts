"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "urbanyatras_favs";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem(STORAGE_KEY);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      console.warn("Could not read favorite destinations", error);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev: string[]) => {
      const next = prev.includes(id)
        ? prev.filter((value: string) => value !== id)
        : [...prev, id];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { favorites, toggleFavorite };
};
