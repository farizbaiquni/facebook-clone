import axios, { AxiosResponse } from "axios";

export const getUserByIdService = async (
  token: string,
): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await axios.get("http://localhost:4000/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `facebook-clone=${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
