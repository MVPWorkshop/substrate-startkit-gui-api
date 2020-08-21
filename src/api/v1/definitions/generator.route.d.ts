import { EmptyObject, ParamsDictionary } from '../../../types/util.types';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { IResponseSuccess } from '../../../utils/response.util';
import { ESupportedPallets } from '../../../pallets/pallets.types';

export enum EGeneratorRoute {
  'PostGenerator' = 'PostGenerator'
}

declare namespace GeneratorRouteDefinitions {
  type ResponseBody<T extends EGeneratorRoute> =
  // POST /generator
    T extends EGeneratorRoute.PostGenerator ? IPostGeneratorResponseBody :
    EmptyObject;

  type RequestBody<T extends EGeneratorRoute> =
    // POST /generator
    T extends EGeneratorRoute.PostGenerator ? IPostGeneratorRequestBody :
    EmptyObject;

  type RequestQueries<T extends EGeneratorRoute> =
    EmptyObject;

  type RequestParams<T extends EGeneratorRoute> =
    EmptyObject;

  type Response<T extends EGeneratorRoute> = ExpressResponse<IResponseSuccess<ResponseBody<T>>>

  type Request<T extends EGeneratorRoute> = ExpressRequest<RequestParams<T> & ParamsDictionary, IResponseSuccess<ResponseBody<T>>, RequestBody<T>, RequestQueries<T>>

  type RouteMethod<T extends EGeneratorRoute> = (request: Request<T>, response: Response<T>, next: NextFunction) => Promise<any>;

  // Response bodies
  interface IPostGeneratorResponseBody {
    repository: string;
  }

  // Request bodies
  interface IPostGeneratorRequestBody {
    // List of the pallets used to generate the project
    pallets: ESupportedPallets[]
  }
}

export default GeneratorRouteDefinitions;
