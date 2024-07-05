import ConfirmationDeleteCommentModel from "@/app/dashboard/_components/ConfirmationDeleteCommentModel";
import { UserContext } from "@/hooks/useContext";
import { GetCommentType } from "@/types/comments";
import { MediaTypeEnum } from "@/types/mediaPost";
import { ReactionsEnum, Top3ReactionsType } from "@/types/reactions";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import FooterComment from "./FooterComment";
import Image from "next/image";
import InputComment from "../input_comment/InputComment";

type CommentsProps = {
  postId: number;
  comment: GetCommentType;
  handleDeleteCommentCallApi: (commentId: number, userId: number) => void;
};

const Comment = ({ postId, comment, handleDeleteCommentCallApi }: CommentsProps) => {
  const inputRef = useRef<{
    focus: () => void;
    scrollIntoView: () => void;
  }>(null);
  const authUser = useContext(UserContext);
  const isCurrentCommentFromAuthUser = comment.user_id === authUser?.userId;
  const relativeTime = formatRelativeTime(comment.updated_at);
  const fullName = comment.first_name + " " + comment.last_name;
  const [isShowInputComment, setIsShowInputComment] = useState(false);

  const menuCommentRef = useRef<HTMLDivElement>(null);
  const [isShowMenuComment, setIsShowMenuComment] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowModalConfirmationDeleteComment, setIsShowModalConfirmationDeleteComment] =
    useState(false);

  const handleOnClickReplyComment = () => {
    setIsShowInputComment(!isShowInputComment);
    inputRef.current?.focus();
  };

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

  const handleClickConfirmDeleteCommentButton = () => {
    if (comment.user_id !== authUser?.userId) return;
    setIsShowModalConfirmationDeleteComment(true);
    setIsShowMenuComment(false);
    handleDeleteCommentCallApi(comment.comment_id, comment.user_id);
  };

  const handleAddReplyComment = () => {
    setIsShowInputComment(false);
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
          <div className={`mt-2 w-[190px]`}>
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
        <FooterComment
          authUserId={authUser!.userId}
          comment={comment}
          relativeTime={relativeTime}
          handleOnClickReplyComment={handleOnClickReplyComment}
        />

        {isShowInputComment && (
          <InputComment
            userId={authUser!.userId}
            postId={postId}
            ref={inputRef}
            isCommentReply={true}
            firstName={comment.first_name}
            lastName={comment.last_name}
            handleAddComment={handleAddReplyComment}
          />
        )}

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
