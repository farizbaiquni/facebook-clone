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
  like: number;
  love: number;
  care: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
  total: number;
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
