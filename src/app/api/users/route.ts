import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = cookies().get("facebook-clone");

  if (token === undefined) {
    return NextResponse.json({ error: 400, message: "Cookie not found" });
  }

  try {
    const res = await axios.get("http://localhost:4000/users/profile", {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Cookie: `facebook-clone=${token.value}`,
      },
      withCredentials: true, // Pastikan cookie dikirimkan
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
