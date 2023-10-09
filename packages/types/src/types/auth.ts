import { TWITCH } from '../constants';

export type RequestHeaders = {
  Authorization: 'Bearer: ${string}';
};

export type TwitchAuthCallbackQueryParams = {
  code: string;
  scope: string;
};

export type TwitchTokenResponse = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  scope: string[];
  tokenType: string;
};

export type TwitchUser = {
  broadcasterType: string;
  description: string;
  displayName: string;
  id: string;
  login: string;
  offlineImageUrl: string;
  profileImageUrl: string;
  type: string;
  viewCount: number;
  email: string;
  createdAt: string;
};

export type ProviderTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface ProviderUser {
  [TWITCH]: TwitchUser;
}
