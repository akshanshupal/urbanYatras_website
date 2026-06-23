import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetailsPage from "@/components/PackageDetailsPage";
import { CURATED_DESTINATIONS } from "@/data";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getDestinationBySlug = (slug: string) =>
  CURATED_DESTINATIONS.find((destination) => destination.id === slug);

export async function generateStaticParams() {
  return CURATED_DESTINATIONS.map((destination) => ({
    slug: destination.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} Tour Package`,
    description: `${destination.description} Explore highlights, best time to visit, package details, and enquiry options with ${siteConfig.name}.`,
    keywords: [
      destination.name,
      `${destination.name} tour package`,
      `${destination.name} itinerary`,
      `${destination.name} travel package`,
      `${destination.category} destinations in India`,
    ],
    category: "travel",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: `${siteConfig.domain}/destinations/${destination.id}`,
    },
    openGraph: {
      title: `${destination.name} Tour Package | ${siteConfig.name}`,
      description: destination.description,
      url: `${siteConfig.domain}/destinations/${destination.id}`,
      type: "website",
      images: [
        {
          url: new URL(destination.image, siteConfig.domain).toString(),
          alt: destination.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.name} Tour Package | ${siteConfig.name}`,
      description: destination.description,
      images: [destination.image],
    },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return <PackageDetailsPage packageData={destination} />;
}
