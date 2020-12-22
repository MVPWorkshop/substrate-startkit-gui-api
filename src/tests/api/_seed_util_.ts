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
import { ModelsMockData } from '../models/_mock_data_';
import Template from '../../models/Template.model';
import TemplateDependency from '../../models/TemplateDependency.model';
import User from '../../models/User.model';

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

const seedUsers = async () => {
  await User.bulkCreate([
    ModelsMockData.user,
    ModelsMockData.user2
  ]);
}

const seedTemplates = async () => {
  await Template.bulkCreate([
    ModelsMockData.template,
    ModelsMockData.privateTemplate
  ])
}

const seedTemplateDependencies = async () => {
  await TemplateDependency.bulkCreate([
    ModelsMockData.templateDependency,
    ModelsMockData.privateTemplateDependency
  ])
}

export enum ETablesToSeed {
  PALLET = 'PALLET',
  PALLET_CATEGORIES = 'PALLET_CATEGORIES',
  PALLET_AUTHORS = 'PALLET_AUTHORS',
  PALLET_DEPENDENCIES = 'PALLET_DEPENDENCIES',
  TEMPLATE = 'TEMPLATE',
  TEMPLATE_DEPENDENCIES = 'TEMPLATE_DEPENDENCIES',
  USER = 'USER'
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

    if (tablesToSeed.includes(ETablesToSeed.USER)) {
      await seedUsers();

      if (tablesToSeed.includes(ETablesToSeed.TEMPLATE)) {
        await seedTemplates();

        if (tablesToSeed.includes(ETablesToSeed.TEMPLATE_DEPENDENCIES)) {
          await seedTemplateDependencies();
        }
      }
    }
  }
}
