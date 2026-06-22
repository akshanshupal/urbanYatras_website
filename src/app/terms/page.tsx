import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Read the Urban Yatras terms and conditions covering travel bookings, payments, cancellations, refunds, advisories, and service usage policies.",
  path: "/terms",
});

export default function TermsPage() {
  return <BrandedSubpages currentView="terms" />;
}