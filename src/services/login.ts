import axios from "axios";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/users/login",
      { email, password },
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};
