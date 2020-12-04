import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletIndicesTraits {
  Event = 'Event',
  AccountIndex = 'AccountIndex',
  Currency = 'Currency',
  Deposit = 'Deposit',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'An index is a short form of an address.',
  'This module handles allocation of indices for a newly created accounts.'
].join('\n');

const PalletIndicesConfig: IPalletConfig<EPalletIndicesTraits> = {
  name: ESupportedPallets.PALLET_INDICES,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 6110,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.RUNTIME],
    shortDescription: 'FRAME indices management pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'indices',
      package: 'pallet-indices',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletIndicesTraits.Event]: 'Event',
      [EPalletIndicesTraits.WeightInfo]: '()',
      [EPalletIndicesTraits.Currency]: 'Balances',
      [EPalletIndicesTraits.AccountIndex]: 'AccountIndex',
      [EPalletIndicesTraits.Deposit]: {
        type: 'Balance',
        value: '100'
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.STORAGE
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true
      }
    }
  }
}

export default PalletIndicesConfig;
