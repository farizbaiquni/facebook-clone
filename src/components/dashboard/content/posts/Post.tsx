"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import axios, { AxiosError } from "axios";
import InputComment from "../input_comment/InputComment";
import FooterPost from "./FooterPost";
import Comments from "../comments/Comments";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useLineClamp } from "@/utils/useLineClamp";
import { PostType } from "@/types/post";
import { UserType } from "@/types/users";
import { AddCommentType, GetCommentType } from "@/types/comments";
import { SuccessResponseType } from "@/types/responses";
import HeaderPost from "./header_post/HeaderPost";
import BodyPost from "./body_post/BodyPost";
import { MediaImageVideoEnum, MediaImageVideoType, MediaTypeEnum } from "@/types/mediaPost";
import { uploadFileImagesVideos } from "@/utils/uploadStorageFirebase";
import { GifType } from "@/types/gifs";

type PostProps = {
  authUser: UserType;
  postParam: PostType;
};

const Post = ({ authUser, postParam }: PostProps) => {
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

  const addCommentPostCallAPI = async (
    commentText: string,
    imageVideo: MediaImageVideoType | null,
    gif: GifType | null,
    parentCommentId?: number,
  ) => {
    try {
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

      const commentObject: AddCommentType = {
        user_id: authUser.userId,
        post_id: post.post_id,
        parent_comment_id: null,
        content: commentText,
        media_type_id: mediaTypeId,
        media_url: mediaUrl,
      };
      const response = await axios.post("/api/comments", commentObject);
      addNewComment(response.data.data);
      return true;
    } catch (error: AxiosError | any) {
      return false;
    }
  };

  const getCommentsCallApi = async (postId: number, offset: number, limit: number) => {
    try {
      let res: any = await axios.get(
        `/api/comments?postId=${postId}&offset=${offset}&limit=${limit}`,
      );
      console.log(res.data);
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
      console.log("Get Comments Error: ", error.response?.data);
    }
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
      setTotalComments(totalComments - 1);
    } catch (error: AxiosError | any) {}
  };

  const getInitialComment = () => {
    if (offset === null) return;
    getCommentsCallApi(post.post_id, offset, 1);
  };

  const loadMoreComments = () => {
    if (offset === null) return;
    getCommentsCallApi(post.post_id, offset, 5);
  };

  useEffect(() => {
    getInitialComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        totalReactions={totalReactions}
        totalComments={totalComments}
        totalShares={totalShares}
        handleFocusClick={handleFocusAndScrollClick}
        setTotalReactions={setTotalReactions}
      />

      {/* Comment */}
      <Comments
        postId={post.post_id}
        offset={offset}
        comments={comments}
        loadMoreComments={loadMoreComments}
        handleDeleteCommentCallApi={handleDeleteCommentCallApi}
      />

      {/* Input Comment */}
      <div className="mx-4">
        <InputComment
          userId={authUser.userId}
          postId={post.post_id}
          ref={inputRef}
          handleAddComment={addCommentPostCallAPI}
        />
      </div>
    </div>
  );
};

export default Post;
