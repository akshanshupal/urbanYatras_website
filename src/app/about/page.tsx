import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Urban Yatras",
  description:
    "Learn about Urban Yatras and how we curate premium India tour packages with verified stays, transparent pricing, and custom travel planning.",
  path: "/about",
});

export default function AboutPage() {
  return <BrandedSubpages currentView="about" />;
}
