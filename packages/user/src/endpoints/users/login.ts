import { User, UserProvider } from '../../types';
import { addUser, addUserProvider, getUserByEmail } from '../../database';
import { getJwt } from '../../helpers';
import {
  MiddlewareEvent,
  parseBody,
  wrappedEndpoint,
} from '@ada-builder/api-middleware';

type Params = {
  provider: UserProvider;
  user: User;
};

export const handler = wrappedEndpoint(
  async (event: MiddlewareEvent) => {
    const { provider, user } = event.context.body as Params;

    let localUser = await getUserByEmail(user.email);

    if (!localUser) {
      localUser = await addUser(user);
    }

    localUser.providers = await addUserProvider(localUser.id, provider);

    return {
      ...localUser,
      accessToken: getJwt(localUser.id),
    };
  },
  {
    middleware: [parseBody],
  },
);
