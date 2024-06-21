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
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND);
  }

  try {
    const response = await axios.get(
      `http://localhost:4000/v1/post-reactions?userId=${userId}&postId=${postId}`,
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

export async function POST(req: Request, res: Response) {
  const token = cookies().get("facebook-clone");
  const params = await req.json();

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND);
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/v1/post-reactions",
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

export async function DELETE(req: Request, res: Response) {
  const token = cookies().get("facebook-clone");
  const params = await req.json();

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND);
  }

  try {
    const response = await axios.delete(
      "http://localhost:4000/v1/post-reactions",
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Cookie: `facebook-clone=${token.value}`,
        },
        data: params,
        withCredentials: true,
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER);
  }
}
