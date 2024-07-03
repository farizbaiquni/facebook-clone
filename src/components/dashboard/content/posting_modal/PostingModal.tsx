import "../../../../app/./scrollbar.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PostingMode from "./modes/PostingMode";
import EditPhotoMode from "./modes/EditPhotoMode";
import AudienceMode from "./modes/AudienceMode";
import TagPeopleMode from "./modes/TagPeopleMode";
import FeelingActivityMode from "./modes/FeelingActivityMode";
import LocationMode from "./modes/LocationMode";
import GifMode from "./modes/GifMode";
import { MediaImageVideoEnum, MediaImageVideoType } from "@/types/mediaPost";
import { AudienceFriendType, AudienceOptions } from "@/types/audiences";
import { FriendTagPeople } from "@/types/entityObjects";
import { FeelingType } from "@/types/feelings";
import { SubActivityType } from "@/types/activities";
import { LocationType } from "@/types/locations";
import { ModeTypes } from "@/types/modes";
import { GifType } from "@/types/gifs";
import { UserType } from "@/types/users";
import { PostType } from "@/types/post";
import AlertMessageTopRight from "@/components/AlertMessageTopRight";

type PostingModalProps = {
  user: UserType;
  isPostingModalOpen: boolean;
  closePostingModal: () => void;
  setIsPostingModalOpen: (param: boolean) => void;
  addNewAuthUserPosts: (param: PostType) => void;
};

const PostingModal = ({
  user,
  isPostingModalOpen,
  closePostingModal,
  setIsPostingModalOpen,
  addNewAuthUserPosts,
}: PostingModalProps) => {
  const [selectedModeType, setSelectedModeType] = useState(ModeTypes.PostingMode);

  const [contentText, setcontentText] = useState("");
  const [isUploadModeActive, setIsUploadModeActive] = useState(false);
  const [imagesVideos, setImagesVideos] = useState<MediaImageVideoType[]>([]);
  const [selectedGif, setSelectedGif] = useState<GifType | null>(null);
  const [selectedAudienceOption, setSelectedAudienceOption] = useState(AudienceOptions.Public);

  const [selectedAudienceInclude, setSelectedAudienceInclude] = useState<
    Map<number, AudienceFriendType>
  >(new Map());
  const [selectedAudienceExclude, setSelectedAudienceExclude] = useState<
    Map<number, AudienceFriendType>
  >(new Map());

  const [taggedFriends, setTaggedFriends] = useState<Map<number, FriendTagPeople>>(new Map());
  const [selectedFeelingActivity, setSelectedFeelingActivity] = useState<
    FeelingType | SubActivityType | null
  >(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);

  const handleClearAllInput = () => {
    setImagesVideos([]);
    setSelectedGif(null);
    setSelectedAudienceInclude(new Map());
    setSelectedAudienceExclude(new Map());
    setTaggedFriends(new Map());
    setSelectedFeelingActivity(null);
    setSelectedLocation(null);
    setIsPostingModalOpen(false);
  };

  const handleClickUploadModeActive = (param: boolean) => {
    setIsUploadModeActive(param);
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

  const handleDeleteImageVideo = (index: number) => {
    const newImagesVideos = [...imagesVideos];
    newImagesVideos.splice(index, 1);
    setImagesVideos(newImagesVideos);
  };

  const createThumbnail = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      const videoElement = document.createElement("video");
      videoElement.src = url;
      videoElement.addEventListener("loadeddata", () => {
        videoElement.currentTime = 1;
      });
      videoElement.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL();
          resolve(thumbnailUrl);
        }
      });
    });
  };

  const handleFilesUpload = async (files: FileList) => {
    const isVideoFile = (file: File) => {
      return file.type.startsWith("video/");
    };

    const newImagesVideos = Array.from(files).map((file) => {
      const id = uuidv4();
      const imageVideo: MediaImageVideoType = {
        id: id,
        file: file,
        downloadUrl: null,
        type: isVideoFile(file) ? MediaImageVideoEnum.VIDEO : MediaImageVideoEnum.IMAGE,
        url: URL.createObjectURL(file),
        urlObject: URL.createObjectURL(file),
      };
      return imageVideo;
    });

    if (newImagesVideos) {
      const thumbnailPromises = newImagesVideos.map((file) => {
        if (file.type === MediaImageVideoEnum.VIDEO) {
          return createThumbnail(file.url).then((thumbnail) => {
            URL.revokeObjectURL(file.url);
            return {
              ...file,
              url: thumbnail,
            };
          });
        } else {
          return Promise.resolve(file);
        }
      });

      const updatedFiles = await Promise.all(thumbnailPromises);
      setImagesVideos((prevState) => [...prevState, ...updatedFiles]);
    }
  };

  if (!isPostingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      {/* Posting Mode */}
      {selectedModeType === ModeTypes.PostingMode && (
        <PostingMode
          user={user}
          contentText={contentText}
          imagesVideos={imagesVideos}
          selectedFeelingActivity={selectedFeelingActivity}
          selectedGif={selectedGif}
          selectedLocation={selectedLocation}
          selectedAudienceOption={selectedAudienceOption}
          taggedFriends={taggedFriends}
          isUploadModeActive={isUploadModeActive}
          setcontentText={setcontentText}
          setIsUploadModeActive={setIsUploadModeActive}
          setImagesVideos={setImagesVideos}
          setSelectedLocation={setSelectedLocation}
          setSelectedGif={setSelectedGif}
          selectedAudienceInclude={Array.from(selectedAudienceInclude.keys())}
          selectedAudienceExclude={Array.from(selectedAudienceExclude.keys())}
          closePostingModal={closePostingModal}
          handleModeType={handleModeType}
          handleFilesUpload={handleFilesUpload}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleClickUploadModeActive={handleClickUploadModeActive}
          handleClearAllInput={handleClearAllInput}
          addNewAuthUserPosts={addNewAuthUserPosts}
        />
      )}

      {/* Edit Photo Mode */}
      {selectedModeType === ModeTypes.EditPhotoMode && (
        <EditPhotoMode
          imagesVideos={imagesVideos}
          handleModeType={handleModeType}
          handleDeleteImageVideo={handleDeleteImageVideo}
          handleFilesUpload={handleFilesUpload}
        />
      )}

      {/* Audience Mode */}
      {selectedModeType === ModeTypes.AudienceMode && (
        <AudienceMode
          handleModeType={handleModeType}
          selectedAudienceOption={selectedAudienceOption}
          selectedAudienceInclude={selectedAudienceInclude}
          selectedAudienceExclude={selectedAudienceExclude}
          setSelectedAudienceOption={setSelectedAudienceOption}
          setSelectedAudienceInclude={setSelectedAudienceInclude}
          setSelectedAudienceExclude={setSelectedAudienceExclude}
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
        <GifMode handleModeType={handleModeType} setSelectedGif={setSelectedGif} />
      )}
    </div>
  );
};

export default PostingModal;
