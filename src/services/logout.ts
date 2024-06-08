"use server";

import { cookieName } from "@/configs/config";
import { cookies } from "next/headers";

export const logout = async () => {
  cookies().delete(cookieName);
  const cookie = cookies().get(cookieName);
  if (cookie === undefined) {
    return true;
  }
  return false;
};
