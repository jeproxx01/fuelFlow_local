import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function middleware(request) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/api/login"];

  // Role-based path mappings
  const rolePaths = {
    admin: ["/admin"],
    gas_station_owner: ["/gas-station-owner"],
    gas_station_staff: ["/gas-station-staff"],
    depot_staff: ["/depot-staff"],
    office_staff: ["/office-staff"],
  };

  // If trying to access login page while already authenticated, redirect to appropriate dashboard
  if (pathname === "/login" && token) {
    try {
      const decoded = jwt.verify(
        token.value,
        process.env.JWT_SECRET || "your-secret-key"
      );
      const role = decoded.role;
      const dashboardPath = rolePaths[role]?.[0] + "/dashboard";
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    } catch (error) {
      // If token is invalid, continue to login page
    }
  }

  // Allow access to public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if path requires authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const userRole = decoded.role;

    // Check if user has access to the requested path
    const allowedPaths = rolePaths[userRole] || [];
    const hasAccess = allowedPaths.some((path) => pathname.startsWith(path));

    if (!hasAccess) {
      // Redirect to appropriate dashboard if user doesn't have access
      const dashboardPath = rolePaths[userRole]?.[0] + "/dashboard";
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/admin/:path*",
    "/gas-station-owner/:path*",
    "/gas-station-staff/:path*",
    "/depot-staff/:path*",
    "/office-staff/:path*",
    "/login",
    "/api/login",
  ],
};
