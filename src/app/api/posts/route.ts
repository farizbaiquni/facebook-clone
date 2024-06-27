import { cookieName } from "@/app/configs/cookies";
import {
  DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND,
  DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
} from "@/types/responses";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = cookies().get(cookieName);

  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  const userId = searchParams.get("userId");

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND, {
      status: 400,
    });
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

export async function POST(req: Request, res: NextResponse) {
  const token = cookies().get(cookieName);

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND, {
      status: 400,
    });
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
  } catch (error: AxiosError | any) {
    console.log("ERROR");
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
