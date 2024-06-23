import { MediaPostEnum } from "./mediaPost";

export type AddCommentType = {
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string | null;
  media_type_id: MediaPostEnum | null;
  media_url: string | null;
};

export type CommentMediaType = {
  media_url: string;
  media_type_id: number;
  comment_media_id: number;
};

export type GetCommentType = {
  comment_id: number;
  post_id: number;
  parent_comment_id: number | null;
  user_id: number;
  content: string | null;
  created_at: string;
  updated_at: string;
  comment_media_id: number;
  media_type_id: number;
  media_url: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  total_replies: number;
  total_like: number;
  total_love: number;
  total_haha: number;
  total_wow: number;
  total_sad: number;
  total_angry: number;
};
