import {
  MiddlewareEvent,
  MiddlewareHandler,
  parseBody,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';
import { update } from '@ada-builder/database-services';
import { USERS_TABLE } from '../../constants';
import { getUserFromAuthToken } from '../../middleware';

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const { body, user } = event.context;
    const { siteId } = body;

    return update(
      USERS_TABLE,
      {
        id: user.id,
      },
      {
        data: {
          activeSiteId: siteId,
        },
      },
    );
  },
  {
    middleware: [getUserFromAuthToken, parseBody] as MiddlewareHandler[],
  },
);
