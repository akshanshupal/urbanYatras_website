import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Urban Yatras",
  description:
    "Learn about Urban Yatras, our travel philosophy, curated India journeys, verified local partnerships, and our focus on safe and personalized holiday planning.",
  path: "/about",
});

export default function AboutPage() {
  return <BrandedSubpages currentView="about" />;
}
