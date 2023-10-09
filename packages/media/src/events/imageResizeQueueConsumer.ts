import {
  MiddlewareEvent,
  parseSqs,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';
// @ts-ignore
import stream from 'stream';
import axios from 'axios';
import { FileSizeInfo } from '../types';
import { resizeStream, uploadStream } from '../helpers/streams';
import { CDN_BUCKET } from '../constants';
import { buildFileKey } from '../helpers/urls';

type Events = FileSizeInfo & {
  siteId: string;
  url: string;
};

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    console.log(JSON.stringify(event, null, 2));
    await Promise.all(
      (event.context.events as Events[]).map(
        async ({ width, height, sizeName, siteId, url }) => {
          if (!url || !siteId) {
            throw new Error('url and siteId are required');
          }

          const destKey = buildFileKey({ siteId, sizeName, url });

          const size = [width, height] as [
            number | undefined,
            number | undefined,
          ];

          try {
            const streamResp = await axios({
              url,
              method: 'GET',
              responseType: 'stream',
            });

            const imageStream = streamResp.data
              .pipe(new stream.PassThrough())
              .pipe(resizeStream({ size }));

            const imageStreamPng = streamResp.data
              .pipe(new stream.PassThrough())
              .pipe(resizeStream({ size, format: 'png' }));

            await Promise.all([
              uploadStream({
                Bucket: CDN_BUCKET,
                Key: `${destKey}.webp`,
                stream: imageStream,
              }),
              uploadStream({
                Bucket: CDN_BUCKET,
                Key: `${destKey}.png`,
                stream: imageStreamPng,
              }),
            ]);
          } catch (e) {
            console.error(e);
            throw new Error('Failed to resize image');
          }
        },
      ),
    );
  },
  {
    middleware: [parseSqs],
  },
);
