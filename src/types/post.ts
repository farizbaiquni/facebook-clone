import { AudiencePostType } from "./audienceOptions";
import { MediaPostType } from "./mediaPost";

export type PostType = {};

export type PostCreateType = {
  user_id: string;
  content: string;
  emoji: string | null;
  activity_icon_url: string | null;
  gif_url: string | null;
  latitude: string | null;
  longitude: string | null;
  location_name: string | null;
  audience_type_id: number;
  media: MediaPostType[] | null;
  audience_include: AudiencePostType[] | null;
  audience_exclude: AudiencePostType[] | null;
};
