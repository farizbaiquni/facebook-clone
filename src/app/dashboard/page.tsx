"use client";

import { Fragment, createContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserContext } from "@/hooks/useContext";
import { IconType } from "@/components/dashboard/header/NavigationIcons";
import { UserType } from "@/types/users";
import { PostType } from "@/types/post";
import Header from "@/components/dashboard/header/Header";
import SidebarLeft from "@/components/dashboard/sidebar/SidebarLeft";
import SidebarRight from "@/components/dashboard/sidebar/SidebarRight";
import Story from "@/components/dashboard/content/Story";
import Posting from "@/components/dashboard/content/Posting";
import Posts from "@/components/dashboard/content/posts/Posts";
import Post from "@/components/dashboard/content/posts/Post";
import { ErrorStatusEnum } from "@/types/responses";

export default function Dashboard() {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIcon, setActiveIcon] = useState<IconType>(IconType.Home);
  const [user, setUser] = useState<UserType | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newAuthPosts, setNewAuthPosts] = useState<PostType[]>([]);

  const addNewAuthUserPosts = (post: PostType) => {
    setNewAuthPosts((prevState) => [post, ...prevState]);
  };

  const getUserByCookieCallApi = async () => {
    try {
      const response = await axios.get(`/api/users`);
      const data = response.data.data;
      const userData: UserType = {
        userId: data.user_id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        profilePicture: data.profile_picture,
        coverPhoto: data.cover_photo,
        bio: data.bio,
        birthDate: data.birth_date,
        genderId: data.gender_id,
      };
      setUser(userData);
      setIsError(false);
      setIsLoading(false);
    } catch (error: AxiosError | any) {
      if (error.response.status === 404) {
        setUser(null);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserByCookieCallApi();
  }, [newAuthPosts]);

  return (
    <main className="flex min-h-screen flex-col bg-[#F0F2F5]">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg text-gray-600">loading...</p>
        </div>
      ) : isError ? (
        <div className="flex h-screen items-center justify-center">
          <p>Something went wrong...</p>
        </div>
      ) : user === null || user === undefined ? (
        <p className="flex h-screen items-center justify-center">Data user not found...</p>
      ) : (
        <UserContext.Provider value={user}>
          <Fragment>
            {/* Header Navbar */}
            <Header
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              activeIcon={activeIcon}
              setActiveIcon={setActiveIcon}
              user={user}
            />
            {/* Content */}
            <div className="flex h-full w-full pt-14">
              {/* Left Sidebar */}
              <SidebarLeft user={user} />
              {/* Center Content */}
              <div className="ml-72 flex flex-1 flex-col items-center max-[1100px]:ml-0">
                <Story user={user} />
                <Posting user={user} addNewAuthUserPosts={addNewAuthUserPosts} />
                {newAuthPosts.map((post, index) => (
                  <Post key={post.post_id} authUser={user} postParam={post} />
                ))}
                <Posts userId={user.userId} />
              </div>
              {/* Right Sidebar */}
              <SidebarRight />
            </div>
          </Fragment>
        </UserContext.Provider>
      )}
    </main>
  );
}
