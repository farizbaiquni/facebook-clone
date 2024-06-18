"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { UserType } from "@/types/user";

type StoryProps = {
  user: UserType;
};

export default function Story({ user }: StoryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const storiesPerPage = 4;

  const stories = [
    {
      name: "Rosineia Rocha Ramos",
      imageUrl: "/images/stories/story (1).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Michael Wilson",
      imageUrl: "/images/stories/story (9).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Robert Brown",
      imageUrl: "/images/stories/story (7).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Angélica Martínez",
      imageUrl: "/images/stories/story (2).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "John Doe",
      imageUrl: "/images/stories/story (4).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Maria Fernanda",
      imageUrl: "/images/stories/story (3).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Jane Smith",
      imageUrl: "/images/stories/story (5).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Alice Johnson",
      imageUrl: "/images/stories/story (6).jpg",
      profileImageUrl: "/icons/user.png",
    },

    {
      name: "Emily Davis",
      imageUrl: "/images/stories/story (8).jpg",
      profileImageUrl: "/icons/user.png",
    },
    {
      name: "Jessica Garcia",
      imageUrl: "/images/stories/story (10).jpg",
      profileImageUrl: "/icons/user.png",
    },
  ];

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - storiesPerPage, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + storiesPerPage, stories.length - storiesPerPage),
    );
  };

  const visibleStories =
    currentIndex === 0
      ? stories.slice(0, storiesPerPage - 1)
      : stories.slice(currentIndex, currentIndex + storiesPerPage);

  return (
    <div className="relative flex items-center px-4">
      {currentIndex > 0 && (
        <button
          onClick={scrollLeft}
          className="absolute left-10 z-10 rounded-full bg-gray-200 p-2 shadow-sm shadow-gray-500 hover:bg-gray-300"
        >
          <ChevronLeftIcon className="h-8 w-8 text-gray-800" />
        </button>
      )}
      <div className="flex space-x-4 px-4 py-6">
        {currentIndex === 0 && (
          <div className="relative flex h-[250px] w-[140px] flex-shrink-0 flex-col items-center justify-between rounded-lg bg-gray-800 text-white transition-all duration-300 hover:cursor-pointer">
            <div className="relative h-4/5 w-full">
              {user?.profilePicture ? (
                <Image
                  src={user?.profilePicture}
                  alt="User Profile"
                  sizes="50"
                  fill
                  className="rounded-t-lg object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={"/icons/user-non-rounded.png"}
                    alt="User Profile"
                    width={50}
                    height={50}
                    className="rounded-t-lg object-cover"
                  />
                </div>
              )}

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform rounded-full border-4 border-gray-300 bg-blue-600 p-1">
                <PlusIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex h-1/5 w-full items-center justify-center rounded-b-lg bg-gray-300">
              <p className="text-xs font-semibold text-gray-800">
                Create story
              </p>
            </div>
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
          </div>
        )}
        {visibleStories.map((story, index) => (
          <div
            key={index}
            className="relative h-[250px] w-[140px] flex-shrink-0 cursor-pointer transition-all duration-300"
          >
            <Image
              src={story.imageUrl}
              alt={story.name}
              sizes="50"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute left-2 top-2 h-10 w-10 overflow-hidden rounded-full border-2 border-white">
              <Image
                src={story.profileImageUrl}
                alt={`${story.name} profile`}
                width={70}
                height={70}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black bg-opacity-50 p-1 text-center text-white">
              {story.name}
            </div>
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
          </div>
        ))}
      </div>
      {currentIndex < stories.length - storiesPerPage && (
        <button
          onClick={scrollRight}
          className="absolute right-10 z-10 rounded-full bg-gray-200 p-2 shadow-sm shadow-gray-500 hover:bg-gray-300"
        >
          <ChevronRightIcon className="h-8 w-8 text-gray-800" />
        </button>
      )}
    </div>
  );
}
