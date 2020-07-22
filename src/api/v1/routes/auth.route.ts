import '../../../config/passport.config';
import AuthRouteDefinitions, { EAuthRoute } from '../definitions/auth.route.d';
import passport from 'passport';
import User from '../../../models/User.model';
import { AuthorizationError } from '../../../utils/errors.util';
import { APIResponse } from '../../../utils/response.util';
import { ILoggedInUser } from '../../../entities/user.entity';

class AuthRoute {
  public static me: AuthRouteDefinitions.RouteMethod<EAuthRoute.GetMe> = async (request, response, next) => {
    try {

      const user = request.user as ILoggedInUser;

      return response.status(200).json(APIResponse.success(user))
    } catch (e) {
      next(e);
    }
  };

  public static githubAuth: AuthRouteDefinitions.RouteMethod<EAuthRoute.GetAuthGithub> = async (request, response, next) => {
    try {

      passport.authenticate('github', {
        scope: ['repo', 'user:email', 'read:user']
      })(request, response, next);

    } catch (e) {
      next(e);
    }
  };

  public static githubCallback: AuthRouteDefinitions.RouteMethod<EAuthRoute.GetAuthGithubCallback> = async (request, response, next) => {
    try {

      passport.authenticate('github', (err: Error, user: User) => {

        if (err) {
          next(err);
        }

        if (!user) {
          throw new AuthorizationError();
        }

        request.logIn(user, (err) => {
          if (err) {
            next(err);
          }

          return response.status(200).json(APIResponse.success(user as unknown as ILoggedInUser));
        })

      })(request, response, next);

    } catch (e) {
      next(e);
    }
  }
}

export default AuthRoute;
