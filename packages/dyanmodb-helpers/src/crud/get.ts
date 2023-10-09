import { findAll, QueryFunctionParams } from '../utils/db';
import { CrudResourceQueryArgs } from '../types';

export const getResources = ({
  tableName,
  ...queryParams
}: CrudResourceQueryArgs) => findAll(tableName, queryParams);

export const getResourcesByUserId = ({
  tableName,
  ...queryParams
}: CrudResourceQueryArgs) => findAll(tableName, queryParams);
