import {
  MiddlewareEvent,
  MiddlewareHandler,
  parseBody,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';
import { getUserFromAuthToken } from '@ada-builder/user';
import {
  buildFileKey,
  getObjectUrl,
  getPreSignedUploadUrl,
  removeExtension,
  sanitizeFilename,
} from '../../helpers/urls';
import { insert } from '@ada-builder/database-services';
import { MEDIA_TABLE } from '../../constants';
import { v4 as uuid } from 'uuid';
import { formatMessage, sendMessageToSite } from '@ada-builder/sockets/dist';

type Body = {
  name: string;
  size: number;
  type: string;
};

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const body = event.context.body as Body[];
    const { user } = event.context;

    const { activeSiteId, id } = user;

    const data = await Promise.all(
      body.map(async ({ name, size, type }) => {
        const key = buildFileKey({
          siteId: activeSiteId,
          sizeName: 'source',
          url: sanitizeFilename(name),
        });

        const url = removeExtension(
          getObjectUrl(key).replace('/source/', '/[SIZE]/'),
        );

        console.log('KEYY', key);
        console.log('URL', url);

        const rowData = {
          createdAt: new Date().toISOString(),
          name,
          id: uuid(),
          key,
          siteId: activeSiteId,
          size,
          type,
          url,
          uploading: true,
          userId: id,
        };

        let preSignedUrl = '';
        try {
          preSignedUrl = await getPreSignedUploadUrl({ key, type });
        } catch (e) {
          // @ts-ignore
          throw new Error(e);
        }

        console.log('preSignedUrl', preSignedUrl);

        const content = {
          ...rowData,
          preSignedUrl,
        };

        await Promise.all([
          insert(MEDIA_TABLE, rowData),
          sendMessageToSite({
            body: formatMessage({
              action: 'upload',
              content,
              resource: 'media',
            }),
            id: activeSiteId,
          }),
        ]);

        return content;
      }),
    );

    return data;
  },
  {
    middleware: [getUserFromAuthToken, parseBody] as MiddlewareHandler[],
  },
);
