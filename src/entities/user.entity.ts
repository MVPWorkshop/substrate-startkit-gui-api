export interface IUser {
  id: string;
  githubUserId: string;
  githubUsername: string;
}

export interface ILoggedInUser extends IUser {
  accessToken: string;
}
