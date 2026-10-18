import Link from "next/link";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { getLiveSite } from "@/lib/siteStore";
import { buildWhatsAppLink, buildMailLink, buildTelLink } from "@/lib/whatsapp";

export default async function Footer() {
  const siteConfig = await getLiveSite();
  return (
    <footer className="bg-maroon-dark text-cream-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-cream-soft/75 italic font-display">{siteConfig.tagline}</p>
          <p className="mt-4 inline-block rounded-full border border-gold/50 px-3 py-1 text-xs tracking-[0.2em] uppercase text-gold-soft">
            Since {siteConfig.since}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-gold-soft mb-4">
            Explore
          </p>
          <ul className="space-y-2.5 text-cream-soft/85">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-soft transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="hover:text-gold-soft transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-gold-soft mb-4">
            Get in touch
          </p>
          <ul className="space-y-3 text-cream-soft/85">
            <li>
              <a href={buildTelLink(siteConfig)} className="flex items-center gap-2 hover:text-gold-soft transition-colors">
                <Phone size={16} aria-hidden="true" /> {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={buildMailLink(undefined, siteConfig)}
                className="flex items-center gap-2 hover:text-gold-soft transition-colors break-all"
              >
                <Mail size={16} aria-hidden="true" /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink(undefined, siteConfig)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-soft transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-gold-soft mb-4">
            Follow along
          </p>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vaiga Sweets & Snacks on Instagram"
              className="rounded-full border border-cream-soft/30 p-2.5 hover:bg-cream-soft/10 transition-colors"
            >
              <InstagramIcon width={18} height={18} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vaiga Sweets & Snacks on Facebook"
              className="rounded-full border border-cream-soft/30 p-2.5 hover:bg-cream-soft/10 transition-colors"
            >
              <FacebookIcon width={18} height={18} />
            </a>
            <a
              href={buildWhatsAppLink(undefined, siteConfig)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Vaiga Sweets & Snacks on WhatsApp"
              className="rounded-full border border-cream-soft/30 p-2.5 hover:bg-cream-soft/10 transition-colors"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-soft/15 py-5 text-center text-xs text-cream-soft/60">
        © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
