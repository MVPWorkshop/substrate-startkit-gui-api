import db from '../../models';
import Pallet from '../../models/Pallet.model';
import { ESubstrateVersion, ESupportedPallets } from '../../pallets/pallets.types';

describe("Pallet model test", () => {
  beforeAll(async () => {
    await db.sync({force: true});
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Create pallet", () => {
    it("Creates a pallet", async () => {
      const pallet = new Pallet({
        name: ESupportedPallets.PALLET_TREASURY,
        size: 1000,
        downloads: 0,
        package_name: 'pallet-treasury',
        version: '2.0.0',
        license: 'Apache',
        package_last_update: 1000,
        description: 'Long description',
        short_description: 'Short Description',
        compatibility: ESubstrateVersion.TWO,
      })

      const dbData = await pallet.save();
      expect(dbData).toBeTruthy();
      expect(dbData.name).toBe(ESupportedPallets.PALLET_TREASURY)
    })
  })

  describe("Get pallet", () => {
    it("Gets a pallet", async () => {
      const dbData = await Pallet.findOne({
        where: {
          name: ESupportedPallets.PALLET_TREASURY
        }
      })

      expect(dbData).toBeTruthy();
      expect(dbData.name).toBe(ESupportedPallets.PALLET_TREASURY);
    })
  })
})
