import { DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER } from "@/types/responses";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const params = await req.json();
  try {
    const response = await axios.post(
      "http://localhost:4000/v1/auth/register",
      params,
    );
    return NextResponse.json(response.data.data);
  } catch (error: AxiosError | any) {
    return NextResponse.json(
      error.response?.data || DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
    );
  }
}
