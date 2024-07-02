import { ReactionsEnum, reactionEnumToText } from "@/types/reactions";
import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import ReactionIcon from "../../ReactionIcon";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline } from "@heroicons/react/24/outline";
import { HandThumbUpIcon, PhoneIcon, ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import ReactionOptionsIcon from "../../ReactionOptionsIcon";

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
  isPostFromAuthUser: boolean;
  reactionId: ReactionsEnum | null;
  handleFocusClick: () => void;
  handleReactionToggle: () => void;
  handleOnClickReactionOption: (param: ReactionsEnum) => void;
};

const ActionButtonsPost = ({
  isPostFromAuthUser,
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

  const handleMouseEnterUl = useCallback(() => {
    leaveTimeout.current && clearTimeout(leaveTimeout.current);
    setIsUlVisible(true);
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
      }, 700);
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
      ulRefCurrent.addEventListener("mouseenter", handleMouseEnterUl);
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
  }, [handleMouseEnterUl, handleMouseEnterDiv1, handleMouseLeave, handleLiClick]);

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
        {renderActionButtonReaction(ChatBubbleOvalLeftIconOutline, "Comment", handleFocusClick)}

        {renderActionButtonReaction(PhoneIcon, "Send")}

        {!isPostFromAuthUser && renderActionButtonReaction(ArrowUturnRightIcon, "Share")}
      </Fragment>

      {/* Reaction Options */}
      <ReactionOptionsIcon
        isUlVisible={isUlVisible}
        ref={ulRef}
        handleOnClickReactionOption={handleOnClickReactionOption}
      />
    </div>
  );
};

export default memo(ActionButtonsPost);
