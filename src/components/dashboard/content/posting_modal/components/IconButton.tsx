import { ModeTypes } from "@/types/modes";
import Image from "next/image";

type IconButtonType = {
  src: string;
  alt: string;
  label: string;
  handleClickUploadModeActive?: (param: boolean) => void;
  modeType: ModeTypes;
  handleModeType: (param: ModeTypes) => void;
  style: string;
};

const IconButton = ({
  src,
  alt,
  label,
  handleClickUploadModeActive,
  modeType,
  handleModeType,
  style,
}: IconButtonType) => {
  const handleOnClickIcon = () => {
    if (handleClickUploadModeActive) {
      handleClickUploadModeActive(true);
    }
    handleModeType(modeType);
  };
  return (
    <div
      className={`${style} group relative ml-2 flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-300`}
      onClick={handleOnClickIcon}
    >
      <Image src={src} width={25} height={25} alt={alt} className="" />
      <p className="absolute bottom-11 hidden whitespace-nowrap rounded-md bg-gray-700 p-2 text-xs text-gray-200 opacity-90 group-hover:block">
        {label}
      </p>
    </div>
  );
};

export default IconButton;
