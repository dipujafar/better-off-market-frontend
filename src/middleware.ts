import { NextResponse } from "next/server";
import { authRoutes } from "./lib/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get("betteroffmarket-access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/message",
    "/notifications",
    "/save-properties",
    "/my-offer",
    "/offer-negotiation-story",
    "/review-counter-offer",
    "/review-offer",
    "/send-counter-offer",
    "/sign-agreement-contact",
    "/submit-offer",
    "/user/:path*",
  ],
};
