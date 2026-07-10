import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Lightbulb, MapPin, Quote } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import EnquiryForm from "@/components/EnquiryForm";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from "@/blogData";
import { CURATED_DESTINATIONS } from "@/data";
import { siteConfig } from "@/lib/site";
import type { BlogBlock } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const url = `${siteConfig.domain}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [...post.tags, ...siteConfig.keywords],
    category: "travel",
    referrer: "origin-when-cross-origin",
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate ?? post.publishDate,
      authors: [post.author],
      images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

function ContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-sans font-black text-2xl md:text-3xl text-[#1b2e3c] mt-10 mb-4 scroll-mt-24">
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="text-[15px] md:text-base text-gray-700 leading-8 mb-5">{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol className="list-decimal pl-5 space-y-2.5 mb-6 text-[15px] md:text-base text-gray-700 marker:text-[#f27a21] marker:font-black">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7 pl-1">{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2.5 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] md:text-base text-gray-700 leading-7">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f27a21]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-gray-100">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-400 font-medium italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "tip":
      return (
        <div className="my-8 flex gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
          <Lightbulb className="h-5 w-5 shrink-0 text-[#f27a21] mt-0.5" />
          <div>
            {block.title && (
              <p className="font-black text-sm uppercase tracking-wide text-[#1b2e3c] mb-1">{block.title}</p>
            )}
            <p className="text-sm text-gray-700 leading-7">{block.text}</p>
          </div>
        </div>
      );
    case "quote":
      return (
        <blockquote className="my-8 flex gap-4 rounded-2xl bg-[#12212c] p-6 text-white">
          <Quote className="h-6 w-6 shrink-0 text-[#f27a21]" />
          <div>
            <p className="text-lg font-bold leading-8">{block.text}</p>
            {block.cite && <cite className="mt-2 block text-xs text-gray-400 not-italic">— {block.cite}</cite>}
          </div>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${siteConfig.domain}/blog/${post.slug}`;
  const relatedPackages = CURATED_DESTINATIONS.filter((d) => post.relatedDestinationIds.includes(d.id));
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const primaryDestination = relatedPackages[0]?.name ?? "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.heroImage,
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    author: { "@type": "Organization", name: post.author, url: siteConfig.domain },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: "https://travelImg.b-cdn.net/urbanYatras/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.domain}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <header className="relative">
        <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
          <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12212c] via-[#12212c]/60 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-3xl mx-auto px-4 pb-8 text-white">
            <nav className="mb-4 text-xs font-bold text-gray-300">
              <Link href="/" className="hover:text-[#f27a21]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[#f27a21]">Blog</Link>
            </nav>
            <span className="inline-block bg-[#f27a21] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-300">
              <span>{post.author}</span>
              <span>{formatDate(post.publishDate)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readMinutes} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <p className="text-lg md:text-xl font-medium text-[#1b2e3c] leading-8 mb-8 border-l-4 border-[#f27a21] pl-5">
          {post.excerpt}
        </p>

        {post.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related packages (cross-link to bookable destinations) */}
      {relatedPackages.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-4">
          <h2 className="font-sans font-black text-xl md:text-2xl text-[#1b2e3c] mb-5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#f27a21]" /> Related Tour Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPackages.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-black text-sm text-[#1b2e3c] group-hover:text-[#f27a21] transition-colors">
                    {dest.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold">From ₹{dest.startPrice.toLocaleString("en-IN")}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-[#f27a21]">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Enquiry form */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <EnquiryForm
          source={`blog-${post.slug}`}
          defaultDestination={primaryDestination}
          heading="Love This Itinerary? Let's Make It Yours."
          subheading="Share your dates and preferences — our travel desk will send a customised package for this destination within 24 hours."
        />
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="font-sans font-black text-xl md:text-2xl text-[#1b2e3c] mb-5">Continue Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <BlogCard key={rp.slug} post={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
