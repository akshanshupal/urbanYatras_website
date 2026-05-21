import HomePage from "@/components/HomePage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Curated India Tour Packages",
  description:
    "Explore curated India tour packages with Urban Yatras. Discover mountains, beaches, heritage cities, spiritual circuits, and wildlife holidays with custom travel planning.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
