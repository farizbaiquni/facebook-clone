import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import ReactionOptionsIcon from "../../ReactionOptionsIcon";
import { ReactionsEnum } from "@/types/reactions";

type ActionReactionsCommentProps = {
  reactionId: ReactionsEnum | null;
  handleReactionToggle: () => void;
  handleOnClickReactionOption: (id: ReactionsEnum) => void;
};

const ActionReactionsComment = ({
  reactionId,
  handleReactionToggle,
  handleOnClickReactionOption,
}: ActionReactionsCommentProps) => {
  const [isUlVisible, setIsUlVisible] = useState(false);
  const div1Ref = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const convertReactionEnumToText = (id: ReactionsEnum): string => {
    switch (id) {
      case ReactionsEnum.LIKE:
        return "Like";
      case ReactionsEnum.LOVE:
        return "Love";
      case ReactionsEnum.CARE:
        return "Care";
      case ReactionsEnum.HAHA:
        return "Haha";
      case ReactionsEnum.WOW:
        return "Wow";
      case ReactionsEnum.SAD:
        return "Sad";
      case ReactionsEnum.ANGRY:
        return "Angry";
    }
  };

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
    <Fragment>
      <div className="relative" ref={div1Ref}>
        <p
          onClick={handleReactionToggle}
          className={`cursor-pointer font-[700] hover:underline 
            ${
              reactionId === null
                ? "text-[#65676b]"
                : reactionId === ReactionsEnum.LIKE
                  ? "text-[#0866FF]"
                  : reactionId === ReactionsEnum.LOVE || reactionId === ReactionsEnum.ANGRY
                    ? "text-[#ed4956]"
                    : "text-[#F7B125]"
            } `}
        >
          {reactionId !== null ? convertReactionEnumToText(reactionId) : "like"}
        </p>
      </div>
      <ReactionOptionsIcon
        isUlVisible={isUlVisible}
        ref={ulRef}
        handleOnClickReactionOption={handleOnClickReactionOption}
      />
    </Fragment>
  );
};

export default ActionReactionsComment;
