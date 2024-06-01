import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  UsersIcon,
  XMarkIcon,
  PhoneIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import ActionButtonPost from "./post/ActionButtonPost";
import ImagesGrid from "./post/ImagesGrid";
import InputComment from "./post/InputComment";
import Comment from "./post/Comment";

const Post = () => {
  const [isExpandedTextPost, setIsExpandedTextPost] = useState(false);

  const toggleTextExpansion = () => setIsExpandedTextPost(!isExpandedTextPost);
  const [images, setimages] = useState<string[]>([
    "/images/posts/post (1).jpg",
    "/images/posts/post (2).jpg",
    "/images/posts/post (3).jpg",
    "/images/posts/post (4).jpg",
    "/images/posts/post (5).jpg",
    "/images/posts/post (6).jpg",
  ]);

  return (
    <div className="mb-28 mt-5 w-[500px] rounded-lg bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <Image
          src="/profile.jpg"
          width={30}
          height={30}
          alt="profile"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="ml-3 flex flex-1 flex-col">
          <p className="font-[600] text-gray-700">Fariz Baiquni</p>
          <div className="flex items-center text-sm text-gray-500">
            <p>a day ago</p>
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
      <div className="flex flex-col px-4">
        <p
          className={`relative break-words text-gray-700 ${isExpandedTextPost ? "line-clamp-none" : "line-clamp-[8]"}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid in ad
          atque ducimus ab et modi quae quis voluptate, libero odio quaerat,
          perspiciatis magni, rerum nulla possimus laboriosam necessitatibus
          officia molestiae dolorem officiis explicabo cumque assumenda neque.
          Officiis voluptas maiores vero! Iste vel provident culpa porro
          ratione, quo incidunt? Ipsam totam soluta, eum esse, quasi modi sint
          nihil obcaecati ad architecto error numquam ducimus aliquam,
          consectetur est nobis impedit neque. Porro, assumenda? Voluptatibus
          iste ex itaque. Cumque architecto ducimus repellendus! Ipsa voluptatum
          tempora in ipsum doloremque fugiat minus earum sit minima optio, odio
          blanditiis autem repellendus error dolor ipsam eligendi. Nobis,
          reiciendis odit repellat voluptate pariatur nemo autem earum eum fuga
          enim facilis exercitationem ad veritatis maxime corrupti numquam.
          Officia voluptatibus possimus, perspiciatis voluptates alias in eum
          porro dolorem mollitia ad voluptate deleniti maiores illo libero velit
          incidunt quia neque deserunt quaerat aspernatur quam nihil tempora
          iste. Repellat, ut quibusdam.
          <b
            className="absolute bottom-0 right-0 cursor-pointer bg-white px-2 hover:underline"
            onClick={toggleTextExpansion}
          >
            {isExpandedTextPost ? "See less" : "See more"}
          </b>
        </p>
        <p className="my-2 cursor-pointer text-gray-500 hover:underline">
          See Translation
        </p>
      </div>
      {/* Images Post */}
      {images.length > 0 && <ImagesGrid images={images} />}

      {/* Footer */}
      <div className="flex flex-col px-4">
        <div className="flex justify-between border-b border-b-gray-300 py-2 text-sm">
          <div className="cursor-pointer text-gray-500 hover:underline">
            3.9 K
          </div>
          <div className="flex">
            <div className="mr-2 flex cursor-pointer items-center text-gray-500 hover:underline">
              <p>375</p>
              <ChatBubbleOvalLeftIcon
                width={21}
                height={21}
                className="ml-1 scale-x-[-1] transform"
              />
            </div>
            <div className="flex cursor-pointer items-center text-gray-500 hover:underline">
              <p>105</p>
              <ArrowUturnRightIcon width={21} height={21} className="ml-1" />
            </div>
          </div>
        </div>
        <div className="mb-2 flex border-b border-b-gray-300 py-1">
          <ActionButtonPost Icon={HandThumbUpIcon} label="Like" />
          <ActionButtonPost
            Icon={ChatBubbleOvalLeftIconOutline}
            label="Comment"
          />
          <ActionButtonPost Icon={PhoneIcon} label="Send" />
          <ActionButtonPost Icon={ArrowUturnRightIcon} label="Share" />
        </div>
      </div>

      {/* Comment */}
      <Comment />
      {/* Input Comment */}
      <InputComment />
    </div>
  );
};

export default Post;
