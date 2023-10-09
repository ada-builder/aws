import { getJwt } from '../../helpers';
import {
  MiddlewareEvent,
  parseBody,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';
import { v4 as uuid } from 'uuid';

type Params = {
  siteId: string;
};

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const { siteId } = event.context.body as Params;

    return getJwt(uuid(), {
      activeSiteId: siteId,
      role: 'guest',
    });
  },
  {
    middleware: [parseBody],
  },
);
