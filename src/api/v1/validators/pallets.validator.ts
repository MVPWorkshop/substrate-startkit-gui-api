import PalletsRouteDefinitions from '../definitions/pallets.route';
import { ValidatorFields } from '../../../types/util.types';
import { EPalletCategories } from '../../../pallets/pallets.types';
import { checkSchema } from 'express-validator';
import { val } from '../middlewares/validate.middleware';
import { validateEnum } from '../../../utils/validation.util';

type GetPalletsListFields =
  (keyof PalletsRouteDefinitions.IPalletsListQueries);

const getPalletsListSchema: ValidatorFields<GetPalletsListFields> = {
  category: {
    in: ['query'],
    errorMessage: 'Category is not valid',
    custom: validateEnum(Object.values(EPalletCategories))
  }
}

export default class PalletsValidator {
  public static validateGetPalletsList = val(checkSchema(getPalletsListSchema));
}
