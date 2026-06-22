import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Refund and Cancellation Policy",
  description:
    "Read the Urban Yatras refund and cancellation policy covering booking charges, timelines, and refund processing.",
  path: "/refund",
});

export default function RefundPage() {
  return <BrandedSubpages currentView="refund" />;
}