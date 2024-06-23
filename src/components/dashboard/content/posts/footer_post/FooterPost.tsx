import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
  PostReactionsType,
  ReactionsEnum,
  Top3ReactionsType,
} from "@/types/reactions";
import ActionButtonsPost from "./ActionButtonsPost";
import ReactionsPost from "./ReactionsPost";
import { SuccessResponseType } from "@/types/responses";

type FooterPostProps = {
  isPostFromAuthUser: boolean;
  userId: number;
  postId: number;
  fullName: string;
  totalReactions: number;
  totalComments: number;
  totalShares: number;
  handleFocusClick: () => void;
};

const FooterPost = ({
  isPostFromAuthUser,
  userId,
  postId,
  fullName,
  totalReactions,
  totalComments,
  totalShares,
  handleFocusClick,
}: FooterPostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reactionId, setReactionId] = useState<ReactionsEnum | null>(null);
  const [top3Reactions, setTop3Reactions] = useState<
    Map<ReactionsEnum, Top3ReactionsType>
  >(new Map());
  const [currentTotalReactions, setCurrentTotalReactions] =
    useState(totalReactions);

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

  const getTop3PostReactions = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post-reactions/top-3-reactions?postId=${postId}`,
      );
      const reactions: Top3ReactionsType[] = res.data.data;
      const reactionsMap: Map<ReactionsEnum, Top3ReactionsType> = new Map();
      reactions.map((data) => {
        reactionsMap.set(data.reaction_id, data);
      });
      console.log("setTop3Reactions", reactionsMap);
      setTop3Reactions(reactionsMap);
    } catch (error) {
      console.error("Error get top 3 reactions by post Id: ", error);
      setIsError(true);
    }
  }, [postId]);

  const getPostReaction = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/post-reactions?userId=${userId}&postId=${postId}`,
      );
      const successResponse: SuccessResponseType<PostReactionsType | null> =
        response.data;
      setReactionId(
        successResponse.data !== null ? successResponse.data.reaction_id : null,
      );
    } catch (error) {
      console.error("Error get post reactions by user Id: ", error);
      setIsError(true);
    }
  }, [postId, userId]);

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

  useEffect(() => {
    getTop3PostReactions();
  }, [getTop3PostReactions]);

  useEffect(() => {
    getPostReaction();
  }, [getPostReaction]);

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
      <ReactionsPost
        totalReactions={totalReactions}
        totalComments={totalComments}
        totalShares={totalShares}
        reactionId={reactionId}
        fullName={fullName}
        top3Reactions={top3Reactions}
        currentTotalReactions={currentTotalReactions}
      />
      <ActionButtonsPost
        isPostFromAuthUser={isPostFromAuthUser}
        reactionId={reactionId}
        handleFocusClick={handleFocusClick}
        handleReactionToggle={handleReactionToggle}
        handleOnClickReactionOption={handleOnClickReactionOption}
      />
    </div>
  );
};

export default FooterPost;
