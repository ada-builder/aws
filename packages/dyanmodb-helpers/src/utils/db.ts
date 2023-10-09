import AWS, { AWSError } from 'aws-sdk';
import chunk from 'lodash/chunk';
import {
  PutItemInputAttributeMap,
  ScanInput,
  ScanOutput,
} from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

const CHUNK_AMOUNT = 90;
export const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1',
  apiVersion: 'latest',
});
export const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  apiVersion: 'latest',
});

export type Params = {
  TableName: string;
};

export const batchGet = async <T = any>(
  Keys: Record<string, string>[],
  params: Params,
): Promise<T> => {
  try {
    const data = await docClient
      .batchGet({
        RequestItems: {
          [params.TableName]: {
            Keys,
          },
        },
      })
      .promise();
    return (data?.Responses?.[params.TableName] ?? []) as unknown as T;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const chunkGet = async <T = any>(
  Keys: Record<string, string>[],
  params: Params,
  chunkAmount = 90,
): Promise<T> => {
  const chunked: Record<string, string>[][] = chunk(Keys, chunkAmount);

  const results: T[] = await Promise.all(
    chunked.map(async chunkedKeys => batchGet<T>(chunkedKeys, params)),
  );

  // @ts-ignore
  return results.flat();
};

export type BuildQueryParams = {
  data: Record<string, string | number>;
  expressionJoin?: string;
  expressionKey?: string;
  expressionPrefix?: string;
};

export type BuildQueryParamsReducer = {
  ExpressionAttributeNames: Record<string, string>;
  ExpressionAttributeValues: Record<string, string | number>;
};

export const buildQueryParams = ({
  data,
  expressionJoin = ', ',
  expressionKey = 'KeyConditionExpression',
  expressionPrefix = '',
}: BuildQueryParams) => {
  const params = Object.entries(data).reduce<BuildQueryParamsReducer>(
    (acc, [field, value], i) => {
      const hasField = field !== null && typeof field !== 'undefined';
      const hasValue = value !== null && typeof value !== 'undefined';
      if (!hasField || !hasValue) {
        return acc;
      }
      const fieldPlaceholder = `#${field}`;
      const valuePlaceholder = `:val${i}`;
      // @ts-ignore
      acc[expressionKey].push(`${fieldPlaceholder} = ${valuePlaceholder}`);
      acc.ExpressionAttributeNames[fieldPlaceholder] = field;
      acc.ExpressionAttributeValues[valuePlaceholder] = value;
      return acc;
    },
    {
      [expressionKey]: [],
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    },
  );
  // @ts-ignore
  params[expressionKey] = `${expressionPrefix} ${params[expressionKey].join(
    ` ${expressionJoin} `,
  )}`.trim();
  return params;
};

export const get = async <T = any>(
  Key: Record<string, string>,
  params: Params,
) => {
  try {
    const data = await docClient
      .get({
        ...params,
        Key,
      })
      .promise();
    return data.Item as T;
  } catch (err) {
    throw new Error(err as string);
  }
};

export type QueryFunctionParams = {
  data: Record<string, string | number>;
  expressionJoin?: string;
  index?: string;
  limit?: number;
  returnAllData?: boolean;
};

export const findAll = async <T>(
  tableName: string,
  { data, expressionJoin = ', ', index }: QueryFunctionParams,
): Promise<T[]> => {
  try {
    const queryParams = buildQueryParams({
      data,
      expressionJoin,
    });

    const params = {
      TableName: tableName,
      ...queryParams,
    };

    if (index) {
      // @ts-ignore
      params.IndexName = index;
    }

    const entries = await docClient.query(params).promise();
    return entries?.Items as T[];
  } catch (err) {
    throw new Error(err as string);
  }
};

export const findOne = async <T = any>(
  tableName: string,
  args: QueryFunctionParams,
) => {
  const all = await findAll<T>(tableName, args);
  // @ts-ignore
  return all?.[0];
};

export const insert = async <T = any>(tableName: string, Item: T) => {
  try {
    const data = await docClient
      .put({
        TableName: tableName,
        Item: Item as unknown as PutItemInputAttributeMap,
      })
      .promise();
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export type Expression = {
  ExpressionAttributeNames?: Record<string, string | null | number>;
  ExpressionAttributeValues: Record<string, string | null | number>;
  FilterExpression: string;
  IndexName?: string;
};

type Scan = { expression?: Expression };

export const scan = async <T = any>(
  tableName: string,
  { expression }: Scan = {},
) => {
  const params = {
    TableName: tableName,
    ...expression,
  } as ScanInput;

  let items: T[] = [];
  let data: ScanOutput;

  do {
    data = await docClient.scan(params).promise();
    items = items.concat(data.Items as T[]);
    params.ExclusiveStartKey = data.LastEvaluatedKey;
  } while (typeof data.LastEvaluatedKey != 'undefined');

  return items;
};

export const query = async <T>(
  tableName: string,
  { data, index, limit }: QueryFunctionParams,
): Promise<T[]> => {
  const queryData = buildQueryParams({ data });

  const params: DocumentClient.QueryInput = {
    TableName: tableName,
    ...queryData,
  };

  if (index) {
    params.IndexName = index;
  }
  if (limit) {
    params.Limit = limit;
  }

  const result = await docClient.query(params).promise();

  return result?.Items as T[];
};

export const update = async (
  tableName: string,
  key: Record<string, string>,
  { data }: QueryFunctionParams,
) => {
  try {
    const updateData = buildQueryParams({
      data,
      expressionKey: 'UpdateExpression',
      expressionPrefix: 'SET',
    });

    const params = {
      TableName: tableName,
      Key: key,
      ...updateData,
      ReturnValues: 'UPDATED_NEW',
    };

    return await docClient.update(params).promise();
  } catch (err) {
    throw new Error(err as string);
  }
};

export const removeItem = (tableName: string, key: Record<string, string>) =>
  docClient
    .delete(
      {
        Key: key,
        TableName: tableName,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    )
    .promise();
