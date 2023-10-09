import { GET, PUT, POST, DELETE } from '../constants';

export type HttpMethods = typeof GET | typeof POST | typeof PUT | typeof DELETE;

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  payload: T;
};
