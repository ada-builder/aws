import { Site } from './site';

// @TODO REFACTOR THIS
export type AppData = {
  activeSite?: Site;
  activeSiteId?: string;
  email?: string;
  givenName?: string;
  id?: string;
  locale?: string;
  name?: string;
  picture?: string;
  userToken?: string;
};
