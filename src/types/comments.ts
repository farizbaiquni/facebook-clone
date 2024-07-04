import { MediaTypeEnum } from "./mediaPost";

export type AddCommentType = {
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string | null;
  media_type_id: MediaTypeEnum | null;
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
  is_deleted: boolean;
  deleted_at: string;
  total_reactions: number;
  total_replies: number;
  total_shares: number;
  total_likes: number;
  total_loves: number;
  total_haha: number;
  total_wows: number;
  total_sads: number;
  total_angries: number;
  created_at: string;
  updated_at: string;
  comment_media_id: MediaTypeEnum;
  media_type_id: number;
  media_url: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
};
