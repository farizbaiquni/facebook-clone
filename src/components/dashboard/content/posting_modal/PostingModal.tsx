import { useRef, useState } from "react";
import "../../../../app/./scrollbar.css";
import PostingMode from "./PostingMode";
import EditPhotoMode from "./EditPhotoMode";
import { ModalType } from "@/types/ModalType";
import { AudienceOptions } from "@/types/AudienceOptions";
import AudienceMode from "./AudienceMode";

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
  const [firstName, setFirstName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedOption, setSelectedOption] = useState<AudienceOptions>(
    AudienceOptions.OnlyMe,
  );

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

  const handleClickInputUploadImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
        />
      )}
      {modalType === ModalType.EditPhotoMode && (
        <EditPhotoMode
          uploadedImages={uploadedImages}
          handleModalType={handleModalType}
          handleDeleteImage={handleDeleteImage}
          handleFilesUpload={handleFilesUpload}
          handleClickInputUploadImages={handleClickInputUploadImages}
        />
      )}
      {modalType === ModalType.AudienceMode && (
        <AudienceMode
          uploadedImages={uploadedImages}
          handleModalType={handleModalType}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
    </div>
  );
};

export default PostingModal;
