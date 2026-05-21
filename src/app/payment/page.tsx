import BrandedSubpages from "@/components/BrandedSubpages";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Payment Details",
  description:
    "View Urban Yatras payment details including bank account number, IFSC, MMID, branch information, and UPI ID for secure travel booking payments.",
  path: "/payment",
});

export default function PaymentPage() {
  return <BrandedSubpages currentView="payment" />;
}
