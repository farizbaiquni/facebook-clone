import { useEffect, useState } from "react";
import { ModeTypes } from "@/types/modes";
import {
  AudienceFriendType,
  AudienceOptions,
  AudienceSelectorModeEnum,
  IncludeOrExcludeAudienceSelectorModeEnum,
} from "@/types/audiences";
import {
  UserIcon,
  UsersIcon,
  UserGroupIcon,
  UserMinusIcon,
  LockClosedIcon,
  CogIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  MinusCircleIcon as MinusCircleIconOutline,
  CheckCircleIcon as CheckCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  MinusCircleIcon as MinusCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from "@heroicons/react/24/solid";
import AudienceSelectorIncludeExclude from "./audience_selector/AudienceSelectorIncludeExclude";
import AudienceSelectorCustom from "./audience_selector/AudienceSelectorCustom";

const audienceOptions = [
  {
    label: "Public",
    value: AudienceOptions.Public,
    description: "Anyone on or off Facebook",
    icon: <UsersIcon className="h-7 w-7 text-gray-800" />,
    changeToAudienceSelector: AudienceSelectorModeEnum.MAIN,
  },
  {
    label: "Friends",
    value: AudienceOptions.Friends,
    description: "Your friends on Facebook",
    icon: <UserGroupIcon className="h-7 w-7 text-gray-800" />,
    changeToAudienceSelector: AudienceSelectorModeEnum.MAIN,
  },
  {
    label: "Friends except...",
    value: AudienceOptions.FriendsExcept,
    description: "Friends; Except: Aam Afiyah",
    icon: <UserMinusIcon className="h-7 w-7 text-gray-800" />,
    changeToAudienceSelector: AudienceSelectorModeEnum.FRIENDS_EXCEPT,
  },
  {
    label: "Specific friends",
    value: AudienceOptions.SpecificFriends,
    description: "Aan Efandri, Aam Afiyah",
    icon: <UserIcon className="h-7 w-7 text-gray-800" />,
    changeToAudienceSelector: AudienceSelectorModeEnum.SPECIFIC_FRIENDS,
  },
  {
    label: "Only me",
    value: AudienceOptions.OnlyMe,
    description: "",
    icon: <LockClosedIcon className="h-7 w-7 text-gray-800" />,
    changeToAudienceSelector: AudienceSelectorModeEnum.MAIN,
  },
  {
    label: "Custom",
    value: AudienceOptions.Custom,
    description: "Custom settings",
    icon: <CogIcon className="h-7 w-7 text-gray-800" />,
    changeToAudienceSelector: AudienceSelectorModeEnum.CUSTOM,
  },
];

type AudienceModeProps = {
  handleModeType: (param: ModeTypes) => void;
  selectedAudienceOption: AudienceOptions;
  selectedAudienceInclude: Map<number, AudienceFriendType>;
  selectedAudienceExclude: Map<number, AudienceFriendType>;
  setSelectedAudienceOption: (param: AudienceOptions) => void;
  setSelectedAudienceInclude: (param: Map<number, AudienceFriendType>) => void;
  setSelectedAudienceExclude: (param: Map<number, AudienceFriendType>) => void;
};

export default function AudienceMode({
  handleModeType,
  selectedAudienceOption,
  selectedAudienceInclude,
  selectedAudienceExclude,
  setSelectedAudienceOption,
  setSelectedAudienceInclude,
  setSelectedAudienceExclude,
}: AudienceModeProps) {
  const [selectedAudieneSelectorMode, setSelectedAudienceSelectorMode] =
    useState<AudienceSelectorModeEnum>(AudienceSelectorModeEnum.MAIN);
  const [tempSelectedAudienceOption, setTempSelectedAudienceOption] = useState(
    selectedAudienceOption,
  );

  const [tempSelectedAudienceInclude, setTempSelectedAudienceInclude] =
    useState<Map<number, AudienceFriendType>>(
      tempSelectedAudienceOption === AudienceOptions.SpecificFriends
        ? selectedAudienceInclude
        : new Map(),
    );
  const [tempSelectedAudienceExclude, setTempSelectedAudienceExclude] =
    useState<Map<number, AudienceFriendType>>(
      tempSelectedAudienceOption === AudienceOptions.FriendsExcept
        ? selectedAudienceExclude
        : new Map(),
    );

  const [
    tempSelectedAudienceIncludeCustom,
    setTempSelectedAudienceIncludeCustom,
  ] = useState<Map<number, AudienceFriendType>>(
    tempSelectedAudienceOption === AudienceOptions.Custom
      ? selectedAudienceInclude
      : new Map(),
  );

  const [
    tempSelectedAudienceExcludeCustom,
    setTempSelectedAudienceExcludeCustom,
  ] = useState<Map<number, AudienceFriendType>>(
    tempSelectedAudienceOption === AudienceOptions.Custom
      ? selectedAudienceExclude
      : new Map(),
  );

  const handleSaveAudienceCustom = (
    audienceInclude: Map<number, AudienceFriendType>,
    audienceExclude: Map<number, AudienceFriendType>,
  ) => {
    setTempSelectedAudienceIncludeCustom(audienceInclude);
    setTempSelectedAudienceExcludeCustom(audienceExclude);
    setSelectedAudienceSelectorMode(AudienceSelectorModeEnum.MAIN);
  };

  const handleClickDone = () => {
    if (tempSelectedAudienceOption === AudienceOptions.SpecificFriends) {
      setSelectedAudienceInclude(tempSelectedAudienceInclude);
      setSelectedAudienceExclude(new Map());
    } else if (tempSelectedAudienceOption === AudienceOptions.FriendsExcept) {
      setSelectedAudienceInclude(new Map());
      setSelectedAudienceExclude(tempSelectedAudienceExclude);
    } else if (tempSelectedAudienceOption === AudienceOptions.Custom) {
      setSelectedAudienceInclude(tempSelectedAudienceIncludeCustom);
      setSelectedAudienceExclude(tempSelectedAudienceExcludeCustom);
    } else {
      setSelectedAudienceInclude(new Map());
      setSelectedAudienceExclude(new Map());
    }
    setSelectedAudienceOption(tempSelectedAudienceOption);
    handleModeType(ModeTypes.PostingMode);
  };

  return (
    <div>
      {/* Main Menu Option Audience Type */}
      {selectedAudieneSelectorMode === AudienceSelectorModeEnum.MAIN && (
        <div className={`flex h-auto w-[500px] flex-col rounded-lg bg-white`}>
          {/* Header */}
          <div className="relative mb-5 flex h-[60px] items-center justify-center overflow-hidden border-b border-b-gray-300">
            <h3 className="flex flex-1 items-center justify-center text-lg font-bold">
              Post Audience
            </h3>
            <ArrowLeftIcon
              onClick={() => handleModeType(ModeTypes.PostingMode)}
              className="absolute left-3 h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
            />
          </div>
          {/* Content */}

          <div className="h-[315px] overflow-y-scroll px-3">
            <div className="mb-2 text-justify">
              <p className="font-semibold">Who can see your post?</p>
              <span className="text-sm text-gray-500">
                <p>
                  Your post will show up in Feed, on your profile and in search
                  results.
                </p>
                <br />
                <p>
                  Your default audience is set to Only me, but you can change
                  the audience of this specific post.
                </p>
              </span>
            </div>
            <ul className="mb-5">
              {audienceOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setSelectedAudienceSelectorMode(
                      option.changeToAudienceSelector,
                    );
                    setTempSelectedAudienceOption(option.value);
                  }}
                >
                  <label className="group flex cursor-pointer items-center rounded py-2">
                    <div className="flex flex-1 items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 group-hover:bg-gray-300">
                        {option.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-md font-semibold">{option.label}</p>
                        {option.description && (
                          <p className="text-sm text-gray-500">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="audience"
                      value={option.value}
                      checked={tempSelectedAudienceOption === option.value}
                      onChange={() =>
                        setTempSelectedAudienceOption(option.value)
                      }
                      className="form-radio h-6 w-6 text-blue-600"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {/* Footer */}
          <div className="flex h-[100px] flex-col justify-center border-t border-t-gray-200 px-3">
            <div className="flex flex-1 items-center">
              <input
                type="checkbox"
                id="default"
                className="form-checkbox h-6 w-6 text-blue-600"
              />
              <label htmlFor="default" className="ml-2 text-sm">
                Set as default audience
              </label>
            </div>
            <div className="flex flex-1 justify-end font-semibold">
              <button
                onClick={() => handleModeType(ModeTypes.PostingMode)}
                className="roundedpx-6 mr-3 h-fit rounded-md px-3 py-2 text-blue-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleClickDone}
                className="h-fit rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAudieneSelectorMode ===
        AudienceSelectorModeEnum.FRIENDS_EXCEPT && (
        <AudienceSelectorIncludeExclude
          title="Friends Except..."
          IconSelected={
            <MinusCircleIconSolid className="h-8 w-8 text-[#ED353B]" />
          }
          IconUnselected={
            <MinusCircleIconOutline className="h-8 w-8 text-gray-400 group-hover:text-[#ED353B]" />
          }
          explanation="Friends who won't see your post"
          mode={IncludeOrExcludeAudienceSelectorModeEnum.FRIENDS_EXCEPT}
          tempSelectedAudienceInclude={tempSelectedAudienceInclude}
          tempSelectedAudienceExclude={tempSelectedAudienceExclude}
          setTempSelectedAudienceInclude={setTempSelectedAudienceInclude}
          setTempSelectedAudienceExclude={setTempSelectedAudienceExclude}
          setSelectedAudienceSelectorMode={setSelectedAudienceSelectorMode}
        />
      )}

      {selectedAudieneSelectorMode ===
        AudienceSelectorModeEnum.SPECIFIC_FRIENDS && (
        <AudienceSelectorIncludeExclude
          title="Specific Friends"
          IconSelected={
            <CheckCircleIconSolid className="h-8 w-8 text-[#1771E6]" />
          }
          IconUnselected={
            <CheckCircleIconOutline className="h-8 w-8 text-gray-400 group-hover:text-[#1771E6]" />
          }
          explanation="Friends who will see your post"
          mode={IncludeOrExcludeAudienceSelectorModeEnum.SPECIFIC_FRIENDS}
          tempSelectedAudienceInclude={tempSelectedAudienceInclude}
          tempSelectedAudienceExclude={tempSelectedAudienceExclude}
          setTempSelectedAudienceInclude={setTempSelectedAudienceInclude}
          setTempSelectedAudienceExclude={setTempSelectedAudienceExclude}
          setSelectedAudienceSelectorMode={setSelectedAudienceSelectorMode}
        />
      )}

      {selectedAudieneSelectorMode === AudienceSelectorModeEnum.CUSTOM && (
        <AudienceSelectorCustom
          title="Custom privacy"
          tempSelectedAudienceIncludeCustom={tempSelectedAudienceIncludeCustom}
          tempSelectedAudienceExcludeCustom={tempSelectedAudienceExcludeCustom}
          setSelectedAudienceSelectorMode={setSelectedAudienceSelectorMode}
          handleSaveAudienceCustom={handleSaveAudienceCustom}
        />
      )}
    </div>
  );
}
