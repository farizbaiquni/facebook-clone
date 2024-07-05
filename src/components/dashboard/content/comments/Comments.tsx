import { GetCommentType } from "@/types/comments";
import Comment from "./Comment";

type CommentsPropsType = {
  postId: number;
  offset: number | null;
  comments: Map<number, GetCommentType>;
  loadMoreComments: () => void;
  handleDeleteCommentCallApi: (commentId: number, userId: number) => void;
};
const Comments = ({
  postId,
  offset,
  comments,
  loadMoreComments,
  handleDeleteCommentCallApi,
}: CommentsPropsType) => {
  return (
    <div>
      {offset !== null && (
        <p
          onClick={loadMoreComments}
          className="cursor-pointer px-5 text-[15px] font-semibold text-[#65676b]"
        >
          View more answer
        </p>
      )}

      {Array.from(comments.values()).map((comment) => {
        if (!comment.is_deleted) {
          return (
            <Comment
              postId={postId}
              key={comment.comment_id}
              comment={comment}
              handleDeleteCommentCallApi={handleDeleteCommentCallApi}
            />
          );
        }
      })}
    </div>
  );
};

export default Comments;
