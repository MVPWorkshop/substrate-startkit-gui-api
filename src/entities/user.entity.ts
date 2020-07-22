export interface IUser {
  id: string;
  githubUserId: string;
}

export interface ILoggedInUser extends IUser {
  accessToken: string;
}
