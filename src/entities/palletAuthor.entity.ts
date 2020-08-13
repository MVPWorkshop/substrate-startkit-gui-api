import { ECommonAuthors, ESupportedPallets } from '../pallets/pallets.types';
import PalletAuthor from '../models/PalletAuthor.model';

export interface IPalletAuthorEntity {
  id: string;
  palletName: ESupportedPallets;
  author: string | ECommonAuthors;
}

export function mapPalletAuthorEntity(palletAuthor: PalletAuthor): IPalletAuthorEntity {
  return {
    id: palletAuthor.id,
    palletName: palletAuthor.pallet_name,
    author: palletAuthor.author
  }
}
