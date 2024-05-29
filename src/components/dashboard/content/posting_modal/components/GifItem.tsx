import { GifType } from "@/types/gifs";
import Image from "next/image";

type GifItemType = {
  gif: GifType;
  handleClickGif: (gif: GifType | null) => void;
};

export default function GifItem({ gif, handleClickGif }: GifItemType) {
  return (
    <div key={gif.id} className="ml-2 bg-white">
      <Image
        width={40}
        height={40}
        src={gif.media_formats.gif.url}
        alt={gif.content_description}
        onClick={() => handleClickGif(gif)}
        className="h-auto w-full cursor-pointer"
      />
    </div>
  );
}
