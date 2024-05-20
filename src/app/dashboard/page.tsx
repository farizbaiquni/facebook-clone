"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header/Header";
import { IconType } from "@/components/dashboard/header/NavigationIcons";

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
      <div></div>
    </main>
  );
}
