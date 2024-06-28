import {
  DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND,
  DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
} from "@/types/responses";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const token = cookies().get("facebook-clone");
  const searchParams = req.nextUrl.searchParams;

  const postId = searchParams.get("postId");
  const userId = searchParams.get("userId");

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND, {
      status: 400,
    });
  }

  try {
    const response = await axios.get(
      `http://localhost:4000/v1/comments/initial-comment?postId=${postId}&userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Cookie: `facebook-clone=${token.value}`,
        },
        withCredentials: true,
      },
    );
    return NextResponse.json(response.data);
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
