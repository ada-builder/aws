export const MEDIA_TABLE = 'Media' as const;
export const MEDIA_TABLE_USER_INDEX = 'user-index' as const;
export const MEDIA_TABLE_ACCOUNT_INDEX = 'site-index' as const;
export const MEDIA_S3_LOOKUP_INDEX = 's3-lookup-index' as const;
export const SQS_URL = process.env.IMAGE_PROCESSING_QUEUE_URL ?? '';
export const CDN_URL =
  process.env.MEDIA_CDN_URL ?? 'https://d13c07bhrszae8.cloudfront.net';
export const CDN_BUCKET = process.env.MEDIA_CDN_BUCKET ?? '';
export const PRESIGNED_EXPIRY = parseInt(
  process.env.MEDIA_PRESIGNED_EXPIRY ?? '120',
  10,
);

export const PNG_CONTENT_TYPE = 'image/png' as const;
export const JPG_CONTENT_TYPE = 'image/jpeg' as const;
export const GIF_CONTENT_TYPE = 'image/gif' as const;
export const WEBP_CONTENT_TYPE = 'image/webp' as const;
export const AVIF_CONTENT_TYPE = 'image/avif' as const;

export const IMAGE_CONTENT_TYPES = [
  PNG_CONTENT_TYPE,
  JPG_CONTENT_TYPE,
  GIF_CONTENT_TYPE,
  WEBP_CONTENT_TYPE,
  AVIF_CONTENT_TYPE,
] as const;

export const LARGE = 'large' as const;
export const MEDIUM = 'medium' as const;
export const MICRO = 'micro' as const;
export const SMALL = 'small' as const;
export const SOURCE = 'source' as const;
