import GeneratorRouteDefinitions, { EGeneratorRoute } from '../definitions/generator.route';
import { APIResponse } from '../../../utils/response.util';
import CodeGeneratorService from '../../../services/codeGenerator.service';
import { IUser } from '../../../entities/user.entity';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class GeneratorRoute {
  public static postGenerator: GeneratorRouteDefinitions.RouteMethod<EGeneratorRoute.PostGenerator> = async (request, response, next) => {
    try {

      const user = request.user as IUser;
      const codeGeneratorService = new CodeGeneratorService();
      const {
        pallets
      } = request.body;

      // We generate the code using the provided pallets
      const projectPath = await codeGeneratorService.generateSubstrateProject(pallets, user);

      // Fake async loading of github
      await sleep(5000);
      const repositoryUrl = 'https://www.github.com/';

      // After everything completed, remove the project from our file system
      await codeGeneratorService.removeProject(projectPath);

      response.status(200).json(APIResponse.success({
        repository: repositoryUrl
      }));

    } catch (error) {
      next(error);
    }
  }
}

export default GeneratorRoute;
