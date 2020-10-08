import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletTimestampTraits {
  Moment = 'Moment',
  OnTimestampSet = 'OnTimestampSet',
  MinimumPeriod = 'MinimumPeriod',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'The Timestamp module allows the validators to set and validate a timestamp with each block.',
  'It uses inherents for timestamp data, which is provided by the block author and validated/verified by other validators. The timestamp can be set only once per block and must be set each block. There could be a constraint on how much time must pass before setting the new timestamp.',
  'NOTE: The Timestamp module is the recommended way to query the on-chain time instead of using an approach based on block numbers. The block number based time measurement can cause issues because of cumulative calculation errors and hence should be avoided.'
].join('\n');

const PalletTimestampConfig: IPalletConfig<EPalletTimestampTraits> = {
  name: ESupportedPallets.PALLET_TIMESTAMP,
  metadata: {
    size: 5080,
    updated: 1596018720,
    compatibility: ESubstrateVersion.TWO,
    license: 'Apache-2.0',
    categories: [
      EPalletCategories.RUNTIME
    ],
    authors: [
      ECommonAuthors.PARITY_TECHNOLOGIES
    ],
    shortDescription: 'FRAME timestamp module',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'timestamp',
      gitRepo: defaultGitRepo,
      package: 'pallet-timestamp',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false,
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_AURA, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletTimestampTraits.MinimumPeriod]: {
        value: 'SLOT_DURATION / 2',
        constantType: 'u64'
      },
      [EPalletTimestampTraits.Moment]: 'u64',
      [EPalletTimestampTraits.WeightInfo]: '()',
      [EPalletTimestampTraits.OnTimestampSet]: 'Aura'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.INHERENT,
      ]
    }
  }
}

export default PalletTimestampConfig;
