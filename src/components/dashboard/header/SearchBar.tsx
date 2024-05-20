import React, { Fragment } from "react";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface SearchBarProps {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}

const SearchBar = ({ isFocused, setIsFocused }: SearchBarProps) => {
  return (
    <Fragment>
      <div className={`${isFocused && "w-60"}`}></div>
      <div
        className={`flex items-center ${isFocused && "fixed z-10 h-14"} min-w-max`}
      >
        {isFocused ? (
          <ArrowLeftIcon
            className="h-6 w-6 cursor-pointer text-gray-500"
            aria-hidden="true"
            onClick={() => setIsFocused(false)}
          />
        ) : (
          <Image
            src="/icons/facebook-logo.png"
            width={44}
            height={44}
            alt="facebook-logo"
            className="cursor-pointer"
          />
        )}
        <div
          className={`ml-2 flex items-center justify-center ${!isFocused && "max-[1160px]:hidden"}`}
        >
          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-all duration-300 ${isFocused ? "scale-x-0" : "scale-x-100"}`}
            >
              <MagnifyingGlassIcon
                className="h-5 text-gray-500 transition-all duration-300"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              className={`h-9 w-56 rounded-full border border-gray-300 ${isFocused ? "pl-5" : "pl-10"} pr-4 text-sm placeholder-gray-500 shadow-inner transition-all duration-300`}
              placeholder="Search Facebook"
              onFocus={() => setIsFocused(true)}
            />
          </div>
        </div>
        <div
          className={`ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-300 min-[1160px]:hidden ${isFocused && "hidden"}`}
          onClick={() => setIsFocused(true)}
        >
          <MagnifyingGlassIcon className="h-6 " aria-hidden="true" />
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;
