import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-[#12212c] border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-wrap justify-center gap-6 text-gray-300 font-bold uppercase tracking-wider text-[11px]">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="text-center text-gray-400 leading-relaxed max-w-3xl mx-auto font-sans font-medium space-y-2">
          <p>{siteConfig.description}</p>
          <p>{siteConfig.displayPhone} | {siteConfig.email}</p>
          <p>{siteConfig.address}</p>
        </div>

        <div className="text-gray-500 font-mono text-[9px] font-bold block text-center">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
