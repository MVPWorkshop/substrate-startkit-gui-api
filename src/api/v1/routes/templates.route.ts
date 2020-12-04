import TemplatesRouteDefinitions, { ETemplatesRoute } from '../definitions/templates.route';
import TemplatesService from '../../../services/templates.service';
import { mapTemplateEntities, mapTemplateEntity } from '../../../entities/template.entity';
import { APIResponse } from '../../../utils/response.util';
import { IUser } from '../../../entities/user.entity';
import Database from '../../../models';

class TemplatesRoute {
  public static getTemplatesList: TemplatesRouteDefinitions.RouteMethod<ETemplatesRoute.GetTemplatesList> = async (request, response, next) => {
    try {
      const dbTemplates = await TemplatesService.list(request.user as IUser);

      const templates = mapTemplateEntities(dbTemplates);

      return response.status(200).json(APIResponse.success(templates));
    } catch (error) {
      next(error);
    }
  }

  public static postTemplate: TemplatesRouteDefinitions.RouteMethod<ETemplatesRoute.PostTemplate> = async (request, response, next) => {
    try {

      const {
        dependencies,
        templateName,
        description
      } = request.body;

      const tx = await Database.transaction();
      const dbTemplate = await TemplatesService.createTemplate({
        templateName,
        dependencies,
        public: false,
        description,
        authorUserId: (request.user as IUser).id
      }, tx);

      const template = mapTemplateEntity(dbTemplate);

      return response.status(200).json(APIResponse.success(template));
    } catch (error) {
      next(error);
    }
  }
}

export default TemplatesRoute;
