import { gifsData } from "@/data/gifs";
import { GifType, GifsAPIType } from "@/types/gifs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const nextString: string | null | number = searchParams.get("next");
  const next = nextString === null ? 0 : Number(nextString);
  const q = searchParams.get("q");

  if (nextString !== null && isNaN(next)) {
    return NextResponse.json(
      { error: "Invalid next parameter" },
      { status: 400 },
    );
  }

  if (next === -1) {
    return NextResponse.json(
      { error: "The maximum result has been reached" },
      { status: 400 },
    );
  }

  try {
    if (q) {
      // Query
      let newNext: number = next;
      const newGifs: GifType[] = [];
      for (let i = next; i < gifsData.length; i++) {
        const gif = gifsData[i];
        if (gif.content_description.toLowerCase().includes(q)) {
          newGifs.push(gif);
          newNext = i + 1;
          if (newGifs.length === 5) {
            break;
          }
        }
        if (i === gifsData.length - 1) {
          newNext = -1;
        }
      }
      const response: GifsAPIType = {
        results: newGifs,
        next: newNext,
      };
      return NextResponse.json(response, { status: 200 });
    } else {
      // Non Query
      let newNext: number = next;
      const newGifs = gifsData.slice(next, next + 5);
      if (newNext + 5 >= gifsData.length) {
        newNext = -1;
      } else {
        newNext = newNext + 5;
      }
      const response: GifsAPIType = {
        results: newGifs,
        next: newNext,
      };
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
