import { ModeTypes } from "@/types/ModeTypes";
import Image from "next/image";

interface IconButtonType {
  src: string;
  alt: string;
  label: string;
  handleClickUploadModeActive?: (param: boolean) => void;
  modeType: ModeTypes;
  handleModeType: (param: ModeTypes) => void;
}

const IconButton = ({
  src,
  alt,
  label,
  handleClickUploadModeActive,
  modeType,
  handleModeType,
}: IconButtonType) => {
  const handleOnClickIcon = () => {
    if (handleClickUploadModeActive) {
      handleClickUploadModeActive(true);
    }
    handleModeType(modeType);
  };
  return (
    <div
      className="group relative ml-2 flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-300"
      onClick={handleOnClickIcon}
    >
      <Image src={src} width={28} height={28} alt={alt} className="h-7 w-7" />
      <p className="absolute bottom-11 hidden whitespace-nowrap rounded-md bg-gray-700 p-2 text-xs text-gray-200 opacity-90 group-hover:block">
        {label}
      </p>
    </div>
  );
};

export default IconButton;
