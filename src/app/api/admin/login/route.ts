import { NextResponse } from "next/server";
import { COOKIE_NAME, MAX_AGE_SECONDS, adminConfigured, makeToken, safeEqual } from "@/lib/auth";

const fails = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  if (!adminConfigured())
    return NextResponse.json({ error: "Admin is not configured. Set ADMIN_* in .env.local" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const f = fails.get(ip);
  if (f && Date.now() - f.t < 15 * 60 * 1000 && f.n >= 5)
    return NextResponse.json({ error: "Too many tries. Wait 15 minutes." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const okCode = safeEqual(String(body.code ?? ""), process.env.ADMIN_CODE!);
  const okPass = safeEqual(String(body.password ?? ""), process.env.ADMIN_PASSWORD!);

  if (!(okCode && okPass)) {
    fails.set(ip, { n: (f && Date.now() - f.t < 9e5 ? f.n : 0) + 1, t: Date.now() });
    return NextResponse.json({ error: "Wrong code or password" }, { status: 401 });
  }
  fails.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, makeToken(), {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production",
    path: "/", maxAge: MAX_AGE_SECONDS,
  });
  return res;
}
