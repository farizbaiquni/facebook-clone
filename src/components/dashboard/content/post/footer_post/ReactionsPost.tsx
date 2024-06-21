import { ReactionsEnum, Top3ReactionsType } from "@/types/reactions";
import {
  ArrowUturnRightIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";
import React, { Fragment, memo } from "react";
import ReactionIcon from "../../ReactionIcon";
import { convertTotalReactionsToWord } from "@/utils/convertTotalReactionsToWord";

type ReactionsPostProps = {
  totalReactions: number;
  totalComments: number;
  totalShares: number;
  reactionId: ReactionsEnum | null;
  fullName: string;
  top3Reactions: Map<ReactionsEnum, Top3ReactionsType>;
  currentTotalReactions: number;
};

const ReactionsPost = ({
  totalReactions,
  totalComments,
  totalShares,
  reactionId,
  fullName,
  top3Reactions,
  currentTotalReactions,
}: ReactionsPostProps) => {
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

  return (
    <Fragment>
      {(totalReactions > 0 || totalComments > 0 || totalShares > 0) && (
        <div className="flex justify-between border-b border-b-gray-300 py-2 text-sm">
          <div className="flex cursor-pointer justify-center text-gray-500 hover:underline">
            <div className="mr-1 flex items-center">
              {Array.from(top3Reactions.values()).map(
                (data) =>
                  data.total_count >= 1 && (
                    <ReactionIcon
                      key={data.reaction_id}
                      id={data.reaction_id}
                    />
                  ),
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
    </Fragment>
  );
};

export default memo(ReactionsPost);
