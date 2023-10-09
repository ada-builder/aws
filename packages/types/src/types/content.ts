import { FormSchema } from './form';

export type ContentSchema<T = any> = {
  id: string;
  createdAt: number;
  fields: ContentSchemaField[] | string;
  siteId: string;
  updatedAt: number;
  createdBy: string;
  items: ContentSchemaItems<T>[];
  form?: FormSchema;
  name: string;
};

export type ContentSchemaItems<T = any> = BaseContentItem[] | ContentItem<T>[];

export type ContentSchemaField = {
  name: string;
  type: string;
};

export type BaseContentItem = {
  content: string;
  createdAt: number;
  createdBy: string;
  id: string;
  schemaId: string;
  siteId: string;
  updatedAt: number;
};

export type ContentItem<T = any> = Omit<BaseContentItem, 'content'> & T;
