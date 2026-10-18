import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "vaiga_admin";
const WEEK = 7 * 24 * 60 * 60 * 1000;

export const adminConfigured = () =>
  !!(process.env.ADMIN_CODE && process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);

const sign = (v: string) =>
  crypto.createHmac("sha256", process.env.ADMIN_SECRET || "").update(v).digest("hex");

export function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function makeToken() {
  const exp = String(Date.now() + WEEK);
  return `${exp}.${sign(exp)}`;
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !safeEqual(sign(exp), sig)) return false;
  return Number(exp) > Date.now();
}

export const MAX_AGE_SECONDS = WEEK / 1000;
