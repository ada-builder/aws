export const CDN_URL = 'https://d13c07bhrszae8.cloudfront.net' as const;
export const CDN_BUCKET = process.env.MEDIA_CDN_BUCKET ?? ('' as const);
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ('' as const);

export const SIZE_REPLACE_PATTERN = '[SIZE]' as const;

export const PNG = 'png' as const;
export const WEBP = 'webp' as const;

export const LARGE = 'large' as const;
export const MEDIUM = 'medium' as const;
export const MICRO = 'micro' as const;
export const SMALL = 'small' as const;
export const SOURCE = 'source' as const;

export const MINE = 'mine' as const;
export const ALL = 'all' as const;
