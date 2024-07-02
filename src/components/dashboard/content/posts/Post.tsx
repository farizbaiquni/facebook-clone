"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import axios, { AxiosError } from "axios";
import MediaPostGrid from "./MediaPostGrid";
import InputComment from "../input_comment/InputComment";
import FooterPost from "./footer_post/FooterPost";
import Comments from "../comments/Comments";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useLineClamp } from "@/utils/useLineClamp";
import { PostType } from "@/types/post";
import { UserType } from "@/types/users";
import { GetCommentType } from "@/types/comments";
import { SuccessResponseType } from "@/types/responses";
import HeaderPost from "./header_post/HeaderPost";
import BodyPost from "./body_post/BodyPost";

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
  const [post, setPost] = useState<PostType>(postParam);
  const [isExpandedContentText, setIsExpandedTextPost] = useState(false);

  const [totalReactions, setTotalReactions] = useState(post.reactions.total_reactions);
  const [totalComments, setTotalComments] = useState(post.total_comments);
  const [totalShares, setTotalShares] = useState(post.total_shares);
  const [comments, setComments] = useState<Map<number, GetCommentType>>(new Map());
  const [offset, setOffset] = useState<number | null>(0);

  const relativeTime = formatRelativeTime(postParam.created_at);
  const postFullName = `${postParam.first_name} ${postParam.last_name}`;
  const authFullName = `${authUser.firstName} ${authUser.lastName}`;
  const inputRef = useRef<{
    focus: () => void;
    scrollIntoView: () => void;
  }>(null);
  const refContentText = useRef<HTMLParagraphElement>(null);
  const isContentTextClamped = useLineClamp(refContentText, {
    lines: 4,
  });

  const handleFocusAndScrollClick = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus();
    }
  };

  const addNewComment = (comment: GetCommentType) => {
    setComments((prevState) => {
      const newState = new Map(prevState);
      newState.set(comment.comment_id, comment);
      return newState;
    });
  };

  const getInitialCommentCallApi = async (
    postId: number,
    userId: number,
    offset: number | null,
  ) => {
    try {
      let res: any = await axios.get(
        `/api/comments?postId=${postId}&userId=${userId}&offset=${offset}&limit=${1}`,
      );
      const response: SuccessResponseType<GetCommentType[]> = res.data;
      if (response.data.length <= 0) return;
      const updatedComment: GetCommentType = {
        ...response.data[0],
        is_deleted: Boolean(response.data[0].is_deleted),
      };
      setComments((prevState) => {
        const newState = new Map(prevState);
        newState.set(updatedComment.comment_id, updatedComment);
        return newState;
      });
      setOffset(res.data.pagination === null ? null : res.data.pagination.nextId);
    } catch (error: AxiosError | any) {
      console.log("Get Initial Comment Error: ", error.response?.data);
    }
  };

  const getCommentsCallApi = async (
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
          if (!comments.has(data.comment_id)) {
            newState.set(data.comment_id, data);
          }
        });
        return newState;
      });
      setOffset(response.data.pagination === null ? null : response.data.pagination.nextId);
    } catch (error) {}
  };

  const loadMoreCommentsCallApi = () => {
    if (offset === null) return;
    getCommentsCallApi(post.post_id, authUser.userId, offset, 5);
  };

  const handleDeleteCommentCallApi = async (commentId: number, userId: number) => {
    try {
      const response = await axios.delete(
        `/api/comments?postId=${post.post_id}&commentId=${commentId}&userId=${userId}`,
      );
      setComments((prevState) => {
        const newState = new Map(prevState);
        newState.delete(commentId);
        return newState;
      });
    } catch (error: AxiosError | any) {}
  };

  useEffect(() => {
    if (authUser !== null) getInitialCommentCallApi(post.post_id, authUser.userId, offset);
  }, [authUser, offset, post.post_id]);

  return (
    <div className="my-5 w-[500px] rounded-lg bg-white shadow-md">
      {/* Header */}
      <HeaderPost
        post={post}
        postFullName={postFullName}
        relativeTime={relativeTime}
        authUser={authUser}
      />

      {/* Body Post */}
      <BodyPost
        post={post}
        isExpandedContentText={isExpandedContentText}
        setIsExpandedTextPost={setIsExpandedTextPost}
        isContentTextClamped={isContentTextClamped}
        refContentText={refContentText}
      />

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
        comments={comments}
        loadMoreComments={loadMoreCommentsCallApi}
        handleDeleteCommentCallApi={handleDeleteCommentCallApi}
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
