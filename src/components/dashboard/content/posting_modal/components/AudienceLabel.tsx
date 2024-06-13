import { Fragment } from "react";
import { AudienceOptions, audienceOptionToText } from "@/types/audiences";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  UserIcon,
  UsersIcon,
  UserGroupIcon,
  UserMinusIcon,
  LockClosedIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

type AudienceLabelType = {
  selectedAudienceOption: AudienceOptions;
};

export default function AudienceLabel({
  selectedAudienceOption: audienceType,
}: AudienceLabelType) {
  const audience = audienceOptionToText.get(audienceType);

  const renderAudienceIcon = () => {
    switch (audienceType) {
      case AudienceOptions.Public:
        return <UsersIcon className="h-4 w-4 text-gray-700" />;
      case AudienceOptions.Friends:
        return <UserGroupIcon className="h-4 w-4 text-gray-700" />;
      case AudienceOptions.FriendsExcept:
        return <UserMinusIcon className="h-4 w-4 text-gray-700" />;
      case AudienceOptions.SpecificFriends:
        return <UserIcon className="h-4 w-4 text-gray-700" />;
      case AudienceOptions.OnlyMe:
        return <LockClosedIcon className="h-4 w-4 text-gray-700" />;
      case AudienceOptions.Custom:
        return <CogIcon className="h-4 w-4 text-gray-700" />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      {renderAudienceIcon()}
      <p className="mx-1 text-xs font-semibold">{audience}</p>
      <ChevronDownIcon className="h-4 w-4 text-gray-700" />
    </Fragment>
  );
}
