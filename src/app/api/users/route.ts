import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieName } from "@/app/configs/cookies";
import {
  DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND,
  DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
} from "@/types/responses";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = cookies().get(cookieName);

  if (token === undefined) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND);
  }

  try {
    const response = await axios.get(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Cookie: `${cookieName}=${token.value}`,
      },
      withCredentials: true,
    });
    return NextResponse.json(response.data);
  } catch (error: AxiosError | any) {
    return NextResponse.json(
      error.response?.data || DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
    );
  }
}
