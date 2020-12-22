import db from '../../models';
import User from '../../models/User.model';
import { ModelsMockData } from './_mock_data_';

describe("User model test", () => {
  beforeAll(async (done) => {
    await db.sync({force: true});
    done();
  })

  afterAll(async () => {
    await db.close();
  })

  describe("User creation works", () => {
    it("Creates a new user", async () => {
      const dbData = await User.create(ModelsMockData.user);

      expect(dbData).toBeTruthy();
      expect(dbData.github_user_id).toBe(ModelsMockData.user.github_user_id);
      expect(dbData.id).toBe(ModelsMockData.user.id);
      expect(dbData.github_username).toBe(ModelsMockData.user.github_username);
    })
  })

  describe("Get user from storage works", () => {
    it("Fetches the user", async () => {
      const dbData = await User.findOne({
        where: {
          id: ModelsMockData.user.id
        }
      })

      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.user.id);
    })
  })
})
