import React, { forwardRef } from "react";
import Image from "next/image";
import { logoutService } from "@/services/logout";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightEndOnRectangleIcon,
  ChatBubbleLeftIcon,
  Cog8ToothIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const MenuItem = ({
  icon: Icon,
  label,
  menuFunction,
}: {
  icon: any;
  label: string;
  menuFunction: () => void;
}) => (
  <div
    onClick={menuFunction}
    className="flex w-full cursor-pointer items-center rounded-lg px-2 py-3 hover:bg-[#F2F2F2]"
  >
    <Icon
      className="h-8 w-8 rounded-full bg-[#e4e6eb] p-1"
      aria-hidden="true"
    />
    <p className="ml-2 flex-1 font-semibold">{label}</p>
    <ChevronRightIcon className="h-7 w-7 text-gray-500" aria-hidden="true" />
  </div>
);

type ProfileMenuOptionProps = {
  setIsShowProfileMenuOption: (param: boolean) => void;
};

const ProfileMenuOption = forwardRef<HTMLDivElement, ProfileMenuOptionProps>(
  ({ setIsShowProfileMenuOption }, ref) => {
    const router = useRouter();
    const menuItems = [
      {
        icon: Cog8ToothIcon,
        label: "Setting & privacy",
        menuFunction: () => {},
      },
      {
        icon: QuestionMarkCircleIcon,
        label: "Help & support",
        menuFunction: () => {},
      },
      {
        icon: MoonIcon,
        label: "Display & accessibility",
        menuFunction: () => {},
      },
      {
        icon: ChatBubbleLeftIcon,
        label: "Give feedback",
        menuFunction: () => {},
      },
      {
        icon: ArrowRightEndOnRectangleIcon,
        label: "Log out",
        menuFunction: () => {
          const response = logoutService();
          if (response) {
            router.replace("/");
          }
        },
      },
    ];
    return (
      <div
        ref={ref}
        className="font-[Segoe UI Historic] fixed right-5 top-14 flex w-[360px] flex-col rounded-md bg-white shadow-md"
      >
        <div className="p-3">
          <div className="flex flex-col rounded-md bg-white p-2 shadow-md">
            <div className="flex w-full cursor-pointer items-center rounded-md px-1 py-3 hover:bg-gray-200">
              <div className="mr-2 min-w-max">
                <Image
                  src="/profile.jpg"
                  width={30}
                  height={30}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
              <p className="font-semibold">Lorem, ipsum dolor</p>
            </div>
            <hr className="my-2 w-full border-gray-300" />
            <p className="cursor-pointer rounded-md px-2 py-1 text-[15px] text-[#0866ff] hover:bg-gray-300">
              See all profiles
            </p>
          </div>
        </div>

        <div className="my-2 flex flex-col px-1 text-[15px]">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              menuFunction={item.menuFunction}
            />
          ))}
        </div>
        <p className="mb-3 px-3 text-[13px] text-gray-500">
          <span className="cursor-pointer hover:underline">Privacy</span> ·{" "}
          <span className="cursor-pointer hover:underline">Terms</span> ·{" "}
          <span className="cursor-pointer hover:underline">Advertising</span> ·{" "}
          <span className="cursor-pointer hover:underline">Ad Choices</span> ·{" "}
          <span className="cursor-pointer hover:underline">More</span> ·{" "}
          <span className="cursor-pointer hover:underline">Meta © 2024</span>
        </p>
      </div>
    );
  },
);

ProfileMenuOption.displayName = "Profile Menu Options";

export default ProfileMenuOption;
