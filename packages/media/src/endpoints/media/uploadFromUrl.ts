import {
  MiddlewareEvent,
  MiddlewareHandler,
  parseBody,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';
import { getUserFromAuthToken } from '@ada-builder/user';
import { downloadAndSaveFromUrl } from '../../helpers/streams';
import { v4 as uuid } from 'uuid';
import { insert } from '@ada-builder/database-services';
import { MEDIA_TABLE } from '../../constants';

type Body = {
  url: string;
};

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const { url: uploadUrl } = event.context.body as Body;
    const { user } = event.context;

    const upload = await downloadAndSaveFromUrl({
      siteId: user.activeSiteId,
      url: uploadUrl,
    });

    if (!upload) {
      throw new Error('Upload failed');
    }

    const rowData = {
      createdAt: new Date().toISOString(),
      name: upload.Key?.split('/').pop(),
      id: uuid(),
      key: upload.Key,
      siteId: user.activeSiteId,
      size: 0,
      type: upload.ContentType,
      url: upload.Location,
      uploading: true,
      userId: user.id,
    };
    await insert(MEDIA_TABLE, rowData);
    return rowData;
  },
  {
    middleware: [getUserFromAuthToken, parseBody] as MiddlewareHandler[],
  },
);
