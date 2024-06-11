import Image from "next/image";
import { ModeTypes } from "@/types/modes";
import { ArrowLeftIcon, TagIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { MediaImageVideoEnum, MediaImageVideoType } from "@/types/mediaPost";

type EditPhotoModeType = {
  imagesVideos: MediaImageVideoType[];
  handleModeType: (param: ModeTypes) => void;
  handleDeleteImageVideo: (param: number) => void;
  handleFilesUpload: (images: FileList) => void;
};

export default function EditPhotoMode({
  imagesVideos,
  handleModeType,
  handleDeleteImageVideo,
  handleFilesUpload,
}: EditPhotoModeType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClickInputUploadImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div
      className={`flex h-auto flex-col rounded-lg bg-white ${imagesVideos.length <= 2 ? "w-[500px]" : imagesVideos.length <= 4 ? "w-[900px]" : "w-[1227px]"}`}
    >
      {/* Header */}
      <div className="relative mb-5 flex h-[60px] items-center justify-center overflow-hidden border-b border-b-gray-300">
        <h3 className="flex flex-1 items-center justify-center text-lg font-bold">
          Create Post
        </h3>
        <ArrowLeftIcon
          onClick={() => handleModeType(ModeTypes.PostingMode)}
          className="absolute left-3 h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
        />
      </div>
      {/* Content */}
      {imagesVideos.length === 0 && (
        <div className="flex h-[191px] w-full flex-col items-center justify-center">
          <Image
            src={"/icons/postings/null_states_media_gray_wash.svg"}
            width={115}
            height={115}
            alt="add photos/videos"
            className="mb-5 mr-1 text-blue-600"
          />
          <p className="text-gray-500">Start by adding a photo/video</p>
        </div>
      )}
      {imagesVideos.length >= 1 && (
        <div
          className={`relative grid ${imagesVideos.length <= 1 ? "h-[230px] " : "h-[496px]"} gap-2 overflow-y-scroll bg-[#D1D5DB] p-2 ${imagesVideos.length <= 2 ? "grid-cols-1" : imagesVideos.length <= 4 ? "grid-cols-2" : "grid-cols-3"}`}
        >
          {imagesVideos.map((imageVideo, index) => (
            <div
              className={`relative rounded-md bg-white ${imagesVideos.length <= 1 ? "h-[215px]" : "h-[325px]"}`}
              key={index}
            >
              <XMarkIcon
                onClick={() => handleDeleteImageVideo(index)}
                className="absolute right-1 top-1 z-30 h-8 w-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
              />
              <div className="relative h-[193px] overflow-hidden rounded-t-md bg-gray-500">
                <div
                  className="absolute inset-0 bg-cover bg-center blur-md filter"
                  style={{ backgroundImage: `url(${imageVideo})` }}
                ></div>
                <div className="relative flex h-full w-full items-center justify-center">
                  {imageVideo.type === MediaImageVideoEnum.IMAGE ? (
                    <Image
                      width={100}
                      height={100}
                      src={imageVideo.url}
                      alt={`Uploaded ${index}`}
                      className="mx-auto h-full w-auto rounded-bl-md object-contain"
                    />
                  ) : (
                    <video
                      src={imageVideo.urlObject}
                      width="200"
                      onMouseOver={(e) =>
                        (e.currentTarget as HTMLVideoElement).play()
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget as HTMLVideoElement).pause()
                      }
                      controls
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="group absolute bottom-2 left-2 z-30 flex cursor-pointer items-center rounded-full bg-gray-700">
                    <TagIcon
                      onClick={() => handleDeleteImageVideo(index)}
                      className="text-white0 h-6 w-6 rounded-full bg-gray-700 p-1 text-white"
                    />
                    <p className="hidden pr-2 text-xs text-white group-hover:block">
                      Tag people
                    </p>
                  </div>
                </div>
              </div>
              {imagesVideos.length > 1 && (
                <div className="p-2">
                  <textarea
                    className="h-[84px] w-full rounded-lg border border-gray-300 p-3 outline-none ring-blue-600 focus:ring-2"
                    rows={2}
                    placeholder="Caption"
                  ></textarea>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Footer */}
      <div className="flex h-[60px] items-center justify-end border-t border-t-gray-300">
        <div className="flex justify-end">
          <div
            onClick={handleClickInputUploadImages}
            className="flex cursor-pointer items-center"
          >
            <Image
              src={"/icons/postings/add-image-blue.png"}
              width={25}
              height={25}
              alt="add photos/videos"
              className="mr-1 text-blue-600"
            />
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              ref={fileInputRef}
              onChange={(e) => handleFilesUpload(e.target.files!)}
              className="hidden"
            />
            <p className="text-sm font-semibold text-blue-600">
              Add photos/Videos
            </p>
          </div>
          <button
            onClick={() => {
              handleModeType(ModeTypes.PostingMode);
            }}
            className="mx-5 rounded-md bg-blue-600 px-8 py-2 text-sm font-semibold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
