import db from '../../models';
import Pallet from '../../models/Pallet.model';
import { ModelsMockData } from './_mock_data_';

describe("Pallet model test", () => {
  beforeAll(async () => {
    await db.sync({force: true});
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Create pallet", () => {
    it("Creates a pallet", async () => {
      const pallet = new Pallet(ModelsMockData.pallet)

      const dbData = await pallet.save();
      expect(dbData).toBeTruthy();
      expect(dbData.name).toBe(ModelsMockData.pallet.name)
    })
  })

  describe("Get pallet", () => {
    it("Gets a pallet", async () => {
      const dbData = await Pallet.findOne({
        where: {
          name: ModelsMockData.pallet.name
        }
      })

      expect(dbData).toBeTruthy();
      expect(dbData.name).toBe(ModelsMockData.pallet.name);
    })
  })
})
