import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const token = cookies().get("facebook-clone");
  const searchParams = req.nextUrl.searchParams;

  const postId = searchParams.get("postId");
  const userId = searchParams.get("userId");

  if (token === undefined) {
    return NextResponse.json({ error: 400, message: "Cookie not found" });
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
  } catch (error) {
    throw error;
  }
}
