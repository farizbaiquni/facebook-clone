import React from "react";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const UserActions = () => {
  return (
    <div className="flex w-60 min-w-max items-center justify-end">
      <div className="group relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
        <Squares2X2Icon className="h-5" aria-hidden="true" />
        <div className="absolute bottom-[-44px] rounded-md bg-black p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-75">
          <p className="text-xs text-gray-200">menu</p>
        </div>
      </div>
      <div className="group relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
        <ChatBubbleLeftEllipsisIcon className="h-5" aria-hidden="true" />
        <div className="absolute bottom-[-44px] rounded-md bg-black p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-75">
          <p className="text-xs text-gray-200">messenger</p>
        </div>
      </div>
      <div className="group relative mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
        <BellIcon className="h-6" aria-hidden="true" />
        <div className="absolute bottom-[-44px] rounded-md bg-black p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-75">
          <p className="text-xs text-gray-200">notifications</p>
        </div>
      </div>
      <div className="group relative">
        <Image
          src="/profile.jpg"
          width={500}
          height={500}
          alt="facebook-logo"
          className="h-10 w-10 cursor-pointer rounded-full object-cover"
        />
        <div className="absolute bottom-[-40px] right-0 rounded-md bg-black p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-75">
          <p className="text-xs text-gray-200">account</p>
        </div>
      </div>
    </div>
  );
};

export default UserActions;
