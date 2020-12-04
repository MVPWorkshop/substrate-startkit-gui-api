import {
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletRbacTraits {
  Event = 'Event',
  CreateRoleOrigin = 'CreateRoleOrigin'
}

enum EPalletRbacGenesisFields {
  super_admins = 'super_admins'
}

const palletDescription = [
  'A Substrate pallet implementing role-based access control and permissions for Substrate extrinsic calls.',
  'The filtering of incoming extrinsics and their sender accounts is done at the transaction queue validation layer, using the SignedExtension trait.'
].join('\n');

const PalletRbacConfig: IPalletConfig<EPalletRbacTraits, EPalletRbacGenesisFields> = {
  name: ESupportedPallets.PALLET_RBAC,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 16500,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: ['Gautam Dhameja'],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'A Substrate pallet implementing role-based access control and permissions for Substrate extrinsic calls.',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'rbac',
      defaultFeatures: false,
      package: 'substrate-rbac',
      version: '0.1.0',
      branch: 'enterprise-sample',
      gitRepo: 'https://github.com/MVPWorkshop/substrate-rbac'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_REGISTRAR, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletRbacTraits.Event]: 'Event',
      [EPalletRbacTraits.CreateRoleOrigin]: 'registrar::EnsureOrg<Runtime>'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.CONFIG
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true,
        [EPalletModuleParts.CONFIG]: true
      }
    },
    genesisConfig: {
      configStructName: 'RbacConfig',
      structFields: {
        [EPalletRbacGenesisFields.super_admins]: 'vec![get_account_id_from_seed::<sr25519::Public>("Alice")]'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{RbacConfig};'
      ]
    }
  }
}

export default PalletRbacConfig;
