import db from '../../models';
import PalletDependency from '../../models/PalletDependency.model';
import { ModelsMockData } from './_mock_data_';
import Pallet from '../../models/Pallet.model';
import { ESupportedPallets } from '../../pallets/pallets.types';

describe("Pallet Dependency model test", () => {
  beforeAll(async () => {
    await db.sync({force: true});
  })

  afterAll(async () => {
    await db.close();
  })

  describe("Create pallet dependency", () => {
    it("Creates a pallet dependency and a dependant pallet", async () => {
      const pallet = new Pallet(ModelsMockData.pallet);
      const palletMembership = new Pallet(ModelsMockData.generateMockPallet(ESupportedPallets.PALLET_MEMBERSHIP, 'pallet-membership'));
      const palletDemocracy = new Pallet(ModelsMockData.generateMockPallet(ESupportedPallets.PALLET_DEMOCRACY, 'pallet-democracy'));

      const palletDependency = new PalletDependency(ModelsMockData.palletDependency);
      const dependantPallet = new PalletDependency(ModelsMockData.dependantPallet);

      await pallet.save();
      await palletMembership.save();
      await palletDemocracy.save();

      const dbDataDependency = await palletDependency.save();
      const dbDataDependant = await dependantPallet.save();

      expect(dbDataDependency).toBeTruthy();
      expect(dbDataDependency.id).toBe(ModelsMockData.palletDependency.id)

      expect(dbDataDependant).toBeTruthy();
      expect(dbDataDependant.id).toBe(ModelsMockData.dependantPallet.id)
    })
  })

  describe("Get pallet dependency", () => {
    it("Gets a pallet dependency", async () => {
      const dependency = await PalletDependency.findOne({
        where: {
          id: ModelsMockData.palletDependency.id
        }
      })

      expect(dependency).toBeTruthy();
    })
  })

  describe("Get pallet dependency by relation", () => {
    it("Get pallet with its dependency", async () => {
      const dependencyByRelation = await Pallet.findOne({
        where: {
          name: ModelsMockData.pallet.name
        },
        include: [
          { model: PalletDependency, as: 'dependencies' },
          { model: PalletDependency, as: 'dependants' },
        ]
      });

      expect(dependencyByRelation.dependants).toBeTruthy();
      expect(dependencyByRelation.dependants).toHaveLength(1);

      expect(dependencyByRelation.dependencies).toBeTruthy();
      expect(dependencyByRelation.dependencies).toHaveLength(1);
    })
  })
})
