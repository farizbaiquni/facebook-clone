import { ModeTypes } from "@/types/modes";
import Image from "next/image";
import styles from "./styles/IconButton.module.css";

type IconButtonType = {
  src: string;
  alt: string;
  label: string;
  handleClickUploadModeActive?: (param: boolean) => void;
  modeType: ModeTypes;
  handleModeType: (param: ModeTypes) => void;
  style: string;
  isDisabled: boolean;
};

const IconButton = ({
  src,
  alt,
  label,
  handleClickUploadModeActive,
  modeType,
  handleModeType,
  style,
  isDisabled,
}: IconButtonType) => {
  const handleOnClickIcon = () => {
    if (!isDisabled) {
      if (handleClickUploadModeActive) {
        handleClickUploadModeActive(true);
      }
      handleModeType(modeType);
    }
  };
  return (
    <div
      className={`${style} ${isDisabled ? styles.imageWrapper : "hover:bg-gray-300"} image-container group relative ml-2 flex cursor-pointer items-center justify-center rounded-full p-2 `}
      onClick={handleOnClickIcon}
    >
      <Image src={src} width={25} height={25} alt={alt} />
      <p
        className={`absolute bottom-11 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover:block`}
      >
        {!isDisabled
          ? label
          : "This can't be combined with what you've already added to your post."}
      </p>
    </div>
  );
};

export default IconButton;
