import React, {
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  AudienceFriendType,
  AudienceSelectorModeEnum,
  IncludeOrExcludeAudienceSelectorModeEnum,
} from "@/types/audiences";
import { useDebounce } from "@/hooks/useDebounce";

type AudienceSelectorIncludeExcludeProps = {
  title: string;
  IconSelected: ReactNode;
  IconUnselected: ReactNode;
  explanation: string;
  mode: IncludeOrExcludeAudienceSelectorModeEnum;
  tempSelectedAudienceInclude: Map<number, AudienceFriendType>;
  tempSelectedAudienceExclude: Map<number, AudienceFriendType>;
  setSelectedAudienceSelectorMode: (param: AudienceSelectorModeEnum) => void;
  setTempSelectedAudienceInclude: (
    param: Map<number, AudienceFriendType>,
  ) => void;
  setTempSelectedAudienceExclude: (
    param: Map<number, AudienceFriendType>,
  ) => void;
};

const AudienceSelectorIncludeExclude = ({
  title,
  IconSelected,
  IconUnselected,
  explanation,
  mode,
  tempSelectedAudienceInclude,
  tempSelectedAudienceExclude,
  setSelectedAudienceSelectorMode,
  setTempSelectedAudienceInclude,
  setTempSelectedAudienceExclude,
}: AudienceSelectorIncludeExcludeProps) => {
  const templateFriends: AudienceFriendType[] = useMemo(
    () => [
      { id: 1, imageUrl: null, name: "Erin Marque", isTagged: false },
      { id: 2, imageUrl: null, name: "Zac Rasmussen", isTagged: false },
      { id: 3, imageUrl: null, name: "Kimberly Donaldson", isTagged: false },
      { id: 4, imageUrl: null, name: "Roosevelt Watkins", isTagged: false },
      { id: 5, imageUrl: null, name: "Polly Donovan", isTagged: false },
      { id: 6, imageUrl: null, name: "Jonathan Camacho", isTagged: false },
      { id: 7, imageUrl: null, name: "Aarav O'Doherty", isTagged: false },
    ],
    [],
  );

  const initializeMap = useCallback(
    (
      friends: AudienceFriendType[],
      tempSelected: Map<number, AudienceFriendType>,
    ): Map<number, AudienceFriendType> => {
      const map = new Map<number, AudienceFriendType>();
      friends.forEach((friend) => {
        friend.isTagged = tempSelected.has(friend.id);
        map.set(friend.id, friend);
      });
      return map;
    },
    [],
  );

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const debouncedSearch = useDebounce(searchKeyword, 500);

  const tempSelectedAudience =
    mode === IncludeOrExcludeAudienceSelectorModeEnum.SPECIFIC_FRIENDS
      ? tempSelectedAudienceInclude
      : tempSelectedAudienceExclude;

  const [friends, setFriends] = useState<Map<number, AudienceFriendType>>(() =>
    initializeMap(templateFriends, tempSelectedAudience),
  );

  const [filteredFriends, setFilteredFriends] =
    useState<Map<number, AudienceFriendType>>(friends);

  const [selectedAudience, setSelectedAudience] =
    useState<Map<number, AudienceFriendType>>(tempSelectedAudience);

  const handleFriendToggle = useCallback((id: number) => {
    setFriends((prevState) => {
      const newState = new Map(prevState);
      const friend = newState.get(id);
      if (friend) {
        friend.isTagged = !friend.isTagged;
        newState.set(id, { ...friend });
        setSelectedAudience((prevSelected) => {
          const newSelected = new Map(prevSelected);
          if (friend.isTagged) {
            newSelected.set(id, friend);
          } else {
            newSelected.delete(id);
          }
          return newSelected;
        });
      }
      return newState;
    });
  }, []);

  const handleRemoveSelectedFriend = useCallback((id: number) => {
    setFriends((prevState) => {
      const newState = new Map(prevState);
      const friend = newState.get(id);
      if (friend) {
        friend.isTagged = false;
        newState.set(id, { ...friend });
      }
      return newState;
    });
    setSelectedAudience((prevSelected) => {
      const newSelected = new Map(prevSelected);
      newSelected.delete(id);
      return newSelected;
    });
  }, []);

  const saveChangesAudienceInclude = useCallback(() => {
    if (mode === IncludeOrExcludeAudienceSelectorModeEnum.SPECIFIC_FRIENDS) {
      setTempSelectedAudienceInclude(selectedAudience);
    } else {
      setTempSelectedAudienceExclude(selectedAudience);
    }
    setSelectedAudienceSelectorMode(AudienceSelectorModeEnum.MAIN);
  }, [
    mode,
    setSelectedAudienceSelectorMode,
    setTempSelectedAudienceInclude,
    selectedAudience,
    setTempSelectedAudienceExclude,
  ]);

  useEffect(() => {
    setFilteredFriends(() => {
      const map = new Map<number, AudienceFriendType>();
      templateFriends.forEach((friend) => {
        if (
          !debouncedSearch ||
          friend.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        ) {
          friend.isTagged = selectedAudience.has(friend.id);
          map.set(friend.id, friend);
        }
      });
      return map;
    });
  }, [debouncedSearch, selectedAudience, templateFriends]);

  return (
    <div className="flex h-auto w-[500px] flex-col rounded-lg bg-white">
      {/* Header */}
      <div className="relative mb-5 flex h-[60px] items-center justify-center overflow-hidden border-b border-b-gray-300">
        <p className="flex flex-1 items-center justify-center text-xl font-extrabold">
          {title}
        </p>
        <ArrowLeftIcon
          onClick={() =>
            setSelectedAudienceSelectorMode(AudienceSelectorModeEnum.MAIN)
          }
          className="absolute left-3 h-8 w-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
        />
      </div>

      {/* Content */}
      <div className="px-3">
        <div className="relative w-full rounded-full bg-[#F0F2F5] py-2 pl-8 pr-5">
          <input
            type="text"
            className="w-full bg-[#F0F2F5] pl-2 outline-none"
            placeholder="Search for friend or list..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        </div>

        <div className="custom-scrollbar flex h-[320px] flex-col overflow-y-scroll">
          <p className="py-2 font-semibold">Friends</p>
          {Array.from(filteredFriends.values()).map((friend) => (
            <div
              key={friend.id}
              onClick={() => handleFriendToggle(friend.id)}
              className="group flex cursor-pointer items-center rounded-xl px-1 py-2 hover:bg-[#F2F2F2]"
            >
              <Image
                src={friend.imageUrl || "/icons/user.png"}
                width={500}
                height={500}
                alt="user"
                className="h-9 w-9 cursor-pointer rounded-full border border-gray-200 object-cover"
              />
              <p className="mx-2 line-clamp-1 h-fit flex-1 text-[15px] font-semibold">
                {friend.name}
              </p>
              {friend.isTagged ? IconSelected : IconUnselected}
            </div>
          ))}
        </div>

        <hr className="border-b border-gray-200" />

        <div className="px-3 py-2">
          <div className="my-1 flex max-h-[156px] flex-col overflow-y-scroll rounded-md border border-gray-300 p-3">
            <p className="mb-2 text-gray-500">{explanation}</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedAudience.values()).map((friend) => (
                <div
                  key={friend.id}
                  className="flex w-fit items-center rounded-md bg-[#EBF5FF] px-2 py-1"
                >
                  <Image
                    src="/icons/user.png"
                    width={500}
                    height={500}
                    alt="user"
                    className="h-5 w-5 cursor-pointer rounded-full border border-gray-200 object-cover"
                  />
                  <p className="px-2 text-[13px] text-sm font-semibold text-[#0866ff]">
                    {friend.name}
                  </p>
                  <XMarkIcon
                    onClick={() => handleRemoveSelectedFriend(friend.id)}
                    className="h-4 w-4 cursor-pointer rounded-full text-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end px-5 pb-3 text-[15px] font-semibold">
        <button
          onClick={() =>
            setSelectedAudienceSelectorMode(AudienceSelectorModeEnum.MAIN)
          }
          className="cursor-pointer rounded-md px-5 py-2 text-blue-600 hover:bg-[#F2F2F2]"
        >
          Cancel
        </button>
        <button
          onClick={() => saveChangesAudienceInclude()}
          className="ml-3 cursor-pointer rounded-md bg-blue-600 px-8 py-2 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AudienceSelectorIncludeExclude;
