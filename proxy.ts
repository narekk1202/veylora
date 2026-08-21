import { getCookieCache } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = new Set(["/", "/login", "/register"]);
const utilityRoutes = ["/verify-email", "/reset-password", "/forgot-password"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await getCookieCache(request);
  const onboarded = session?.user?.onboardingCompleted === true;

  if (utilityRoutes.some((r) => path === r || path.startsWith(r + "/"))) {
    return NextResponse.next();
  }

  if (!session && !publicRoutes.has(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && publicRoutes.has(path)) {
    return NextResponse.redirect(
      new URL(onboarded ? "/overview" : "/onboarding", request.url),
    );
  }

  if (session && !onboarded && path !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (session && onboarded && path === "/onboarding") {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
