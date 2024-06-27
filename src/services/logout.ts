"use server";

import { cookies } from "next/headers";
import { cookieName } from "@/app/configs/cookies";

export const logoutService = () => {
  cookies().delete(cookieName);
  const cookie = cookies().get(cookieName);
  if (cookie === undefined) {
    return true;
  }
  return false;
};
