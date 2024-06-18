import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline } from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/solid";
import ActionButtonPost from "./ActionButtonPost";
import { convertTotalReactionsToWord } from "@/utils/convertTotalReactionsToWord";
import { ReactionsEnum, reactionEnumToText } from "@/types/reactions";

type IconProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};

const IconReaction = ({
  src,
  alt,
  className = "",
  width = 35,
  height = 35,
  onClick,
}: IconProps) => (
  <li>
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={`mr-2 cursor-pointer rounded-full border border-gray-200 object-cover ${className}`}
      onClick={onClick}
    />
  </li>
);

type Top3ReactionsType = {
  reaction_id: ReactionsEnum;
  total_count: number;
};

type FooterPostProps = {
  userId: number;
  postId: number;
  fullName: string;
  totalReactions: number;
  totalComments: number;
  totalShares: number;
  handleFocusClick: () => void;
};

export default function FooterPost({
  userId,
  postId,
  fullName,
  totalReactions,
  totalComments,
  totalShares,
  handleFocusClick,
}: FooterPostProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentTotalReactions, setCurrentTotalReactions] =
    useState(totalReactions);
  const [reactionId, setReactionId] = useState<ReactionsEnum | null>(null);
  const [top3Reactions, setTop3Reactions] = useState<
    Map<ReactionsEnum, Top3ReactionsType>
  >(new Map());

  const div1Ref = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [isUlVisible, setIsUlVisible] = useState(false);
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

  const getReactionMessage = (): string => {
    const convertedReactions = convertTotalReactionsToWord(
      currentTotalReactions,
    );
    if (currentTotalReactions === 0 && reactionId !== null) return fullName;
    if (currentTotalReactions === 1 && reactionId !== null) return fullName;
    if (currentTotalReactions === 1 && reactionId === null) return "1";
    if (currentTotalReactions === 2 && reactionId !== null)
      return "You and 1 other";
    if (currentTotalReactions === 2 && reactionId === null)
      return "1 and 1 other";
    if (currentTotalReactions > 2 && reactionId !== null)
      return `You and ${convertedReactions}`;
    if (currentTotalReactions > 2 && reactionId === null)
      return convertedReactions;
    return "";
  };

  const renderReaction = (id: ReactionsEnum) => {
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

  const handleMinusOneTop3ReactionsByReactionId = (id: ReactionsEnum) => {
    if (top3Reactions.has(id)) {
      const currentCount = top3Reactions.get(id)?.total_count || 0;
      top3Reactions.set(id, {
        ...top3Reactions.get(id)!,
        total_count: currentCount - 1,
      });
    }
  };

  const handleAddOneTop3ReactionsByReactionId = (id: ReactionsEnum) => {
    if (top3Reactions.has(id)) {
      const currentCount = top3Reactions.get(id)?.total_count || 0;
      top3Reactions.set(id, {
        ...top3Reactions.get(id)!,
        total_count: currentCount + 1,
      });
    } else {
      top3Reactions.set(id, {
        reaction_id: id,
        total_count: 1,
      });
    }
  };

  const addPostReaction = async (id: ReactionsEnum): Promise<boolean> => {
    try {
      await axios.post("/api/post-reactions", {
        user_id: userId,
        post_id: postId,
        reaction_id: id,
      });
      return true;
    } catch (error) {
      console.error("Error: ", error);
      return false;
    }
  };

  const deletePostReaction = async (): Promise<boolean> => {
    try {
      await axios.delete("/api/post-reactions", {
        data: {
          user_id: userId,
          post_id: postId,
        },
      });
      return true;
    } catch (error) {
      console.error("Error: ", error);
      return false;
    }
  };

  const getTop3PostReactionsByPostIdModel = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post-reactions/top-3-reactions?postId=${postId}`,
      );
      const data: Top3ReactionsType[] = res.data.results.data[0];
      const map: Map<ReactionsEnum, Top3ReactionsType> = new Map();
      data.map((data) => {
        map.set(data.reaction_id, data);
      });
      setTop3Reactions(map);
    } catch (error) {
      console.error("Error: ", error);
      setIsError(true);
    }
  }, [postId]);

  const getPostReactionById = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post-reactions?userId=${userId}&postId=${postId}`,
      );
      setReactionId(res.data.results.data[0]?.reaction_id ?? null);
    } catch (error) {
      console.error("Error: ", error);
      setIsError(true);
    }
  }, [postId, userId]);

  const handleReactionToggle = async () => {
    if (reactionId !== null) {
      if (await deletePostReaction()) {
        handleMinusOneTop3ReactionsByReactionId(reactionId);
        setReactionId(null);
        setCurrentTotalReactions((prevTotal) => prevTotal - 1);
      }
    } else {
      if (await addPostReaction(ReactionsEnum.LIKE)) {
        handleAddOneTop3ReactionsByReactionId(ReactionsEnum.LIKE);
        setReactionId(ReactionsEnum.LIKE);
        setCurrentTotalReactions((prevTotal) => prevTotal + 1);
      }
    }
  };

  const handleOnClickReactionOption = async (id: ReactionsEnum) => {
    if (await addPostReaction(id)) {
      if (reactionId !== null) {
        handleMinusOneTop3ReactionsByReactionId(reactionId);
        setCurrentTotalReactions((prevTotal) => prevTotal);
      } else {
        setCurrentTotalReactions((prevTotal) => prevTotal + 1);
      }
      handleAddOneTop3ReactionsByReactionId(id);
      setReactionId(id);
    }
  };

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
    getTop3PostReactionsByPostIdModel();
  }, [getTop3PostReactionsByPostIdModel]);

  useEffect(() => {
    getPostReactionById();
  }, [getPostReactionById]);

  if (isLoading) {
    return <div className="w-full text-center text-blue-300">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="w-full text-center text-red-300">
        Error loading reactions
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4">
      {(totalReactions > 0 || totalComments > 0 || totalShares > 0) && (
        <div className="flex justify-between border-b border-b-gray-300 py-2 text-sm">
          <div className="flex cursor-pointer justify-center text-gray-500 hover:underline">
            <div className="mr-1 flex items-center">
              {Array.from(top3Reactions.values()).map(
                (data) =>
                  data.total_count >= 1 && renderReaction(data.reaction_id),
              )}
            </div>
            {getReactionMessage()}
          </div>
          <div className="flex">
            <div className="mr-2 flex cursor-pointer items-center text-gray-500 hover:underline">
              <p>{totalComments}</p>
              <ChatBubbleOvalLeftIcon
                width={21}
                height={21}
                className="ml-1 scale-x-[-1] transform"
              />
            </div>
            <div className="flex cursor-pointer items-center text-gray-500 hover:underline">
              <p>{totalShares}</p>
              <ArrowUturnRightIcon width={21} height={21} className="ml-1" />
            </div>
          </div>
        </div>
      )}
      <div className="relative mb-2 flex border-b border-b-gray-300 py-1 text-[15px]">
        <div
          ref={div1Ref}
          onClick={handleReactionToggle}
          className="peer flex flex-1 cursor-pointer items-center justify-center rounded-md py-1 font-semibold text-gray-500 hover:bg-[#F2F2F2]"
        >
          {reactionId === null || reactionId === ReactionsEnum.LIKE ? (
            <HandThumbUpIcon
              className={`${reactionId !== null ? "text-blue-500" : "text-gray-500 "}`}
              width={20}
              height={20}
            />
          ) : (
            renderReaction(reactionId)
          )}
          <span
            className={`ml-1 ${reactionId !== null ? "text-blue-500" : "text-gray-500 group-hover:text-black"}`}
          >
            {reactionId === null ? "Like" : reactionEnumToText(reactionId)}
          </span>
        </div>
        <ActionButtonPost
          Icon={ChatBubbleOvalLeftIconOutline}
          label="Comment"
          handleFocusClick={handleFocusClick}
        />
        <ActionButtonPost Icon={PhoneIcon} label="Send" />
        <ActionButtonPost Icon={ArrowUturnRightIcon} label="Share" />
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
    </div>
  );
}
