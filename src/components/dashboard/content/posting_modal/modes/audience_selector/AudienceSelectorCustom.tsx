import { useDebounce } from "@/hooks/useDebounce";
import { AudienceSelectorModeEnum } from "@/types/audiences";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

type AudienceFriendType = {
  id: number;
  name: string;
  imageUrl: string | null;
  isTagged: boolean;
};

type AudienceSelectorCustomProps = {
  title: string;
  tempSelectedAudienceIncludeCustom: Map<number, AudienceFriendType>;
  tempSelectedAudienceExcludeCustom: Map<number, AudienceFriendType>;
  setSelectedAudienceSelectorMode: (param: AudienceSelectorModeEnum) => void;
  handleSaveAudienceCustom: (
    audienceInclude: Map<number, AudienceFriendType>,
    audienceExclude: Map<number, AudienceFriendType>,
  ) => void;
};

const templateFriends: AudienceFriendType[] = [
  { id: 1, imageUrl: null, name: "Erin Marque", isTagged: false },
  { id: 2, imageUrl: null, name: "Zac Rasmussen", isTagged: false },
  { id: 3, imageUrl: null, name: "Kimberly Donaldson", isTagged: false },
  { id: 4, imageUrl: null, name: "Roosevelt Watkins", isTagged: false },
  { id: 5, imageUrl: null, name: "Polly Donovan", isTagged: false },
  { id: 6, imageUrl: null, name: "Jonathan Camacho", isTagged: false },
  { id: 7, imageUrl: null, name: "Aarav O'Doherty", isTagged: false },
  { id: 8, imageUrl: null, name: "Elijah Carney", isTagged: false },
  { id: 9, imageUrl: null, name: "Zaynah Donaldson", isTagged: false },
  { id: 10, imageUrl: null, name: "Pedro Lawrence", isTagged: false },
];

