import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export function middleware(req: NextRequest) {
  const { pathname }: { pathname: string } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/")) {
    if (token) {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        // token tidak valid, biarkan user tetap di halaman login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
