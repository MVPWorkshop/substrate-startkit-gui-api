import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletRegistrarTraits {
  Event = 'Event'
}

const palletDescription = [
  'Pallet for keeping track of organization registrar'
].join('\n');

const PalletRegistrarConfig: IPalletConfig<EPalletRegistrarTraits> = {
  name: ESupportedPallets.PALLET_REGISTRAR,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 1587,
    updated: 1600801158,
    license: '/',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'FRAME pallet organization registrar',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'registrar',
      defaultFeatures: false,
      package: 'pallet-registrar',
      version: '2.0.0',
      gitRepo: 'https://github.com/MVPWorkshop/substrate-enterprise-sample'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_DID, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletRegistrarTraits.Event]: 'Event'
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

export default PalletRegistrarConfig;
