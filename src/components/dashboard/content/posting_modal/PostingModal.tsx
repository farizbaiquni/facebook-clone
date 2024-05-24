import { useRef, useState } from "react";
import "../../../../app/./scrollbar.css";
import PostingMode from "./modes/PostingMode";
import EditPhotoMode from "./modes/EditPhotoMode";
import { ModalType } from "@/types/ModalType";
import { AudienceOptions } from "@/types/AudienceOptions";
import AudienceMode from "./modes/AudienceMode";

type PostingModalProps = {
  isPostingModalOpen: boolean;
  closePostingModal: () => void;
};

const PostingModal = ({
  isPostingModalOpen,
  closePostingModal,
}: PostingModalProps) => {
  const [modalType, setModalType] = useState(ModalType.PostingMode);
  const [isUploadModeActive, setIsUploadModeActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("Fariz");
  const [fullName, setfullName] = useState("Fariz Baiquni");
  const [selectedAudienceOption, setSelectedAudienceOption] = useState(
    AudienceOptions.Public,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isPostingModalOpen) return null;

  const handlePhotoUploadClick = () => {
    setIsUploadModeActive(true);
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

  const handleModalType = (type: ModalType) => {
    setModalType(type);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      {modalType === ModalType.PostingMode && (
        <PostingMode
          closePostingModal={closePostingModal}
          handleModalType={handleModalType}
          isUploadModeActive={isUploadModeActive}
          firstName={firstName}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
          handleFilesUpload={handleFilesUpload}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          setIsUploadModeActive={setIsUploadModeActive}
          handlePhotoUploadClick={handlePhotoUploadClick}
          fullName={fullName}
          selectedAudienceOption={selectedAudienceOption}
        />
      )}
      {modalType === ModalType.EditPhotoMode && (
        <EditPhotoMode
          uploadedImages={uploadedImages}
          handleModalType={handleModalType}
          handleDeleteImage={handleDeleteImage}
          handleFilesUpload={handleFilesUpload}
        />
      )}
      {modalType === ModalType.AudienceMode && (
        <AudienceMode
          uploadedImages={uploadedImages}
          handleModalType={handleModalType}
          selectedAudienceOption={selectedAudienceOption}
          setSelectedAudienceOption={setSelectedAudienceOption}
        />
      )}
    </div>
  );
};

export default PostingModal;
