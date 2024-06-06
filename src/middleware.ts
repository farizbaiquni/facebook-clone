import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname }: { pathname: string } = req.nextUrl;
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
  const TOKEN_NAME = "facebook-clone-#01*@-";
  const token = req.cookies.get("facebook-clone-#01*@-")?.value;

  // if (req.nextUrl.pathname.startsWith("/dashboard")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   try {
  //     jwt.verify(token, JWT_SECRET_KEY);
  //   } catch (err) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  if (
    req.nextUrl.pathname.startsWith("/") ||
    req.nextUrl.pathname.startsWith("/login")
  ) {
    if (token) {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.set(TOKEN_NAME, "", { maxAge: -1 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
