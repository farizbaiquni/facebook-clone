import ConfirmationDeleteCommentModel from "@/app/dashboard/_components/ConfirmationDeleteCommentModel";
import { UserContext } from "@/hooks/useContext";
import { AddCommentReplyType, GetCommentType } from "@/types/comments";
import { MediaImageVideoEnum, MediaImageVideoType, MediaTypeEnum } from "@/types/mediaPost";
import { ReactionsEnum, Top3ReactionsType } from "@/types/reactions";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import FooterComment from "./FooterComment";
import Image from "next/image";
import InputComment from "../input_comment/InputComment";
import { GifType } from "@/types/gifs";
import { uploadFileImagesVideos } from "@/utils/uploadStorageFirebase";
import { UserType } from "@/types/users";
import axios, { AxiosError } from "axios";

type CommentsProps = {
  authUser: UserType;
  postId: number;
  comment: GetCommentType;
  deleteCommentPostCallApi: (commentId: number, userId: number) => void;
};

const Comment = ({ authUser, postId, comment, deleteCommentPostCallApi }: CommentsProps) => {
  const inputRef = useRef<{
    focus: () => void;
    scrollIntoView: () => void;
  }>(null);

  const [isCurrentCommentDeleted, setIsCurrentCommentDeleted] = useState(false);
  const [commentReplies, setCommentReplies] = useState<Map<number, GetCommentType>>(new Map());
  const [offset, setOffset] = useState<number | null>(comment.total_replies > 0 ? 0 : null);
  const isCurrentCommentFromAuthUser = comment.user_id === authUser?.userId;
  const relativeTime = formatRelativeTime(comment.updated_at);
  const fullName = comment.first_name + " " + comment.last_name;
  const [isShowInputComment, setIsShowInputComment] = useState(false);

  const menuCommentRef = useRef<HTMLDivElement>(null);
  const [isShowMenuComment, setIsShowMenuComment] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowModalConfirmationDeleteComment, setIsShowModalConfirmationDeleteComment] =
    useState(false);

  const addNewCommentReplies = (comment: GetCommentType) => {
    setCommentReplies((prevState) => {
      const newState = new Map(prevState);
      newState.set(comment.comment_id, comment);
      return newState;
    });
  };

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

  const addCommentReplyCallApi = async (
    commentText: string,
    imageVideo: MediaImageVideoType | null,
    gif: GifType | null,
    tagNameUserParentComment?: string | null,
  ) => {
    try {
      if (tagNameUserParentComment === undefined) return false;

      let mediaTypeId: number | null = null;
      let mediaUrl: string | null = null;

      // handle upload image / video
      if (imageVideo !== null) {
        const url = await uploadFileImagesVideos([imageVideo]);
        mediaTypeId =
          imageVideo.type === MediaImageVideoEnum.VIDEO ? MediaTypeEnum.VIDEO : MediaTypeEnum.IMAGE;
        mediaUrl = url[0].url;
      } else if (gif !== null) {
        mediaTypeId = MediaTypeEnum.GIF;
        mediaUrl = gif.media_formats.gif.url;
      }

      const commentReplyObject: AddCommentReplyType = {
        user_id: authUser.userId,
        post_id: postId,
        parent_comment_id: comment.comment_id,
        tag_id_user_parent_comment: comment.user_id,
        tag_name_user_parent_comment: tagNameUserParentComment,
        content: commentText,
        media_type_id: mediaTypeId,
        media_url: mediaUrl,
      };

      const response = await axios.post("/api/comment-replies", commentReplyObject);
      addNewCommentReplies(response.data.data);
      return true;
    } catch (error: AxiosError | any) {
      return false;
    }
  };

  const deleteCommentReplyCallApi = async (
    parentCommentId: number,
    commentId: number,
    userId: number,
  ) => {
    try {
      const response = await axios
        .delete(
          `/api/comment-replies?parentCommentId=${parentCommentId}&commentId=${commentId}&userId=${userId}`,
        )
        .then(() => {
          setIsCurrentCommentDeleted(true);
        });
      setIsShowMenuComment(false);
      setIsShowModalConfirmationDeleteComment(false);
      return true;
    } catch (error: AxiosError | any) {
      return false;
    }
  };

  const getCommentReplies = async (parentCommentId: number, offset: number, limit: number) => {
    try {
      const response = await axios.get(
        `/api/comment-replies?parentCommentId=${parentCommentId}&offset=${offset}&limit=${limit}`,
      );
      const commentReplies: GetCommentType[] = response.data.data;
      setCommentReplies((prevState) => {
        const newState = new Map(prevState);
        commentReplies.forEach((comment) => {
          newState.set(comment.comment_id, comment);
        });
        return newState;
      });
      setOffset(response.data.pagination === null ? null : response.data.pagination.nextId);
      return true;
    } catch (error: AxiosError | any) {
      return false;
    }
  };

  const loadMoreCommentReplies = () => {
    if (offset === null) return;
    getCommentReplies(comment.comment_id, offset, 5);
  };

  const handleClickConfirmDeleteCommentButton = () => {
    if (comment.user_id !== authUser?.userId) return;
    setIsShowModalConfirmationDeleteComment(true);
    setIsShowMenuComment(false);
    if (comment.parent_comment_id !== null) {
      deleteCommentReplyCallApi(comment.parent_comment_id, comment.comment_id, authUser.userId);
    } else {
      deleteCommentPostCallApi(comment.comment_id, comment.user_id);
    }
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

  if (isCurrentCommentDeleted) return null;

  return (
    <div className="group flex pt-2">
      {/* Left Side - Photo Profile */}
      <div className="mr-2 min-w-max">
        <Image
          src="/icons/user.png"
          width={30}
          height={30}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1">
          {/* Middle Side - Comment*/}
          <div className="flex rounded-xl bg-[#F0F2F5] px-3 py-2">
            <div className="flex flex-col">
              <p className="text-[13px] font-semibold">{fullName}</p>
              <p className="line-clamp-2 overflow-clip text-[15px] leading-5">{comment.content}</p>
            </div>
          </div>

          {/* Right side - Vertical dot to open option menu comment */}
          <div className="relative ml-1 flex w-[30px] min-w-[30px] items-center">
            <EllipsisHorizontalIcon
              onClick={toggleMenuComment}
              className={`${!isShowMenuComment && "hidden"} cursor-pointer rounded-full p-1 
              text-gray-500 hover:bg-[#F2F2F2] group-hover:block`}
              width={30}
              height={30}
            />

            {/* Option menu comment */}
            {isCurrentCommentFromAuthUser && isShowMenuComment && (
              <div
                ref={menuCommentRef}
                className="absolute left-1/2 top-12 z-20 flex w-[330px] -translate-x-1/2 transform
                flex-col overflow-hidden rounded-md bg-white p-2 shadow-lg shadow-gray-400"
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
          <div className={`ml-2 mt-2 w-[190px]`}>
            <Image
              src={comment.media_url}
              width={200}
              height={200}
              alt="media"
              className="w-full rounded-xl"
            />
          </div>
        )}

        {/* Action Button Comment */}
        <FooterComment
          authUserId={authUser!.userId}
          comment={comment}
          relativeTime={relativeTime}
          handleOnClickReplyComment={handleOnClickReplyComment}
        />

        {Array.from(commentReplies.values()).map((commentReply) => {
          if (!commentReply.is_deleted) {
            return (
              <Comment
                authUser={authUser}
                postId={postId}
                key={commentReply.comment_id}
                comment={commentReply}
                deleteCommentPostCallApi={deleteCommentPostCallApi}
              />
            );
          }
        })}

        {offset !== null && (
          <p
            onClick={loadMoreCommentReplies}
            className="cursor-pointer pl-2 text-[15px] font-semibold text-gray-500 hover:underline"
          >
            View all {comment.total_replies} {comment.total_replies > 1 ? "replies" : "reply"}
          </p>
        )}

        {/* Reply Input Comment */}
        {isShowInputComment && (
          <InputComment
            userId={authUser!.userId}
            postId={postId}
            ref={inputRef}
            isCommentReply={true}
            firstName={comment.first_name}
            lastName={comment.last_name}
            handleAddComment={addCommentReplyCallApi}
          />
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
