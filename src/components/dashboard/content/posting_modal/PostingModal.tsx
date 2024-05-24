import { useRef, useState } from "react";
import "../../../../app/./scrollbar.css";
import PostingMode from "./modes/PostingMode";
import EditPhotoMode from "./modes/EditPhotoMode";
import { ModeTypes } from "@/types/ModeTypes";
import { AudienceOptions } from "@/types/AudienceOptions";
import AudienceMode from "./modes/AudienceMode";
import TagPeopleMode from "./modes/TagPeopleMode";
import { FriendTagPeople } from "@/types/EntityObjects";

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
        />
      )}
      {selectedModeType === ModeTypes.EditPhotoMode && (
        <EditPhotoMode
          uploadedImages={uploadedImages}
          handleModeType={handleModeType}
          handleDeleteImage={handleDeleteImage}
          handleFilesUpload={handleFilesUpload}
        />
      )}
      {selectedModeType === ModeTypes.AudienceMode && (
        <AudienceMode
          uploadedImages={uploadedImages}
          handleModeType={handleModeType}
          selectedAudienceOption={selectedAudienceOption}
          setSelectedAudienceOption={setSelectedAudienceOption}
        />
      )}
      {selectedModeType === ModeTypes.TagPeople && (
        <TagPeopleMode
          handleModeType={handleModeType}
          taggedFriends={taggedFriends}
          setTaggedFriends={setTaggedFriends}
        />
      )}
    </div>
  );
};

export default PostingModal;
