import db from '../../models';
import PalletAuthor from '../../models/PalletAuthor.model';
import { ModelsMockData } from './_mock_data_';
import Pallet from '../../models/Pallet.model';

describe("Pallet Author model test", () => {
  beforeAll(async () => {
    await db.sync({force: true});
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Create pallet author", () => {
    it("Creates a pallet author", async () => {
      const pallet = new Pallet(ModelsMockData.pallet);
      const palletAuthor = new PalletAuthor(ModelsMockData.palletAuthor);

      await pallet.save();
      const dbData = await palletAuthor.save();
      expect(dbData).toBeTruthy();
      expect(dbData.id).toBe(ModelsMockData.palletAuthor.id)
    })
  })

  describe("Get pallet author", () => {
    it("Gets a pallet author", async () => {
      const author = await PalletAuthor.findOne({
        where: {
          id: ModelsMockData.palletAuthor.id
        }
      })

      expect(author).toBeTruthy();
    })
  })

  describe("Get pallet author by relation", () => {
    it("Get pallet with its author", async () => {
      const authorByRelation = (await Pallet.findOne({
        where: {
          name: ModelsMockData.pallet.name
        },
        include: [
          { model: PalletAuthor }
        ]
      })).authors;

      expect(authorByRelation).toBeTruthy();
      expect(authorByRelation).toHaveLength(1);
    })
  })
})
