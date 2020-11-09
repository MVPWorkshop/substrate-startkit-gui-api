import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletAuraTraits {
  AuthorityId = 'AuthorityId'
}

enum EPalletAuraGenesisFields {
  authorities = 'authorities'
}

const palletDescription = [
  'The Aura module extends Aura consensus by managing offline reporting.'
].join('\n');

const PalletAuraConfig: IPalletConfig<EPalletAuraTraits, EPalletAuraGenesisFields> = {
  name: ESupportedPallets.PALLET_AURA,
  metadata: {
    size: 5078,
    updated: 1596018720,
    license: 'Apache-2.0',
    compatibility: ESubstrateVersion.TWO,
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [
      EPalletCategories.CONSENSUS
    ],
    shortDescription: 'FRAME AURA consensus pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      defaultFeatures: false,
      package: 'pallet-aura',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      gitRepo: defaultGitRepo,
      alias: 'aura'
    }
  },
  runtime: {
    palletTraits: {
      [EPalletAuraTraits.AuthorityId]: 'AuraId'
    },
    additionalRuntimeLibCode: [
      'use sp_consensus_aura::sr25519::AuthorityId as AuraId;'
    ],
    constructRuntime: {
      modules: [
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CONFIG,
        EPalletModuleParts.INHERENT
      ],
      generic: {
        [EPalletModuleParts.CONFIG]: true
      }
    },
    genesisConfig: {
      configStructName: 'AuraConfig',
      structFields: {
        [EPalletAuraGenesisFields.authorities]: 'initial_authorities.iter().map(|x| (x.0.clone())).collect()'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{AuraConfig};'
      ]
    }
  }
}

export default PalletAuraConfig;
