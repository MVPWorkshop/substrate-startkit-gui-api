import User from '../models/User.model';

export interface IUser {
  id: string;
  githubUserId: string;
  githubUsername: string;
}

export interface ILoggedInUser extends IUser {
  accessToken: string;
}

export const mapUserEntity = (user: User): IUser => {
  return {
    id: user.id,
    githubUserId: user.github_user_id,
    githubUsername: user.github_username
  }
}
