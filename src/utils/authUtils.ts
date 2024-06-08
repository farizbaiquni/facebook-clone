import { login } from "@/services/login";

export const authLogin = async (email: string, password: string) => {
  try {
    const response = await login(email, password);
    if (response.status === 200) {
      // window.location.href = "/dashboard";
    }
  } catch (error) {
    throw error;
  }
};
