import { ESupportedPallets } from '../pallets/pallets.types';
import PalletDependency from '../models/PalletDependency.model';

export interface IPalletDependencyEntity {
  id: string;
  palletName: ESupportedPallets;
  dependencyName: ESupportedPallets;
}

export function mapPalletDependencyEntity(palletDependency: PalletDependency): IPalletDependencyEntity {
  return {
    id: palletDependency.id,
    dependencyName: palletDependency.dependency_pallet_name,
    palletName: palletDependency.pallet_name
  }
}
