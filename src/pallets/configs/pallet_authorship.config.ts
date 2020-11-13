import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletAuthorshipTraits {
  FindAuthor = 'FindAuthor',
  UncleGenerations = 'UncleGenerations',
  FilterUncle = 'FilterUncle',
  EventHandler = 'EventHandler'
}

const palletDescription = [
  'Authorship tracking for FRAME runtimes.',
  'This tracks the current author of the block and recent uncles.'
].join('\n');

const PalletAuthorshipConfig: IPalletConfig<EPalletAuthorshipTraits> = {
  name: ESupportedPallets.PALLET_AUTHORSHIP,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 7270,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.CONSENSUS],
    description: palletDescription,
    shortDescription: 'Block and Uncle Author tracking for the FRAME'
  },
  dependencies: {
    pallet: {
      alias: 'authorship',
      gitRepo: defaultGitRepo,
      package: 'pallet-authorship',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_BABE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletAuthorshipTraits.EventHandler]: '()',
      [EPalletAuthorshipTraits.FilterUncle]: '()',
      [EPalletAuthorshipTraits.FindAuthor]: 'session::FindAccountFromAuthorIndex<Self, Babe>',
      [EPalletAuthorshipTraits.UncleGenerations]: {
        type: 'BlockNumber',
        value: '5'
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.INHERENT
      ]
    }
  }
}

export default PalletAuthorshipConfig;
