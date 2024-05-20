import React from "react";
import SearchBar from "./SearchBar";
import NavigationIcons, { IconType } from "./NavigationIcons";
import UserActions from "./UserActions";

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
  return (
    <div className="flex h-14 bg-white px-3">
      <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
      <NavigationIcons activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      <UserActions />
    </div>
  );
};

export default Header;
