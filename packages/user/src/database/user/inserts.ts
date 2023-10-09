import { User, UserProvider, UserProviders } from '../../types';
import { v4 as uuid } from 'uuid';
import { getUserById, getUserProviders } from './queries';
import { insert } from '@ada-builder/database-services';
import { USER_PROVIDERS_TABLE, USERS_TABLE } from '../../constants';

export const addUser = async ({ id, ...user }: User) => {
  const resolvedId = id ?? uuid();
  await insert<User>(USERS_TABLE, {
    id: resolvedId,
    ...user,
  });

  return getUserById(resolvedId);
};

export const addUserProvider = async (
  userId: string,
  { userId: currentUserId, ...provider }: UserProvider,
): Promise<UserProviders> => {
  const resolvedUserId = userId ?? currentUserId;
  await insert<UserProvider>(USER_PROVIDERS_TABLE, {
    userId,
    ...provider,
  });

  return getUserProviders(resolvedUserId);
};
