import { Fragment, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import IconButton from "../components/IconButton";
import { ModeTypes } from "@/types/modes";
import UploadImageGrid from "../components/UploadImageGrid";
import AudienceLabel from "../components/AudienceLabel";
import { AudienceOptions } from "@/types/audienceOptions";
import { XMarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { FriendTagPeople } from "@/types/entityObjects";
import { FeelingType } from "@/types/feelings";
import { SubActivityType } from "@/types/activities";
import MapComponent from "../components/MapComponent";
import { LocationType } from "@/types/locations";

type PostingModeType = {
  closePostingModal: () => void;
  handleModeType: (param: ModeTypes) => void;
  isUploadModeActive: boolean;
  firstName: string;
  uploadedImages: string[];
  setUploadedImages: (images: string[]) => void;
  handleFilesUpload: (images: FileList) => void;
  handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  setIsUploadModeActive: (param: boolean) => void;
  fullName: string;
  selectedAudienceOption: AudienceOptions;
  handleClickUploadModeActive: (param: boolean) => void;
  taggedFriends: Map<number, FriendTagPeople>;
  selectedFeelingActivity: null | FeelingType | SubActivityType;
  selectedLocation: LocationType | null;
  setSelectedLocation: (param: LocationType | null) => void;
};

export default function PostingMode({
  closePostingModal,
  handleModeType,
  isUploadModeActive,
  firstName,
  uploadedImages,
  setUploadedImages,
  handleFilesUpload,
  handleDragOver,
  handleDrop,
  setIsUploadModeActive,
  fullName,
  selectedAudienceOption: audienceType,
  handleClickUploadModeActive,
  taggedFriends,
  selectedFeelingActivity,
  selectedLocation,
  setSelectedLocation,
}: PostingModeType) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const DynamicMapComponent = dynamic(
    () => import("../components/MapComponent"),
    {
      ssr: false,
    },
  );

  function isFeelingType(activity: any): activity is FeelingType {
    return (activity as FeelingType).feelingIcon !== undefined;
  }

  function isSubActivityType(activity: any): activity is SubActivityType {
    return (activity as SubActivityType).activityIcon !== undefined;
  }

  return (
    <div className={`flex h-auto w-[500px] flex-col rounded-lg bg-white p-4`}>
      {/* Header */}
      <div className="flex justify-between">
        <h3 className="flex flex-1 items-center justify-center text-lg font-bold">
          Create Post
        </h3>
        <XMarkIcon
          onClick={closePostingModal}
          className="h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
        />
      </div>

      <hr className="my-3" />

      {/* Profile */}
      <div className="mx-2 flex items-center py-2">
        <div className="min-w-max">
          <Image
            src="/profile.jpg"
            width={100}
            height={100}
            alt="profile-picture"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <div className="ml-3 flex flex-col">
          <div className="flex flex-wrap gap-x-1 font-semibold">
            <p>{fullName}</p>
            {(selectedFeelingActivity !== null ||
              taggedFriends.size > 0 ||
              selectedLocation !== null) && <p>is</p>}
            {selectedFeelingActivity !== null &&
              (isFeelingType(selectedFeelingActivity) ? (
                <Fragment>
                  <p>{selectedFeelingActivity.feelingIcon}</p>
                  <p>feeling</p>
                  <p>{selectedFeelingActivity.label}</p>
                </Fragment>
              ) : (
                isSubActivityType(selectedFeelingActivity) && (
                  <Fragment>
                    <Image
                      width={17}
                      height={17}
                      alt={selectedFeelingActivity.label}
                      src={selectedFeelingActivity.activityIcon}
                      className="object-contain"
                    />
                    <p>celebrating </p>
                    <p>{selectedFeelingActivity.label}</p>
                  </Fragment>
                )
              ))}
            {taggedFriends.size >= 1 && (
              <Fragment>
                <p>with</p>
                {Array.from(taggedFriends)
                  .slice(0, 3)
                  .map(([id, taggedFriend], index) => (
                    <p
                      key={taggedFriend.id}
                      className="cursor-pointer hover:underline"
                    >
                      {taggedFriend.name},{" "}
                    </p>
                  ))}
              </Fragment>
            )}
            {selectedLocation !== null && (
              <Fragment>
                <p>{selectedFeelingActivity !== null ? "at" : "in"}</p>
                <p className="cursor-pointer hover:underline">
                  {selectedLocation.display_name}
                </p>
              </Fragment>
            )}
            {taggedFriends.size > 3 && (
              <p className="cursor-pointer hover:underline">
                and {taggedFriends.size - 3}{" "}
                {taggedFriends.size > 4 ? "others" : "other"}
              </p>
            )}
          </div>
          <div
            onClick={() => handleModeType(ModeTypes.AudienceMode)}
            className="mt-1 flex w-fit cursor-pointer items-center rounded-md bg-gray-200 px-1 py-1"
          >
            <AudienceLabel selectedAudienceOption={audienceType} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="custom-scrollbar flex max-h-[350px] w-full flex-col overflow-y-auto">
        <div className="h-full w-full">
          <textarea
            className={`h-full w-full rounded-lg p-3 ${isUploadModeActive || selectedLocation !== null ? "text-md" : "text-2xl"} outline-none`}
            rows={isUploadModeActive || selectedLocation !== null ? 2 : 4}
            placeholder={`What's on your mind, ${firstName}?`}
          ></textarea>
        </div>

        {isUploadModeActive && (
          <div className="my-2 items-center justify-center border-2 border-gray-200 p-2">
            {uploadedImages.length > 0 ? (
              <UploadImageGrid
                images={uploadedImages}
                clearImages={() => setUploadedImages([])}
                handleModeType={handleModeType}
                handleFilesUpload={handleFilesUpload}
              />
            ) : (
              <div className="relative w-full">
                <label
                  htmlFor="file-upload"
                  className="flex h-56 w-full flex-col items-center justify-center rounded-md "
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-md hover:bg-gray-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 p-2">
                      <Image
                        src="/icons/postings/add-image.png"
                        width={25}
                        height={25}
                        alt="Add Photos/Videos"
                      />
                    </div>
                    <span className="mt-2 font-semibold text-gray-800">
                      Add Photos/Videos
                    </span>
                    <span className="text-xs text-gray-500">
                      or drag and drop
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      multiple
                      onChange={(e) => handleFilesUpload(e.target.files!)}
                    />
                  </div>
                  <div className="my-3 flex w-full items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 p-2">
                      <Image
                        src="/icons/postings/phone.png"
                        width={25}
                        height={25}
                        alt="Add Photos/Videos"
                      />
                    </div>
                    <p className="px-4 text-xs">
                      Add photos and videos from your mobile device.
                    </p>
                    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-200 px-5 py-1 hover:bg-gray-300 ">
                      <p className="text-sm">Add</p>
                    </div>
                  </div>
                </label>
                <div className="absolute right-2 top-2 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
                  <XMarkIcon
                    onClick={() => setIsUploadModeActive(false)}
                    className=""
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {selectedLocation !== null &&
          !isUploadModeActive &&
          uploadedImages.length <= 0 && (
            <DynamicMapComponent
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          )}
      </div>

      {/* Footer */}
      <div className="flex flex-col">
        <div className="my-2 flex items-center justify-between rounded-md border-2 border-gray-200 px-4 py-2">
          <p className="cursor-pointer text-sm font-semibold">
            Add to your post
          </p>
          <div className="flex items-center">
            <IconButton
              src="/icons/postings/add-photo-video.png"
              alt="Photo or Video"
              label="Photo/video"
              handleClickUploadModeActive={handleClickUploadModeActive}
              modeType={ModeTypes.PostingMode}
              handleModeType={handleModeType}
              style={`${uploadedImages.length > 0 && "bg-[#D8E4CA]"}`}
            />
            <IconButton
              src="/icons/postings/tag.png"
              alt="Tag"
              label="Tag people"
              modeType={ModeTypes.TagPeopleMode}
              handleModeType={handleModeType}
              style={`${taggedFriends.size > 0 && "bg-[#C0E2EC]"}`}
            />
            <IconButton
              src="/icons/postings/feeling-activity.png"
              alt="Feeling"
              label="Feeling/activity"
              modeType={ModeTypes.FeelingActivityMode}
              handleModeType={handleModeType}
              style={`${selectedFeelingActivity !== null && "bg-[#F1E6C6]"}`}
            />
            <IconButton
              src="/icons/postings/location.png"
              alt="Location"
              label="Check in"
              modeType={ModeTypes.LocationMode}
              handleModeType={handleModeType}
              style={`${selectedLocation !== null && "bg-[#EEC2C7]"}`}
            />
            <IconButton
              src="/icons/postings/gif.png"
              alt="GIF"
              label="GIF"
              modeType={ModeTypes.GIFMode}
              handleModeType={handleModeType}
              style={`${selectedFeelingActivity !== null && "bg-[#C7E4DE]"}`}
            />
            <div className="group relative ml-2 flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-300">
              <EllipsisHorizontalIcon className="h-7 w-7 text-gray-500" />
              <p className="absolute bottom-11 hidden whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover:block">
                More
              </p>
            </div>
          </div>
        </div>
        <button className="mt-2 rounded bg-[#0861F2] px-4 py-2 text-sm font-semibold text-white">
          Post
        </button>
      </div>
    </div>
  );
}
