import Image from "next/image";
import { memo } from "react";
import { PostType } from "@/types/post";
import { UserType } from "@/types/users";
import { EllipsisHorizontalIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/solid";

type HeaderPostPropsType = {
  post: PostType;
  postFullName: string;
  relativeTime: string;
  authUser: UserType;
};

const HeaderPost = ({ post, postFullName, relativeTime, authUser }: HeaderPostPropsType) => {
  return (
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
  );
};

export default memo(HeaderPost);
