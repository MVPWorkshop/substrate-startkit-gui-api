import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletImOnlineTraits {
  AuthorityId = 'AuthorityId',
  Event = 'Event',
  SessionDuration = 'SessionDuration',
  ReportUnresponsiveness = 'ReportUnresponsiveness',
  UnsignedPriority = 'UnsignedPriority',
  WeightInfo = 'WeightInfo'
}

enum EPalletImOnlineGenesisFields {
  keys = 'keys'
}

const palletDescription = [
  'If the local node is a validator (i.e. contains an authority key), this module gossips a heartbeat transaction with each new session. The heartbeat functions as a simple mechanism to signal that the node is online in the current era.',
  'Received heartbeats are tracked for one era and reset with each new era. The module exposes two public functions to query if a heartbeat has been received in the current era or session.',
  'The heartbeat is a signed transaction, which was signed using the session key and includes the recent best block number of the local validators chain as well as the NetworkState. It is submitted as an Unsigned Transaction via off-chain workers.'
].join('\n');

const PalletImOnlineConfig: IPalletConfig<EPalletImOnlineTraits, EPalletImOnlineGenesisFields> = {
  name: ESupportedPallets.PALLET_IM_ONLINE,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 13300,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.RUNTIME],
    description: palletDescription,
    shortDescription: 'FRAME\'s I\'m online pallet'
  },
  dependencies: {
    pallet: {
      alias: 'im-online',
      package: 'pallet-im-online',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_AUTHORSHIP, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_AUTHORITY_DISCOVERY, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletImOnlineTraits.Event]: 'Event',
      [EPalletImOnlineTraits.AuthorityId]: 'ImOnlineId',
      [EPalletImOnlineTraits.WeightInfo]: '()',
      [EPalletImOnlineTraits.ReportUnresponsiveness]: '()',
      [EPalletImOnlineTraits.SessionDuration]: {
        type: 'BlockNumber',
        value: '200'
      },
      [EPalletImOnlineTraits.UnsignedPriority]: {
        customName: 'UnsignedPriorityImOnline',
        type: 'TransactionPriority',
        value: 'TransactionPriority::max_value()'
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.VALIDATE_UNSIGNED,
        EPalletModuleParts.CONFIG
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true,
        [EPalletModuleParts.CONFIG]: true
      }
    },
    additionalRuntimeLibCode: [
      'use im_online::sr25519::AuthorityId as ImOnlineId;'
    ],
    genesisConfig: {
      configStructName: 'ImOnlineConfig',
      structFields: {
        [EPalletImOnlineGenesisFields.keys]: 'vec![]'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{ImOnlineConfig};'
      ]
    }
  }
}

export default PalletImOnlineConfig;
