import React from "react";
import Image from "next/image";
import { ReactionsEnum } from "@/types/reactions";

type ReactionIconProps = {
  id: ReactionsEnum;
};

const ReactionIcon = ({ id }: ReactionIconProps) => {
  const iconMap: Record<ReactionsEnum, string> = {
    [ReactionsEnum.LIKE]: "/icons/posts/like.svg",
    [ReactionsEnum.LOVE]: "/icons/posts/love.svg",
    [ReactionsEnum.CARE]: "/icons/posts/care.svg",
    [ReactionsEnum.HAHA]: "/icons/posts/haha.svg",
    [ReactionsEnum.WOW]: "/icons/posts/wow.svg",
    [ReactionsEnum.SAD]: "/icons/posts/sad.svg",
    [ReactionsEnum.ANGRY]: "/icons/posts/angry.svg",
  };

  return (
    <Image
      src={iconMap[id]}
      width={20}
      height={20}
      alt={ReactionsEnum[id].toLowerCase()}
      className="cursor-pointer rounded-full border border-gray-200 object-cover"
    />
  );
};

export default ReactionIcon;
