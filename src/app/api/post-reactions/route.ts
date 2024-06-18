import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = cookies().get("facebook-clone");
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  if (Array.isArray(userId) || Array.isArray(postId)) {
    return NextResponse.json({ error: "Invalid query parameters" });
  }

  if (token === undefined) {
    return NextResponse.json({ error: 400, message: "Cookie not found" });
  }

  try {
    const res = await axios.get(
      `http://localhost:4000/v1/${userId}/${postId}/post-reactions`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Cookie: `facebook-clone=${token.value}`,
        },
        withCredentials: true,
      },
    );
    return NextResponse.json({ status: 200, results: res.data });
  } catch (error) {
    return NextResponse.json({
      error: 500,
      message: "Internal server error",
      detail: error,
    });
  }
}

export async function POST(req: Request, res: Response) {
  const token = cookies().get("facebook-clone");
  const params = await req.json();

  if (token === undefined) {
    return NextResponse.json({ error: 400, message: "Cookie not found" });
  }

  try {
    const res = await axios.post(
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
    return NextResponse.json({ status: 200, results: res.data });
  } catch (error) {
    return NextResponse.json({
      error: 500,
      message: "Internal server error",
      detail: error,
    });
  }
}

export async function DELETE(req: Request, res: Response) {
  const token = cookies().get("facebook-clone");
  const params = await req.json();

  // return NextResponse.json({ error: 400, data: params });

  if (token === undefined) {
    return NextResponse.json({ error: 400, message: "Cookie not found" });
  }

  try {
    const res = await axios.delete("http://localhost:4000/v1/post-reactions", {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Cookie: `facebook-clone=${token.value}`,
      },
      data: params,
      withCredentials: true,
    });
    return NextResponse.json({ status: 200, results: res.data });
  } catch (error) {
    return NextResponse.json({
      error: 500,
      message: "Internal server error",
      detail: error,
    });
  }
}
