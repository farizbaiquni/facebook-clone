import axios from "axios";

export const getPostsService = async () => {
  try {
    const response = await axios.get("http://localhost:4000/posts");
    return response;
  } catch (error) {
    throw error;
  }
};
