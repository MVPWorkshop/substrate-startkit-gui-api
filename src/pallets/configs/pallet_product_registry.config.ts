import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletProductRegistryTraits {
  Event = 'Event',
  CreateRoleOrigin = 'CreateRoleOrigin'
}

const palletDescription = [
  'The Product Registry pallet provides functionality for registering and managing master data (aka class-level) about products / trade items exchanged in a supply chain between various stakeholders. This data is typically registered once by the product\'s manufacturer / supplier to be shared with other network participants.',
  'When this pallet is added to a Subtrate runtime, other custom Substrate pallets can then implement additional business logic leveraging this Product Registry pallet as a reference for known products and their owning organizations.'
].join('\n');

const PalletProductRegistryConfig: IPalletConfig<EPalletProductRegistryTraits> = {
  name: ESupportedPallets.PALLET_PRODUCT_REGISTRY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 8018,
    updated: 1600801158,
    license: '/',
    authors: [ECommonAuthors.SUBSTRATE_DEV_HUB],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'Substrate Product Registry pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'product-registry',
      defaultFeatures: false,
      package: 'pallet-product-registry',
      version: '2.0.0',
      gitRepo: 'https://github.com/MVPWorkshop/substrate-enterprise-sample'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_REGISTRAR, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_TIMESTAMP }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletProductRegistryTraits.Event]: 'Event',
      [EPalletProductRegistryTraits.CreateRoleOrigin]: 'registrar::EnsureOrg<Runtime>'
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

export default PalletProductRegistryConfig;
