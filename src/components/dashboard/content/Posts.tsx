import { getPostsService } from "@/services/posts";
import { PostGetType } from "@/types/post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "./post/Post";
import { UserContext } from "@/hooks/useContext";
import { UserType } from "@/types/user";

export default function Posts() {
  const [authUser, setAuthUser] = useState<UserType>(useContext(UserContext)!);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<PostGetType[]>([]);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getPostsService();
      const postsData: PostGetType[] = response.data.results;
      setPosts(postsData);
      setIsLoading(false);
    } catch (error) {
      console.log("Error get posts : ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        posts.map((post, index) => (
          <Post key={post.post_id} authUser={authUser} postParam={post} />
        ))
      )}
    </div>
  );
}
