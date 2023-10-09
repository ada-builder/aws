import { GMAIL, TWITCH, YOUTUBE } from '../constants';

export type Providers = typeof TWITCH;

export type User = {
  email: string;
  id: string;
  profileImage?: string;
  providers: UserProvider[];
  username: string;
};

export type UserProvider = {
  id: number;
  accessToken: string;
  displayName?: string;
  loginName?: string;
  provider: Providers;
  providerId: string;
  refreshToken: string;
  type?: string;
  userId: string;
};

export type UserCreate = Omit<User, 'id' | 'providers'>;
export type UserProviderCreate = Omit<UserProvider, 'id'>;
