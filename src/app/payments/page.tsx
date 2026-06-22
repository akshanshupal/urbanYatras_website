import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Payments • Urban Yatras",
  description:
    "Payment information for Urban Yatras. Get payment support and complete your booking securely for India tour packages and custom itineraries.",
  path: "/payments",
});

export default function PaymentsPage() {
  return <BrandedSubpages currentView="payment" />;
}
