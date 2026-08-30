// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "./lib/authRoutes";

const ACCESS_TOKEN_KEY = "betteroffmarket-access-token";

export function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set(
      "callbackUrl",
      nextUrl.pathname + nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/message",
    "/notifications",
    "/save-properties",
    "/my-offer",
    "/offer-negotiation-story",
    "/review-counter-offer",
    "/review-sent-offer",
    "/review-offer",
    "/send-counter-offer",
    "/sign-agreement-contact",
    "/submit-offer",
    "/user/:path*",
  ],
};