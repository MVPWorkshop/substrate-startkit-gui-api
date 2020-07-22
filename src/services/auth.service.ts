import User from '../models/User.model';
import { ILoggedInUser } from '../entities/user.entity';

class AuthService {
  public static async login(accessToken: string, profile: any): Promise<ILoggedInUser> {
    const [dbUser] = await User.findOrCreate({
      where: {
        github_user_id: profile.id
      }
    });

    return {
      id: dbUser.id,
      githubUserId: dbUser.github_user_id,
      accessToken
    };
  }
}

export default AuthService;
