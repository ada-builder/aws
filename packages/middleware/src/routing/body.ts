import { MiddlewareEvent, MiddlewareHandler } from '../types';
import { APIGatewayEvent } from 'aws-lambda';

export const parseBody: MiddlewareHandler = async ({ lambdaEvent }) => {
  let body = {};
  const typedEvent = lambdaEvent as APIGatewayEvent;

  try {
    if (typedEvent.body) {
      body = JSON.parse(typedEvent.body);
    }
  } catch (err) {
    // ignore err;
  }

  return {
    body,
  };
};
