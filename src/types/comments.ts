import { MediaPostEnum } from "./mediaPost";

export type CommentCreateType = {
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

export type CommentsGetType = {
  comment_id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  media: CommentMediaType | null;
  total_replies: number;
};
