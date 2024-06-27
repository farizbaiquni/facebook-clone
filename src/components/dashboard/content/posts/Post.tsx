"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  EllipsisHorizontalIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { PostType } from "@/types/post";
import { UserType } from "@/types/users";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useLineClamp } from "@/utils/useLineClamp";
import MediaPostGrid from "./MediaPostGrid";
import InputComment from "../input_comment/InputComment";
import FooterPost from "./footer_post/FooterPost";
import Comments from "../comments/Comments";
import { GetCommentType } from "@/types/comments";
import axios from "axios";
import { SuccessResponseType } from "@/types/responses";

type PostProps = {
  authUser: UserType;
  postParam: PostType;
};

const Post = ({ authUser, postParam }: PostProps) => {
  const [images, setImages] = useState<string[]>([
    "/images/posts/post (1).jpg",
    "/images/posts/post (2).jpg",
    "/images/posts/post (3).jpg",
    "/images/posts/post (4).jpg",
    "/images/posts/post (5).jpg",
    "/images/posts/post (6).jpg",
  ]);
  const relativeTime = formatRelativeTime(postParam.created_at);
  const postFullName = `${postParam.first_name} ${postParam.last_name}`;
  const authFullName = `${authUser.firstName} ${authUser.lastName}`;
  const inputRef = useRef<{ focus: () => void; scrollIntoView: () => void }>(
    null,
  );
  const [post, setPost] = useState<PostType>(postParam);
  const refContentText = useRef<HTMLParagraphElement>(null);
  const isContentTextClamped = useLineClamp(refContentText, { lines: 4 });
  const [isExpandedContentText, setIsExpandedTextPost] = useState(false);

  const [initialComment, setInitialComment] = useState<
    Map<number, GetCommentType>
  >(new Map());
  const [comments, setComments] = useState<Map<number, GetCommentType>>(
    new Map(),
  );
  const [offset, setOffset] = useState<number | null>(0);

  const handleFocusAndScrollClick = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus();
    }
  };

  const addNewComment = (comment: GetCommentType) => {
    setInitialComment((prevState) => {
      const newState = new Map(prevState);
      newState.set(comment.comment_id, comment);
      return newState;
    });
  };

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

  const loadMoreComments = () => {
    if (offset === null) return;
    getComments(post.post_id, authUser.userId, offset, 5);
  };

  useEffect(() => {
    if (authUser !== null) getInitialComment(post.post_id, authUser.userId);
  }, [authUser, post.post_id]);

  return (
    <div className="my-5 w-[500px] rounded-lg bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <Image
          src={post.profile_picture ? post.profile_picture : "/icons/user.png"}
          width={100}
          height={100}
          alt="user"
          className="h-9 w-9 cursor-pointer rounded-full border border-gray-200 object-cover"
        />
        <div className="ml-3 flex flex-1 flex-col">
          <p className="text-[15px] font-[600] text-gray-700">{postFullName}</p>
          <div className="flex items-center text-[13px] text-sm text-gray-500">
            <p>{relativeTime}</p>
            <UsersIcon className="ml-1 h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center">
          <EllipsisHorizontalIcon
            className="cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#F2F2F2]"
            width={35}
            height={35}
          />
          {post.user_id !== authUser.userId && (
            <XMarkIcon
              className="ml-2 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#F2F2F2]"
              width={35}
              height={35}
            />
          )}
        </div>
      </div>

      {/* Text Post */}
      <div className="relative flex flex-col px-4 text-[15px]">
        <p
          ref={refContentText}
          className={isExpandedContentText ? "" : "line-clamp-4"}
        >
          {post.content}
        </p>

        <div className="flex">
          <p className="my-2 cursor-pointer text-gray-500 hover:underline">
            See Translation
          </p>
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

      {/* Footer */}
      <FooterPost
        isPostFromAuthUser={authUser.userId === post.user_id}
        userId={authUser.userId}
        postId={post.post_id}
        authFullName={authFullName}
        totalReactions={post.reactions.total_reactions}
        totalComments={post.total_comments}
        totalShares={post.total_shares}
        handleFocusClick={handleFocusAndScrollClick}
      />

      {/* Comment */}
      <Comments
        offset={offset}
        loadMoreComments={loadMoreComments}
        initialComment={initialComment}
        comments={comments}
      />

      {/* Input Comment */}
      <InputComment
        userId={authUser.userId}
        postId={post.post_id}
        ref={inputRef}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Post;