const AudienceSelectorCustom = ({
  title,
  tempSelectedAudienceIncludeCustom,
  tempSelectedAudienceExcludeCustom,
  setSelectedAudienceSelectorMode,
  handleSaveAudienceCustom,
}: AudienceSelectorCustomProps) => {
  const [searchKeywordInclude, setSearchKeywordInclude] = useState("");
  const [searchKeywordExclude, setSearchKeywordExclude] = useState("");

  const [suggestedAudienceInclude, setSuggestedAudienceInclude] = useState<
    AudienceFriendType[]
  >([]);
  const [suggestedAudienceExclude, setSuggestedAudienceExclude] = useState<
    AudienceFriendType[]
  >([]);

  const debouncedSearchInclude = useDebounce(searchKeywordInclude, 500);
  const debouncedSearchExclude = useDebounce(searchKeywordExclude, 500);

  const [selectedAudienceInclude, setSelectedAudienceInclude] = useState<
    Map<number, AudienceFriendType>
  >(tempSelectedAudienceIncludeCustom);
  const [selectedAudienceExclude, setSelectedAudienceExclude] = useState<
    Map<number, AudienceFriendType>
  >(tempSelectedAudienceExcludeCustom);

  const handleAddAudience = (
    friend: AudienceFriendType,
    isInclude: boolean,
  ) => {
    const setSelectedAudience = isInclude
      ? setSelectedAudienceInclude
      : setSelectedAudienceExclude;

    const setDeselectAudience = isInclude
      ? setSelectedAudienceExclude
      : setSelectedAudienceInclude;

    setSelectedAudience((prevState) => {
      const newMap = new Map(prevState);
      newMap.set(friend.id, friend);
      return newMap;
    });

    setDeselectAudience((prevState) => {
      const newMap = new Map(prevState);
      newMap.delete(friend.id);
      return newMap;
    });

    isInclude
      ? setSuggestedAudienceInclude([])
      : setSuggestedAudienceExclude([]);
    isInclude ? setSearchKeywordInclude("") : setSearchKeywordExclude("");
  };

  const handleRemoveAudience = (
    friend: AudienceFriendType,
    isInclude: boolean,
  ) => {
    const setSelectedAudience = isInclude
      ? setSelectedAudienceInclude
      : setSelectedAudienceExclude;

    setSelectedAudience((prevState) => {
      const newMap = new Map(prevState);
      newMap.delete(friend.id);
      return newMap;
    });
  };

  const handleOnClikSaveChanges = () => {
    handleSaveAudienceCustom(selectedAudienceInclude, selectedAudienceExclude);
  };

  useEffect(() => {
    if (debouncedSearchInclude) {
      setSuggestedAudienceInclude(
        templateFriends.filter((data) => !selectedAudienceInclude.has(data.id)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInclude]);

  useEffect(() => {
    if (debouncedSearchExclude) {
      setSuggestedAudienceExclude(
        templateFriends.filter((data) => !selectedAudienceExclude.has(data.id)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchExclude]);

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
      <div className="custom-scrollbar max-h-[490px] overflow-y-scroll pl-3 pr-1">
        {/* Share With */}
        <AudienceSection
          title="Share with"
          selectedAudience={Array.from(selectedAudienceInclude.values())}
          searchKeyword={searchKeywordInclude}
          setSearchKeyword={setSearchKeywordInclude}
          suggestedAudience={suggestedAudienceInclude}
          handleAddAudience={(friend) => handleAddAudience(friend, true)}
          handleRemoveAudience={(friend) => handleRemoveAudience(friend, true)}
        />

        {/* Don't share with */}
        <AudienceSection
          title="Don't share with"
          selectedAudience={Array.from(selectedAudienceExclude.values())}
          searchKeyword={searchKeywordExclude}
          setSearchKeyword={setSearchKeywordExclude}
          suggestedAudience={suggestedAudienceExclude}
          handleAddAudience={(friend) => handleAddAudience(friend, false)}
          handleRemoveAudience={(friend) => handleRemoveAudience(friend, false)}
        />

        <p className="mb-10 mt-2 text-xs text-gray-600">
          Anyone you include here or have on your restricted list won&apos;t be
          able to see this post unless you tag them. We don&apos;t let people
          know when you choose to not share something with them.
        </p>
      </div>

      <hr className="my-3 border-2 border-b border-gray-200" />

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
          onClick={handleOnClikSaveChanges}
          className="ml-3 cursor-pointer rounded-md bg-blue-600 px-10 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

type AudienceSectionProps = {
  title: string;
  selectedAudience: AudienceFriendType[];
  searchKeyword: string;
  suggestedAudience: AudienceFriendType[];
  setSearchKeyword: (keyword: string) => void;
  handleAddAudience: (friend: AudienceFriendType) => void;
  handleRemoveAudience: (friend: AudienceFriendType) => void;
};

const AudienceSection = ({
  title,
  selectedAudience,
  searchKeyword,
  suggestedAudience,
  setSearchKeyword,
  handleAddAudience,
  handleRemoveAudience,
}: AudienceSectionProps) => (
  <div className="mt-3 flex flex-col rounded-md border-2 border-gray-400 p-2">
    <p className="mb-1 pl-2 text-xl font-bold">{title}</p>
    <div className="rounded-xl border border-gray-300 p-5">
      <p className="mb-2 text-xs">These people or lists</p>
      <div className="flex flex-wrap gap-2">
        {selectedAudience.map((friend) => (
          <div
            key={friend.id}
            className="flex w-fit items-center rounded-md bg-[#EBF5FF] px-2 py-1"
          >
            <Image
              src={friend.imageUrl || "/icons/user.png"}
              width={500}
              height={500}
              alt="user"
              className="h-5 w-5 cursor-pointer rounded-full border border-gray-200 object-cover"
            />
            <p className="px-2 text-[13px] text-sm font-semibold text-[#0866ff]">
              {friend.name}
            </p>
            <XMarkIcon
              onClick={() => handleRemoveAudience(friend)}
              className="h-4 w-4 cursor-pointer rounded-full text-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="relative mt-2 w-full rounded-full bg-[#F0F2F5] py-2 pl-8 pr-5">
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="w-full bg-[#F0F2F5] pl-2 outline-none"
        placeholder="Search for friend or list..."
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      {suggestedAudience.length > 0 && (
        <div className="custom-scrollbar absolute left-0 top-[51px] z-10 max-h-[250px] w-full overflow-y-scroll rounded-md bg-white shadow-md">
          {suggestedAudience.map((friend) => (
            <div
              key={friend.id}
              onClick={() => handleAddAudience(friend)}
              className="flex cursor-pointer items-center rounded-md px-2 py-2 hover:bg-[#F0F2F5]"
            >
              <Image
                src={friend.imageUrl || "/icons/user.png"}
                width={100}
                height={100}
                alt="user"
                className="h-10 w-10 cursor-pointer rounded-full border border-gray-200 object-cover"
              />
              <p className="ml-2 font-semibold">{friend.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default AudienceSelectorCustom;
