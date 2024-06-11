export enum AudienceOptions {
  OnlyMe = 1,
  Public = 2,
  Friends = 3,
  FriendsExcept = 4,
  SpecificFriends = 5,
  Custom = 6,
}

export const audienceOptionToText = new Map<AudienceOptions, string>([
  [AudienceOptions.Public, "public"],
  [AudienceOptions.Friends, "friends"],
  [AudienceOptions.FriendsExcept, "friends except"],
  [AudienceOptions.SpecificFriends, "specific friends"],
  [AudienceOptions.OnlyMe, "only me"],
  [AudienceOptions.Custom, "custom"],
]);

export type AudiencePostType = {
  post_id: number;
  user_id: string;
};
