import { GetCommentType } from "@/types/comments";
import { CommentReactionsType, ReactionsEnum, Top3ReactionsType } from "@/types/reactions";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import ActionReactionsComment from "./footer_comment/ActionReactionsComment";
import { SuccessResponseType } from "@/types/responses";

type FooterCommentPropsType = {
  authUserId: number;
  comment: GetCommentType;
  relativeTime: string;
  totalReactions: number;
};

const FooterComment = ({
  authUserId,
  comment,
  relativeTime,
  totalReactions,
}: FooterCommentPropsType) => {
  const icons = new Map([
    [ReactionsEnum.LIKE, "/icons/posts/like.svg"],
    [ReactionsEnum.LOVE, "/icons/posts/love.svg"],
    [ReactionsEnum.CARE, "/icons/posts/care.svg"],
    [ReactionsEnum.HAHA, "/icons/posts/haha.svg"],
    [ReactionsEnum.WOW, "/icons/posts/wow.svg"],
    [ReactionsEnum.SAD, "/icons/posts/sad.svg"],
    [ReactionsEnum.ANGRY, "/icons/posts/angry.svg"],
  ]);

  const getTopReactions = useCallback((): Map<ReactionsEnum, Top3ReactionsType> => {
    const reactions: Top3ReactionsType[] = [
      { reaction_id: ReactionsEnum.LIKE, total_count: comment.total_likes },
      { reaction_id: ReactionsEnum.LOVE, total_count: comment.total_loves },
      { reaction_id: ReactionsEnum.HAHA, total_count: comment.total_haha },
      { reaction_id: ReactionsEnum.WOW, total_count: comment.total_wows },
      { reaction_id: ReactionsEnum.SAD, total_count: comment.total_sads },
      { reaction_id: ReactionsEnum.ANGRY, total_count: comment.total_angries },
    ].filter((reaction) => reaction.total_count >= 1);
    const top3Reactions = reactions.sort((a, b) => b.total_count - a.total_count).slice(0, 3);
    const top3ReactionsMap = new Map<ReactionsEnum, Top3ReactionsType>();
    top3Reactions.map((reaction) => top3ReactionsMap.set(reaction.reaction_id, reaction));
    return top3ReactionsMap;
  }, [comment]);

  const [isLoadingOnChangeReaction, setIsLoadingOnChangeReaction] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentTotalReactions, setCurrentTotalReactions] = useState<number>(
    comment.total_reactions ?? 0,
  );
  const [reactionId, setReactionId] = useState<ReactionsEnum | null>(null);
  const [top3Reactions, setTop3Reactions] =
    useState<Map<ReactionsEnum, Top3ReactionsType>>(getTopReactions());

  const handleMinusOneTop3ReactionsByReactionId = (id: ReactionsEnum) => {
    if (top3Reactions.has(id)) {
      setTop3Reactions((prevState) => {
        const newTop3Reactions = new Map(prevState);
        newTop3Reactions.set(id, {
          ...newTop3Reactions.get(id)!,
          total_count: newTop3Reactions.get(id)!.total_count - 1,
        });
        return newTop3Reactions;
      });
    }
  };

  const handleAddOneTop3ReactionsByReactionId = (id: ReactionsEnum) => {
    if (top3Reactions.has(id)) {
      const currentCount = top3Reactions.get(id)?.total_count || 0;
      setTop3Reactions((prevState) => {
        const newTop3Reactions = new Map(prevState);
        newTop3Reactions.set(id, {
          reaction_id: id,
          total_count: newTop3Reactions.get(id)!.total_count + 1,
        });
        return newTop3Reactions;
      });
    } else {
      setTop3Reactions((prevState) => {
        const newTop3Reactions = new Map(prevState);
        newTop3Reactions.set(id, {
          reaction_id: id,
          total_count: 1,
        });
        return newTop3Reactions;
      });
    }
  };

  const addCommentReactionCallAPI = async (id: ReactionsEnum): Promise<boolean> => {
    try {
      setIsLoadingOnChangeReaction(true);
      await axios.post("/api/comment-reactions", {
        user_id: authUserId,
        comment_id: comment.comment_id,
        reaction_id: id,
      });
      setIsLoadingOnChangeReaction(false);
      return true;
    } catch (error: AxiosError | any) {
      console.error("Error add comment reaction: ", error.response?.data);
      setIsLoadingOnChangeReaction(false);
      return false;
    }
  };

  const deleteCommentReactionCallApi = async (): Promise<boolean> => {
    try {
      setIsLoadingOnChangeReaction(true);
      await axios.delete("/api/comment-reactions", {
        data: {
          user_id: authUserId,
          comment_id: comment.comment_id,
        },
      });
      setIsLoadingOnChangeReaction(false);
      return true;
    } catch (error: AxiosError | any) {
      console.error("Error delete comment reaction: ", error.response?.data);
      setIsLoadingOnChangeReaction(false);
      return false;
    }
  };

  const handleReactionToggle = async () => {
    if (isLoadingOnChangeReaction) return;
    if (reactionId !== null) {
      if (await deleteCommentReactionCallApi()) {
        handleMinusOneTop3ReactionsByReactionId(reactionId);
        setReactionId(null);
        setCurrentTotalReactions((prevTotal) => prevTotal - 1);
      }
    } else {
      if (await addCommentReactionCallAPI(ReactionsEnum.LIKE)) {
        handleAddOneTop3ReactionsByReactionId(ReactionsEnum.LIKE);
        setReactionId(ReactionsEnum.LIKE);
        setCurrentTotalReactions((prevTotal) => prevTotal + 1);
      }
    }
  };

  const handleOnClickReactionOption = async (id: ReactionsEnum) => {
    if (isLoadingOnChangeReaction) return;
    if (await addCommentReactionCallAPI(id)) {
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

  const getPostReactionCallAPI = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/comment-reactions?userId=${authUserId}&commentId=${comment.comment_id}`,
      );
      const successResponse: SuccessResponseType<CommentReactionsType | null> = response.data;
      setReactionId(successResponse.data !== null ? successResponse.data.reaction_id : null);
    } catch (error: AxiosError | any) {
      console.error("Error get post reactions: ", error.response?.data);
      setIsError(true);
    }
  }, [comment.comment_id, authUserId]);

  useEffect(() => {
    getPostReactionCallAPI();
  }, [getPostReactionCallAPI]);

  return (
    <div className="relative flex items-center justify-between py-1">
      <div className="flex items-center gap-x-4 px-2 text-xs text-gray-600">
        <p className={`cursor-pointer hover:underline`}>{relativeTime}</p>
        <ActionReactionsComment
          reactionId={reactionId}
          handleReactionToggle={handleReactionToggle}
          handleOnClickReactionOption={handleOnClickReactionOption}
        />
        <p className={`cursor-pointer font-[700] hover:underline`}>Reply</p>
        <p className={`cursor-pointer font-[700] hover:underline`}>Share</p>
      </div>

      <div className="flex min-h-6 items-center gap-x-1">
        {currentTotalReactions > 0 && (
          <Fragment>
            <p className=" text-xs text-gray-600">{currentTotalReactions}</p>
            {Array.from(top3Reactions.values()).map(
              (reaction, index) =>
                reaction.total_count > 0 && (
                  <Image
                    key={index}
                    width={18}
                    height={18}
                    alt="like"
                    src={icons.get(reaction.reaction_id)!}
                  />
                ),
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default FooterComment;
