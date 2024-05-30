import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_PATHS } from "./config/enums";
import aLinks from "./config/aLinks";

/**
 * @param {NextRequest} request
 * @returns
 */
export async function middleware(request) {
  const response = NextResponse.next();
  const { geo } = request;
  const country = geo.country || "CY";
  const ip = geo.ip || "69.6.31.74";
  const city = geo.city || "Unknown";

  response.cookies.set("city", city, {
    sameSite: "lax",
    secure: false,
    httpOnly: false,
  });

  response.cookies.set("country", country, {
    sameSite: "lax",
    secure: false,
    httpOnly: false,
  });
  response.cookies.set("ip", ip, {
    sameSite: "lax",
    secure: false,
    httpOnly: false,
  });

  const regex = new RegExp("/((api|_next|favicon.ico|assets|sw.worker.js).*)");
  if (regex.test(request.nextUrl.pathname)) {
    return response;
  }

  const loc = request.nextUrl.pathname;
  const params = request.nextUrl.searchParams.toString();
  const token = request.cookies.get("token")?.value;

  if (token && PUBLIC_PATHS.includes(loc)) {
    if (
      loc === aLinks.verifyEmail &&
      params.includes("emailVerificationToken")
    ) {
      response.cookies.set("token", "", {
        sameSite: "lax",
        secure: false,
        httpOnly: false,
        expires: new Date(0),
        path: "/",
      });
      return response;
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (PUBLIC_PATHS.includes(loc) && !token) {
    return response;
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/?from=${loc}?${params}`, request.url)
    );
  }

  if (!PUBLIC_PATHS.includes(loc) && !token) {
    return NextResponse.redirect(
      new URL(`/?from=${loc}?${params}`, request.nextUrl.href)
    );
  }

  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/((?!api|_next|favicon.ico|assets|sw.worker.js).*)", "/"],
// };
