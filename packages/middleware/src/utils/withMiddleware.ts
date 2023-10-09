import { APIGatewayEvent, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { errorResponse } from './response';
import {
  Handler,
  MiddlewareContext,
  MiddlewareError,
  MiddlewareEvent,
  MiddlewareHandler,
} from '../types';

export const withMiddlewares =
  (funcs: MiddlewareHandler[], handler: Handler) =>
  async (lambdaEvent: MiddlewareEvent, lambdaContext: Context) => {
    let middlewareContext: MiddlewareContext = {};

    for (const func of funcs) {
      try {
        const newContextValue = await func({
          context: middlewareContext,
          lambdaEvent,
        });
        middlewareContext = {
          ...middlewareContext,
          ...newContextValue,
        };
      } catch (e) {
        console.error(e);
        return errorResponse((e as MiddlewareError).message);
      }
    }

    return handler(
      {
        ...lambdaEvent,
        context: middlewareContext,
      },
      lambdaContext,
    );
  };
