import {
  MiddlewareContext,
  MiddlewareHandler,
  unauthorizedError,
} from '@ada-builder/api-middleware';
import { parseJwt } from '../helpers';
import { getUserById } from '../database';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getSite } from '@ada-builder/api/dist/utils/sites/db';

export const getUserFromAuthToken: MiddlewareHandler = async ({
  lambdaEvent,
}) => {
  const typedEvent = lambdaEvent as APIGatewayProxyEvent;
  const token = typedEvent?.headers?.Authorization?.split(' ')[1];
  const { data } = parseJwt(token ?? '');

  if (data.role === 'guest') {
    return {
      user: {
        activeSiteId: data.activeSiteId,
        email: '',
        givenName: '',
        id: data.userId,
        locale: '',
        name: '',
        picture: '',
        role: 'guest',
        token,
      },
    };
  }

  if (!data) {
    throw new Error(unauthorizedError());
  }

  let user = null;
  try {
    user = await getUserById(data.userId);
  } catch (e) {
    console.log('err', e);
  }

  if (!user) {
    throw new Error('Not authorized');
  }

  return {
    user: {
      ...user,
      token,
    },
  } as MiddlewareContext;
};
