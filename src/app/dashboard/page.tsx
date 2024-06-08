"use client";

import { Fragment, useEffect, useState } from "react";
import Header from "@/components/dashboard/header/Header";
import { IconType } from "@/components/dashboard/header/NavigationIcons";
import SidebarLeft from "@/components/dashboard/sidebar/SidebarLeft";
import Story from "@/components/dashboard/content/Story";
import Posting from "@/components/dashboard/content/Posting";
import Post from "@/components/dashboard/content/Post";
import SidebarRight from "@/components/dashboard/sidebar/SidebarRight";
import axios from "axios";
import { UserType } from "@/types/user";

export default function Dashboard() {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIcon, setActiveIcon] = useState<IconType>(IconType.Home);
  const [user, setUser] = useState<UserType | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserById = async () => {
    try {
      const response = await axios.get("/api/users");
      const data = response.data.results.results[0];
      const userData: UserType = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        profilePicture: data.profile_picture,
        coverPhoto: data.cover_photo,
        bio: data.bio,
        birthDate: data.birth_date,
        genderId: data.gender_id,
      };
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <main className="flex flex-col bg-[#F0F2F5]">
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>error</p>
      ) : (
        <Fragment>
          {/* Header Navbar */}
          <Header
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
          />
          {/* Content */}
          <div className="flex h-full w-full pt-14">
            <button onClick={getUserById}>
              <b>CHECK</b>
            </button>
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
        </Fragment>
      )}
    </main>
  );
}
