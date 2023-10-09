import { MiddlewareEvent, MiddlewareHandler } from '../types';
import { APIGatewayEvent, SNSEvent } from 'aws-lambda';

export const parseSnsMessage: MiddlewareHandler = async ({ lambdaEvent }) => {
  let messages = [];
  const typedEvent = lambdaEvent as SNSEvent;

  try {
    if (typedEvent.Records) {
      messages = typedEvent.Records.map(record =>
        JSON.parse(record.Sns.Message),
      );
    }
  } catch (err) {
    // ignore err;
  }

  return {
    messages,
  };
};
