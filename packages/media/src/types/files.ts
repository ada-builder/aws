import { LARGE, MEDIUM, MICRO, SMALL, SOURCE } from '../constants';

export type FileSize =
  | typeof SOURCE
  | typeof SMALL
  | typeof MEDIUM
  | typeof LARGE
  | typeof MICRO;

export type FileSizeInfo = {
  height?: number;
  sizeName: FileSize;
  width?: number;
};

export type MediaItem = FileSizeInfo & {
  id: string;
  url: string;
  type: string;
};
