import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletBalancesTraits {
  Balance = "Balance",
  Event = "Event",
  DustRemoval = "DustRemoval",
  ExistentialDeposit = "ExistentialDeposit",
  AccountStore = "AccountStore",
  WeightInfo = "WeightInfo"
}

enum EPalletBalancesGenesisFields {
  balances= 'balances'
}

const palletDescription = [
  'The Balances module provides functionality for handling accounts and balances.',
  'The Balances module provides functions for:',
  '- Getting and setting free balances.',
  '- Retrieving total, reserved, and unreserved balances.',
  '- Repatriating a reserved balance to a beneficiary account that exists.',
  '- Transferring a balance between accounts (when not reserved).',
  '- Slashing an account balance.',
  '- Account creation and removal.',
  '- Managing total issuance.',
  '- Setting and managing locks.'
].join('\n');

const PalletBalancesConfig: IPalletConfig<EPalletBalancesTraits, EPalletBalancesGenesisFields> = {
  name: ESupportedPallets.PALLET_BALANCE,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 20000,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.ACCOUNTS],
    description: palletDescription,
    shortDescription: 'FRAME pallet to manage balances'
  },
  dependencies: {
    pallet: {
      alias: 'balances',
      gitRepo: defaultGitRepo,
      defaultFeatures: false,
      package: 'pallet-balances',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5'
    }
  },
  runtime: {
    palletTraits: {
      Balance: 'Balance',
      Event: 'Event',
      DustRemoval: '()',
      ExistentialDeposit: {
        constantType: 'u128',
        value: '500'
      },
      AccountStore: 'System',
      WeightInfo: '()'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.CONFIG,
        EPalletModuleParts.EVENT
      ],
      generic: {
        [EPalletModuleParts.CONFIG]: true,
        [EPalletModuleParts.EVENT]: true
      }
    },
    genesisConfig: {
      configStructName: 'BalancesConfig',
      structFields: {
        balances: 'endowed_accounts.iter().cloned().map(|k|(k, 1 << 60)).collect()'
      }
    },
    additionalChainSpecCode: [
      'use node_template_runtime::{BalancesConfig};'
    ]
  }
};

export default PalletBalancesConfig;
