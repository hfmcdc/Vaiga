import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig as staticSite } from "@/data/site";
import { getLiveSite } from "@/lib/siteStore";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${staticSite.name}.`,
};

export default async function PrivacyPolicyPage() {
  const siteConfig = await getLiveSite();
  return (
    <div className="bg-night">
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 pb-20 sm:pb-28">
        <SectionHeading eyebrow="Legal" title="Privacy Policy" align="left" />

        <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed text-ink/80">
          <p>
            This is placeholder privacy policy content for {siteConfig.name}.
            Replace it with a policy reviewed for your business before
            launch — this text is not legal advice.
          </p>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              Information we collect
            </h2>
            <p>
              When you use our contact form, we collect the name, phone
              number, email address, and message you provide, so we can
              respond to your enquiry or order.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              How we use it
            </h2>
            <p>
              We use this information solely to respond to enquiries,
              process orders, and improve our service. We do not sell your
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              WhatsApp &amp; phone contact
            </h2>
            <p>
              If you contact us via WhatsApp or phone, that conversation is
              subject to the respective platform&apos;s own privacy terms in
              addition to this policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              Contact us
            </h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-gold underline underline-offset-4">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
