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
import PalletGenericAsset from './configs/pallet_generic_asset.config';
import PalletRecovery from './configs/pallet_recovery.config';
import PalletVesting from './configs/pallet_vesting.config';
import PalletAssets from './configs/pallet_assets.config';
import PalletSession from './configs/pallet_session.config';
import PalletBabeConfig from './configs/pallet_babe.config';
import PalletAuthorityDiscovery from './configs/pallet_authority_discovery.config';
import PalletAuthorship from './configs/pallet_authorship.config';
import PalletFinalityTracker from './configs/pallet_finality_tracker.config';
import PalletOffences from './configs/pallet_offences.config';
import PalletImOnline from './configs/pallet_im_online.config';
import PalletAtomicSwap from './configs/pallet_atomic_swap.config';
import PalletStaking from './configs/pallet_staking.config';
import PalletBenchmark from './configs/pallet_benchmark.config';

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
  [ESupportedPallets.PALLET_TRANSACTION_PAYMENT]: PalletTransactionPayment,
  [ESupportedPallets.PALLET_GENERIC_ASSET]: PalletGenericAsset,
  [ESupportedPallets.PALLET_RECOVERY]: PalletRecovery,
  [ESupportedPallets.PALLET_VESTING]: PalletVesting,
  [ESupportedPallets.PALLET_ASSETS]: PalletAssets,
  [ESupportedPallets.PALLET_SESSION]: PalletSession,
  [ESupportedPallets.PALLET_BABE]: PalletBabeConfig,
  [ESupportedPallets.PALLET_AUTHORITY_DISCOVERY]: PalletAuthorityDiscovery,
  [ESupportedPallets.PALLET_AUTHORSHIP]: PalletAuthorship,
  [ESupportedPallets.PALLET_FINALITY_TRACKER]: PalletFinalityTracker,
  [ESupportedPallets.PALLET_OFFENCES]: PalletOffences,
  [ESupportedPallets.PALLET_IM_ONLINE]: PalletImOnline,
  [ESupportedPallets.PALLET_ATOMIC_SWAP]: PalletAtomicSwap,
  [ESupportedPallets.PALLET_STAKING]: PalletStaking,
  [ESupportedPallets.PALLET_BENCHMARK]: PalletBenchmark
};

export default configs;
