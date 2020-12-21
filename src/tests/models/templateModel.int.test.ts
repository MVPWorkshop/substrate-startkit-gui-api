import db from '../../models';
import Template from '../../models/Template.model';
import { ModelsMockData } from './_mock_data_';
import User from '../../models/User.model';

describe("Template model test", () => {
  beforeAll(async () => {
    await db.sync({force: true});
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Template creation", () => {
    test("Public template creation", async () => {
      await User.create(ModelsMockData.user);
      const dbData = await Template.create(ModelsMockData.template);

      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.template.id);
    })
  })

  describe("Template fetching", () => {
    test("Public template can be fetched", async () => {
      const dbData = await Template.findOne({
        where: {
          id: ModelsMockData.template.id
        }
      })

      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.template.id);
    })
  })
})
