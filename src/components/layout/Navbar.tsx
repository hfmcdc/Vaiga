"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { useSite } from "@/components/SiteProvider";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Navbar() {
  const siteConfig = useSite();
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
          ? "bg-night-soft/95 backdrop-blur shadow-[0_4px_20px_-8px_rgba(58,35,23,0.25)]"
          : "bg-night-soft/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-xl sm:text-2xl font-semibold text-gold"
        >
          <Image src="/images/logo-small.png" alt="Vaiga Sweets & Snacks" width={256} height={170} priority className="h-12 w-auto sm:h-14" />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-medium text-ink/85">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors hover:text-gold ${
                  pathname === item.href ? "text-gold" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href={buildWhatsAppLink(undefined, siteConfig)}
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
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-ink hover:bg-ink/10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-night-soft px-5 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    pathname === item.href
                      ? "bg-maroon/10 text-gold"
                      : "text-ink/85 hover:bg-ink/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={buildWhatsAppLink(undefined, siteConfig)}
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
