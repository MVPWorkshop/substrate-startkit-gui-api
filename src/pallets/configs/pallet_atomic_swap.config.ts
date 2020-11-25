import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletAtomicSwapTraits {
  Event = 'Event',
  SwapAction = 'SwapAction',
  ProofLimit = 'ProofLimit'
}

const palletDescription = [
  'A module for atomically sending funds from an origin to a target.',
  'A proof is used to allow the target to approve (claim) the swap. If the swap is not claimed within a specified duration of time, the sender may cancel it.'
].join('\n');

const PalletAtomicSwapConfig: IPalletConfig<EPalletAtomicSwapTraits> = {
  name: ESupportedPallets.PALLET_ATOMIC_SWAP,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 3120,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'FRAME atomic swap pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'atomic-swap',
      package: 'pallet-atomic-swap',
      version: '2.0.0',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletAtomicSwapTraits.Event]: 'Event',
      [EPalletAtomicSwapTraits.SwapAction]: 'atomic_swap::BalanceSwapAction<AccountId, Balances>',
      [EPalletAtomicSwapTraits.ProofLimit]: {
        type: 'u32',
        value: '10'
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true
      }
    }
  }
}

export default PalletAtomicSwapConfig;
