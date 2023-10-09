export const unauthorizedError = (body: string = 'Not Authorized'): string =>
  JSON.stringify({
    statusCode: 401,
    body,
  });
