import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';
import { tabs } from '../../utils/common.util';

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
  keys = 'keys'
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
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.RUNTIME],
    description: palletDescription,
    shortDescription: 'FRAME sessions pallet'
  },
  dependencies: {
    pallet: {
      alias: 'session',
      package: 'pallet-session',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: false },
      { palletName: ESupportedPallets.PALLET_BABE, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_STAKING, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletSessionTraits.Event]: 'Event',
      [EPalletSessionTraits.ValidatorId]: 'AccountId',
      [EPalletSessionTraits.ValidatorIdOf]: '()',
      [EPalletSessionTraits.ShouldEndSession]: 'Babe',
      [EPalletSessionTraits.NextSessionRotation]: 'Babe',
      [EPalletSessionTraits.SessionManager]: '()',
      [EPalletSessionTraits.SessionHandler]: '<opaque::SessionKeys as OpaqueKeys>::KeyTypeIdProviders',
      [EPalletSessionTraits.Keys]: 'opaque::SessionKeys',
      [EPalletSessionTraits.DisabledValidatorsThreshold]: {
        type: 'Perbill',
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
        [EPalletSessionGenesisFields.keys]: [
          'initial_authorities.iter().map(|x| {',
          `${tabs(4)}(`,
          `${tabs(5)}get_account_id_from_seed::<sr25519::Public>("Alice"),`,
          `${tabs(5)}get_account_id_from_seed::<sr25519::Public>("Bob"),`,
          `${tabs(5)}session_keys(`,
          `${tabs(6)}x.0.clone(),`,
          `${tabs(6)}x.1.clone()`,
          `${tabs(5)})`,
          `${tabs(4)})`,
          `${tabs(3)}}).collect::<Vec<_>>()`,
        ].join('\n')
      },
      configStructName: 'SessionConfig'
    },
    additionalRuntimeLibCode: [
      'use sp_runtime::traits::{ OpaqueKeys };',
      [
        'impl session::historical::Trait for Runtime {',
        `${tabs(1)}type FullIdentification = staking::Exposure<AccountId, Balance>;`,
        `${tabs(1)}type FullIdentificationOf = staking::ExposureOf<Runtime>;`,
        '}'
      ].join('\n')
    ],
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{SessionConfig};',
        'use node_template_runtime::opaque::{SessionKeys};'
      ]
    }
  }
}

export default PalletSessionConfig;
