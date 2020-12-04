import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletContractsTraits {
  Time = 'Time',
  Randomness = 'Randomness',
  Currency = 'Currency',
  Event = 'Event',
  DetermineContractAddress = 'DetermineContractAddress',
  TrieIdGenerator = 'TrieIdGenerator',
  RentPayment = 'RentPayment',
  SignedClaimHandicap = 'SignedClaimHandicap',
  TombstoneDeposit = 'TombstoneDeposit',
  StorageSizeOffset = 'StorageSizeOffset',
  RentByteFee = 'RentByteFee',
  RentDepositOffset = 'RentDepositOffset',
  SurchargeReward = 'SurchargeReward',
  MaxDepth = 'MaxDepth',
  MaxValueSize = 'MaxValueSize',
  WeightPrice = 'WeightPrice'
}

enum EPalletContractsGenesisFields {
  current_schedule = 'current_schedule'
}

const palletDescription = [
  'FRAME pallet for WASM contracts.',
  'The Contract module provides functionality for the runtime to deploy and execute WebAssembly smart-contracts.',
  'This module extends accounts based on the `Currency` trait to have smart-contract functionality. It can be used with other modules that implement accounts based on `Currency`. These "smart-contract accounts" have the ability to instantiate smart-contracts and make calls to other contract and non-contract accounts.',
  'The smart-contract code is stored once in a `code_cache`, and later retrievable'
].join('\n');

const PalletContractsConfig: IPalletConfig<EPalletContractsTraits, EPalletContractsGenesisFields> = {
  name: ESupportedPallets.PALLET_CONTRACT,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 75500,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.SMART_CONTRACTS],
    description: palletDescription,
    shortDescription: 'FRAME pallet for WASM contracts'
  },
  dependencies: {
    pallet: {
      alias: 'contracts',
      package: 'pallet-contracts',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_TRANSACTION_PAYMENT, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_RANDOMNESS_COLLECTIVE_FLIP, shouldImplement: true }
    ],
    additionalDeps: [
      {
        alias: 'contracts-primitives',
        package: 'pallet-contracts-primitives',
        version: '2.0.0',
        defaultFeatures: false
      }
    ]
  },
  runtime: {
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.CONFIG,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true,
      }
    },
    palletTraits: {
      Time: 'Timestamp',
      Currency: 'Balances',
      Randomness: 'RandomnessCollectiveFlip',
      Event: 'Event',
      DetermineContractAddress: 'contracts::SimpleAddressDeterminer<Runtime>',
      TrieIdGenerator: 'contracts::TrieIdFromParentCounter<Runtime>',
      RentPayment: '()',
      SignedClaimHandicap: 'contracts::DefaultSignedClaimHandicap',
      TombstoneDeposit: {
        type: 'Balance',
        value: "16_000_000_000"
      },
      StorageSizeOffset: 'contracts::DefaultStorageSizeOffset',
      RentByteFee: {
        type: 'Balance',
        value: "4_000_000_000"
      },
      RentDepositOffset: {
        type: 'Balance',
        value: "1_000_000_000_000"
      },
      SurchargeReward: {
        type: 'Balance',
        value: "150_000_000_000"
      },
      MaxDepth: 'contracts::DefaultMaxDepth',
      MaxValueSize: 'contracts::DefaultMaxValueSize',
      WeightPrice: 'pallet_transaction_payment::Module<Self>'
    },
    genesisConfig: {
      configStructName: 'ContractsConfig',
      structFields: {
        current_schedule: "ContractsSchedule {..Default::default()}"
      }
    },
    additionalRuntimeLibCode: [
      'pub use contracts::Schedule as ContractsSchedule;'
    ],
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{ContractsConfig, ContractsSchedule};'
      ]
    }
  }
};

export default PalletContractsConfig;
