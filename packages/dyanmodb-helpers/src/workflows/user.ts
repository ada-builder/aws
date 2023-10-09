import { Providers, ProviderUser, ProviderTokens } from '@ada-builder/aws-types';
// import client from '../client';
// import { getUserById } from '../queries/user';
// import {
//   providerNormalizers,
//   providerToUserNormalizer,
// } from '../utils/userNormalizers';

export async function getOrCreateUser<T extends keyof ProviderUser>(
  provider: T,
  userData: ProviderUser[typeof provider],
  providerTokens?: ProviderTokens,
) {
  // const user = await client.user.upsert({
  //   where: {
  //     email: userData.email,
  //   },
  //   update: {},
  //   create: providerToUserNormalizer[provider]({ user: userData }),
  // });
  //
  // const providerData = providerNormalizers[provider]({
  //   providerTokens,
  //   providerUser: {
  //     ...userData,
  //     ...providerTokens,
  //   },
  //   userId: user.id,
  // });
  //
  // console.log('providerData', providerData);
  // const upsertProvider = await client.userProvider.upsert({
  //   where: {
  //     provider_userId: {
  //       provider: provider as string,
  //       userId: user.id,
  //     },
  //   },
  //   update: {},
  //   create: providerData,
  // });
  //
  // return getUserById(user.id, { providers: true });
  return {};
}
