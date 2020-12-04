import GeneratorRouteDefinitions, { EGeneratorRoute } from '../definitions/generator.route';
import { APIResponse } from '../../../utils/response.util';
import CodeGeneratorService from '../../../services/codeGenerator.service';
import { ILoggedInUser } from '../../../entities/user.entity';
import GithubService from '../../../services/github/github.service';
import nodegit from 'nodegit';
import UserService from '../../../services/user.service';
import PalletsService from '../../../services/pallets.service';

class GeneratorRoute {
  public static postGenerator: GeneratorRouteDefinitions.RouteMethod<EGeneratorRoute.PostGenerator> = async (request, response, next) => {
    try {

      const user = request.user as ILoggedInUser;
      const codeGeneratorService = new CodeGeneratorService();
      const {
        pallets
      } = request.body;

      // We generate the code using the provided pallets
      const projectPath = await codeGeneratorService.generateSubstrateProject(pallets, user);

      const githubService = new GithubService(user.accessToken);
      let repositoryUrl: string;

      try {
        const {
          html_url
        } = await githubService.createRepo({
          name: `substrate-blockchain-${Date.now()}`,
          description: 'Substrate blockchain generated with Substrate Startkit',
          private: true
        });

        repositoryUrl = html_url;
      } catch (error) {
        // If github errored remove the project and then throw the error
        await CodeGeneratorService.removeProject(projectPath);

        throw error;
      }

      const githubUser = await githubService.getUser();

      if (githubUser.login !== user.githubUsername) {
        // Updating the username
        await UserService.updateUsername(user.id, githubUser.login);
      }

      // Usually remote is bare, you don;t do any work in remote so there's no work tree, so it's bare repo data
      const isRepositoryBare = 0;
      const repo = await nodegit.Repository.init(projectPath, isRepositoryBare);

      // Refresh the index (Staging area between the working directory and the repo)
      const repoIndex = await repo.refreshIndex();
      // Add all new items
      await repoIndex.addAll();

      // Write the changes
      await repoIndex.write();
      const oid = await repoIndex.writeTree();

      // Create the commit
      const signature = nodegit.Signature.now('Substrate Startkit', 'substrate@mvpworkshop.co');
      await repo.createCommit('HEAD', signature, signature, 'Initial commit', oid, []);

      // Add origin to remote
      const remote = await nodegit.Remote.create(repo, 'origin', repositoryUrl);

      // Push the changes (the project)
      await remote.push(["refs/heads/master:refs/heads/main"], {
        callbacks: {
          credentials: () => {
            // Users credentials used to authorize the push
            return nodegit.Cred.userpassPlaintextNew(githubUser.login, user.accessToken);
          }
        }
      })

      // After everything completed, remove the project from our file system
      await CodeGeneratorService.removeProject(projectPath);

      // And count new downloads
      await PalletsService.incrementNumberOfDownloads(pallets);

      response.status(200).json(APIResponse.success({
        repository: repositoryUrl
      }));

    } catch (error) {
      next(error)
    }
  }
}

export default GeneratorRoute;
