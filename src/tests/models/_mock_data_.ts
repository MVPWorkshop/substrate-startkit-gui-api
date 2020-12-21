import { IPalletAttributes } from '../../models/Pallet.model';
import { EPalletCategories, ESubstrateVersion, ESupportedPallets } from '../../pallets/pallets.types';
import moment from 'moment';
import { IPalletAuthorAttributes } from '../../models/PalletAuthor.model';
import { v4 } from 'uuid';
import { IPalletCategoryAttributes } from '../../models/PalletCategory.model';

const pallet: IPalletAttributes = {
  name: ESupportedPallets.PALLET_TREASURY,
  size: 1000,
  downloads: 0,
  package_name: 'pallet-treasury',
  version: '2.0.0',
  license: 'Apache',
  package_last_update: moment('18.10.2020', 'DD.MM.YYYY').toDate(),
  description: 'Long description',
  short_description: 'Short Description',
  compatibility: ESubstrateVersion.TWO,
}

const palletAuthor: IPalletAuthorAttributes = {
  id: v4(),
  author: 'TEST_AUTHOR',
  pallet_name: pallet.name
}

const palletCategory: IPalletCategoryAttributes = {
  id: v4(),
  category: EPalletCategories.GOVERNANCE,
  pallet_name: pallet.name
}

export const ModelsMockData = {
  pallet,
  palletAuthor,
  palletCategory
}
