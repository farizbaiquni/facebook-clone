import { ModeTypes } from "@/types/ModeTypes";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import "@/app/scrollbar.css";
import Image from "next/image";
import { useState } from "react";
import { FriendTagPeople } from "@/types/EntityObjects";

type TagPeopleModeType = {
  handleModeType: (param: ModeTypes) => void;
  taggedFriends: Map<number, FriendTagPeople>;
  setTaggedFriends: (param: Map<number, FriendTagPeople>) => void;
};

export default function TagPeopleMode({
  handleModeType,
  taggedFriends,
  setTaggedFriends,
}: TagPeopleModeType) {
  const [tempTaggedFriends, setTempTaggedFriends] = useState<
    Map<number, FriendTagPeople>
  >(new Map(taggedFriends));
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const friends: FriendTagPeople[] = [
    { id: 1, name: "Aisha Campbell", image: "" },
    { id: 2, name: "Brianna Scott", image: "" },
    { id: 3, name: "Christopher Bailey", image: "" },
    { id: 4, name: "Daniella Ramirez", image: "" },
    { id: 5, name: "Emily Parker", image: "" },
    { id: 6, name: "Ethan Walker", image: "" },
    { id: 7, name: "Fiona Garcia", image: "" },
    { id: 8, name: "Gregory Peterson", image: "" },
    { id: 9, name: "Hannah Phillips", image: "" },
    { id: 10, name: "Isaac Perry", image: "" },
  ];

  const handleFriendClick = (friend: FriendTagPeople) => {
    setTempTaggedFriends(new Map(tempTaggedFriends.set(friend.id, friend)));
  };

  const handleRemoveFriend = (id: number) => {
    const updatedFriends = new Map(tempTaggedFriends);
    updatedFriends.delete(id);
    setTempTaggedFriends(updatedFriends);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const filteredFriends = friends.filter(
    (friend) =>
      !tempTaggedFriends.has(friend.id) &&
      friend.name.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  const handleBackToPostingMode = () => {
    handleModeType(ModeTypes.PostingMode);
    setTaggedFriends(tempTaggedFriends);
  };

  return (
    <div className="flex h-auto w-[500px] flex-col rounded-lg bg-white">
      {/* Header */}
      <div className="flex flex-col">
        <div className="relative mb-5 flex h-[60px] items-center justify-center overflow-hidden border-b border-b-gray-300">
          <h3 className="flex flex-1 items-center justify-center text-lg font-bold">
            Tag People
          </h3>
          <ArrowLeftIcon
            onClick={handleBackToPostingMode}
            className="absolute left-3 h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
          />
        </div>
        <div className="mb-5 flex flex-1 justify-around pl-10 pr-7">
          <div className="relative w-full">
            <input
              type="text"
              className="ml-2 w-full outline-none"
              placeholder="Search for friends"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon className="absolute left-[-15px] top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>
          <button
            onClick={handleBackToPostingMode}
            className="ml-2 cursor-pointer px-2 text-sm font-semibold text-blue-600"
          >
            Done
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="custom-scrollbar h-[350px] overflow-y-scroll px-3">
        <div className={`${tempTaggedFriends.size <= 0 && "hidden"}`}>
          <p className="text-xs font-semibold text-gray-500">TAGGED</p>
          <div className="my-2 flex max-h-[156px] flex-wrap gap-2 overflow-y-scroll rounded-md border border-gray-300 p-3">
            {Array.from(tempTaggedFriends).map(([id, taggedFriend]) => (
              <div
                key={id}
                className="flex w-fit items-center rounded-md bg-blue-100 px-2 py-1"
              >
                <p className="text-sm font-semibold text-blue-600">
                  {taggedFriend.name}
                </p>
                <XMarkIcon
                  onClick={() => handleRemoveFriend(id)}
                  className="ml-2 h-7 w-7 cursor-pointer rounded-full p-1 text-blue-500 hover:bg-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs font-semibold text-gray-500">SUGGESTIONS</p>
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => handleFriendClick(friend)}
            className="flex w-full cursor-pointer items-center rounded-md py-2 hover:bg-[#F2F2F2]"
          >
            <Image
              src={"/icons/user.png"}
              alt={friend.name}
              height={40}
              width={40}
              className="rounded-full"
            />
            <p className="ml-2 text-sm font-semibold">{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
