import AWS from 'aws-sdk';
import { LARGE, MEDIUM, MICRO, SMALL, SQS_URL } from '../constants';
import { FileSizeInfo } from '../types';

const sqs = new AWS.SQS();

const FILE_SIZES: FileSizeInfo[] = [
  { width: 50, sizeName: MICRO },
  { width: 100, sizeName: SMALL },
  { width: 600, sizeName: MEDIUM },
  { width: 1100, sizeName: LARGE },
];

type QueueResizeArgs = {
  siteId: string;
  sizeInfo: FileSizeInfo;
  url: string;
};

export const queueResize = async ({ siteId, sizeInfo, url }: QueueResizeArgs) =>
  sqs
    .sendMessage({
      MessageBody: JSON.stringify({
        ...sizeInfo,
        siteId,
        url,
      }),
      QueueUrl: SQS_URL,
    })
    .promise();

type QueueAllResizeArgs = {
  siteId: string;
  url: string;
};

export const queueAllResizes = ({ siteId, url }: QueueAllResizeArgs) =>
  Promise.all(
    FILE_SIZES.map(sizeInfo =>
      queueResize({
        siteId,
        sizeInfo,
        url,
      }),
    ),
  );
