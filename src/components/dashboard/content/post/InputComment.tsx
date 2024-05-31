import React, { useState, ChangeEvent } from "react";
import {
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  FaceSmileIcon,
  CameraIcon,
  GifIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import ActionButtonInputComment from "./ActionButtonInputComment";

const InputComment: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setValue(textarea.value);
  };

  return (
    <div className="flex px-4 py-2">
      <div className="mr-4 min-w-max">
        <Image
          src="/profile.jpg"
          width={30}
          height={30}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">
          <textarea
            value={value}
            onChange={handleChange}
            placeholder="Write an answer..."
            className="resize-none overflow-hidden leading-[19px] outline-none"
            style={{ height: "auto" }}
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex">
            <ActionButtonInputComment
              icon={
                <ChatBubbleOvalLeftIconOutline
                  width={21}
                  height={21}
                  className="h-7 w-7 scale-x-[-1] transform cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200"
                />
              }
              tooltip="Comment with an avatar sticker"
            />
            <ActionButtonInputComment
              icon={
                <FaceSmileIcon
                  width={21}
                  height={21}
                  className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200"
                />
              }
              tooltip="Insert an emoji"
            />
            <ActionButtonInputComment
              icon={
                <CameraIcon
                  width={21}
                  height={21}
                  className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200"
                />
              }
              tooltip="Attach a photo or video"
            />
            <ActionButtonInputComment
              icon={
                <GifIcon
                  width={21}
                  height={21}
                  className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200"
                />
              }
              tooltip="Comment with a GIF"
            />
            <ActionButtonInputComment
              icon={
                <StopIcon
                  width={21}
                  height={21}
                  className="ml-1 h-7 w-7 -rotate-45 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200"
                />
              }
              tooltip="Comment with a sticker"
            />
          </div>
          <div className="group relative cursor-pointer">
            <PaperAirplaneIcon
              width={21}
              height={21}
              className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-[#005DC6] hover:bg-gray-200"
            />
            <p
              className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover:block`}
            >
              Comment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputComment;
