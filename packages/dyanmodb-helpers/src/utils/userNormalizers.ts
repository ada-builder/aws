import {
  Providers,
  ProviderTokens,
  TWITCH,
  TwitchUser,
} from '@ada-builder/aws-types';

type ProviderNormalizerArgs = {
  providerTokens?: ProviderTokens;
  providerUser: TwitchUser;
  userId: string;
};

type ProviderToUserNormalizer = {
  user: TwitchUser;
};

export const providerToUserNormalizer: Record<
  Providers,
  (args: ProviderToUserNormalizer) => any
> = {
  [TWITCH]: ({ user }) => ({
    email: user.email,
    username: user.displayName,
    profileImage: user.profileImageUrl,
  }),
};

export const providerNormalizers: Record<
  Providers,
  (args: ProviderNormalizerArgs) => any
> = {
  [TWITCH]: ({
    providerTokens,
    providerUser,
    userId,
  }: ProviderNormalizerArgs): any =>
    ({
      ...{
        providerId: providerUser.id,
        displayName: providerUser.displayName,
        loginName: providerUser.login,
        type: providerUser.type,
        provider: TWITCH,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      ...(providerTokens?.accessToken
        ? { accessToken: providerTokens.accessToken }
        : {}),
      ...(providerTokens?.refreshToken
        ? { refreshToken: providerTokens.refreshToken }
        : {}),
    } as any),
};
