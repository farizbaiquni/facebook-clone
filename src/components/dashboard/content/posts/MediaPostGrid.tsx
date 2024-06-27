import { Fragment } from "react";
import Image from "next/image";
import { MediaPostEnum, MediaPostType } from "@/types/mediaPost";

type ImagesGridType = {
  mediaArr: MediaPostType[];
};

const MediaPostGrid = ({ mediaArr }: ImagesGridType) => {
  const renderImage = (src: string, height: string) => (
    <Image
      src={src}
      alt="Uploaded image"
      width={500}
      height={600}
      className={`object-cover ${height}`}
    />
  );
  const renderVideo = (src: string, height: string) => (
    <video className={`w-full object-cover ${height}`} controls>
      <source src={src} type="video/mp4" />
    </video>
  );

  const renderImageGrid = () => {
    switch (mediaArr.length) {
      case 1:
        return (
          <div className="relative flex">
            {mediaArr[0].media_type_id === MediaPostEnum.IMAGE
              ? renderImage(mediaArr[0].media_url, "max-h-[600px]")
              : renderVideo(mediaArr[0].media_url, "max-h-[600px]")}
          </div>
        );
      case 2:
        return (
          <div className="flex gap-x-1">
            {mediaArr.map((media, index) => (
              <div key={index} className="h-full w-full">
                {media.media_type_id === MediaPostEnum.IMAGE
                  ? renderImage(media.media_url, "h-[250px]")
                  : renderVideo(media.media_url, "h-[250px]")}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="flex h-[500px] flex-col gap-y-[2px]">
            {mediaArr[0].media_type_id === MediaPostEnum.IMAGE
              ? renderImage(mediaArr[0].media_url, "h-[249px]")
              : renderVideo(mediaArr[0].media_url, "h-[249px]")}
            <div className="flex gap-x-[2px]">
              {mediaArr[1].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[1].media_url, "h-[249px]")
                : renderVideo(mediaArr[1].media_url, "h-[249px]")}
              {mediaArr[2].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[2].media_url, "h-[249px] w-[250px]")
                : renderVideo(mediaArr[2].media_url, "h-[249px] w-[250px]")}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-[2px]">
            {mediaArr.map((media, index) => (
              <div key={index} className="h-full w-full">
                {media.media_type_id === MediaPostEnum.IMAGE
                  ? renderImage(media.media_url, "h-[249px]")
                  : renderVideo(media.media_url, "h-[249px]")}
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col gap-y-[2px]">
            <div className="grid h-3/5 grid-cols-2 gap-x-[2px]">
              {mediaArr[0].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[0].media_url, "h-[298.8px] w-full")
                : renderVideo(mediaArr[0].media_url, "h-[298.8px] w-full")}
              {mediaArr[1].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[1].media_url, "h-[298.8px] w-full")
                : renderVideo(mediaArr[1].media_url, "h-[298.8px] w-full")}
            </div>
            <div className="grid grid-cols-3 gap-x-[2px]">
              {mediaArr[2].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[2].media_url, "h-[199.2px]")
                : renderVideo(mediaArr[2].media_url, "h-[199.2px]")}
              {mediaArr[3].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[3].media_url, "h-[199.2px]")
                : renderVideo(mediaArr[3].media_url, "h-[199.2px]")}
              {mediaArr[4].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[4].media_url, "h-[199.2px]")
                : renderVideo(mediaArr[4].media_url, "h-[199.2px]")}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-y-[2px]">
            <div className="grid h-3/5 grid-cols-2 gap-x-[2px]">
              {mediaArr[0].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[0].media_url, "h-[298.8px] w-full")
                : renderVideo(mediaArr[0].media_url, "h-[298.8px] w-full")}
              {mediaArr[1].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[1].media_url, "h-[298.8px] w-full")
                : renderVideo(mediaArr[1].media_url, "h-[298.8px] w-full")}
            </div>
            <div className="grid grid-cols-3 gap-x-[2px]">
              {mediaArr[2].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[2].media_url, "h-[199.2px]")
                : renderVideo(mediaArr[2].media_url, "h-[199.2px]")}
              {mediaArr[3].media_type_id === MediaPostEnum.IMAGE
                ? renderImage(mediaArr[3].media_url, "h-[199.2px]")
                : renderVideo(mediaArr[3].media_url, "h-[199.2px]")}
              <div className="relative h-[199.2px]">
                {mediaArr[4].media_type_id === MediaPostEnum.IMAGE
                  ? renderImage(mediaArr[4].media_url, "h-full")
                  : renderVideo(mediaArr[4].media_url, "h-full")}
                {mediaArr.length > 5 && (
                  <Fragment>
                    <div className="absolute top-0 z-10 h-full w-full bg-black opacity-30"></div>
                    <p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-semibold text-gray-100">
                      +{mediaArr.length - 5}
                    </p>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return renderImageGrid();
};

export default MediaPostGrid;
