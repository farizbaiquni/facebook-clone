import {
  DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND,
  DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
} from "@/types/responses";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = cookies().get("facebook-clone");

  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  const userId = searchParams.get("userId");

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND);
  }

  try {
    const response = await axios.get(
      `http://localhost:4000/v1/posts?offset=${offset}&limit=${limit}&userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Cookie: `facebook-clone=${token.value}`,
        },
        withCredentials: true,
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER);
  }
}

export async function POST(req: Request, res: NextResponse) {
  const token = cookies().get("facebook-clone");

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND);
  }

  const params = await req.json();

  try {
    const response = await axios.post(
      `http://localhost:4000/v1/posts`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Cookie: `facebook-clone=${token.value}`,
        },
        withCredentials: true,
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER);
  }
}
