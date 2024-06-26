import { UserType } from "@/types/users";
import { createContext } from "react";

export const UserContext = createContext<UserType | null>(null);
