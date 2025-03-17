import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ["/admin"];

  // Protected paths that require authentication
  const protectedPaths = [
    "/admin/dashboard",
    "/admin/office-staff-account",
    "/admin/depot-staff-account",
    "/admin/truck",
    "/admin/order",
    "/admin/inventory",
    "/admin/report",
    "/office-staff/dashboard",
    "/office-staff/order",
    "/office-staff/inventory",
    "/office-staff/truck",
    "/office-staff/report",
    "/depot-staff/dashboard",
    "/depot-staff/order",
    "/depot-staff/inventory",
    "/depot-staff/truck",
    "/depot-staff/report",
  ];

  // If trying to access /admin/login, redirect to /admin
  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Check if the path is protected and there's no token
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If user is authenticated and tries to access login page, redirect to dashboard
  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/admin/:path*", "/office-staff/:path*", "/depot-staff/:path*"],
};
