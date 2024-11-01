import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  apiAuthPrefix,
  authRoute,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedin = !!req.cookies.get("tamiya");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isPublicRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedin && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
