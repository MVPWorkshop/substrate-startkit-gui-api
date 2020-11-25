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
import PalletMultisig from './configs/pallet_multisig.config';
import PalletUtility from './configs/pallet_utility.config';
import PalletIndices from './configs/pallet_indices.config';
import PalletCollective from './configs/pallet_collective.config';
import PalletElectionsPhragmen from './configs/pallet_elections_phragmen.config';
import PalletElections from './configs/pallet_elections.config';
import PalletMembership from './configs/pallet_membership.config';
import PalletTreasury from './configs/pallet_treasury.config';
import PalletIdentity from './configs/pallet_identity.config';
import PalletScheduler from './configs/pallet_scheduler.config';
import PalletDemocracy from './configs/pallet_democracy.config';
import PalletSociety from './configs/pallet_society.config';
import PalletScoredPool from './configs/pallet_scored_pool.config';
import PalletEvm from './configs/pallet_evm.config';
import PalletProxy from './configs/pallet_proxy.config';

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
  [ESupportedPallets.PALLET_MULTISIG]: PalletMultisig,
  [ESupportedPallets.PALLET_UTILITY]: PalletUtility,
  [ESupportedPallets.PALLET_INDICES]: PalletIndices,
  [ESupportedPallets.PALLET_COLLECTIVE]: PalletCollective,
  [ESupportedPallets.PALLET_ELECTIONS_PHRAGMEN]: PalletElectionsPhragmen,
  [ESupportedPallets.PALLET_ELECTIONS]: PalletElections,
  [ESupportedPallets.PALLET_MEMBERSHIP]: PalletMembership,
  [ESupportedPallets.PALLET_TREASURY]: PalletTreasury,
  [ESupportedPallets.PALLET_IDENTITY]: PalletIdentity,
  [ESupportedPallets.PALLET_SCHEDULER]: PalletScheduler,
  [ESupportedPallets.PALLET_DEMOCRACY]: PalletDemocracy,
  [ESupportedPallets.PALLET_SOCIETY]: PalletSociety,
  [ESupportedPallets.PALLET_SCORED_POOL]: PalletScoredPool,
  [ESupportedPallets.PALLET_EVM]: PalletEvm,
  [ESupportedPallets.PALLET_PROXY]: PalletProxy
};

export default configs;
