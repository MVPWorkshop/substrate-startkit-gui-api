import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletSudoTraits {
  Event = 'Event',
  Call = 'Call'
}

enum EPalletSudoGenesisFields {
  key = 'key'
}

const palletDescription = [
  'The Sudo module allows for a single account (called the "sudo key") to execute dispatchable functions that require a Root call or designate a new account to replace them as the sudo key.',
  'Only one account can be the sudo key at a time.'
].join('\n');

const PalletSudoConfig: IPalletConfig<EPalletSudoTraits, EPalletSudoGenesisFields> = {
  name: ESupportedPallets.PALLET_SUDO,
  metadata: {
    size: 3420,
    updated: 1600801158,
    compatibility: ESubstrateVersion.TWO,
    license: 'Apache-2.0',
    categories: [
      EPalletCategories.RUNTIME
    ],
    authors: [
      ECommonAuthors.PARITY_TECHNOLOGIES
    ],
    shortDescription: 'FRAME pallet for sudo',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'pallet-sudo',
      package: 'pallet-sudo',
      version: '2.0.0',
      defaultFeatures: false,
    }
  },
  runtime: {
    palletTraits: {
      [EPalletSudoTraits.Call]: 'Call',
      [EPalletSudoTraits.Event]: 'Event'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.CONFIG,
        EPalletModuleParts.CALL
      ],
      generic: {
        [EPalletModuleParts.CONFIG]: true,
        [EPalletModuleParts.EVENT]: true
      }
    },
    genesisConfig: {
      configStructName: 'SudoConfig',
      structFields: {
        [EPalletSudoGenesisFields.key]: 'root_key'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{SudoConfig};'
      ]
    }
  }
}

export default PalletSudoConfig;
