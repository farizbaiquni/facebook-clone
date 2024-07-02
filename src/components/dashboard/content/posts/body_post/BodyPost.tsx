import { PostType } from "@/types/post";
import { Fragment, forwardRef, memo } from "react";
import MediaPostGrid from "../MediaPostGrid";

type BodyPostPropsType = {
  post: PostType;
  isExpandedContentText: boolean;
  isContentTextClamped: boolean;
  refContentText: React.RefObject<HTMLParagraphElement>;
  setIsExpandedTextPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const BodyPost = forwardRef<HTMLParagraphElement, BodyPostPropsType>(
  (
    { post, isExpandedContentText, isContentTextClamped, setIsExpandedTextPost },
    refContentText,
  ) => {
    return (
      <Fragment>
        {/* Text Post */}
        <div className="relative flex flex-col px-4 text-[15px]">
          <p ref={refContentText} className={isExpandedContentText ? "" : "line-clamp-4"}>
            {post.content}
          </p>

          <div className="flex">
            <p className="my-2 cursor-pointer text-gray-500 hover:underline">See Translation</p>
            <span className="flex-1"></span>
            {isContentTextClamped && (
              <button
                className="font-semibold text-[#050505]"
                onClick={() => setIsExpandedTextPost(!isExpandedContentText)}
              >
                {isExpandedContentText ? "See less" : "See more"}
              </button>
            )}
          </div>
        </div>

        {/* Images Post */}
        {post.media.length > 0 && <MediaPostGrid mediaArr={post.media} />}
      </Fragment>
    );
  },
);

BodyPost.displayName = "BodyPost";

export default memo(BodyPost);
