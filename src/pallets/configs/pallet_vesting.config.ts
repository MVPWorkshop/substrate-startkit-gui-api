import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletVestingTraits {
  Event = 'Event',
  Currency = 'Currency',
  BlockNumberToBalance = 'BlockNumberToBalance',
  MinVestedTransfer = 'MinVestedTransfer',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'A simple module providing a means of placing a linear curve on an account\'s locked balance.',
  'This module ensures that there is a lock in place preventing the balance to drop below the unvested amount for any reason other than transaction fee payment.',
  'As the amount vested increases over time, the amount unvested reduces. However, locks remain in place and explicit action is needed on behalf of the user to ensure that the amount locked is equivalent to the amount remaining to be vested. This is done through a dispatchable function, either vest (in typical case where the sender is calling on their own behalf) or vest_other in case the sender is calling on another account\'s behalf.',
].join('\n');

const PalletVestingConfig: IPalletConfig<EPalletVestingTraits> = {
  name: ESupportedPallets.PALLET_VESTING,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 8700,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.ACCOUNTS],
    description: palletDescription,
    shortDescription: 'FRAME pallet for manage vesting'
  },
  dependencies: {
    pallet: {
      alias: 'vesting',
      gitRepo: defaultGitRepo,
      defaultFeatures: false,
      package: 'pallet-vesting',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletVestingTraits.Event]: 'Event',
      [EPalletVestingTraits.Currency]: 'Balances',
      [EPalletVestingTraits.BlockNumberToBalance]: '()',
      [EPalletVestingTraits.MinVestedTransfer]: {
        constantType: 'Balance',
        value: '1000'
      },
      [EPalletVestingTraits.WeightInfo]: '()'
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

export default PalletVestingConfig;
