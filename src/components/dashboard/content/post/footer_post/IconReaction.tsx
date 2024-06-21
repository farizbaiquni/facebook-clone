import Image from "next/image";

type IconProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};

const IconReaction = ({
  src,
  alt,
  className = "",
  width = 35,
  height = 35,
  onClick,
}: IconProps) => (
  <li>
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={`mr-2 cursor-pointer rounded-full border border-gray-200 object-cover ${className}`}
      onClick={onClick}
    />
  </li>
);

export default IconReaction;
