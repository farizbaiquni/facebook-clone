import { ReactionsEnum } from "@/types/reactions";
import { forwardRef } from "react";
import IconReaction from "./posts/footer_post/IconReaction";

type ReactionOptionsIconPropsType = {
  isUlVisible: boolean;
  handleOnClickReactionOption: (param: ReactionsEnum) => void;
};

const ReactionOptionsIcon = forwardRef<HTMLUListElement, ReactionOptionsIconPropsType>(
  ({ isUlVisible, handleOnClickReactionOption }, ref) => {
    const reactionOptions = [
      {
        src: "/icons/posts/like.svg",
        alt: "like",
        action: () => handleOnClickReactionOption(ReactionsEnum.LIKE),
      },
      {
        src: "/icons/posts/love.svg",
        alt: "love",
        action: () => handleOnClickReactionOption(ReactionsEnum.LOVE),
      },
      {
        src: "/icons/posts/care.svg",
        alt: "care",
        action: () => handleOnClickReactionOption(ReactionsEnum.CARE),
      },
      {
        src: "/icons/posts/haha.svg",
        alt: "haha",
        action: () => handleOnClickReactionOption(ReactionsEnum.HAHA),
      },
      {
        src: "/icons/posts/wow.svg",
        alt: "wow",
        action: () => handleOnClickReactionOption(ReactionsEnum.WOW),
      },
      {
        src: "/icons/posts/sad.svg",
        alt: "sad",
        action: () => handleOnClickReactionOption(ReactionsEnum.SAD),
      },
      {
        src: "/icons/posts/angry.svg",
        alt: "angry",
        action: () => handleOnClickReactionOption(ReactionsEnum.ANGRY),
      },
    ];
    return (
      <ul
        ref={ref}
        className={`absolute bottom-8 rounded-full border border-gray-200 bg-white p-2 shadow-md ${isUlVisible ? "" : "hidden"}`}
      >
        <div className="flex h-full w-full">
          {reactionOptions.map((reaction, index) => (
            <IconReaction
              key={index}
              src={reaction.src}
              alt={reaction.alt}
              onClick={reaction.action}
            />
          ))}
        </div>
      </ul>
    );
  },
);

ReactionOptionsIcon.displayName = "ReactionOptionsIcon";

export default ReactionOptionsIcon;
