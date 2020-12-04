import RestService from '../rest.service';
import { CONFIG } from '../../config';
import { ICreateRepoRequest, ICreateRepoResponse, IGithubUserDataResponse } from './githubService.types';

class GithubService extends RestService {

  constructor(githubOauthToken: string) {
    super({
      baseUrl: CONFIG.GITHUB_API_URL,
      authConfig: {
        token: githubOauthToken
      },
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });
  }

  public async getUser(): Promise<IGithubUserDataResponse> {
    try {
      const response = await this.get<IGithubUserDataResponse>({
        url: '/user'
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createRepo(data: ICreateRepoRequest): Promise<ICreateRepoResponse> {
    try {
      const response = await this.post<ICreateRepoResponse>({
        url: '/user/repos',
        data
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default GithubService;
