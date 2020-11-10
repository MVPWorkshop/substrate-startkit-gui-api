import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletAssetsTraits {
  Event = 'Event',
  Balance = 'Balance',
  AssetId = 'AssetId'
}

const palletDescription = [
  'A simple, secure module for dealing with fungible assets.',
  'The Assets module provides functionality for asset management of fungible asset classes with a fixed supply, including:',
  '- Asset Issuance',
  '- Asset Transfer',
  '- Asset Destruction'
].join('\n');

const PalletAssetsConfig: IPalletConfig<EPalletAssetsTraits> = {
  name: ESupportedPallets.PALLET_ASSETS,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 16200,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.ASSETS],
    shortDescription: 'FRAME asset management pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'assets',
      gitRepo: defaultGitRepo,
      defaultFeatures: false,
      package: 'pallet-assets',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletAssetsTraits.Event]: 'Event',
      [EPalletAssetsTraits.Balance]: 'Balance',
      [EPalletAssetsTraits.AssetId]: 'u32'
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

export default PalletAssetsConfig;
