import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the token from the cookies
  const token = request.cookies.get("token");

  // Get the current path
  const path = request.nextUrl.pathname;

  // Define protected paths that require authentication
  const protectedPaths = [
    "/admin/dashboard",
    "/api/admin/me",
    "/admin/inventory",
    "/admin/fuel",
    "/admin/order",
    "/admin/truck",
    "/admin/report",
    "/admin/office-staff-account",
    "/admin/depot-staff-account",
  ];
  const isProtectedPath = protectedPaths.some((pp) => path.startsWith(pp));

  // Define auth paths (login, register, etc.)
  const authPaths = ["/admin/login", "/admin/create-account"];
  const isAuthPath = authPaths.some((ap) => path.startsWith(ap));

  // If it's a protected path and there's no token, redirect to login
  if (isProtectedPath && !token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If it's a protected path and there is a token, forward the token
  if (isProtectedPath && token) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-token", token.value);

    // Create the response
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Add CORS headers for API routes
    if (path.startsWith("/api/")) {
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set(
        "Access-Control-Allow-Origin",
        request.headers.get("origin") || "*"
      );
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, x-user-token"
      );
    }

    return response;
  }

  // If it's an auth path and there is a token, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // For all other cases, continue with the request
  const response = NextResponse.next();

  // Add CORS headers for API routes
  if (path.startsWith("/api/")) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Origin",
      request.headers.get("origin") || "*"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-user-token"
    );
  }

  return response;
}

// Configure the paths that middleware should run on
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
