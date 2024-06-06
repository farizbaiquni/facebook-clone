import { LocationType } from "@/types/locations";
import Image from "next/image";

type LocationItemType = {
  key: string;
  location: LocationType;
  handleClickLocation: (param: LocationType) => void;
};
export default function LocationItem({
  key,
  location,
  handleClickLocation,
}: LocationItemType) {
  return (
    <div
      onClick={() => handleClickLocation(location)}
      key={key}
      className="flex h-fit cursor-pointer items-center rounded-lg px-2 py-3 hover:bg-[#F2F2F2]"
    >
      <Image
        src="/icons/postings/location-white.png"
        width={30}
        height={30}
        alt="location"
        className="rounded-md bg-[#65676B] p-1"
      />
      <p className="ml-4 text-[15px] font-semibold text-gray-700">
        {location.display_name}
      </p>
    </div>
  );
}
