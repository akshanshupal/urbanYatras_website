import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import EnquiryForm from "@/components/EnquiryForm";
import { BLOG_POSTS, getFeaturedPosts, getSortedPosts } from "@/blogData";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "India Travel Blog & Destination Guides",
  description:
    "Expert India travel guides, itineraries and tips from Urban Yatras — Kashmir, Rajasthan, Kerala, Ladakh, Goa, spiritual circuits, honeymoon and family holiday ideas.",
  path: "/blog",
  keywords: [
    "India travel blog",
    "India travel guides",
    "India tour itineraries",
    "best places to visit in India",
    "India holiday tips",
  ],
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogIndexPage() {
  const sorted = getSortedPosts();
  const featured = getFeaturedPosts()[0] ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured.slug);

  // ItemList JSON-LD for the blog index (SEO).
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Travel Blog`,
    url: `${siteConfig.domain}/blog`,
    description:
      "India travel guides, itineraries and tips covering destinations, spiritual circuits, wildlife, honeymoon and family holidays.",
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteConfig.domain}/blog/${post.slug}`,
      datePublished: post.publishDate,
      image: post.heroImage,
      author: { "@type": "Organization", name: siteConfig.name },
    })),
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Page header */}
      <section className="bg-[#12212c] text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 text-center">
          <span className="inline-block bg-white/5 border border-white/10 text-orange-300 text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
            Urban Yatras Journal
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
            India Travel Guides &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f27a21] via-orange-300 to-amber-200">
              Destination Stories
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 leading-relaxed">
            Handpicked itineraries, seasonal tips and insider guides to help you plan unforgettable
            journeys across incredible India.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-14">
        {/* Featured post */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-wider text-[#f27a21] mb-5">Featured Guide</h2>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden">
              <Image
                src={featured.heroImage}
                alt={featured.heroAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 mb-3">
                <span className="bg-[#f27a21] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                  {featured.category}
                </span>
                <span>{formatDate(featured.publishDate)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readMinutes} min
                </span>
              </div>
              <h3 className="font-sans font-black text-2xl md:text-3xl text-[#1b2e3c] leading-tight mb-3 group-hover:text-[#f27a21] transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{featured.excerpt}</p>
              <span className="mt-5 inline-block text-xs font-black uppercase tracking-wider text-[#1b2e3c] group-hover:text-[#f27a21]">
                Read the full guide →
              </span>
            </div>
          </Link>
        </section>

        {/* All posts grid */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-wider text-[#f27a21] mb-5">All Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Enquiry CTA */}
        <EnquiryForm
          source="blog-listing"
          heading="Found Your Next Destination?"
          subheading="Pick from all popular Indian destinations below and our travel desk will send you a tailored package with verified stays and transparent pricing."
        />
      </div>
    </div>
  );
}
