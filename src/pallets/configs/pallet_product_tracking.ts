import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletProductTrackingTraits {
  Event = 'Event',
  CreateRoleOrigin = 'CreateRoleOrigin'
}

const palletDescription = [
  'The Product Tracking pallet provides functionality for registering and tracking shipments, and monitoring their storage and transportation conditions, within a fictitious supply chain between various stakeholders.'
].join('\n');

const PalletProductTrackingConfig: IPalletConfig<EPalletProductTrackingTraits> = {
  name: ESupportedPallets.PALLET_PRODUCT_TRACKING,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 21250,
    updated: 1600801158,
    license: '/',
    authors: [ECommonAuthors.SUBSTRATE_DEV_HUB],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'Substrate Product Tracking pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'product-tracking',
      defaultFeatures: false,
      package: 'pallet-product-tracking',
      version: '2.0.0',
      gitRepo: 'https://github.com/MVPWorkshop/substrate-enterprise-sample'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_REGISTRAR, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_PRODUCT_REGISTRY, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_TIMESTAMP }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletProductTrackingTraits.Event]: 'Event',
      [EPalletProductTrackingTraits.CreateRoleOrigin]: 'registrar::EnsureOrg<Runtime>'
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

export default PalletProductTrackingConfig;
