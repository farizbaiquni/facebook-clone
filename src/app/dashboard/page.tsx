"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header/Header";
import { IconType } from "@/components/dashboard/header/NavigationIcons";
import SidebarLeft from "@/components/dashboard/sidebar/SidebarLeft";
import Story from "@/components/dashboard/content/Story";
import Posting from "@/components/dashboard/content/Posting";
import Post from "@/components/dashboard/content/Post";
import SidebarRight from "@/components/dashboard/sidebar/SidebarRight";

export default function Dashbpard() {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIcon, setActiveIcon] = useState<IconType>(IconType.Home);

  return (
    <main className="flex flex-col bg-[#F0F2F5]">
      {/* Header Havbar */}
      <Header
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
      {/* Content */}
      <div className="flex h-full w-full pt-14">
        {/* Left Sidebar */}
        <SidebarLeft />
        {/* Center Content */}
        <div className="ml-72 flex flex-1 flex-col items-center max-[1100px]:ml-0">
          <Story />
          <Posting />
          <Post />
        </div>
        {/* Right Sidebar */}
        <SidebarRight />
      </div>
    </main>
  );
}
