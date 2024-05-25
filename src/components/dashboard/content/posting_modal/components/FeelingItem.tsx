import { FeelingType } from "@/types/Feelings";

type FeelingItemType = {
  feeling: FeelingType;
  handleClickFeeling: (param: FeelingType) => void;
};

export default function FeelingItem({
  feeling,
  handleClickFeeling: handleClickEmoji,
}: FeelingItemType) {
  return (
    <div
      onClick={() => handleClickEmoji(feeling)}
      className="flex h-[52px] cursor-pointer items-center gap-x-2 rounded-lg px-2 text-sm hover:bg-[#D8D9DA]"
    >
      <span className="rounded-full bg-gray-200 p-[2px] text-lg">
        {feeling.feelingIcon}
      </span>
      <span className="text-base font-extralight">{feeling.label}</span>
    </div>
  );
}
