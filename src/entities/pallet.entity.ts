import { ESubstrateVersion } from '../pallets/pallets.types';
import { IPalletCategoryEntity, mapPalletCategoryEntity } from './palletCategory.entity';
import { IPalletAuthorEntity, mapPalletAuthorEntity } from './palletAuthor.entity';
import { IPalletDependencyEntity, mapPalletDependencyEntity } from './palletDependency.entity';
import Pallet from '../models/Pallet.model';

export interface IPalletEntity {
  name: string;
  size: number;
  downloads: number;
  packageName: string;
  version: string;
  license: string;
  updated: Date;
  description: string;
  compatibility: ESubstrateVersion;
  categories: IPalletCategoryEntity[];
  authors: IPalletAuthorEntity[];
  dependencies: IPalletDependencyEntity[];
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
    compatibility: pallet.compatibility,
    categories: pallet.categories.map(palletCategory => mapPalletCategoryEntity(palletCategory)),
    authors: pallet.authors.map(palletAuthor => mapPalletAuthorEntity(palletAuthor)),
    dependencies: pallet.dependencies.map(palletDependency => mapPalletDependencyEntity(palletDependency))
  }
}

export function mapPalletEntities(pallets: Pallet[]): IPalletEntity[] {
  return pallets.map(pallet => mapPalletEntity(pallet));
}
