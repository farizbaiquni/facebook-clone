import { Fragment, useRef } from "react";
import { ModeTypes } from "@/types/modes";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MediaImageVideoEnum, MediaImageVideoType } from "@/types/mediaPost";

type SelectedImagesVideosGridType = {
  imagesVideos: MediaImageVideoType[];
  clearImages: () => void;
  handleModeType: (value: ModeTypes) => void;
  handleFilesUpload: (files: FileList) => void;
};

const SelectedImagesVideosGrid = ({
  imagesVideos,
  clearImages,
  handleModeType,
  handleFilesUpload,
}: SelectedImagesVideosGridType) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickInputUploadImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFilesUpload(files);
    }
  };

  const renderEditButtons = () => (
    <Fragment>
      <div className="absolute inset-0 z-10 rounded-md bg-black opacity-0 transition-opacity group-hover:opacity-20"></div>
      <div className="absolute left-2 top-2 z-20 hidden group-hover:flex">
        <button
          onClick={() => handleModeType(ModeTypes.EditPhotoMode)}
          className="mr-2 flex cursor-pointer items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-300"
        >
          <Image
            src="/icons/postings/edit.png"
            alt="Edit all"
            width={15}
            height={15}
            className="mr-2 rounded-br-md object-contain"
          />
          Edit all
        </button>
        <button
          onClick={handleClickInputUploadImages}
          className="mr-2 flex cursor-pointer items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-300"
        >
          <Image
            src="/icons/postings/add-image.png"
            alt="Add photos/videos"
            width={15}
            height={15}
            className="mr-2 rounded-br-md object-contain"
          />
          Add photos/videos
        </button>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </Fragment>
  );

  const renderImage = (src: string, className: string) => (
    <Image
      src={src}
      alt="Uploaded image"
      layout="fill"
      className={`${className} object-cover`}
    />
  );

  const renderPlayVideo = (isVideo: boolean) => (
    <div
      className={`absolute flex h-full w-full items-center justify-center bg-black bg-opacity-25 ${isVideo ? "block" : "hidden"}`}
    >
      <div className="z-40 cursor-pointer text-gray-500">
        <Image
          alt="play-video"
          width={70}
          height={70}
          src="/icons/postings/play-video.png"
        />
      </div>
    </div>
  );

  const renderClearAllXMark = () => (
    <div className="absolute right-2 top-2 z-30 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
      <XMarkIcon onClick={clearImages} />
    </div>
  );

  const renderImageGrid = () => {
    switch (imagesVideos.length) {
      case 1:
        return (
          <div className="group relative col-span-1 row-span-1 h-[400px] w-full">
            {renderEditButtons()}
            {renderImage(imagesVideos[0].url, "rounded-md")}
            {renderClearAllXMark()}
            {renderPlayVideo(
              imagesVideos[0].type === MediaImageVideoEnum.VIDEO,
            )}
          </div>
        );
      case 2:
        return (
          <div className="group relative grid h-[400px] grid-cols-2 gap-1">
            {renderEditButtons()}
            {imagesVideos.map((src, index) => (
              <div key={src.id} className="relative h-full w-full">
                {renderImage(
                  src.url,
                  index === 0
                    ? "rounded-bl-md rounded-tl-md"
                    : "rounded-br-md rounded-tr-md",
                )}
                {renderPlayVideo(
                  imagesVideos[index].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
            ))}
            <div className="absolute right-2 top-2 z-30 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
              <XMarkIcon onClick={clearImages} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="group relative grid grid-cols-[60%_40%] gap-1">
            {renderEditButtons()}
            {imagesVideos.map((src, index) => (
              <div
                key={src.id}
                className={`relative w-full ${index === 0 ? "row-span-2 h-full " : "h-48"}`}
              >
                {renderImage(
                  src.url,
                  index === 0
                    ? "rounded-bl-md rounded-tl-md"
                    : index === 1
                      ? "rounded-tr-md"
                      : "rounded-br-md",
                )}
                {renderPlayVideo(
                  imagesVideos[index].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
            ))}
            {renderClearAllXMark()}
          </div>
        );
      case 4:
        return (
          <div className="group relative grid grid-cols-[65%_35%] gap-1">
            {renderEditButtons()}
            {imagesVideos.map((src, index) => (
              <div
                key={src.id}
                className={`relative w-full ${index === 0 && "row-span-3 h-full"} ${index === 1 && "h-48"} ${index === 2 && "h-48"} ${index === 3 && "h-48"}`}
              >
                {renderImage(
                  src.url,
                  `${index === 0 && "rounded-bl-md rounded-tl-md"} ${index === 1 && "rounded-tr-md"} ${index === 3 && "rounded-br-md"}`,
                )}
                {renderPlayVideo(
                  imagesVideos[index].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
            ))}
            {renderClearAllXMark()}
          </div>
        );
      default:
        return (
          <div className="group relative grid grid-cols-3 gap-1">
            {renderEditButtons()}
            <div className="col-span-3 grid grid-cols-2 gap-1">
              <div className="relative z-0 h-48 w-full">
                {renderImage(
                  imagesVideos[0].url,
                  "rounded-bl-md rounded-tl-md",
                )}
                {renderPlayVideo(
                  imagesVideos[0].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
              <div className="relative z-0 h-48 w-full">
                {renderImage(
                  imagesVideos[1].url,
                  "rounded-br-md rounded-tr-md",
                )}
                {renderPlayVideo(
                  imagesVideos[1].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-1">
              <div className="relative z-0 h-32 w-full">
                {renderImage(imagesVideos[2].url, "rounded-bl-md")}
                {renderPlayVideo(
                  imagesVideos[2].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
              <div className="relative z-0 h-32 w-full">
                {renderImage(imagesVideos[3].url, "")}
                {renderPlayVideo(
                  imagesVideos[3].type === MediaImageVideoEnum.VIDEO,
                )}
              </div>
              <div className="relative z-0 h-32 w-full">
                {renderImage(imagesVideos[4].url, "rounded-br-md")}
                {renderPlayVideo(
                  imagesVideos[4].type === MediaImageVideoEnum.VIDEO,
                )}
                {imagesVideos.length > 5 && (
                  <Fragment>
                    <div className="absolute z-10 h-full w-full rounded-br-md bg-black opacity-30"></div>
                    <p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-semibold text-gray-100">
                      +{imagesVideos.length - 5}
                    </p>
                  </Fragment>
                )}
              </div>
            </div>
            {renderClearAllXMark()}
          </div>
        );
    }
  };

  return renderImageGrid();
};

export default SelectedImagesVideosGrid;
