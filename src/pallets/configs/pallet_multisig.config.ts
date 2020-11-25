import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletMultisigTraits {
  Event = 'Event',
  Call = 'Call',
  Currency = 'Currency',
  DepositBase = 'DepositBase',
  DepositFactor = 'DepositFactor',
  MaxSignatories = 'MaxSignatories',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'A module for doing multisig dispatch.',
  'This module contains functionality for multi-signature dispatch, a (potentially) stateful operation, allowing multiple signed origins (accounts) to coordinate and dispatch a call from a well-known origin, derivable deterministically from the set of account IDs and the threshold number of accounts from the set that must approve it.',
  'In the case that the threshold is just one then this is a stateless operation. This is useful for multisig wallets where cryptographic threshold signatures are not available or desired.'
].join('\n');

const PalletMultisigConfig: IPalletConfig<EPalletMultisigTraits> = {
  name: ESupportedPallets.PALLET_MULTISIG,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 10100,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'FRAME multi-signature dispatch pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'multisig',
      package: 'pallet-multisig',
      version: '2.0.0',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletMultisigTraits.Event]: 'Event',
      [EPalletMultisigTraits.Call]: 'Call',
      [EPalletMultisigTraits.Currency]: 'Balances',
      [EPalletMultisigTraits.DepositBase]: {
        type: 'Balance',
        value: '543_000_000_000_000'
      },
      [EPalletMultisigTraits.DepositFactor]: {
        type: 'Balance',
        value: '192_000_000_000_000'
      },
      [EPalletMultisigTraits.MaxSignatories]: {
        type: 'u16',
        value: '100'
      },
      [EPalletMultisigTraits.WeightInfo]: '()'
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

export default PalletMultisigConfig;
