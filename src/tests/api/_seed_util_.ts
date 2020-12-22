import Pallet from '../../models/Pallet.model';
import Configs from '../../pallets';
import { ESupportedPallets } from '../../pallets/pallets.types';
import {
  palletsConfigToAuthorModel, palletsConfigToCategoriesModel,
  palletsConfigToDependencyModel,
  palletsConfigToModel
} from '../../pallets/pallets.util';
import PalletCategory from '../../models/PalletCategory.model';
import PalletAuthor from '../../models/PalletAuthor.model';
import PalletDependency from '../../models/PalletDependency.model';

const seedPallets = async () => {
  const rows = Object.keys(Configs).map(key => {
    const config = Configs[key as ESupportedPallets];
    return {
      ...palletsConfigToModel(config),
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await Pallet.bulkCreate(rows);
}

const seedPalletCategories = async () => {
  const rows: any[] = [];
  for (let palletName in Configs) {
    const config = Configs[palletName as ESupportedPallets];
    for (let categoryRow of palletsConfigToCategoriesModel(config)) {
      rows.push({
        ...categoryRow,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
  }

  await PalletCategory.bulkCreate(rows);
}

const seedPalletAuthors = async () => {
  const rows: any[] = [];
  for (let palletName in Configs) {
    const config = Configs[palletName as ESupportedPallets];
    for (let authorRow of palletsConfigToAuthorModel(config)) {
      rows.push({
        ...authorRow,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
  }

  await PalletAuthor.bulkCreate(rows);
}

const seedPalletDependencies = async () => {
  const rows: any[] = [];
  for (let palletName in Configs) {
    const config = Configs[palletName as ESupportedPallets];
    for (let dependencyRow of palletsConfigToDependencyModel(config)) {
      rows.push({
        ...dependencyRow,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
  }

  await PalletDependency.bulkCreate(rows);
}

export enum ETablesToSeed {
  PALLET = 'PALLET',
  PALLET_CATEGORIES = 'PALLET_CATEGORIES',
  PALLET_AUTHORS = 'PALLET_AUTHORS',
  PALLET_DEPENDENCIES = 'PALLET_DEPENDENCIES'
}

export const seed = async (...tablesToSeed: ETablesToSeed[]) => {

  if (tablesToSeed.includes(ETablesToSeed.PALLET)) {
    await seedPallets();

    if (tablesToSeed.includes(ETablesToSeed.PALLET_CATEGORIES)) {
      await seedPalletCategories();
    }
    if (tablesToSeed.includes(ETablesToSeed.PALLET_AUTHORS)) {
      await seedPalletAuthors();
    }
    if (tablesToSeed.includes(ETablesToSeed.PALLET_DEPENDENCIES)) {
      await seedPalletDependencies();
    }
  }
}
