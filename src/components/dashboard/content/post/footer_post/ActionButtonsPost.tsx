import { ReactionsEnum, reactionEnumToText } from "@/types/reactions";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactionIcon from "../../ReactionIcon";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline } from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import IconReaction from "./IconReaction";

const renderActionButtonReaction = (
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  label: string,
  handleFocusClick?: () => void,
) => {
  return (
    <div
      onClick={handleFocusClick}
      className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md py-1 font-semibold text-gray-500 hover:bg-[#F2F2F2]"
    >
      <Icon className="mr-2 text-gray-500" width={20} height={20} />
      <p>{label}</p>
    </div>
  );
};

type ActionButtonsPostProps = {
  reactionId: ReactionsEnum | null;
  handleFocusClick: () => void;
  handleReactionToggle: () => void;
  handleOnClickReactionOption: (param: ReactionsEnum) => void;
};

const ActionButtonsPost = ({
  reactionId,
  handleFocusClick,
  handleReactionToggle,
  handleOnClickReactionOption,
}: ActionButtonsPostProps) => {
  const [isUlVisible, setIsUlVisible] = useState(false);
  const div1Ref = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterDiv1 = useCallback(() => {
    enterTimeout.current = setTimeout(() => {
      setIsUlVisible(true);
    }, 300);
  }, []);

  const handleMouseLeave = useCallback((event: MouseEvent) => {
    const divRefCurrent = div1Ref.current;
    const ulRefCurrent = ulRef.current;

    if (
      divRefCurrent &&
      !divRefCurrent.contains(event.relatedTarget as Node) &&
      ulRefCurrent &&
      !ulRefCurrent.contains(event.relatedTarget as Node)
    ) {
      leaveTimeout.current = setTimeout(() => {
        setIsUlVisible(false);
      }, 300);
    }
  }, []);

  const handleLiClick = useCallback(() => {
    setIsUlVisible(false);
  }, []);

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

  useEffect(() => {
    const divRefCurrent = div1Ref.current;
    const ulRefCurrent = ulRef.current;
    let liElements: NodeListOf<HTMLLIElement> | undefined;

    if (divRefCurrent) {
      divRefCurrent.addEventListener("mouseenter", handleMouseEnterDiv1);
      divRefCurrent.addEventListener("mouseleave", handleMouseLeave);
    }

    if (ulRefCurrent) {
      ulRefCurrent.addEventListener("mouseleave", handleMouseLeave);

      liElements = ulRefCurrent.querySelectorAll("li");
      liElements.forEach((li) => {
        li.addEventListener("click", handleLiClick);
      });
    }

    return () => {
      if (divRefCurrent) {
        divRefCurrent.removeEventListener("mouseenter", handleMouseEnterDiv1);
        divRefCurrent.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (ulRefCurrent) {
        ulRefCurrent.removeEventListener("mouseleave", handleMouseLeave);

        if (liElements) {
          liElements.forEach((li) => {
            li.removeEventListener("click", handleLiClick);
          });
        }
      }
      if (enterTimeout.current) {
        clearTimeout(enterTimeout.current);
      }
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
      }
    };
  }, [handleMouseEnterDiv1, handleMouseLeave, handleLiClick]);

  return (
    <div className="relative mb-2 flex border-b border-b-gray-300 py-1 text-[15px]">
      <Fragment>
        {/* Reaction */}
        <div
          ref={div1Ref}
          onClick={handleReactionToggle}
          className="peer flex flex-1 cursor-pointer select-none items-center justify-center rounded-md py-1 font-semibold text-gray-500 hover:bg-[#F2F2F2]"
        >
          {reactionId === null || reactionId === ReactionsEnum.LIKE ? (
            <HandThumbUpIcon
              className={`${reactionId !== null ? "text-blue-500" : "text-gray-500 "}`}
              width={20}
              height={20}
            />
          ) : (
            <ReactionIcon id={reactionId} />
          )}
          <span
            className={`ml-1 ${reactionId !== null ? "text-blue-500" : "text-gray-500 group-hover:text-black"}`}
          >
            {reactionId === null ? "Like" : reactionEnumToText(reactionId)}
          </span>
        </div>

        {/* Comment */}
        {renderActionButtonReaction(
          ChatBubbleOvalLeftIconOutline,
          "Comment",
          handleFocusClick,
        )}

        {renderActionButtonReaction(PhoneIcon, "Send")}

        {renderActionButtonReaction(ArrowUturnRightIcon, "Share")}
      </Fragment>

      {/* Reaction Options */}
      <ul
        ref={ulRef}
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
    </div>
  );
};

export default memo(ActionButtonsPost);
