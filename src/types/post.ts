import { MediaPostType } from "./mediaPost";

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
  audience_include: number[] | null;
  audience_exclude: number[] | null;
};

type ReactionsType = {
  total_likes: number;
  total_loves: number;
  total_cares: number;
  total_haha: number;
  total_wows: number;
  total_sads: number;
  total_angries: number;
  total_reactions: number;
};

export type PostType = {
  post_id: number;
  user_id: number;
  content: string;
  emoji: string | null;
  activity_icon_url: string | null;
  gif_url: string | null;
  latitude: string | null;
  longitude: string | null;
  location_name: string | null;
  audience_type_id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  media: MediaPostType[];
  reactions: ReactionsType;
  total_comments: number;
  total_shares: number;
};
