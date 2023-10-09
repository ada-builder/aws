// @ts-ignore
import AWS from 'aws-sdk';
// @ts-ignore
import sharp from 'sharp';
import { CDN_BUCKET } from '../constants';
import stream from 'stream';
import axios from 'axios';
import { buildFileKey } from './urls';

const s3 = new AWS.S3();

export type ResizeStreamArgs = {
  format?: 'webp' | 'png';
  size: [number | undefined, number | undefined];
};

export const resizeStream = ({ size, format = 'webp' }: ResizeStreamArgs) => {
  if (!size) {
    throw new Error('size is required');
  }

  if (!sharp) {
    throw new Error('sharp is not available');
  }

  if (format === 'webp') {
    return sharp()
      .resize(...size)
      .webp();
  } else if (format === 'png') {
    return sharp()
      .resize(...size)
      .png();
  }
};

type UploadStreamArgs = {
  ACL?: string;
  Bucket?: string;
  ContentType?: string;
  Key: string;
  stream: NodeJS.ReadableStream;
};

export const uploadStream = ({
  ACL = 'public-read',
  Bucket = CDN_BUCKET,
  ContentType = 'image/webp',
  Key,
  stream,
}: UploadStreamArgs) => {
  return s3
    .upload({
      ACL,
      Body: stream,
      Bucket,
      ContentType,
      CacheControl: 'max-age=31536000',
      Key,
    })
    .promise();
};

export const getImageDimensions = async (key: string) => {
  const imageBuffer = await s3
    .getObject({ Bucket: CDN_BUCKET, Key: key })
    .promise();
  // @ts-ignore
  const sharpBuffer = sharp(imageBuffer.Body);
  const { width, height } = await sharpBuffer.metadata();

  const aspectRatio = (width ?? 0) / (height ?? 0);
  return {
    aspectRatio: aspectRatio || 1,
    height,
    width,
  };
};

type DownloadAndSaveFromUrl = {
  siteId: string;
  url: string;
};

type DownloadAndSaveFromUrlResult = {
  ContentType: string;
  Key: string;
  Location: string;
};
export const downloadAndSaveFromUrl = ({
  siteId,
  url,
}: DownloadAndSaveFromUrl): Promise<DownloadAndSaveFromUrlResult | null> =>
  new Promise(async (resolve, reject) => {
    const Key = buildFileKey({ siteId, url });
    let promise = null;

    const getUploadStream = (ContentType: string) => {
      const pass = new stream.PassThrough();
      promise = uploadStream({
        Key,
        stream: pass,
      });
      return pass;
    };

    const resp = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    });
    const ContentType = resp.headers['content-type'];

    resp.data.pipe(getUploadStream(ContentType));

    const s3UploadResp: DownloadAndSaveFromUrlResult | null = await promise;

    resolve({
      // @ts-ignore
      ...s3UploadResp,
      ContentType,
    });
  });
