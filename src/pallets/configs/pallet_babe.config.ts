import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';
import { tabs } from '../../utils/common.util';

enum EPalletBabeTraits {
  EpochDuration = 'EpochDuration',
  ExpectedBlockTime = 'ExpectedBlockTime',
  EpochChangeTrigger = 'EpochChangeTrigger',
  KeyOwnerProofSystem = 'KeyOwnerProofSystem',
  KeyOwnerProof = 'KeyOwnerProof',
  KeyOwnerIdentification = 'KeyOwnerIdentification',
  HandleEquivocation = 'HandleEquivocation'
}

enum EPalletBabeGenesisFields {
  authorities = 'authorities'
}

const palletDescription = [
  'Consensus extension module for BABE consensus.',
  'Collects on-chain randomness from VRF outputs and manages epoch transitions.'
].join('\n');

const PalletBabeConfig: IPalletConfig<EPalletBabeTraits, EPalletBabeGenesisFields> = {
  name: ESupportedPallets.PALLET_BABE,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 11900,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.CONSENSUS],
    description: palletDescription,
    shortDescription: 'FRAME pallet for BABE consensuc'
  },
  dependencies: {
    pallet: {
      alias: 'babe',
      gitRepo: defaultGitRepo,
      package: 'pallet-babe',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: false },
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: false }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletBabeTraits.EpochDuration]: {
        constantType: 'u64',
        value: '200'
      },
      [EPalletBabeTraits.ExpectedBlockTime]: {
        constantType: 'u64',
        value: '3000'
      },
      [EPalletBabeTraits.EpochChangeTrigger]: 'babe::ExternalTrigger',
      [EPalletBabeTraits.KeyOwnerProofSystem]: '()',
      [EPalletBabeTraits.KeyOwnerProof]: [
        '<Self::KeyOwnerProofSystem as KeyOwnerProofSystem<(',
        `${tabs(2)}KeyTypeId,`,
        `${tabs(2)}babe::AuthorityId,`,
        `${tabs(1)})>>::Proof`
      ].join('\n'),
      [EPalletBabeTraits.KeyOwnerIdentification]: [
        '<Self::KeyOwnerProofSystem as KeyOwnerProofSystem<(',
        `${tabs(2)}KeyTypeId,`,
        `${tabs(2)}babe::AuthorityId,`,
        `${tabs(1)})>>::IdentificationTuple`
      ].join('\n'),
      [EPalletBabeTraits.HandleEquivocation]: '()'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.CONFIG,
        EPalletModuleParts.INHERENT,
        EPalletModuleParts.VALIDATE_UNSIGNED
      ]
    },
    genesisConfig: {
      structFields: {
        [EPalletBabeGenesisFields.authorities]: 'vec![]'
      },
      configStructName: 'BabeConfig'
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{BabeConfig};'
      ]
    }
  }
}

export default PalletBabeConfig;
