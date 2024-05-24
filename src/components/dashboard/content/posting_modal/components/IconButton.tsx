import Image from "next/image";

interface IconButtonType {
  src: string;
  alt: string;
  label: string;
  onClick?: () => void;
}

const IconButton = ({ src, alt, label, onClick }: IconButtonType) => (
  <div
    className="group relative ml-2 flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-300"
    onClick={onClick}
  >
    <Image src={src} width={28} height={28} alt={alt} className="h-7 w-7" />
    <p className="absolute bottom-11 hidden whitespace-nowrap rounded-md bg-gray-700 p-2 text-xs text-gray-200 opacity-90 group-hover:block">
      {label}
    </p>
  </div>
);

export default IconButton;
