import axios from "axios";
import { GetCommentType } from "@/types/comments";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { UserType } from "@/types/user";
import { SuccessResponseType } from "@/types/responses";

type CommentsType = {
  postId: number;
  authUser: UserType;
};
const Comments = ({ postId, authUser }: CommentsType) => {
  const [initialComment, setInitialComment] = useState<
    Map<number, GetCommentType>
  >(new Map());
  const [comments, setComments] = useState<Map<number, GetCommentType>>(
    new Map(),
  );
  const [offset, setOffset] = useState<number | null>(0);

  const getInitialComment = async (postId: number, userId: number) => {
    try {
      let res: any = await axios.get(
        `/api/comments/initial-comment?postId=${postId}&userId=${userId}`,
      );
      const response: SuccessResponseType<GetCommentType[]> = res.data;
      if (response.data.length <= 0) return;
      setInitialComment((prevState) => {
        const newState = new Map(prevState);
        newState.set(response.data[0].comment_id, response.data[0]);
        return newState;
      });
    } catch (error) {}
  };

  const getComments = async (
    postId: number,
    userId: number,
    offset: number,
    limit: number,
  ) => {
    try {
      const response = await axios.get(
        `/api/comments?postId=${postId}&userId=${userId}&offset=${offset}&limit=${limit}`,
      );
      setComments((prevState) => {
        const newState = new Map(prevState);
        response.data.data.map((data: GetCommentType) => {
          if (!initialComment.has(data.comment_id)) {
            newState.set(data.comment_id, data);
          }
        });
        return newState;
      });
      setOffset(
        response.data.pagination === null
          ? null
          : response.data.pagination.nextId,
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (authUser !== null) getInitialComment(postId, authUser.userId);
  }, [authUser, postId]);

  return (
    <div>
      {offset !== null && (
        <p
          onClick={() => getComments(postId, authUser.userId, offset, 5)}
          className="cursor-pointer px-5 text-[15px] font-semibold text-[#65676b]"
        >
          View more answer
        </p>
      )}

      {Array.from(initialComment.values()).map((comment) => (
        <Comment key={comment.comment_id} comment={comment} />
      ))}

      {Array.from(comments.values()).map((comment) => (
        <Comment key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
