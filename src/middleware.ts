import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { cookieName } from "./configs/config";

export async function middleware(req: NextRequest) {
  const TOKEN_NAME = cookieName;
  const token = req.cookies.get(TOKEN_NAME)?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/verifyTokenJWT",
        { token: token },
      );
      if (response.status !== 200) {
        return NextResponse.redirect(new URL("/verify-token-failed", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(
        new URL("/error-when-verify-token", req.url),
      );
    }
  }

  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/login")
  ) {
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:4000/verifyTokenJWT",
          { token: token },
        );
        // if (response.status === 200) {
        //   return NextResponse.redirect(new URL("/dashboard", req.url));
        // }
      } catch (err) {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
