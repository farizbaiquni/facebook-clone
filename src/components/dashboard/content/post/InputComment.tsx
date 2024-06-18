import React, {
  useState,
  ChangeEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
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

const icons = [
  {
    icon: (
      <ChatBubbleOvalLeftIconOutline className="h-7 w-7 scale-x-[-1] transform cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
    ),
    tooltip: "Comment with an avatar sticker",
  },
  {
    icon: (
      <FaceSmileIcon className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
    ),
    tooltip: "Insert an emoji",
  },
  {
    icon: (
      <CameraIcon className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
    ),
    tooltip: "Attach a photo or video",
  },
  {
    icon: (
      <GifIcon className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
    ),
    tooltip: "Comment with a GIF",
  },
  {
    icon: (
      <StopIcon className="ml-1 h-7 w-7 -rotate-45 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
    ),
    tooltip: "Comment with a sticker",
  },
];

const InputComment = forwardRef((props, ref) => {
  const [value, setValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
    scrollIntoView: () =>
      textareaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
  }));

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
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="Write an answer..."
          className="resize-none overflow-hidden leading-[19px] outline-none"
          style={{ height: "auto" }}
        />
        <div className="flex items-center justify-between py-2">
          <div className="flex">
            {icons.map((icon, index) => (
              <ActionButtonInputComment
                key={index}
                icon={icon.icon}
                tooltip={icon.tooltip}
              />
            ))}
          </div>
          <div className="group relative cursor-pointer">
            <PaperAirplaneIcon className="ml-1 h-7 w-7 cursor-pointer rounded-full p-1 text-[#005DC6] hover:bg-gray-200" />
            <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover:block">
              Comment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

InputComment.displayName = "InputComment";

export default InputComment;
