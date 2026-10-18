import Link from "next/link";
import { getLiveSite } from "@/lib/siteStore";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default async function DiwaliStrip() {
  const site = await getLiveSite();
  const c = site.content;
  if (!c.festiveOn || !c.stripText) return null;
  return (
    <div className="bg-brown px-4 py-2 text-center text-xs sm:text-sm font-medium text-gold-soft">
      {c.stripText}{" "}
      {c.stripLink && (
        <Link href={buildWhatsAppLink(c.bannerMessage, site)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-cream-soft">
          {c.stripLink}
        </Link>
      )}
    </div>
  );
}
