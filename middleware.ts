import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PRIVATE_PREFIXES = ["/notes", "/profile"];
const AUTH_PREFIXES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  // перевірка сесії
  const sessionUrl = new URL("/api/auth/session", req.url);
  const res = await fetch(sessionUrl, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
    // важливо для edge: не кешуємо
    cache: "no-store",
  });

  const text = await res.text();
  const hasUser = res.status === 200 && text && text.trim() !== "";

  if (isPrivate && !hasUser) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (isAuthPage && hasUser) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
