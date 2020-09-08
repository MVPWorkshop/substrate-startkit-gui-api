import { EmptyObject, ParamsDictionary } from '../../../types/util.types';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { IResponseSuccess } from '../../../utils/response.util';
import { ITemplateEntity } from '../../../entities/template.entity';
import { ESupportedPallets } from '../../../pallets/pallets.types';

export enum ETemplatesRoute {
  GetTemplatesList = 'GetTemplatesList',
  PostTemplate = 'PostTemplate'
}

declare namespace TemplatesRouteDefinitions {
  type ResponseBody<T extends ETemplatesRoute> =
  // GET /me
  T extends ETemplatesRoute.GetTemplatesList ? ITemplateEntity[] :
  T extends ETemplatesRoute.PostTemplate ? ITemplateEntity :
    EmptyObject;

  type RequestBody<T extends ETemplatesRoute> =
  T extends ETemplatesRoute.PostTemplate ? IPostTemplateRequestBody :
    EmptyObject;

  type RequestQueries<T extends ETemplatesRoute> =
    EmptyObject;

  type RequestParams<T extends ETemplatesRoute> =
    EmptyObject;

  type Response<T extends ETemplatesRoute> = ExpressResponse<IResponseSuccess<ResponseBody<T>>>

  type Request<T extends ETemplatesRoute> = ExpressRequest<RequestParams<T> & ParamsDictionary, IResponseSuccess<ResponseBody<T>>, RequestBody<T>, RequestQueries<T>>

  type RouteMethod<T extends ETemplatesRoute> = (request: Request<T>, response: Response<T>, next: NextFunction) => Promise<any>;

  interface IPostTemplateRequestBody {
    templateName: string;
    dependencies: ESupportedPallets[];
    description: string;
  }
}

export default TemplatesRouteDefinitions;
