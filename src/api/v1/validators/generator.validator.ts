import { val } from '../middlewares/validate.middleware';
import { checkSchema } from 'express-validator';
import { ValidatorFields } from '../../../types/util.types';
import GeneratorRouteDefinitions from '../definitions/generator.route';
import { validateEnumList } from '../../../utils/validation.util';
import { ESupportedPallets } from '../../../pallets/pallets.types';

type PostGeneratorFields =
  (keyof GeneratorRouteDefinitions.IPostGeneratorRequestBody)

const postGeneratorSchema: ValidatorFields<PostGeneratorFields> = {
  pallets: {
    in: ['body'],
    errorMessage: 'Provided pallet list is not valid',
    isArray: true,
    custom: validateEnumList(Object.values(ESupportedPallets))
  }
}

export default class GeneratorValidator {
  public static validatePostGenerator = val(checkSchema(postGeneratorSchema))
}
