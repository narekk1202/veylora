import { Route } from "next";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./shared/lib/auth";

const publicRoutes: Set<Route<string>> = new Set([
  "/login",
  "/register",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
]);

const ONBOARDING_ROUTE: Route<string> = "/onboarding";
const DEFAULT_AUTH_ROUTE: Route<string> = "/overview";
const LOGIN_ROUTE: Route<string> = "/login";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname as Route<string>;
  const session = await auth.api.getSession({ headers: request.headers });

  const isPublicRoute = publicRoutes.has(path);
  const isOnboardingRoute = path === ONBOARDING_ROUTE;

  if (!session) {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  const onboardingCompleted = Boolean(session.user?.onboardingCompleted);

  if (!onboardingCompleted) {
    if (isOnboardingRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ONBOARDING_ROUTE, request.url));
  }

  if (isOnboardingRoute || isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_AUTH_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
