import { ActivityType, SubActivityType } from "@/types/activities";
import Image from "next/image";

type SubActivityItemType = {
  key: string;
  activity: SubActivityType;
  handleClickSubActivity: (param: SubActivityType) => void;
};

export default function SubActivityItem({
  key,
  activity,
  handleClickSubActivity,
}: SubActivityItemType) {
  return (
    <div
      onClick={() => handleClickSubActivity(activity)}
      key={key}
      className="mx-2 flex h-fit cursor-pointer items-center rounded-lg px-2 py-2 hover:bg-[#F2F2F2]"
    >
      <Image
        width={50}
        height={50}
        alt={activity.label}
        src={activity.activityIcon}
      />
      <p className="ml-2 font-semibold">{activity.label}</p>
    </div>
  );
}
