import { MiddlewareEvent, wrappedEndpoint } from '@ada-builder/api-middleware';
import {
  CDN_BUCKET,
  IMAGE_CONTENT_TYPES,
  MEDIA_S3_LOOKUP_INDEX,
  MEDIA_TABLE,
  SOURCE,
} from '../constants';
import { queueAllResizes } from '../helpers/utils';
import { findOne, update } from '@ada-builder/database-services';
import { getImageDimensions } from '../helpers/streams';

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const { s3 } = event.Records?.[0] ?? {};
    const key = decodeURIComponent(s3.object.key.replace(/\+/g, ' '));
    const url = `https://s3.amazonaws.com/${CDN_BUCKET}/${key}`;

    const [siteId, , size] = key.split('/');

    // Only do things if it's the source image since this is triggered again when the resized images are added
    if (size === SOURCE) {
      // Queue all the resizes
      await queueAllResizes({ siteId, url });

      // Get image from db and add the metadata to the row

      const imageRowData = await findOne(MEDIA_TABLE, {
        data: {
          key,
        },
        index: MEDIA_S3_LOOKUP_INDEX,
      });

      console.log(
        imageRowData,
        IMAGE_CONTENT_TYPES.includes(imageRowData?.type),
      );

      if (IMAGE_CONTENT_TYPES.includes(imageRowData?.type)) {
        const metadata = await getImageDimensions(imageRowData.key);
        console.log('metadata', metadata);
        try {
          await update(
            MEDIA_TABLE,
            {
              id: imageRowData.id,
            },
            {
              data: {
                ...metadata,
                // @ts-ignore
                uploading: false,
              },
            },
          );
        } catch (e) {
          console.log('update error', e);
        }
      }

      console.log('rowData', imageRowData);
    }
  },
  {
    middleware: [],
  },
);
