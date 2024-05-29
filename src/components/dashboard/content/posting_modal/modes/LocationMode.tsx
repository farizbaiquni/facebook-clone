import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";
import LocationItem from "../components/LocationItem";
import { ModeTypes } from "@/types/modes";
import { LocationType, defaultInitialLocations } from "@/types/locations";

type LocationModeType = {
  selectedLocation: LocationType | null;
  setSelectedLocation: (param: LocationType) => void;
  handleModeType: (param: ModeTypes) => void;
};

export default function LocationMode({
  selectedLocation,
  setSelectedLocation,
  handleModeType,
}: LocationModeType) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialLocations = defaultInitialLocations;

  const fetchData = async (keyword: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/locations", {
        params: { query: keyword },
      });
      setLocations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setSearchKeyword(newKeyword);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      if (newKeyword.trim()) {
        fetchData(newKeyword);
      }
    }, 1000); // 1 detik debounce

    setTypingTimeout(timeout);
  };

  const handleClickLocation = (param: LocationType) => {
    setSelectedLocation(param);
    handleModeType(ModeTypes.PostingMode);
  };

  return (
    <div className="flex h-auto w-[500px] flex-col rounded-lg bg-white">
      <div className="mx-4 flex flex-col">
        {/* Header */}
        <div>
          <div className="relative mb-5 flex h-[60px] items-center justify-center border-b border-b-gray-300">
            <p className="flex flex-1 items-center justify-center text-lg font-extrabold">
              Search for location
            </p>
            <ArrowLeftIcon
              onClick={() => handleModeType(ModeTypes.PostingMode)}
              className="absolute left-0 h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
            />
          </div>

          <div className="mb-4 w-full rounded-full bg-[#E4E6EB] px-8 py-2">
            <div className="relative w-full">
              <input
                type="text"
                className="ml-2 w-full bg-[#E4E6EB] placeholder-gray-700 outline-none"
                placeholder="Where are you?"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-[-15px] top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>
        {/* Body */}
        {isLoading ? (
          <div className="custom-scrollbar mb-5 mt-2 flex h-[335px] items-center justify-center">
            <Image
              alt="loading"
              width={30}
              height={30}
              src="/gifs/loading-gray.gif"
            />
          </div>
        ) : (
          <div className="custom-scrollbar mt-2 h-[355px] overflow-y-scroll">
            {searchKeyword.trim().length > 0 || locations.length > 0
              ? locations.map((location) => (
                  <LocationItem
                    key={location.place_id}
                    location={location}
                    handleClickLocation={handleClickLocation}
                  />
                ))
              : initialLocations.map((location) => (
                  <LocationItem
                    key={location.place_id}
                    location={location}
                    handleClickLocation={handleClickLocation}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
