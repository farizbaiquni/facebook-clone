import ConfirmationDeleteCommentModel from "@/app/dashboard/_components/ConfirmationDeleteCommentModel";
import { UserContext } from "@/hooks/useContext";
import { GetCommentType } from "@/types/comments";
import { MediaTypeEnum } from "@/types/mediaPost";
import { ReactionsEnum, Top3ReactionsType } from "@/types/reactions";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type CommentsProps = {
  comment: GetCommentType;
  handleDeleteCommentCallApi: (commentId: number, userId: number) => void;
};

const Comment = ({ comment, handleDeleteCommentCallApi }: CommentsProps) => {
  const icons = new Map([
    [ReactionsEnum.LIKE, "/icons/posts/like.svg"],
    [ReactionsEnum.LOVE, "/icons/posts/love.svg"],
    [ReactionsEnum.CARE, "/icons/posts/care.svg"],
    [ReactionsEnum.HAHA, "/icons/posts/haha.svg"],
    [ReactionsEnum.WOW, "/icons/posts/wow.svg"],
    [ReactionsEnum.SAD, "/icons/posts/sad.svg"],
    [ReactionsEnum.ANGRY, "/icons/posts/angry.svg"],
  ]);

  const authUser = useContext(UserContext);
  const isCurrentCommentFromAuthUser = comment.user_id === authUser?.userId;
  const relativeTime = formatRelativeTime(comment.updated_at);
  const fullName = comment.first_name + " " + comment.last_name;

  const menuCommentRef = useRef<HTMLDivElement>(null);
  const [isShowMenuComment, setIsShowMenuComment] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowModalConfirmationDeleteComment, setIsShowModalConfirmationDeleteComment] =
    useState(false);
  const totalReactions = useMemo(() => {
    return (
      comment.total_like +
      comment.total_love +
      comment.total_haha +
      comment.total_wow +
      comment.total_sad +
      comment.total_angry
    );
  }, [comment]);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuCommentRef.current && !menuCommentRef.current.contains(event.target as Node)) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsShowMenuComment(false);
      }
      if (modalRef.current === null) {
        setIsShowMenuComment(false);
      }
    }
  };

  const toggleMenuComment = () => {
    setIsShowMenuComment(!isShowMenuComment);
  };

  const getTopReactions = useCallback((comment: GetCommentType): Top3ReactionsType[] => {
    const reactions: Top3ReactionsType[] = [
      { reaction_id: ReactionsEnum.LIKE, total_count: comment.total_like },
      { reaction_id: ReactionsEnum.LOVE, total_count: comment.total_love },
      { reaction_id: ReactionsEnum.HAHA, total_count: comment.total_haha },
      { reaction_id: ReactionsEnum.WOW, total_count: comment.total_wow },
      { reaction_id: ReactionsEnum.SAD, total_count: comment.total_sad },
      { reaction_id: ReactionsEnum.ANGRY, total_count: comment.total_angry },
    ].filter((reaction) => reaction.total_count >= 1);

    return reactions.sort((a, b) => b.total_count - a.total_count).slice(0, 3);
  }, []);

  const top3Reactions = useMemo(() => {
    return getTopReactions(comment);
  }, [comment, getTopReactions]);

  const handleClickConfirmDeleteCommentButton = () => {
    if (comment.user_id !== authUser?.userId) return;
    setIsShowModalConfirmationDeleteComment(true);
    setIsShowMenuComment(false);
    handleDeleteCommentCallApi(comment.comment_id, comment.user_id);
  };

  useEffect(() => {
    if (isShowMenuComment) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowMenuComment]);

  return (
    <div className="group flex px-4 pt-2">
      {/* Photo Profile */}
      <div className="mr-2 min-w-max">
        <Image
          src="/icons/user.png"
          width={30}
          height={30}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      {/* Content, Media, Reactions, Action Button */}
      <div className="flex flex-1 flex-col">
        {/* Top Comment Part */}
        <div className="flex flex-1">
          <div className="flex rounded-xl bg-[#F0F2F5] px-3 py-2">
            <div className="flex flex-col">
              <p className="text-[13px] font-semibold">{fullName}</p>
              <p className="line-clamp-2 overflow-clip text-[15px] leading-5">{comment.content}</p>
            </div>
          </div>
          <div className="relative ml-1 flex w-[30px] min-w-[30px] items-center">
            <EllipsisHorizontalIcon
              onClick={toggleMenuComment}
              className={`${!isShowMenuComment && "hidden"} cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#F2F2F2] group-hover:block`}
              width={30}
              height={30}
            />

            {/* Option menu comment */}
            {isCurrentCommentFromAuthUser && isShowMenuComment && (
              <div
                ref={menuCommentRef}
                className="absolute left-1/2 top-10 flex w-[330px] -translate-x-1/2 transform flex-col overflow-hidden rounded-md bg-white p-2 shadow-lg shadow-gray-400"
              >
                <ul className="text-[15px] font-semibold">
                  <p className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#F2F2F2]">Edit</p>
                  <p
                    onClick={() => setIsShowModalConfirmationDeleteComment(true)}
                    className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#F2F2F2]"
                  >
                    Delete
                  </p>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Media of comment */}
        {comment.media_url !== null && comment.media_url !== undefined && (
          <div
            className={`mt-2 ${comment.comment_media_id !== MediaTypeEnum.GIF ? "w-[210px]" : "w-[250px]"}`}
          >
            <Image
              src={comment.media_url}
              width={200}
              height={200}
              alt="media"
              className="w-full rounded-xl"
            />
          </div>
        )}

        {/* Below Action Comment */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-x-4 px-2 text-xs text-gray-600">
            {[relativeTime, "Like", "Reply", "Share"].map((text, index) => (
              <p
                key={index}
                className={`cursor-pointer ${index > 0 && "font-semibold"} hover:underline`}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-x-1 text-xs">
            {totalReactions > 0 && (
              <Fragment>
                <p>{totalReactions}</p>
                {top3Reactions.map((reaction, index) => (
                  <Image
                    key={index}
                    width={20}
                    height={20}
                    alt="like"
                    src={icons.get(reaction.reaction_id)!}
                  />
                ))}
              </Fragment>
            )}
          </div>
        </div>

        {comment.total_replies > 0 && (
          <p className="cursor-pointer pl-2 text-[15px] font-semibold text-gray-500 hover:underline">
            View all {comment.total_replies} {comment.total_replies > 1 ? "replies" : "reply"}
          </p>
        )}
      </div>

      {/* Modal confirmation delete comment */}
      {isCurrentCommentFromAuthUser && isShowModalConfirmationDeleteComment && (
        <ConfirmationDeleteCommentModel
          ref={modalRef}
          setIsShowModalConfirmationDeleteComment={setIsShowModalConfirmationDeleteComment}
          handleClickConfirmDeleteCommentButton={handleClickConfirmDeleteCommentButton}
        />
      )}
    </div>
  );
};

export default Comment;
