import {
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
  HandleEquivocation = 'HandleEquivocation',
  WeightInfo = 'WeightInfo'
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
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.CONSENSUS],
    description: palletDescription,
    shortDescription: 'FRAME pallet for BABE consensus'
  },
  dependencies: {
    pallet: {
      alias: 'babe',
      package: 'pallet-babe',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: false },
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: false },
      { palletName: ESupportedPallets.PALLET_AUTHORSHIP, shouldImplement: false }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletBabeTraits.EpochDuration]: {
        type: 'u64',
        value: '200'
      },
      [EPalletBabeTraits.ExpectedBlockTime]: {
        type: 'u64',
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
      [EPalletBabeTraits.HandleEquivocation]: '()',
      [EPalletBabeTraits.WeightInfo]: '()'
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
