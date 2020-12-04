import '../../../config/passport.config';
import AuthRouteDefinitions, { EAuthRoute } from '../definitions/auth.route.d';
import passport from 'passport';
import User from '../../../models/User.model';
import { APIResponse } from '../../../utils/response.util';
import { ILoggedInUser } from '../../../entities/user.entity';
import { CONFIG } from '../../../config';

class AuthRoute {
  public static me: AuthRouteDefinitions.RouteMethod<EAuthRoute.GetMe> = async (request, response, next) => {
    try {

      const user = request.user as ILoggedInUser;

      return response.status(200).json(APIResponse.success({
        id: user.id,
        githubUserId: user.githubUserId,
        githubUsername: user.githubUsername
      }));

    } catch (error) {
      next(error);
    }
  };

  public static githubAuth: AuthRouteDefinitions.RouteMethod<EAuthRoute.GetAuthGithub> = async (request, response, next) => {
    try {

      passport.authenticate('github', {
        scope: ['repo', 'user:email', 'read:user']
      })(request, response, next);

    } catch (error) {
      next(error);
    }
  };

  public static githubCallback: AuthRouteDefinitions.RouteMethod<EAuthRoute.GetAuthGithubCallback> = async (request, response, next) => {
    try {

      passport.authenticate('github', (err: Error, user: User) => {

        if (err || !user) {
          return response.status(401).redirect(CONFIG.GITHUB_LOGIN_ERROR_REDIRECT_URL)
        }

        request.logIn(user, (err) => {
          if (err) {
            return response.status(401).redirect(CONFIG.GITHUB_LOGIN_ERROR_REDIRECT_URL)
          }

          return response.status(200).redirect(CONFIG.GITHUB_LOGIN_SUCCESS_REDIRECT_URL);
        })

      })(request, response, next);

    } catch (error) {
      next(error);
    }
  }
}

export default AuthRoute;
