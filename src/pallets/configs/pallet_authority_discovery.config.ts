import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletAuthorityDiscoveryTraits {}

const palletDescription = [
  'This module is used by the client/authority-discovery to retrieve the current set of authorities.'
].join('\n');

const PalletAuthorityDiscoveryConfig: IPalletConfig<string> = {
  name: ESupportedPallets.PALLET_AUTHORITY_DISCOVERY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 3840,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.CONSENSUS],
    shortDescription: 'FRAME pallet for authority discovery',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'authority-discovery',
      package: 'pallet-authority-discovery',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: true }
    ]
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

export default PalletAuthorityDiscoveryConfig;
