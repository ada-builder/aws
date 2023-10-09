import AWS from 'aws-sdk';
import { CDN_BUCKET, PRESIGNED_EXPIRY } from '../constants';

const s3 = new AWS.S3();

export const sanitizeFilename = (filename: string) => {
  // Extract the extension from the filename
  const extension = filename.slice(filename.lastIndexOf('.'));

  // Remove non-alphanumeric characters from the filename
  const sanitizedName = filename
    .replace(extension, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .replace(/\s+/g, '-');

  // Return the sanitized filename with the preserved extension
  return sanitizedName + extension;
};

export const removeExtension = (filename: string) => {
  const extension = filename.slice(filename.lastIndexOf('.'));
  return filename.replace(extension, '');
};

type GetPreSignedUploadUrl = {
  acl?: string;
  bucket?: string;
  cacheControl?: string;
  expires?: number;
  key: string;
  type: string;
};

export const getPreSignedUploadUrl = ({
  acl = 'public-read',
  bucket,
  cacheControl = 'max-age=31536000',
  expires = PRESIGNED_EXPIRY,
  key,
  type,
}: GetPreSignedUploadUrl) => {
  const params = {
    ACL: acl,
    Bucket: bucket?.trim() ?? CDN_BUCKET,
    CacheControl: cacheControl,
    Key: key,
    ContentType: type,
    Expires: expires,
  };

  return s3.getSignedUrlPromise('putObject', params);
};

type BuildFileNameArgs = {
  siteId: string;
  sizeName?: string;
  url: string;
};

export const buildFileKey = ({
  siteId,
  sizeName = '[SIZE]',
  url,
}: BuildFileNameArgs) => {
  let fileName = url;

  try {
    const parsedUrl = new URL(url);
    fileName = parsedUrl?.pathname?.split?.('/')?.pop()?.split('.')[0] ?? url;
  } catch (e) {
    //ignore
  }
  return `${siteId}/uploads/${sizeName}/${fileName}`;
};

export const getObjectUrl = (key: string) =>
  `https://s3.amazonaws.com/${CDN_BUCKET}/${key}`;
