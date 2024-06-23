import { GetCommentType } from "@/types/comments";
import axios from "axios";
import { useEffect, useState } from "react";

type CommentsType = {
  postId: number;
};
const Comments = ({ postId }: CommentsType) => {
  const [comments, setComments] = useState<GetCommentType[] | null>(null);
  const getFirstComments = async (postId: number) => {
    try {
      const response = await axios.get(
        `/api/comments?postId=${postId}&limit=1&offset=0`,
      );
    } catch (error) {
      console.log("error get first comments : ", error);
    }
  };
  useEffect(() => {
    getFirstComments(postId);
  }, [postId]);
  return <div></div>;
};

export default Comments;
