import { memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { PostType } from "@/types/post";
import { UserContext } from "@/hooks/useContext";
import { UserType } from "@/types/user";

type PostsProps = {
  userId: number;
};

const Posts = ({ userId }: PostsProps) => {
  const [authUser, setAuthUser] = useState<UserType>(useContext(UserContext)!);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async (userId: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/posts?offset=0&limit=5&userId=${userId}`,
      );
      const postsData: PostType[] = response.data.data;
      setPosts(postsData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts(userId);
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <p className="my-5 text-lg text-gray-400">Loading posts...</p>
      ) : isError ? (
        <p className="my-5 text-lg text-red-400">Error load posts</p>
      ) : (
        posts.map((post, index) => (
          <Post key={post.post_id} authUser={authUser} postParam={post} />
        ))
      )}
    </div>
  );
};

export default memo(Posts);
