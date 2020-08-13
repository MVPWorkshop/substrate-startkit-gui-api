import {
  ESupportedPallets,
  IPalletConfig
} from './pallets.types';
import {
  DynamicObject,
  AllKeysRequired
} from '../types/util.types';

// Configs
import PalletContracts from './configs/pallet_contracts.config';
import PalletBalances from './configs/pallet_balances.config'

type PalletConfigs = DynamicObject<IPalletConfig<string>, ESupportedPallets, AllKeysRequired>;

export const configs: PalletConfigs = {
  [ESupportedPallets.PALLET_CONTRACT]: PalletContracts,
  [ESupportedPallets.PALLET_BALANCE]: PalletBalances
};

export default configs;
