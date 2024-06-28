import { GetCommentType } from "@/types/comments";
import Comment from "./Comment";

type CommentsType = {
  offset: number | null;
  loadMoreComments: () => void;
  initialComment: Map<number, GetCommentType>;
  comments: Map<number, GetCommentType>;
};
const Comments = ({
  loadMoreComments,
  offset,
  initialComment,
  comments,
}: CommentsType) => {
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
