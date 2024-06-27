import { memo, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Post from "./Post";
import { PostType } from "@/types/post";
import { UserContext } from "@/hooks/useContext";
import { UserType } from "@/types/users";
import { Pagination } from "@/types/responses";

type PostsProps = {
  userId: number;
};

const Posts = ({ userId }: PostsProps) => {
  const limit: number = 5;
  const [authUser, setAuthUser] = useState<UserType>(useContext(UserContext)!);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [offset, setoffset] = useState<number | null>(0);

  const getPostsCallApi = async (
    userId: number,
    offset: number | null,
    limit: number,
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/posts?offset=${offset}&limit=${limit}&userId=${userId}`,
      );

      const postsData: PostType[] = response.data.data;
      const paginationData: Pagination | null = response.data.pagination;

      setPosts(postsData);
      setoffset(paginationData?.nextId || null);
      setIsLoading(false);
    } catch (error: AxiosError | any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (offset !== null) {
      getPostsCallApi(userId, offset, limit);
    }
  }, [offset, userId]);

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
