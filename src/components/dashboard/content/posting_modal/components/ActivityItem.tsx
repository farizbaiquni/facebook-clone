import { ActivityOptions, ActivityType } from "@/types/activities";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type ActivityItemProps = {
  activity: ActivityType;
  handleClickActivity: (activityOption: ActivityOptions, label: string) => void;
};

export default function ActivityItem({
  activity,
  handleClickActivity,
}: ActivityItemProps) {
  return (
    <div
      onClick={() => handleClickActivity(activity.option, activity.label)}
      className="flex h-fit cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-gray-200"
    >
      <div className="flex flex-1 items-center">
        <Image
          src={activity.activityIcon}
          width={37}
          height={37}
          alt={activity.label}
          className="mr-2 rounded-full bg-[#E4E6EB] p-[6px]"
        />
        <span>{activity.label}</span>
      </div>
      <ChevronRightIcon className="h-7 w-7 text-gray-500" />
    </div>
  );
}
