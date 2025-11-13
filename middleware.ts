import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PRIVATE_PREFIXES = ["/notes", "/profile"];
const AUTH_PREFIXES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  const accessToken = req.cookies.get("accessToken")?.value ?? null;
  const refreshToken = req.cookies.get("refreshToken")?.value ?? null;

  let hasUser = Boolean(accessToken);
  let setCookieHeader: string | null = null;

  if (!accessToken && refreshToken) {
    const refreshUrl = new URL("/api/auth/refresh", req.url);

    const refreshRes = await fetch(refreshUrl.toString(), {
      method: "POST",
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (refreshRes.ok) {
      hasUser = true;

      setCookieHeader = refreshRes.headers.get("set-cookie");
    } else {
      hasUser = false;
    }
  }

  let res: NextResponse;

  if (isPrivate && !hasUser) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    res = NextResponse.redirect(url);
  } else if (isAuthPage && hasUser) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    res = NextResponse.redirect(url);
  } else {
    res = NextResponse.next();
  }

  if (setCookieHeader) {
    res.headers.append("Set-Cookie", setCookieHeader);
  }

  return res;
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
