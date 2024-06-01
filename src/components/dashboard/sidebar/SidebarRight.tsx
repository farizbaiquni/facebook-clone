import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function SidebarRight() {
  return (
    <div className="custom-scrollbar w-[350px] flex-shrink pl-2 max-[900px]:hidden">
      <div className="custom-scrollbar fixed flex h-screen min-w-[311px] flex-col overflow-y-scroll pb-16 pr-2">
        {/* Birthdays List */}
        <div className="flex flex-col">
          <div className="py-2 text-[17px] font-[600] text-gray-500">
            Birthdays
          </div>
          <div className="flex cursor-pointer rounded-lg px-2 py-1 hover:bg-[#E4E6E8]">
            <div className="mr-2 min-w-max">
              <Image
                width={30}
                height={30}
                alt="birthday"
                src="/icons/sidebars/birthday.png"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
            <p className="break-words text-[15px]">
              <span className="font-[600] capitalize">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A.
                sequi.
              </span>
              `s birthday is today.
            </p>
          </div>
        </div>

        <hr className="my-2 border-gray-300" />

        <div className="flex items-center pb-1">
          <div className="flex-1 py-2 text-[17px] font-[600] text-gray-500">
            Contacts
          </div>
          <div className="flex">
            <MagnifyingGlassIcon
              className="cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#E4E6E8]"
              width={27}
              height={27}
            />
            <EllipsisHorizontalIcon
              className="ml-1 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#E4E6E8]"
              width={27}
              height={27}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex cursor-pointer items-center rounded-md px-2 py-2 hover:bg-[#E4E6E8]">
            <div className="mr-2 min-w-max">
              <Image
                width={30}
                height={30}
                alt="birthday"
                src="/icons/user.png"
                className="h-7 w-7 rounded-full object-cover"
              />
            </div>
            <p className="ml-2 line-clamp-1 text-[15px] font-[600]">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div className="flex cursor-pointer items-center rounded-md px-2 py-2 hover:bg-[#E4E6E8]">
            <div className="mr-2 min-w-max">
              <Image
                width={30}
                height={30}
                alt="birthday"
                src="/icons/user.png"
                className="h-7 w-7 rounded-full object-cover"
              />
            </div>
            <p className="ml-2 line-clamp-1 text-[15px] font-[600]">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
