import { Route } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./shared/lib/auth";

const publicRoutes: Set<Route<string>> = new Set([
  "/login",
  "/register",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
]);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname as Route<string>;
  const hasSession = await auth.api.getSession({ headers: await headers() });

  if (publicRoutes.has(path)) {
    if (hasSession) {
      return NextResponse.redirect(
        new URL("/overview" as Route<string>, request.url),
      );
    }
    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(
      new URL("/login" as Route<string>, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
