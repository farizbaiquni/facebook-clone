import { DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER } from "@/types/responses";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  const params = await req.json();

  try {
    const response = await axios.post(
      "http://localhost:4000/v1/auth/login",
      params,
    );
    const ENV = process.env.ENVIRONMENT;
    const serializedCookie = cookie.serialize(
      "auth_token",
      response.data.data.token,
      {
        httpOnly: true,
        path: "/",
        maxAge: response.data.data.expiredIn,
        secure: ENV === "production",
        sameSite: "strict",
      },
    );

    const nextResponse = NextResponse.json(response.data);
    nextResponse.headers.set("Set-Cookie", serializedCookie);
    return nextResponse;
  } catch (error: AxiosError | any) {
    if (error.response?.data.status !== undefined) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER, {
      status: 500,
    });
  }
}
