import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/sign-up", "/sign-in"];

export async function proxy(request: NextRequest) {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Path:", request.nextUrl.pathname);
  console.log("Has session:", !!getSessionCookie(request));
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  const sessionCookie = getSessionCookie(request);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  if (isAuthRoute) {
    return sessionCookie
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.next();
  }

  // All are dashboard routes
  if (!sessionCookie)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
