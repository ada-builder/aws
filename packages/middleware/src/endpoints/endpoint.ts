import { errorResponse, successResponse, withMiddlewares } from '../utils';
import {
  LambdaEvent,
  MiddlewareEvent,
  WrappedEndpointFunc,
  WrappedEndpointOptions,
} from '../types';
import { Context } from 'aws-lambda';

export function wrappedEndpoint(
  endpoint: WrappedEndpointFunc,
  { middleware = [] }: WrappedEndpointOptions,
) {
  return async (event: LambdaEvent, context: Context) => {
    try {
      const resp = await withMiddlewares(
        middleware,
        async (injectedEvent: MiddlewareEvent) => {
          const resp = await endpoint(injectedEvent);
          return successResponse(resp);
        },
      )(event, context);
      return resp;
    } catch (e: any) {
      return errorResponse(e.message ?? e.toString());
    }
  };
}
