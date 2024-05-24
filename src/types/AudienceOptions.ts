export enum AudienceOptions {
  Public,
  Friends,
  FriendsExcept,
  SpecificFriends,
  OnlyMe,
  Custom,
}

export const audienceOptionToText = new Map<AudienceOptions, string>([
  [AudienceOptions.Public, "public"],
  [AudienceOptions.Friends, "friends"],
  [AudienceOptions.FriendsExcept, "friends except"],
  [AudienceOptions.SpecificFriends, "specific friends"],
  [AudienceOptions.OnlyMe, "only me"],
  [AudienceOptions.Custom, "custom"],
]);
