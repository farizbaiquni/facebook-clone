import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = cookies().get("facebook-clone");
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (Array.isArray(postId)) {
    return NextResponse.json({ error: "Invalid query parameters" });
  }

  if (token === undefined) {
    return NextResponse.json({ error: 400, message: "Cookie not found" });
  }

  try {
    const response = await axios.get(
      `http://localhost:4000/v1/posts/${postId}/top-3-reactions`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Cookie: `facebook-clone=${token.value}`,
        },
        withCredentials: true,
      },
    );
    return NextResponse.json({ status: 200, results: response.data });
  } catch (error) {
    return NextResponse.json({
      error: 500,
      message: "Internal server error",
      detail: error,
    });
  }
}
