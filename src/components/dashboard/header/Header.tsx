import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import NavigationIcons, { IconType } from "./NavigationIcons";
import UserActions from "./UserActions";
import ProfileMenuOption from "./ProfileMenuOption";

interface HeaderProps {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  activeIcon: IconType;
  setActiveIcon: (icon: IconType) => void;
}

const Header = ({
  isFocused,
  setIsFocused,
  activeIcon,
  setActiveIcon,
}: HeaderProps) => {
  const [isShowProfileMenuOption, setIsShowProfileMenuOption] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleOnClickPhotoProfile = () => {
    setIsShowProfileMenuOption((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setIsShowProfileMenuOption(false);
    }
  };

  useEffect(() => {
    if (isShowProfileMenuOption) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowProfileMenuOption]);

  return (
    <div className="fixed z-30 flex h-14 w-full bg-white px-3">
      <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
      <NavigationIcons activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      <UserActions handleOnClickPhotoProfile={handleOnClickPhotoProfile} />
      {isShowProfileMenuOption && (
        <ProfileMenuOption
          ref={profileMenuRef}
          setIsShowProfileMenuOption={setIsShowProfileMenuOption}
        />
      )}
    </div>
  );
};

export default Header;
