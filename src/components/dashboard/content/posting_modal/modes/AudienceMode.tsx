import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { AudienceOptions } from "@/types/AudienceOptions";
import {
  UserIcon,
  UsersIcon,
  UserGroupIcon,
  UserMinusIcon,
  LockClosedIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { ModalType } from "@/types/ModalType";
import { useState } from "react";

type AudienceModeType = {
  uploadedImages: string[];
  handleModalType: (param: ModalType) => void;
  selectedAudienceOption: AudienceOptions;
  setSelectedAudienceOption: (param: AudienceOptions) => void;
};

export default function AudienceMode({
  uploadedImages,
  handleModalType,
  selectedAudienceOption: selectedAudienceOption,
  setSelectedAudienceOption: setSelectedAudienceOption,
}: AudienceModeType) {
  const audienceOptions = [
    {
      label: "Public",
      value: AudienceOptions.Public,
      description: "Anyone on or off Facebook",
      icon: <UsersIcon className="h-7 w-7 text-gray-800" />,
    },
    {
      label: "Friends",
      value: AudienceOptions.Friends,
      description: "Your friends on Facebook",
      icon: <UserGroupIcon className="h-7 w-7 text-gray-800" />,
    },
    {
      label: "Friends except...",
      value: AudienceOptions.FriendsExcept,
      description: "Friends; Except: Aam Afiyah",
      icon: <UserMinusIcon className="h-7 w-7 text-gray-800" />,
    },
    {
      label: "Specific friends",
      value: AudienceOptions.SpecificFriends,
      description: "Aan Efandri, Aam Afiyah",
      icon: <UserIcon className="h-7 w-7 text-gray-800" />,
    },
    {
      label: "Only me",
      value: AudienceOptions.OnlyMe,
      description: "",
      icon: <LockClosedIcon className="h-7 w-7 text-gray-800" />,
    },
    {
      label: "Custom",
      value: AudienceOptions.Custom,
      description: "Custom settings",
      icon: <CogIcon className="h-7 w-7 text-gray-800" />,
    },
  ];
  const [tempSelectedAudienceOption, setTempSelectedAudienceOption] = useState(
    selectedAudienceOption,
  );
  const handleClickDone = () => {
    setSelectedAudienceOption(tempSelectedAudienceOption);
    handleModalType(ModalType.PostingMode);
  };
  return (
    <div
      className={`flex h-auto flex-col rounded-lg bg-white ${uploadedImages.length <= 2 ? "w-[500px]" : uploadedImages.length <= 4 ? "w-[900px]" : "w-[1227px]"}`}
    >
      {/* Header */}
      <div className="relative mb-5 flex h-[60px] items-center justify-center overflow-hidden border-b border-b-gray-300">
        <h3 className="flex flex-1 items-center justify-center text-lg font-bold">
          Post Audience
        </h3>
        <ArrowLeftIcon
          onClick={() => handleModalType(ModalType.PostingMode)}
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
              Your default audience is set to Only me, but you can change the
              audience of this specific post.
            </p>
          </span>
        </div>
        <ul className="mb-5">
          {audienceOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => setTempSelectedAudienceOption(option.value)}
            >
              <label className="group flex cursor-pointer items-center rounded py-2">
                <div className="flex flex-1 items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 group-hover:bg-gray-300">
                    {option.icon}
                  </div>
                  <div className="ml-3">
                    <p className="text-md font-medium">{option.label}</p>
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
                  onChange={() => setTempSelectedAudienceOption(option.value)}
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
        <div className="flex flex-1 justify-end">
          <button
            onClick={handleClickDone}
            className="h-fit rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Done
          </button>
          <button
            onClick={() => handleModalType(ModalType.PostingMode)}
            className="ml-2 h-fit rounded bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
