import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletSessionTraits {
  Event = 'Event',
  ValidatorId = 'ValidatorId',
  ValidatorIdOf = 'ValidatorIdOf',
  ShouldEndSession = 'ShouldEndSession',
  NextSessionRotation = 'NextSessionRotation',
  SessionManager = 'SessionManager',
  SessionHandler = 'SessionHandler',
  Keys = 'Keys',
  DisabledValidatorsThreshold = 'DisabledValidatorsThreshold',
  WeightInfo = 'WeightInfo'
}

enum EPalletSessionGenesisFields {
  authorities = 'authorities'
}

const palletDescription = [
  'The Session module allows validators to manage their session keys, provides a function for changing the session length, and handles session rotation.',
  'The Session pallet is designed to make the following possible:',
  '- Set session keys of the validator set for upcoming sessions.',
  '- Control the length of sessions.',
  '- Configure and switch between either normal or exceptional session rotations.'
].join('\n');

const PalletSessionConfig: IPalletConfig<EPalletSessionTraits, EPalletSessionGenesisFields> = {
  name: ESupportedPallets.PALLET_SESSION,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 16200,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.RUNTIME],
    description: palletDescription,
    shortDescription: 'FRAME sessions pallet'
  },
  dependencies: {
    pallet: {
      alias: 'session',
      gitRepo: defaultGitRepo,
      package: 'pallet-session',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: false }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletSessionTraits.Event]: 'Event',
      [EPalletSessionTraits.ValidatorId]: '<Self as system::Trait>::AccountId',
      [EPalletSessionTraits.ValidatorIdOf]: '()',
      [EPalletSessionTraits.ShouldEndSession]: 'Babe',
      [EPalletSessionTraits.NextSessionRotation]: 'Babe',
      [EPalletSessionTraits.SessionManager]: '()',
      [EPalletSessionTraits.SessionHandler]: '<opaque::SessionKeys as OpaqueKeys>::KeyTypeIdProviders',
      [EPalletSessionTraits.Keys]: 'opaque::SessionKeys',
      [EPalletSessionTraits.DisabledValidatorsThreshold]: {
        constantType: 'Perbill',
        value: 'Perbill::from_percent(17)'
      },
      [EPalletSessionTraits.WeightInfo]: '()'
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
        [EPalletModuleParts.CONFIG]: true
      }
    },
    genesisConfig: {
      structFields: {
        [EPalletSessionGenesisFields.authorities]: 'vec![]'
      },
      configStructName: 'BabeConfig'
    },
    additionalRuntimeLibCode: [
      'use sp_runtime::traits::{ OpaqueKeys };'
    ],
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{SessionConfig};'
      ]
    }
  }
}

export default PalletSessionConfig;
