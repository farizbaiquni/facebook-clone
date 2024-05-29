type MediaFormat = {
  url: string;
  duration: number;
  preview: string;
  dims: [number, number];
  size: number;
};

type MediaFormats = {
  gif: MediaFormat;
};

export type GifType = {
  id: string;
  title: string;
  media_formats: MediaFormats;
  created: number;
  content_description: string;
  itemurl: string;
  url: string;
  tags: string[];
  flags: string[];
  hasaudio: boolean;
};

export type GifsAPIType = {
  results: GifType[];
  next: number | null;
};
