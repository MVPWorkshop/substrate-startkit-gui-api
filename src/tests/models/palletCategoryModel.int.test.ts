import db from '../../models';
import PalletCategory from '../../models/PalletCategory.model';
import { ModelsMockData } from './_mock_data_';
import Pallet from '../../models/Pallet.model';

describe("Pallet Category model test", () => {
  beforeAll(async (done) => {
    await db.sync({force: true});
    done();
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Create pallet category", () => {
    it("Creates a pallet category", async () => {
      const pallet = new Pallet(ModelsMockData.pallet);
      const palletCategory = new PalletCategory(ModelsMockData.palletCategory);

      await pallet.save();
      const dbData = await palletCategory.save();
      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.palletCategory.id)
    })
  })

  describe("Get pallet category", () => {
    it("Gets a pallet category", async () => {
      const category = await PalletCategory.findOne({
        where: {
          id: ModelsMockData.palletCategory.id
        }
      })

      expect(category).toBeTruthy();
    })
  })

  describe("Get pallet category by relation", () => {
    it("Get pallet with its category", async () => {
      const categoryByRelation = (await Pallet.findOne({
        where: {
          name: ModelsMockData.pallet.name
        },
        include: [
          { model: PalletCategory }
        ]
      })).categories;

      expect(categoryByRelation).toBeTruthy();
      expect(categoryByRelation).toHaveLength(1);
    })
  })
})
