import { User, UserProvider, UserProviders } from '../../types';
import { findAll, findOne } from '@ada-builder/database-services';
import {
  USER_PROVIDERS_TABLE,
  USERS_EMAIL_INDEX,
  USERS_TABLE,
} from '../../constants';

export const getUserById = async (id: string): Promise<User> =>
  findOne<User>(USERS_TABLE, { data: { id } });

export const getUserByEmail = async (email: string): Promise<User> => {
  return findOne<User>(USERS_TABLE, {
    data: { email },
    index: USERS_EMAIL_INDEX,
  });
};

export const getUserProviders = async (
  userId: string,
): Promise<UserProviders> => {
  const providers = await findAll<UserProvider>(USER_PROVIDERS_TABLE, {
    data: { userId },
  });

  return providers.reduce(
    (acc, p) => ({
      ...acc,
      [p.provider]: p,
    }),
    {},
  ) as UserProviders;
};

export const getFullUser = async (userId: string) => {
  const [user, providers] = await Promise.all([
    getUserById(userId),
    getUserProviders(userId),
  ]);

  return {
    ...user,
    providers,
  };
};
