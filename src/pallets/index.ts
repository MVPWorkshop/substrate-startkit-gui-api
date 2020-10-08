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
import PalletBalances from './configs/pallet_balances.config';
import PalletNicks from './configs/pallet_nicks.config';
import PalletAura from './configs/pallet_aura.config';
import PalletGrandpaConfig from './configs/pallet_grandpa.config';
import PalletRandomnessCollectiveFlip from './configs/pallet_randomness_collective_flip.config';
import PalletSudo from './configs/pallet_sudo.config';
import PalletTimestamp from './configs/pallet_timestamp.config';
import PalletTransactionPayment from './configs/pallet_transaction_payment.config';

type PalletConfigs = DynamicObject<IPalletConfig<string>, ESupportedPallets, AllKeysRequired>;

export const configs: PalletConfigs = {
  [ESupportedPallets.PALLET_CONTRACT]: PalletContracts,
  [ESupportedPallets.PALLET_BALANCE]: PalletBalances,
  [ESupportedPallets.PALLET_NICKS]: PalletNicks,
  [ESupportedPallets.PALLET_AURA]: PalletAura,
  [ESupportedPallets.PALLET_GRANDPA]: PalletGrandpaConfig,
  [ESupportedPallets.PALLET_RANDOMNESS_COLLECTIVE_FLIP]: PalletRandomnessCollectiveFlip,
  [ESupportedPallets.PALLET_SUDO]: PalletSudo,
  [ESupportedPallets.PALLET_TIMESTAMP]: PalletTimestamp,
  [ESupportedPallets.PALLET_TRANSACTION_PAYMENT]: PalletTransactionPayment
};

export default configs;
