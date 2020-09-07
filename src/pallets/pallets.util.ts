import { IPalletConfig } from './pallets.types';
import { IPalletAttributes } from '../models/Pallet.model';
import { IPalletCategoryAttributes } from '../models/PalletCategory.model';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import { IPalletAuthorAttributes } from '../models/PalletAuthor.model';
import { IPalletDependencyAttributes } from '../models/PalletDependency.model';

/**
 * @description Util function used to convert a pallet config into Pallet attributes of the sequelize model
 * @param config
 */
export function palletsConfigToModel(config: IPalletConfig<string>): IPalletAttributes {
  return {
    name: config.name,
    size: config.metadata.size,
    downloads: 0,
    package_name: config.dependencies.pallet.package,
    version: config.dependencies.pallet.version,
    license: config.metadata.license,
    package_last_update: moment(config.metadata.updated * 1000).toDate(),
    description: config.metadata.description,
    short_description: config.metadata.shortDescription,
    compatibility: config.metadata.compatibility,
  }
}

/**
 * @description Util function used to convert a pallet config into array of PalletCategory attributes of the sequelize model
 * @param config
 */
export function palletsConfigToCategoriesModel(config: IPalletConfig<string>): IPalletCategoryAttributes[] {

  return config.metadata.categories.map(category => {

    return {
      id: uuidV4(),
      pallet_name: config.name,
      category
    }
  })
}

/**
 * @description Util function used to convert a pallet config into array of PalletAuthor attributes of the sequelize model
 * @param config
 */
export function palletsConfigToAuthorModel(config: IPalletConfig<string>): IPalletAuthorAttributes[] {

  return config.metadata.authors.map(author => {

    return {
      id: uuidV4(),
      pallet_name: config.name,
      author
    }
  })
}

/**
 * @description Util function used to convert a config into array of PalletDependency attributes of the sequelize model
 * @param config
 */
export function palletsConfigToDependencyModel(config: IPalletConfig<string>): IPalletDependencyAttributes[] {

  if (!config.dependencies.additionalPallets) {
    return [];
  }

  return config.dependencies.additionalPallets.map(pallet => {

    return {
      id: uuidV4(),
      pallet_name: config.name,
      dependency_pallet_name: pallet
    }
  })
}
