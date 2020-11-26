import {
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletValidatorSetTraits {
  Event = 'Event'
}

enum EPalletValidatorGenesisFields {
  validators = 'validators'
}

const palletDescription = [
  'A Substrate pallet to add/remove validators using extrinsics, in Substrate-based PoA networks.'
].join('\n');

const PalletValidatorSetConfig: IPalletConfig<EPalletValidatorSetTraits, EPalletValidatorGenesisFields> = {
  name: ESupportedPallets.PALLET_VALIDATOR_SET,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 37750,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: ['Gautam Dhameja'],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'Pallet to add/remove validators',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'validator-set',
      defaultFeatures: false,
      package: 'substrate-validator-set',
      version: '0.2.0',
      branch: 'master',
      gitRepo: 'https://github.com/MVPWorkshop/substrate-validator-set'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_REGISTRAR, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletValidatorSetTraits.Event]: 'Event'
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
      configStructName: 'ValidatorSetConfig',
      structFields: {
        [EPalletValidatorGenesisFields.validators]: 'vec![get_account_id_from_seed::<sr25519::Public>("Alice")]'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{ValidatorSetConfig};'
      ]
    }
  }
}

export default PalletValidatorSetConfig;
