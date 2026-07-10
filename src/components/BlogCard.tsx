/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Presentational card for a blog post. Server component (no client hooks).
 */

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "../types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#f27a21] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 mb-3">
          <span>{formatDate(post.publishDate)}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readMinutes} min read
          </span>
        </div>

        <h3 className="font-sans font-black text-lg text-[#1b2e3c] leading-snug mb-2 group-hover:text-[#f27a21] transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#1b2e3c] hover:text-[#f27a21] transition-colors"
        >
          Read Guide <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
