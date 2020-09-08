import TemplatesRouteDefinitions from '../definitions/templates.route';
import { ValidatorFields } from '../../../types/util.types';
import { validateEnumList } from '../../../utils/validation.util';
import { ESupportedPallets } from '../../../pallets/pallets.types';
import { checkSchema } from 'express-validator';
import { val } from '../middlewares/validate.middleware';

type PostTemplateFields =
  (keyof TemplatesRouteDefinitions.IPostTemplateRequestBody)

const postTemplateSchema: ValidatorFields<PostTemplateFields> = {
  description: {
    in: ['body'],
    errorMessage: 'Description must be a string',
    isString: true,
    exists: true
  },
  dependencies: {
    in: ['body'],
    errorMessage: 'Dependency name format is not correct',
    exists: true,
    custom: validateEnumList(Object.values(ESupportedPallets))
  },
  templateName: {
    in: ['body'],
    errorMessage: 'Template name must be a string',
    isString: true,
    exists: true
  }
}

export default class TemplatesValidator {
  public static validatePostTemplate = val(checkSchema(postTemplateSchema));
}
