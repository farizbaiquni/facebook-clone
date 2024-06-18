"use client";

import {
  EllipsisHorizontalIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState, useRef, useImperativeHandle } from "react";
import ImagesGrid from "./post/ImagesGrid";
import InputComment from "./post/InputComment";
import Comment from "./post/Comment";
import { PostGetType } from "@/types/post";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import useLineClamp from "@/utils/useLineClamp";
import FooterPost from "./post/FooterPost";
import { UserType } from "@/types/user";

type PostProps = {
  authUser: UserType;
  postParam: PostGetType;
};

const Post = ({ authUser, postParam }: PostProps) => {
  const relativeTime = formatRelativeTime(postParam.created_at);
  const fullName = `${postParam.first_name} ${postParam.last_name}`;
  const inputRef = useRef<{ focus: () => void; scrollIntoView: () => void }>(
    null,
  );

  const handleFocusAndScrollClick = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus();
    }
  };

  const [post, setPost] = useState<PostGetType>(postParam);

  const refContentText = useRef<HTMLParagraphElement>(null);
  const isContentTextClamped = useLineClamp(refContentText, { lines: 4 });
  const [isExpandedContentText, setIsExpandedTextPost] = useState(false);

  const [images, setImages] = useState<string[]>([
    "/images/posts/post (1).jpg",
    "/images/posts/post (2).jpg",
    "/images/posts/post (3).jpg",
    "/images/posts/post (4).jpg",
    "/images/posts/post (5).jpg",
    "/images/posts/post (6).jpg",
  ]);

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
          <p className="text-[15px] font-[600] text-gray-700">{fullName}</p>
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
          <XMarkIcon
            className="ml-2 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#F2F2F2]"
            width={35}
            height={35}
          />
        </div>
      </div>

      {/* Body */}

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
      {post.media.length > 0 && <ImagesGrid images={images} />}

      {/* Footer */}
      <FooterPost
        userId={authUser.userId}
        postId={post.post_id}
        fullName={fullName}
        totalReactions={post.reactions.total}
        totalComments={post.total_comments}
        totalShares={post.total_shares}
        handleFocusClick={handleFocusAndScrollClick}
      />

      {/* Comment */}
      {post.total_comments > 0 && <Comment />}

      {/* Input Comment */}
      <InputComment ref={inputRef} />
    </div>
  );
};

export default Post;
