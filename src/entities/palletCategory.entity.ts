import { EPalletCategories, ESupportedPallets } from '../pallets/pallets.types';
import PalletCategory from '../models/PalletCategory.model';

export interface IPalletCategoryEntity {
  id: string;
  palletName: ESupportedPallets;
  category: EPalletCategories;
}

export function mapPalletCategoryEntity(palletCategory: PalletCategory): IPalletCategoryEntity {
  return {
    id: palletCategory.id,
    palletName: palletCategory.pallet_name,
    category: palletCategory.category
  }
}
