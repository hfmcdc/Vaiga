"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-soft/95 backdrop-blur shadow-[0_4px_20px_-8px_rgba(58,35,23,0.25)]"
          : "bg-cream-soft/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-xl sm:text-2xl font-semibold text-maroon"
        >
          Vaiga
          <span className="hidden sm:inline text-xs font-sans font-medium tracking-[0.2em] uppercase text-brown/60">
            Sweets &amp; Snacks
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-medium text-brown/85">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors hover:text-maroon ${
                  pathname === item.href ? "text-maroon" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-cream-soft transition-all hover:bg-maroon-dark hover:-translate-y-0.5"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Order Now
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-brown hover:bg-brown/5"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-brown/10 bg-cream-soft px-5 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    pathname === item.href
                      ? "bg-maroon/10 text-maroon"
                      : "text-brown/85 hover:bg-brown/5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-semibold text-cream-soft"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Order Now on WhatsApp
          </Link>
        </div>
      )}
    </header>
  );
}
