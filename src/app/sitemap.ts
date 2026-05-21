import type { MetadataRoute } from "next";
import { CURATED_DESTINATIONS } from "@/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/payment", "/terms"].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const destinationRoutes = CURATED_DESTINATIONS.map((destination) => ({
    url: `${siteConfig.domain}/destinations/${destination.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes];
}
