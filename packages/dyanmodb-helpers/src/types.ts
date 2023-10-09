import { GET, POST, PUT } from '@ada-builder/aws-types';
import { QueryFunctionParams } from './utils/db';

export type ResourceTypeByHttpMethod = {
  [GET]: ResourceTypeByGetRequest;
  [POST]: ResourceTypeByPostRequest;
  [PUT]: ResourceTypeByPostRequest;
};

export type ResourceTypeByGetRequest = {};

export type ResourceTypeByPostRequest = {};

export type HttpMethods = keyof ResourceTypeByHttpMethod;
export type AllResources = keyof ResourceTypeByGetRequest;

export type CrudResourceQueryArgs = QueryFunctionParams & {
  tableName: string;
};
