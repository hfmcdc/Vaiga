import { cache } from "react";
import { readStore } from "@/lib/productStore";
import { defaultSite, toLive, type SiteContent } from "@/data/siteContent";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const stored = await readStore<Partial<SiteContent>>("site", () => ({}));
    return { ...defaultSite, ...stored };
  } catch (e) {
    console.error("site content failed, using defaults", e);
    return defaultSite; // never take the whole website down
  }
}

export const getLiveSite = cache(async () => toLive(await getSiteContent()));
