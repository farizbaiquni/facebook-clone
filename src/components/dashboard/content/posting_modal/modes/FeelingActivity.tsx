import { ModeTypes } from "@/types/ModeTypes";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FeelingType, feelings } from "@/types/Feelings";
import {
  activities,
  ActivityOptions,
  ActivityType,
  subActivitiesMap,
  SubActivityType,
} from "@/types/Activities";
import FeelingItem from "../components/FeelingItem";
import ActivityItem from "../components/ActivityItem";
import SubActivityItem from "../components/SubActivityItem";

type FeelingActivityType = {
  handleModeType: (param: ModeTypes) => void;
  setSelectedFeelingActivity: (param: SubActivityType | FeelingType) => void;
};

export default function FeelingActivity({
  handleModeType,
  setSelectedFeelingActivity,
}: FeelingActivityType) {
  enum MenuOptions {
    Feeling,
    Activity,
  }
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedMenuOption, setSelectedMenuOption] = useState<MenuOptions>(
    MenuOptions.Feeling,
  );

  const [labelSelectedActivity, setLabelSelectedActivity] = useState("");
  const [selectedActivityOption, setSelectedActivityOption] =
    useState<ActivityOptions>(ActivityOptions.Celebrating);
  const [isSubActivityActive, setIsSubActivityActive] = useState(false);

  const handleClickFeeling = (feeling: FeelingType) => {
    setSelectedFeelingActivity(feeling);
    handleModeType(ModeTypes.PostingMode);
  };

  const handleClickSubActivity = (activity: SubActivityType) => {
    setSelectedFeelingActivity(activity);
    handleModeType(ModeTypes.PostingMode);
  };

  const handleClickActivity = (
    activityOption: ActivityOptions,
    label: string,
  ) => {
    setLabelSelectedActivity(label);
    setSelectedActivityOption(activityOption);
    setIsSubActivityActive(true);
  };

  const handleBackToPostingMode = () => {
    handleModeType(ModeTypes.PostingMode);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleCloseSubActivities = () => {
    setIsSubActivityActive(false);
  };

  const filteredFeelings = feelings.filter((feeling) =>
    feeling.label.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  const filteredActivities = activities.filter((activity) =>
    activity.label.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  const selectedSubActivities =
    subActivitiesMap.get(selectedActivityOption) || [];

  const filteredSubActivities = selectedSubActivities.filter((activity) =>
    activity.label.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="flex h-auto w-[500px] flex-col rounded-lg bg-white">
      <div className="flex flex-col">
        {/* Header */}
        <div className="relative mb-5 flex h-[60px] items-center justify-center overflow-hidden border-b border-b-gray-300">
          <h3 className="flex flex-1 items-center justify-center text-lg font-bold">
            How are you{" "}
            {selectedMenuOption === MenuOptions.Feeling ? "feeling?" : "doing?"}
          </h3>
          <ArrowLeftIcon
            onClick={handleBackToPostingMode}
            className="absolute left-3 h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
          />
        </div>

        {/* Menu */}
        <div className="mb-2 flex gap-x-5 px-2 font-semibold text-gray-500">
          <div
            onClick={() => setSelectedMenuOption(MenuOptions.Feeling)}
            className={`cursor-pointer px-3 pb-4 ${
              selectedMenuOption === MenuOptions.Feeling
                ? "border-b-4 border-b-blue-600 text-blue-500"
                : "hover:text-gray-600"
            }`}
          >
            Feeling
          </div>
          <div
            onClick={() => setSelectedMenuOption(MenuOptions.Activity)}
            className={`cursor-pointer px-3 pb-4 ${
              selectedMenuOption === MenuOptions.Activity
                ? "border-b-4 border-b-blue-600 text-blue-500"
                : "hover:text-gray-600"
            }`}
          >
            Activities
          </div>
        </div>

        {/* Search */}
        <div className="mx-4 flex items-center">
          {selectedMenuOption === MenuOptions.Activity &&
            isSubActivityActive && (
              <div className="mr-2 flex h-fit w-fit items-center rounded-md bg-blue-100 px-2">
                <p className="capitalize-first-letter text-nowrap text-sm font-semibold capitalize text-blue-600">
                  {labelSelectedActivity}
                </p>
                <XMarkIcon
                  onClick={handleCloseSubActivities}
                  className="h-7 w-7 cursor-pointer rounded-full p-1 text-blue-500 hover:bg-gray-200"
                />
              </div>
            )}
          <div className="w-full rounded-full bg-[#E4E6EB] px-8 py-2">
            <div className="relative w-full">
              <input
                type="text"
                className="ml-2 w-full bg-[#E4E6EB] placeholder-gray-700 outline-none"
                placeholder="Search"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-[-15px] top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Feeling and Activity List */}
      {/* Feeling List */}
      {selectedMenuOption === MenuOptions.Feeling && (
        <div className="custom-scrollbar grid h-[355px] grid-cols-2 flex-col gap-2 overflow-y-scroll px-4 py-3">
          {filteredFeelings.map((feeling) => (
            <FeelingItem
              key={feeling.label}
              feeling={feeling}
              handleClickFeeling={handleClickFeeling}
            />
          ))}
        </div>
      )}
      {/* Activity List */}
      {selectedMenuOption === MenuOptions.Activity && !isSubActivityActive && (
        <div className="custom-scrollbar mr-1 grid h-[250px] grid-cols-1 flex-col gap-y-2 overflow-y-scroll px-4 py-3">
          {filteredActivities.map((activity) => (
            <ActivityItem
              key={activity.label}
              activity={activity}
              handleClickActivity={handleClickActivity}
            />
          ))}
        </div>
      )}
      {/* Sub Activity List*/}
      {selectedMenuOption === MenuOptions.Activity && isSubActivityActive && (
        <div className="custom-scrollbar mx-1 mt-2 h-[355px] overflow-y-scroll">
          {filteredSubActivities.map((activity) => (
            <SubActivityItem
              key={activity.label}
              activity={activity}
              handleClickSubActivity={handleClickSubActivity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
