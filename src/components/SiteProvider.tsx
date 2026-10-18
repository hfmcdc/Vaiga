"use client";

import { createContext, useContext } from "react";
import type { LiveSite } from "@/data/siteContent";

const Ctx = createContext<LiveSite | null>(null);

export function SiteProvider({ value, children }: { value: LiveSite; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite(): LiveSite {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSite must be used inside SiteProvider");
  return v;
}
