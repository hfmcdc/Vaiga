"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

/**
 * This form currently just shows a success message — there is no backend
 * wired up yet. To connect it to a real service:
 *
 * 1. Formspree: sign up at formspree.io, create a form, and replace the
 *    body of handleSubmit with a fetch() POST to your Formspree endpoint.
 * 2. Resend: create a Next.js API route (e.g. src/app/api/contact/route.ts)
 *    that calls the Resend API, and POST this form's data to that route.
 *
 * See the README section "Connecting the contact form" for a full example.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // Simulated submission delay. Replace this block with a real
    // fetch() call to Formspree, Resend, or another provider.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("success");
    e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-green/10 border border-green/30 p-8 text-center">
        <CheckCircle2 className="mx-auto text-green" size={40} aria-hidden="true" />
        <h3 className="mt-3 font-display text-xl font-semibold text-brown">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-brown/70">
          Thanks for reaching out — we&apos;ll get back to you shortly. For
          faster replies, message us directly on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-maroon underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-brown mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-brown/15 bg-cream-soft px-4 py-3 text-brown placeholder:text-brown/40 focus:border-maroon"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-brown mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full rounded-xl border border-brown/15 bg-cream-soft px-4 py-3 text-brown placeholder:text-brown/40 focus:border-maroon"
          placeholder="Your phone number"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brown mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-brown/15 bg-cream-soft px-4 py-3 text-brown placeholder:text-brown/40 focus:border-maroon"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brown mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-brown/15 bg-cream-soft px-4 py-3 text-brown placeholder:text-brown/40 focus:border-maroon"
          placeholder="Tell us what you'd like to order or ask"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-cream-soft transition-all hover:bg-maroon-dark disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 className="animate-spin" size={16} />}
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
