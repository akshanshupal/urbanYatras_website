import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact Urban Yatras",
  description:
    "Contact Urban Yatras for custom travel planning, holiday bookings, payment support, and destination consultation. Reach us by phone, email, or office address.",
  path: "/contact",
});

export default function ContactPage() {
  return <BrandedSubpages currentView="contact" />;
}
