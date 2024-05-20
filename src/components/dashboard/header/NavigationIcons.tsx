import React from "react";
import {
  HomeIcon,
  PlayIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

export enum IconType {
  Home = "home",
  Video = "video",
  Marketplace = "marketplace",
  Groups = "groups",
  Gaming = "gaming",
}

interface NavigationIconsProps {
  activeIcon: IconType;
  setActiveIcon: (icon: IconType) => void;
}

const NavigationIcons = ({
  activeIcon,
  setActiveIcon,
}: NavigationIconsProps) => {
  const icons = [
    { type: IconType.Home, Icon: HomeIcon, label: "Home" },
    { type: IconType.Video, Icon: PlayIcon, label: "Play" },
    { type: IconType.Marketplace, Icon: ShoppingBagIcon, label: "Shopping" },
    { type: IconType.Groups, Icon: UserGroupIcon, label: "Groups" },
    { type: IconType.Gaming, Icon: PlusIcon, label: "Gaming" },
  ];

  return (
    <div className="flex flex-1 justify-center px-16">
      <div className="flex flex-1 justify-around max-[700px]:hidden">
        {icons.map(({ type, Icon, label }) => (
          <div
            key={type}
            className={`group relative flex flex-1 cursor-pointer flex-col items-center justify-center border-b-4 ${
              activeIcon === type ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setActiveIcon(type)}
          >
            <Icon
              className={`h-7 w-7 ${activeIcon === type ? "text-blue-500" : "text-gray-500"}`}
            />
            <div className="absolute bottom-[-40px] rounded-md bg-black p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-75">
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationIcons;
