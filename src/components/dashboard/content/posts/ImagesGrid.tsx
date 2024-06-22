import { Fragment } from "react";
import Image from "next/image";

type ImagesGridType = {
  images: string[];
};

const ImagesGrid = ({ images }: ImagesGridType) => {
  const renderImage = (src: string, height: string) => (
    <Image
      src={src}
      alt="Uploaded image"
      width={500}
      height={600}
      className={`object-cover ${height}`}
    />
  );

  const renderImageGrid = () => {
    switch (images.length) {
      case 1:
        return (
          <div className="relative flex">
            {renderImage(images[0], "max-h-[600px]")}
          </div>
        );
      case 2:
        return (
          <div className="flex gap-x-1">
            {images.map((src, index) => (
              <div key={index} className="h-full w-full">
                {renderImage(src, "h-[250px]")}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="flex h-[500px] flex-col gap-y-[2px]">
            <div className="">{renderImage(images[0], "h-[249px]")}</div>
            <div className="flex gap-x-[2px]">
              <div>{renderImage(images[1], "h-[249px]")}</div>
              <div>{renderImage(images[2], "h-[249px]")}</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-[2px]">
            {images.map((src, index) => (
              <div key={index} className="h-full w-full">
                {renderImage(src, "h-[249px]")}
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col gap-y-[2px]">
            <div className="grid h-3/5 grid-cols-2 gap-x-[2px]">
              {renderImage(images[0], "h-[298.8px] w-full")}
              {renderImage(images[1], "h-[298.8px] w-full")}
            </div>
            <div className="grid grid-cols-3 gap-x-[2px]">
              {renderImage(images[2], "h-[199.2px]")}
              {renderImage(images[3], "h-[199.2px]")}
              {renderImage(images[4], "h-[199.2px]")}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-y-[2px]">
            <div className="grid h-3/5 grid-cols-2 gap-x-[2px]">
              {renderImage(images[0], "h-[298.8px] w-full")}
              {renderImage(images[1], "h-[298.8px] w-full")}
            </div>
            <div className="grid grid-cols-3 gap-x-[2px]">
              {renderImage(images[2], "h-[199.2px]")}
              {renderImage(images[3], "h-[199.2px]")}
              <div className="relative h-[199.2px]">
                {renderImage(images[4], "h-full")}
                {images.length > 5 && (
                  <Fragment>
                    <div className="absolute top-0 z-10 h-full w-full bg-black opacity-30"></div>
                    <p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-semibold text-gray-100">
                      +{images.length - 5}
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

export default ImagesGrid;
