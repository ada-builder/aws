import {
  MiddlewareEvent,
  MiddlewareHandler,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';
import { getUserFromAuthToken } from '@ada-builder/user';
import { findAll } from '@ada-builder/database-services';
import { MEDIA_TABLE, MEDIA_TABLE_ACCOUNT_INDEX } from '../../constants';
import { MediaItem } from '../../types';

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const { user } = event.context;

    return findAll<MediaItem[]>(MEDIA_TABLE, {
      data: {
        siteId: user.activeSiteId,
      },
      index: MEDIA_TABLE_ACCOUNT_INDEX,
    });
  },
  {
    middleware: [getUserFromAuthToken] as MiddlewareHandler[],
  },
);
