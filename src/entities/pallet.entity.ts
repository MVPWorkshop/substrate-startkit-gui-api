import { ECommonAuthors, EPalletCategories, ESubstrateVersion, ESupportedPallets } from '../pallets/pallets.types';
import Pallet from '../models/Pallet.model';

export interface IPalletEntity {
  name: ESupportedPallets;
  size: number;
  downloads: number;
  packageName: string;
  version: string;
  license: string;
  updated: Date;
  description: string;
  shortDescription: string;
  compatibility: ESubstrateVersion;
  categories: EPalletCategories[];
  authors: (string | ECommonAuthors)[];
  dependencies: {
    using: ESupportedPallets[],
    usedBy: ESupportedPallets[]
  };
}

export function mapPalletEntity(pallet: Pallet): IPalletEntity {
  return {
    name: pallet.name,
    size: pallet.size,
    downloads: pallet.downloads,
    packageName: pallet.package_name,
    version: pallet.version,
    license: pallet.license,
    updated: pallet.package_last_update,
    description: pallet.description,
    shortDescription: pallet.short_description,
    compatibility: pallet.compatibility,
    categories: pallet.categories.map(palletCategory => palletCategory.category),
    authors: pallet.authors.map(palletAuthor => palletAuthor.author),
    dependencies: {
      using: pallet.dependencies?.map(palletDependency => palletDependency.dependency_pallet_name),
      usedBy: pallet.dependants?.map(palletDependency => palletDependency.pallet_name)
    }
  }
}

export function mapPalletEntities(pallets: Pallet[]): IPalletEntity[] {
  return pallets.map(pallet => mapPalletEntity(pallet));
}
