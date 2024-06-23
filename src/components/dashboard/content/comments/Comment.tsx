import { UserContext } from "@/hooks/useContext";
import { GetCommentType } from "@/types/comments";
import { ReactionsEnum, Top3ReactionsType } from "@/types/reactions";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Fragment, useCallback, useContext, useMemo } from "react";

type CommentsProps = {
  comment: GetCommentType;
};

const Comment = ({ comment }: CommentsProps) => {
  const icons = new Map([
    [ReactionsEnum.LIKE, "/icons/posts/like.svg"],
    [ReactionsEnum.LOVE, "/icons/posts/love.svg"],
    [ReactionsEnum.CARE, "/icons/posts/care.svg"],
    [ReactionsEnum.HAHA, "/icons/posts/haha.svg"],
    [ReactionsEnum.WOW, "/icons/posts/wow.svg"],
    [ReactionsEnum.SAD, "/icons/posts/sad.svg"],
    [ReactionsEnum.ANGRY, "/icons/posts/angry.svg"],
  ]);

  const authUser = useContext(UserContext)!;
  const relativeTime = formatRelativeTime(comment.updated_at);
  const fullName = comment.first_name + " " + comment.last_name;

  const totalReactions = useMemo(() => {
    return (
      comment.total_like +
      comment.total_love +
      comment.total_haha +
      comment.total_wow +
      comment.total_sad +
      comment.total_angry
    );
  }, [comment]);

  const getTopReactions = useCallback(
    (comment: GetCommentType): Top3ReactionsType[] => {
      const reactions: Top3ReactionsType[] = [
        { reaction_id: ReactionsEnum.LIKE, total_count: comment.total_like },
        { reaction_id: ReactionsEnum.LOVE, total_count: comment.total_love },
        { reaction_id: ReactionsEnum.HAHA, total_count: comment.total_haha },
        { reaction_id: ReactionsEnum.WOW, total_count: comment.total_wow },
        { reaction_id: ReactionsEnum.SAD, total_count: comment.total_sad },
        { reaction_id: ReactionsEnum.ANGRY, total_count: comment.total_angry },
      ].filter((reaction) => reaction.total_count >= 1);

      return reactions
        .sort((a, b) => b.total_count - a.total_count)
        .slice(0, 3);
    },
    [],
  );

  const top3Reactions = useMemo(() => {
    return getTopReactions(comment);
  }, [comment, getTopReactions]);

  return (
    <div className="group flex px-4 pt-2">
      {/* Photo Profile */}
      <div className="mr-2 min-w-max">
        <Image
          src="/icons/user.png"
          width={30}
          height={30}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Top Comment Part */}
        <div className="flex flex-1">
          <div className="flex rounded-xl bg-[#F0F2F5] p-2">
            <div className="flex flex-col">
              <p className="text-[13px] font-semibold">{fullName}</p>
              <p className="line-clamp-2 overflow-clip text-[15px] leading-5">
                {comment.content}
              </p>
            </div>
          </div>
          <div className="ml-1 flex w-[30px] min-w-[30px] items-center">
            <EllipsisHorizontalIcon
              className="hidden cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#F2F2F2] group-hover:block"
              width={30}
              height={30}
            />
          </div>
        </div>

        {/* Below Action Comment */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-x-4 px-2 text-xs text-gray-600">
            {[relativeTime, "Like", "Reply", "Share"].map((text, index) => (
              <p
                key={index}
                className={`cursor-pointer ${index > 0 && "font-semibold"} hover:underline`}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-x-1 text-xs">
            {totalReactions > 0 && (
              <Fragment>
                <p>{totalReactions}</p>
                {top3Reactions.map((reaction, index) => (
                  <Image
                    key={index}
                    width={20}
                    height={20}
                    alt="like"
                    src={icons.get(reaction.reaction_id)!}
                  />
                ))}
              </Fragment>
            )}
          </div>
        </div>

        {comment.total_replies > 0 && (
          <p className="cursor-pointer pl-2 text-[15px] font-semibold text-gray-500 hover:underline">
            View all {comment.total_replies}{" "}
            {comment.total_replies > 1 ? "replies" : "reply"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
