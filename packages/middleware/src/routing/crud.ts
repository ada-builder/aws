import { MiddlewareHandler } from '../types';
import { HttpMethods } from '@ada-builder/aws-types';
import { APIGatewayEvent } from 'aws-lambda';

type Path = [string, string, string, string];

export const getCrudRouting: MiddlewareHandler = async ({ lambdaEvent }) => {
  const typedEvent = lambdaEvent as APIGatewayEvent;
  const method = typedEvent.httpMethod.toLowerCase() as HttpMethods;
  const [resource, id, childResource, childResourceId]: Path = typedEvent.path
    .split('/')
    .slice(1) as Path;

  return {
    route: {
      method,
      resource,
      id,
      childResource,
      childResourceId,
    },
  };
};
