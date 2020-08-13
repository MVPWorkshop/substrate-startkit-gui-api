import { IPalletEntity } from '../../../entities/pallet.entity';
import { EmptyObject, ParamsDictionary } from '../../../types/util.types';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { IResponseSuccess } from '../../../utils/response.util';
import { EPalletCategories, ESupportedPallets } from '../../../pallets/pallets.types';

export enum EPalletsRoute {
  GetPalletsList = 'GetPalletsList',
  GetPallet = 'GetPallet'
}

declare namespace PalletsRouteDefinitions {
  type ResponseBody<T extends EPalletsRoute> =
    // GET /pallets/[pallet-name]
    T extends EPalletsRoute.GetPallet ? IPalletEntity :

    // GET /pallets
    T extends EPalletsRoute.GetPalletsList ? IPalletEntity[] :
    EmptyObject;

  type RequestBody<T extends EPalletsRoute> =
    EmptyObject;

  type RequestQueries<T extends EPalletsRoute> =
    // GET /pallets
    T extends EPalletsRoute.GetPalletsList ? IPalletsListQueries :
    EmptyObject;

  type RequestParams<T extends EPalletsRoute> =
    // GET /pallets/[pallet-name]
    T extends EPalletsRoute.GetPallet ? IPalletParams :
    EmptyObject;

  type Response<T extends EPalletsRoute> = ExpressResponse<IResponseSuccess<ResponseBody<T>>>

  type Request<T extends EPalletsRoute> = ExpressRequest<RequestParams<T> & ParamsDictionary, IResponseSuccess<ResponseBody<T>>, RequestBody<T>, RequestQueries<T>>

  type RouteMethod<T extends EPalletsRoute> = (request: Request<T>, response: Response<T>, next: NextFunction) => Promise<any>;

  // QUERIES
  interface IPalletsListQueries {
    category?: EPalletCategories;
  }

  // PARAMS
  interface IPalletParams {
    palletName: ESupportedPallets;
  }
}

export default PalletsRouteDefinitions;
