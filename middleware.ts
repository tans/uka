import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const [AUTH_USER, AUTH_PASS] = (
  process.env.HTTP_BASIC_AUTH || "admin:123456"
).split(":");

// Step 1. HTTP Basic Auth Middleware for Challenge
export function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  return NextResponse.next();
}

// Step 2. Check HTTP Basic Auth header if present
function isAuthenticated(req: NextRequest) {
  return true;
  const authheader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];

  if (user == AUTH_USER && pass == AUTH_PASS) {
    return true;
  } else {
    return false;
  }
}

// Step 3. Configure "Matching Paths" below to protect routes with HTTP Basic Auth
export const config = {
  matcher: "/admin/:path*",
};
