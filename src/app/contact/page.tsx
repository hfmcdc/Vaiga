import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig as staticSite } from "@/data/site";
import { getLiveSite } from "@/lib/siteStore";
import { buildWhatsAppLink, buildTelLink, buildMailLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${staticSite.name} — call, WhatsApp, email, or send us a message.`,
};

export default async function ContactPage() {
  const siteConfig = await getLiveSite();
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pt-14 pb-6 text-center">
        <SectionHeading
          eyebrow="We'd love to hear from you"
          title="Contact Us"
          description="Questions, bulk orders, or a festive box you'd like to plan ahead — reach out any way that's convenient."
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 sm:pb-28 grid lg:grid-cols-2 gap-10">
        <Reveal>
          <div className="space-y-4">
            <div className="rounded-3xl bg-cream-soft p-6 shadow-[0_10px_30px_-16px_rgba(58,35,23,0.2)]">
              <h2 className="font-display text-xl font-semibold text-brown mb-4">
                {siteConfig.name}
              </h2>
              <ul className="space-y-3.5 text-sm text-brown/80">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-maroon shrink-0" aria-hidden="true" />
                  <span>
                    {siteConfig.address.line1}, {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.state}{" "}
                    {siteConfig.address.postalCode}, {siteConfig.address.country}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-maroon shrink-0" aria-hidden="true" />
                  <a href={buildTelLink(siteConfig)} className="hover:text-maroon">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-maroon shrink-0" aria-hidden="true" />
                  <a
                    href={buildWhatsAppLink(undefined, siteConfig)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-maroon"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-maroon shrink-0" aria-hidden="true" />
                  <a href={buildMailLink(undefined, siteConfig)} className="hover:text-maroon break-all">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 text-maroon shrink-0" aria-hidden="true" />
                  <span>
                    {siteConfig.hours.map((h) => (
                      <span key={h.day} className="block">
                        {h.day}: {h.time}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-[0_10px_30px_-16px_rgba(58,35,23,0.2)]">
              <iframe
                title={`${siteConfig.name} location map`}
                src={siteConfig.address.mapEmbedUrl}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="rounded-3xl bg-cream-soft p-6 sm:p-8 shadow-[0_10px_30px_-16px_rgba(58,35,23,0.2)]">
            <h2 className="font-display text-xl font-semibold text-brown mb-1">
              Send an Enquiry
            </h2>
            <p className="text-sm text-brown/60 mb-6">
              We usually reply within a few hours during business hours.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
