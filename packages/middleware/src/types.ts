import {
  APIGatewayEvent,
  APIGatewayProxyEvent,
  Context,
  S3Event,
  SNSEvent,
  SQSEvent,
} from 'aws-lambda';
import { WorkflowEvent } from '@ada-builder/aws-types';

export type WrappedEndpointFunc = (event: MiddlewareEvent) => any;
export type WrappedEndpointOptions = {
  middleware?: MiddlewareHandler[];
  name?: string; // For the future
};

export type LambdaEvent = APIGatewayProxyEvent | S3Event | SQSEvent | SNSEvent;
export type EventTypes = APIGatewayEvent;
export type MiddlewareContext = Record<string, any>;
export type MiddlewareError = {
  message: string;
};
export type MiddlewareAPIGatewayEvent = APIGatewayEvent & MiddlewareContext;
export type MiddlewareS3 = S3Event & MiddlewareContext;
export type MiddlewareSQS = SQSEvent & MiddlewareContext;
export type MiddlewareSnS = SNSEvent & MiddlewareContext;
export type MiddlewareEvent =
  | MiddlewareAPIGatewayEvent
  | MiddlewareS3
  | MiddlewareSnS
  | MiddlewareSQS;
export type MiddlewareArgs = {
  context: MiddlewareContext;
  lambdaEvent: LambdaEvent;
};
export type MiddlewareHandler = (
  args: MiddlewareArgs,
) => Promise<MiddlewareContext>;

export type Handler = (
  event: MiddlewareEvent,
  context: Context,
  callback?: LambdaEvent,
) => void | Record<string, any>;

export type Response<T = string | Record<string, any>> = {
  statusCode?: number;
  body?: T;
};

export type WrappedWorkflowFunc = (event: WorkflowEvent) => void;

export type WrappedWorkflowOptions = {
  middleware?: MiddlewareHandler[];
  name?: string; // For the future
};
