import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletBenchmarkTraits {
  Event = 'Event',
  Currency = 'Currency'
}

const palletDescription = [
  'A pallet that contains common runtime patterns in an isolated manner.',
  'This pallet is not meant to be used in a production blockchain, just for benchmarking and testing purposes.'
].join('\n');

const PalletBenchmarkConfig: IPalletConfig<EPalletBenchmarkTraits> = {
  name: ESupportedPallets.PALLET_BENCHMARK,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 3660,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'Patterns to benchmark in a FRAME runtime.',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'benchmark',
      gitRepo: defaultGitRepo,
      package: 'pallet-benchmark',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletBenchmarkTraits.Event]: 'Event',
      [EPalletBenchmarkTraits.Currency]: 'Balances'
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

export default PalletBenchmarkConfig;
