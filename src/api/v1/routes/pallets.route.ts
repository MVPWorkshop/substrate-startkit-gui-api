import PalletsRouteDefinitions, { EPalletsRoute } from '../definitions/pallets.route';
import PalletsService from '../../../services/pallets.service';
import { APIResponse } from '../../../utils/response.util';
import { NotFoundError } from '../../../utils/errors.util';
import { mapPalletEntities, mapPalletEntity } from '../../../entities/pallet.entity';

class PalletsRoute {

  public static getPalletsList: PalletsRouteDefinitions.RouteMethod<EPalletsRoute.GetPalletsList> = async (request, response, next) => {
    try {
      const {
        category
      } = request.query;

      const dbPallets = await PalletsService.list(category);

      if (!dbPallets) {
        throw new NotFoundError();
      }

      const pallets = mapPalletEntities(dbPallets);

      return response.status(200).json(APIResponse.success(pallets));
    } catch (error) {
      next(error);
    }
  }

  public static getPallet: PalletsRouteDefinitions.RouteMethod<EPalletsRoute.GetPallet> = async (request, response, next) => {
    try {
      const {
        palletName
      } = request.params;

      const dbPallet = await PalletsService.pallet(palletName);

      if (!dbPallet) {
        throw new NotFoundError();
      }

      const pallet = mapPalletEntity(dbPallet);

      return response.status(200).json(APIResponse.success(pallet));
    } catch (error) {
      next(error);
    }
  }
}

export default PalletsRoute;
