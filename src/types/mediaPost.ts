export enum MediaTypeEnum {
  IMAGE = 1,
  VIDEO = 2,
  GIF = 3,
}

export type MediaPostType = {
  media_type_id: MediaTypeEnum;
  media_url: string;
};

export type MediaImageUploadType = {
  file: File;
  downloadUrl: string | null;
};

export type MediaVideoUploadType = {
  file: File;
  downloadUrl: string | null;
};

export enum MediaImageVideoEnum {
  IMAGE,
  VIDEO,
}

export type MediaImageVideoType = {
  id: string;
  file: File;
  downloadUrl: string | null;
  type: MediaImageVideoEnum;
  url: string;
  urlObject: string;
};

export type UploadedImageVideoUrlType = {
  url: string;
  type: MediaImageVideoEnum;
};
