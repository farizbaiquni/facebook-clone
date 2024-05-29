import { useState } from "react";
import "../../../../app/./scrollbar.css";
import PostingMode from "./modes/PostingMode";
import EditPhotoMode from "./modes/EditPhotoMode";
import AudienceMode from "./modes/AudienceMode";
import TagPeopleMode from "./modes/TagPeopleMode";
import FeelingActivityMode from "./modes/FeelingActivityMode";
import { ModeTypes } from "@/types/modes";
import { AudienceOptions } from "@/types/audienceOptions";
import { FriendTagPeople } from "@/types/entityObjects";
import { FeelingType } from "@/types/feelings";
import { SubActivityType } from "@/types/activities";
import { LocationType } from "@/types/locations";
import LocationMode from "./modes/LocationMode";
import GifMode from "./modes/GifMode";
import { GifType } from "@/types/gifs";

type PostingModalProps = {
  isPostingModalOpen: boolean;
  closePostingModal: () => void;
};

const PostingModal = ({
  isPostingModalOpen,
  closePostingModal,
}: PostingModalProps) => {
  const [selectedModeType, setSelectedModeType] = useState(
    ModeTypes.PostingMode,
  );

  const [isUploadModeActive, setIsUploadModeActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("Fariz");
  const [fullName, setfullName] = useState("Fariz Baiquni");
  const [selectedAudienceOption, setSelectedAudienceOption] = useState(
    AudienceOptions.Public,
  );

  const [taggedFriends, setTaggedFriends] = useState<
    Map<number, FriendTagPeople>
  >(new Map());
  const [selectedFeelingActivity, setSelectedFeelingActivity] = useState<
    FeelingType | SubActivityType | null
  >(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null,
  );

  const [selectedGif, setSelectedGif] = useState<GifType | null>(null);

  if (!isPostingModalOpen) return null;

  const handleClickUploadModeActive = (param: boolean) => {
    setIsUploadModeActive(param);
  };

  const handleFilesUpload = (files: FileList) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleFilesUpload(files);
  };

  const handleModeType = (type: ModeTypes) => {
    setSelectedModeType(type);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      {/* Posting Mode */}
      {selectedModeType === ModeTypes.PostingMode && (
        <PostingMode
          closePostingModal={closePostingModal}
          handleModeType={handleModeType}
          isUploadModeActive={isUploadModeActive}
          firstName={firstName}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
          handleFilesUpload={handleFilesUpload}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          setIsUploadModeActive={setIsUploadModeActive}
          fullName={fullName}
          selectedAudienceOption={selectedAudienceOption}
          handleClickUploadModeActive={handleClickUploadModeActive}
          taggedFriends={taggedFriends}
          selectedFeelingActivity={selectedFeelingActivity}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedGif={selectedGif}
          setSelectedGif={setSelectedGif}
        />
      )}

      {/* Edit Photo Mode */}
      {selectedModeType === ModeTypes.EditPhotoMode && (
        <EditPhotoMode
          uploadedImages={uploadedImages}
          handleModeType={handleModeType}
          handleDeleteImage={handleDeleteImage}
          handleFilesUpload={handleFilesUpload}
        />
      )}

      {/* Audience Mode */}
      {selectedModeType === ModeTypes.AudienceMode && (
        <AudienceMode
          uploadedImages={uploadedImages}
          handleModeType={handleModeType}
          selectedAudienceOption={selectedAudienceOption}
          setSelectedAudienceOption={setSelectedAudienceOption}
        />
      )}

      {/* Tag People Mode */}
      {selectedModeType === ModeTypes.TagPeopleMode && (
        <TagPeopleMode
          handleModeType={handleModeType}
          taggedFriends={taggedFriends}
          setTaggedFriends={setTaggedFriends}
        />
      )}

      {/* Feeling / Activity Mode */}
      {selectedModeType === ModeTypes.FeelingActivityMode && (
        <FeelingActivityMode
          handleModeType={handleModeType}
          setSelectedFeelingActivity={setSelectedFeelingActivity}
        />
      )}

      {/* Location */}
      {selectedModeType === ModeTypes.LocationMode && (
        <LocationMode
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          handleModeType={handleModeType}
        />
      )}

      {/* Gif */}
      {selectedModeType === ModeTypes.GIFMode && (
        <GifMode
          handleModeType={handleModeType}
          setSelectedGif={setSelectedGif}
        />
      )}
    </div>
  );
};

export default PostingModal;
