import { gifsData } from "@/data/gifs";
import { GifType, GifsAPIType } from "@/types/gifs";
import {
  DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER,
  ErrorResponseType,
  ErrorStatusEnum,
  ErrorType,
} from "@/types/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q");

  if (
    searchParams.get("next") === null ||
    searchParams.get("next") === undefined
  ) {
    const httpResponeCode = 500;
    const errors: ErrorType[] = [
      {
        field: "next",
        type: "validate",
        message: "Invalid next parameter",
      },
    ];
    const errorObject: ErrorResponseType = {
      status: ErrorStatusEnum.INVALID_PARAMETER,
      code: httpResponeCode,
      errors: errors,
    };
    return NextResponse.json(errorObject, { status: httpResponeCode });
  }

  const next = Number(searchParams.get("next"));

  if (isNaN(next)) {
    const httpResponeCode = 500;
    const errors: ErrorType[] = [
      {
        field: "next",
        type: "validate",
        message: "Invalid next parameter",
      },
    ];
    const errorObject: ErrorResponseType = {
      status: ErrorStatusEnum.INVALID_PARAMETER,
      code: httpResponeCode,
      errors: errors,
    };
    return NextResponse.json(errorObject, { status: httpResponeCode });
  }

  if (next === null) {
    const httpResponeCode = 200;
    const errors: ErrorType[] = [
      {
        type: "resource not found",
        message: "The maximum result has been reached",
      },
    ];
    const errorObject: ErrorResponseType = {
      status: ErrorStatusEnum.RESOURCE_NOT_FOUND,
      code: httpResponeCode,
      errors: errors,
    };
    return NextResponse.json(errorObject, { status: httpResponeCode });
  }

  try {
    const httpResponeCode = 200;
    if (q) {
      // Query
      let newNext: number | null = next;
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
          newNext = null;
        }
      }
      const response: GifsAPIType = {
        results: newGifs,
        next: newNext,
      };
      return NextResponse.json(response, { status: httpResponeCode });
    } else {
      // Non Query
      let newNext: number | null = next;
      const newGifs = gifsData.slice(next, next + 5);
      if (newNext + 5 >= gifsData.length) {
        newNext = null;
      } else {
        newNext = newNext + 5;
      }
      const response: GifsAPIType = {
        results: newGifs,
        next: newNext,
      };
      return NextResponse.json(response, { status: httpResponeCode });
    }
  } catch (error) {
    return NextResponse.json(DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER, {
      status: 500,
    });
  }
}
