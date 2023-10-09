import { Providers } from './providers';

export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  picture: string;
  locale: string;
  providers: UserProviders;
  activeSiteId: string;
};

export type UserProviders = Partial<Record<Providers, UserProvider>>;

export type UserProvider = {
  userId: string;
  provider: Providers;
  accessToken: string;
  expiresAt: number;
};
