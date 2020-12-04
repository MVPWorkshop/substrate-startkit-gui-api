import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';
import { tabs } from '../../utils/common.util';

enum EPalletGrandpaTraits {
  Event = 'Event',
  Call = 'Call',
  KeyOwnerProof = 'KeyOwnerProof',
  KeyOwnerIdentification = 'KeyOwnerIdentification',
  KeyOwnerProofSystem = 'KeyOwnerProofSystem',
  HandleEquivocation = 'HandleEquivocation',
  WeightInfo = 'WeightInfo'
}

export enum EPalletGrandpaGenesisFields {
  authorities = 'authorities'
}

const palletDescription = [
  'GRANDPA Consensus module for runtime.',
  'This manages the GRANDPA authority set ready for the native code. These authorities are only for GRANDPA finality, not for consensus overall.',
  'In the future, it will also handle misbehavior reports, and on-chain finality notifications.',
  'For full integration with GRANDPA, the GrandpaApi should be implemented. The necessary items are re-exported via the fg_primitives crate.'
].join('\n');

const PalletGrandpaConfig: IPalletConfig<EPalletGrandpaTraits, EPalletGrandpaGenesisFields> = {
  name: ESupportedPallets.PALLET_GRANDPA,
  metadata: {
    size: 8613,
    updated: 1600801158,
    license: 'Apache-2.0',
    compatibility: ESubstrateVersion.TWO,
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [
      EPalletCategories.CONSENSUS
    ],
    description: palletDescription,
    shortDescription: 'FRAME pallet for GRANDPA finality gadget'
  },
  dependencies: {
    pallet: {
      defaultFeatures: false,
      package: 'pallet-grandpa',
      version: '2.0.0',
      alias: 'pallet-grandpa'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: false },
      { palletName: ESupportedPallets.PALLET_AUTHORSHIP, shouldImplement: false },
      { palletName: ESupportedPallets.PALLET_FINALITY_TRACKER, shouldImplement: false }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletGrandpaTraits.Event]: 'Event',
      [EPalletGrandpaTraits.Call]: 'Call',
      [EPalletGrandpaTraits.KeyOwnerProofSystem]: '()',
      [EPalletGrandpaTraits.HandleEquivocation]: '()',
      [EPalletGrandpaTraits.KeyOwnerIdentification]: [
        '<Self::KeyOwnerProofSystem as KeyOwnerProofSystem<(',
        `${tabs(1)}KeyTypeId,`,
        `${tabs(1)}GrandpaId,`,
        ')>>::IdentificationTuple'
      ].join('\n'),
      [EPalletGrandpaTraits.KeyOwnerProof]: `\n${tabs(1)}<Self::KeyOwnerProofSystem as KeyOwnerProofSystem<(KeyTypeId, GrandpaId)>>::Proof`,
      [EPalletGrandpaTraits.WeightInfo]: '()'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.EVENT,
        EPalletModuleParts.CALL,
        EPalletModuleParts.MODULE,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.CONFIG
      ]
    },
    genesisConfig: {
      configStructName: 'GrandpaConfig',
      structFields: {
        [EPalletGrandpaGenesisFields.authorities]: 'initial_authorities.iter().map(|x| (x.1.clone(), 1)).collect()'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{GrandpaConfig};'
      ]
    }
  }
}

export default PalletGrandpaConfig;
