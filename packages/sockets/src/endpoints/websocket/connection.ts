import { APIGatewayProxyEvent } from 'aws-lambda';
import { insert, removeItem } from '@ada-builder/database-services';
import { CONNECTIONS_TABLE } from '../../constants';
import { sendMessage } from '../../helpers';
import { getUserById, parseJwt } from '@ada-builder/user';
import { formatMessage } from '../../helpers/utils';

export const handler = async function (event: APIGatewayProxyEvent) {
  const {
    body,
    requestContext: { connectionId, routeKey },
  } = event;

  const parsedBody = body && JSON.parse(body);

  switch (routeKey) {
    case '$connect':
      if (event?.queryStringParameters?.token) {
        console.log(
          'CONNECT',
          connectionId,
          event?.queryStringParameters?.token,
        );
        const token = parseJwt(event?.queryStringParameters?.token);
        console.log('TOKEN??', token);
        if (token) {
          const userData =
            token.data.role === 'guest'
              ? token.data
              : await getUserById(token.data.userId);
          console.log('USER DATA', userData);
          if (userData) {
            await insert(CONNECTIONS_TABLE, {
              connectionId,
              userId: token.data.userId,
              siteId: userData.activeSiteId,
            });
          }
        }
      }
      break;

    case 'ping':
      if (connectionId) {
        await sendMessage({
          body: formatMessage({ content: { message: 'pong' } }),
          id: connectionId,
        });
      }
      break;

    case '$disconnect':
      if (connectionId) {
        await removeItem(CONNECTIONS_TABLE, { connectionId });
      }
      break;
  }

  // Return a 200 status to tell API Gateway the message was processed
  // successfully.
  // Otherwise, API Gateway will return a 500 to the client.
  return { statusCode: 200 };
};
