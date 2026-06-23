import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
};

export const createMetadata = ({
  title,
  description,
  path = "/",
  keywords = [],
  image = siteConfig.socialImage,
}: MetadataInput): Metadata => {
  const url = new URL(path, siteConfig.domain).toString();
  const imageUrl = new URL(image, siteConfig.domain).toString();

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    category: "travel",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
};
