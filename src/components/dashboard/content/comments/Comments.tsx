import { GetCommentType } from "@/types/comments";
import Comment from "./Comment";
import { UserType } from "@/types/users";

type CommentsPropsType = {
  authUser: UserType;
  postId: number;
  offset: number | null;
  comments: Map<number, GetCommentType>;
  loadMoreComments: () => void;
  deleteCommentPostCallApi: (commentId: number, userId: number) => void;
};
const Comments = ({
  authUser,
  postId,
  offset,
  comments,
  loadMoreComments,
  deleteCommentPostCallApi,
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

      <div className="px-4">
        {Array.from(comments.values()).map((comment) => {
          if (!comment.is_deleted) {
            return (
              <Comment
                authUser={authUser}
                postId={postId}
                key={comment.comment_id}
                comment={comment}
                deleteCommentPostCallApi={deleteCommentPostCallApi}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Comments;
