import React from "react";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const UserActions = () => {
  return (
    <div className="flex min-w-max items-center">
      <div className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        <Squares2X2Icon className="h-6" aria-hidden="true" />
      </div>
      <div className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        <ChatBubbleLeftEllipsisIcon className="h-5" aria-hidden="true" />
      </div>
      <div className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        <BellIcon className="h-6" aria-hidden="true" />
      </div>
      <Image
        src="/icons/user.png"
        width={56}
        height={56}
        alt="facebook-logo"
        className="w-11 cursor-pointer rounded-full"
      />
    </div>
  );
};

export default UserActions;
