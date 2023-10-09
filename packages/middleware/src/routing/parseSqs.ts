import { MiddlewareHandler } from '../types';
import { SQSEvent } from 'aws-lambda';

export const parseSqs: MiddlewareHandler = async ({ lambdaEvent }) => {
  const typedEvent = lambdaEvent as SQSEvent;

  return {
    events: typedEvent.Records.map(record => {
      try {
        return JSON.parse(record.body);
      } catch (e) {
        return null;
      }
    }).filter(Boolean),
  };
};
