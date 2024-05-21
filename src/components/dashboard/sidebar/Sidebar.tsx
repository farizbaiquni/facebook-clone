import Image from "next/image";
import { Fragment, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [isExpand, setIsExpand] = useState(false);

  const menuItems = [
    { name: "Fariz Baiquni", icon: "/profile.jpg" }, // Replace with your profile image path
    { name: "Friends", icon: "/icons_sidebar/friends.png" },
    { name: "Memories", icon: "/icons_sidebar/memories.png" },
    { name: "Saved", icon: "/icons_sidebar/saved.png" },
    { name: "Groups", icon: "/icons_sidebar/groups.png" },
    { name: "Video", icon: "/icons_sidebar/video.png" },
    { name: "Ads Manager", icon: "/icons_sidebar/ads.png" },
    {
      name: "Climate Science Center",
      icon: "/icons_sidebar/climate.png",
    },
    { name: "Events", icon: "/icons_sidebar/events.png" },
    { name: "Feeds", icon: "/icons_sidebar/feeds.png" },
    { name: "Fundraisers", icon: "/icons_sidebar/fundraiser.png" },
    { name: "Gaming", icon: "/icons_sidebar/gaming.png" },
    { name: "Messenger", icon: "/icons_sidebar/messenger.png" },
    { name: "Messenger Kid", icon: "/icons_sidebar/messenger-kid.png" },
    { name: "Pages", icon: "/icons_sidebar/pages.png" },
    { name: "Play Games", icon: "/icons_sidebar/games.png" },
    { name: "Recent Ad Activity", icon: "/icons_sidebar/recent.png" },
  ];

  const itemsToDisplay = isExpand ? menuItems : menuItems.slice(0, 5);

  return (
    <div className="h-full min-w-72 flex-shrink overflow-y-scroll bg-gray-100 pl-2 max-[1100px]:hidden">
      <ul>
        {itemsToDisplay.map((item, index) => (
          <li
            key={index}
            className={`my-0 flex cursor-pointer items-center rounded-md p-2 ${
              activeItem === item.name
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={500}
              height={500}
              className={`mr-4 h-8 w-8 rounded-full ${index === 0 && "object-fill"}`}
            />
            <p className="whitespace-nowrap text-sm font-semibold">
              {item.name}
            </p>
          </li>
        ))}
        <li
          key={"expandBotton"}
          className={`my-2 flex cursor-pointer items-center rounded-md p-2`}
          onClick={() => setIsExpand((prevState) => !prevState)}
        >
          {isExpand ? (
            <Fragment>
              <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                <ChevronUpIcon className="w-3" aria-hidden="true" />
              </div>
              <p className="whitespace-nowrap text-sm font-semibold">
                See less
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                <ChevronDownIcon className="w-3" aria-hidden="true" />
              </div>
              <p className="whitespace-nowrap text-sm font-semibold">
                See more
              </p>
            </Fragment>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
