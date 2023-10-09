import { ALL, LARGE, MEDIUM, MICRO, MINE, SMALL, SOURCE } from '../constants';

export type FileSize =
  | typeof SOURCE
  | typeof SMALL
  | typeof MEDIUM
  | typeof LARGE
  | typeof MICRO;

export type FileSizeInfo = {
  aspectRatio?: string;
  height?: number;
  sizeName: FileSize;
  width?: number;
};

export type MediaItem = FileSizeInfo & {
  id: string;
  key: string;
  name: string;
  siteId: string;
  type: string;
  url: string;
  userId: string;
};

export type PreSignedMediaItem = MediaItem & {
  preSignedUrl: string;
};

export type MediaGalleryTypes = typeof MINE | typeof ALL;
