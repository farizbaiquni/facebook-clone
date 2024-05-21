"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header/Header";
import { IconType } from "@/components/dashboard/header/NavigationIcons";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Story from "@/components/dashboard/content/Story";

export default function Dashbpard() {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIcon, setActiveIcon] = useState<IconType>(IconType.Home);
  return (
    <main className="flex h-screen flex-col bg-gray-700">
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
        <Sidebar />
        {/* Center Content */}
        <div className="flex min-h-screen flex-1 flex-col items-center bg-green-600">
          <Story />
        </div>
        {/* Right Sidebar */}
        <div className="w-64 bg-violet-600 max-[900px]:hidden"></div>
      </div>
    </main>
  );
}
