import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';
import { tabs } from '../../utils/common.util';

enum EPalletEvmTraits {
  FeeCalculator = 'FeeCalculator',
  CallOrigin = 'CallOrigin',
  WithdrawOrigin = 'WithdrawOrigin',
  AddressMapping = 'AddressMapping',
  Currency = 'Currency',
  Event = 'Event',
  Precompiles = 'Precompiles',
  ChainId = 'ChainId'
}

enum EPalletEvmGenesisFields {
  accounts = 'accounts'
}

const palletDescription = [
  'EVM execution module for Substrate'
].join('\n');

const PalletEvmConfig: IPalletConfig<EPalletEvmTraits, EPalletEvmGenesisFields> = {
  name: ESupportedPallets.PALLET_EVM,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 6480,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.SMART_CONTRACTS],
    shortDescription: 'FRAME EVM contracts pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'evm',
      package: 'pallet-evm',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletEvmTraits.FeeCalculator]: 'FixedGasPrice',
      [EPalletEvmTraits.CallOrigin]: 'evm::EnsureAddressRoot<AccountId>',
      [EPalletEvmTraits.WithdrawOrigin]: 'evm::EnsureAddressNever<AccountId>',
      [EPalletEvmTraits.AddressMapping]: 'evm::HashedAddressMapping<sp_runtime::traits::BlakeTwo256>',
      [EPalletEvmTraits.Currency]: 'Balances',
      [EPalletEvmTraits.Event]: 'Event',
      [EPalletEvmTraits.Precompiles]: '()',
      [EPalletEvmTraits.ChainId]: {
        customName: 'SystemChainId',
        type: 'u64',
        value: 'sp_io::misc::chain_id()',
        isNotConst: true
      },
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.CONFIG
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true
      }
    },
    genesisConfig: {
      configStructName: 'EvmConfig',
      structFields: {
        [EPalletEvmGenesisFields.accounts]: 'Default::default()'
      }
    },
    additionalRuntimeLibCode: [
      [
        'pub struct FixedGasPrice;',
        'impl evm::FeeCalculator for FixedGasPrice {',
        `${tabs(1)}fn min_gas_price() -> sp_core::U256 {`,
        `${tabs(2)}// Gas price is always one token per gas`,
        `${tabs(2)}0.into()`,
        `${tabs(1)}}`,
        '}',
      ].join('\n')
    ],
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{EvmConfig};'
      ]
    }
  }
}

export default PalletEvmConfig;
