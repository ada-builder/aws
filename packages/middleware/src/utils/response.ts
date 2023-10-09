import { Response } from '../types';

const parseMessage = (
  resp: Response | string | Record<string, any>,
  defaultStatusCode: number,
) => {
  let statusCode = defaultStatusCode;
  let body;

  try {
    const parsedResp = JSON.parse(resp as string);
    statusCode = parsedResp.statusCode;
    body = parsedResp.body;
  } catch (e) {
    if (typeof resp === 'string') {
      body = resp;
    } else {
      statusCode = resp?.statusCode ?? defaultStatusCode;
      body = resp?.body ?? resp;
    }
  }

  return {
    statusCode,
    body,
  };
};

const formatMessage = (body: string, success: boolean = true) =>
  JSON.stringify({
    success,
    payload: body,
  });

export const getCorsResponse = (resp: Record<any, any>) => ({
  ...resp,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    ...resp.headers,
  },
});

export const errorResponse = (
  resp: Response | string | Record<string, any>,
) => {
  const { body, statusCode } = parseMessage(resp, 500);
  return getCorsResponse({
    body: formatMessage(body, false),
    statusCode,
  });
};

export const successResponse = (
  resp: Response | string | Record<string, any>,
) => {
  const { body, statusCode } = parseMessage(resp, 200);
  return getCorsResponse({
    body: formatMessage(body),
    statusCode,
  });
};
