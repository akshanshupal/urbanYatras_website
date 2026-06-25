import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/lib/site";
import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | Curated India Tour Packages`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "https://travelImg.b-cdn.net/urbanYatras/urban_yatra_favicon.png",
    shortcut: "https://travelImg.b-cdn.net/urbanYatras/urban_yatra_favicon.png",
    apple: "https://travelImg.b-cdn.net/urbanYatras/urban_yatra_favicon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${siteConfig.name} | Curated India Tour Packages`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} India tour packages`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Curated India Tour Packages`,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.companyLegalName,
  url: siteConfig.domain,
  email: siteConfig.email,
  telephone: siteConfig.displayPhone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.state,
    postalCode: siteConfig.postalCode,
    addressCountry: "IN",
  },
  image: new URL(siteConfig.socialImage, siteConfig.domain).toString(),
  logo: "https://travelImg.b-cdn.net/urbanYatras/logo.png",
  areaServed: "India",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.domain,
  inLanguage: "en-IN",
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-[#1b2e3c] font-sans leading-normal">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F0VT2V2ZZ7" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-F0VT2V2ZZ7');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
