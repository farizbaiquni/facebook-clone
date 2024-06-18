import { UserType } from "@/types/user";
import { createContext } from "react";

export const UserContext = createContext<UserType | null>(null);
