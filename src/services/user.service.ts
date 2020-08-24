import User from '../models/User.model';

class UserService {
  public static async getUserById(userId: string) {
    return User.findOne({
      where: {
        id: userId
      }
    });
  }

  public static async updateUsername(userId: string, username: string) {
    const dbUser = await this.getUserById(userId);

    dbUser.update({
      github_username: username
    })
  }
}

export default UserService;
