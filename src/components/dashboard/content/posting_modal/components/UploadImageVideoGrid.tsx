import { Fragment, useRef } from "react";
import { ModeTypes } from "@/types/modes";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MediaImageVideoType } from "@/types/mediaPost";

type UploadImageGridType = {
  images: MediaImageVideoType[];
  clearImages: () => void;
  handleModeType: (value: ModeTypes) => void;
  handleFilesUpload: (files: FileList) => void;
};

const UploadImageGrid = ({
  images,
  clearImages,
  handleModeType,
  handleFilesUpload,
}: UploadImageGridType) => {
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
          accept="image/*"
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

  const renderImageGrid = () => {
    switch (images.length) {
      case 1:
        return (
          <div className="group relative col-span-1 row-span-1 h-[400px] w-full">
            {renderEditButtons()}
            {renderImage(images[0].url, "rounded-md")}
            <div className="absolute right-2 top-2 z-30 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
              <XMarkIcon onClick={clearImages} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="group relative grid h-[400px] grid-cols-2 gap-1">
            {renderEditButtons()}
            {images.map((src, index) => (
              <div key={index} className="relative h-full w-full">
                {renderImage(
                  src.url,
                  index === 0
                    ? "rounded-bl-md rounded-tl-md"
                    : "rounded-br-md rounded-tr-md",
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
            <div className="relative row-span-2 h-full w-full">
              {renderImage(images[0].url, "rounded-bl-md rounded-tl-md")}
            </div>
            <div className="relative h-48 w-full">
              {renderImage(images[1].url, "rounded-tr-md")}
            </div>
            <div className="relative h-48 w-full">
              {renderImage(images[2].url, "rounded-br-md")}
            </div>
            <div className="absolute right-2 top-2 z-30 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
              <XMarkIcon onClick={clearImages} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="group relative grid grid-cols-[65%_35%] gap-1">
            {renderEditButtons()}
            <div className="relative row-span-3 h-full w-full">
              {renderImage(images[0].url, "rounded-bl-md rounded-tl-md")}
            </div>
            <div className="relative h-48 w-full">
              {renderImage(images[1].url, "rounded-tr-md")}
            </div>
            <div className="relative h-48 w-full">
              {renderImage(images[2].url, "rounded-tr-md")}
            </div>
            <div className="relative h-48 w-full">
              {renderImage(images[3].url, "rounded-br-md")}
            </div>
            <div className="absolute right-2 top-2 z-30 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
              <XMarkIcon onClick={clearImages} />
            </div>
          </div>
        );
      default:
        return (
          <div className="group relative grid grid-cols-3 gap-1">
            {renderEditButtons()}
            <div className="col-span-3 grid grid-cols-2 gap-1">
              <div className="relative z-0 h-48 w-full">
                {renderImage(images[0].url, "rounded-bl-md rounded-tl-md")}
              </div>
              <div className="relative z-0 h-48 w-full">
                {renderImage(images[1].url, "rounded-br-md rounded-tr-md")}
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-1">
              <div className="relative z-0 h-32 w-full">
                {renderImage(images[2].url, "rounded-bl-md")}
              </div>
              <div className="relative z-0 h-32 w-full">
                {renderImage(images[3].url, "")}
              </div>
              <div className="relative z-0 h-32 w-full">
                {renderImage(images[4].url, "rounded-br-md")}
                {images.length > 5 && (
                  <Fragment>
                    <div className="absolute z-10 h-full w-full rounded-br-md bg-black opacity-30"></div>
                    <p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-semibold text-gray-100">
                      +{images.length - 5}
                    </p>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="absolute right-2 top-2 z-20 h-8 w-8 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200">
              <XMarkIcon onClick={clearImages} />
            </div>
          </div>
        );
    }
  };

  return renderImageGrid();
};

export default UploadImageGrid;
