import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

const palletDescription = [
  'The Randomness Collective Flip module provides a random function that generates low-influence random values based on the block hashes from the previous 81 blocks.',
  'Low-influence randomness can be useful when defending against relatively weak adversaries.',
  'Using this pallet as a randomness source is advisable primarily in low-security situations like testing.'
].join('\n');

const PalletRandomnessCollectiveFlipConfig: IPalletConfig = {
  name: ESupportedPallets.PALLET_RANDOMNESS_COLLECTIVE_FLIP,
  metadata: {
    size: 4730,
    updated: 1596018720,
    license: 'Apache-2.0',
    compatibility: ESubstrateVersion.TWO,
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [
      EPalletCategories.RUNTIME
    ],
    description: palletDescription,
    shortDescription: 'FRAME randomness collective flip pallet'
  },
  dependencies: {
    pallet: {
      defaultFeatures: false,
      package: 'pallet-randomness-collective-flip',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      gitRepo: defaultGitRepo,
      alias: 'randomness-collective-flip'
    }
  },
  runtime: {
    palletTraits: {},
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE
      ]
    }
  }
}

export default PalletRandomnessCollectiveFlipConfig;
