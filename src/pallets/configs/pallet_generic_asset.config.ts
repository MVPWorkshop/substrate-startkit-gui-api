import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletGenericAssetTraits {
  Balance = 'Balance',
  AssetId = 'AssetId',
  Event = 'Event'
}

enum EPalletGenericAssetGenesisFields {
  endowed_accounts = 'endowed_accounts',
  assets = 'assets',
  initial_balance = 'initial_balance',
  next_asset_id = 'next_asset_id',
  spending_asset_id = 'spending_asset_id',
  staking_asset_id = 'staking_asset_id'
}

const palletDescription = [
  'The Generic Asset module provides functionality for handling accounts and asset balances.',
  'The Generic Asset module provides functions for:',
  '- Creating a new kind of asset.',
  '- Setting permissions of an asset.',
  '- Getting and setting free balances.',
  '- Retrieving total, reserved and unreserved balances.',
  '- Repatriating a reserved balance to a beneficiary account.',
  '- Transferring a balance between accounts (when not reserved).',
  '- Slashing an account balance.',
  '- Managing total issuance.',
  '- Setting and managing locks.'
].join('\n');

const PalletGenericAssetConfig: IPalletConfig<EPalletGenericAssetTraits, EPalletGenericAssetGenesisFields> = {
  name: ESupportedPallets.PALLET_GENERIC_ASSET,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 16200,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.CENTRALITY_DEVELOPERS],
    categories: [EPalletCategories.ACCOUNTS],
    description: palletDescription,
    shortDescription: 'FRAME pallet for generic asset management'
  },
  dependencies: {
    pallet: {
      alias: 'generic-asset',
      gitRepo: defaultGitRepo,
      defaultFeatures: false,
      package: 'pallet-generic-asset',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.CONFIG
      ],
      generic: {
        [EPalletModuleParts.CONFIG]: true,
        [EPalletModuleParts.EVENT]: true
      }
    },
    palletTraits: {
      [EPalletGenericAssetTraits.Event]: 'Event',
      [EPalletGenericAssetTraits.AssetId]: 'u32',
      [EPalletGenericAssetTraits.Balance]: 'Balance'
    },
    genesisConfig: {
      configStructName: 'GenericAssetConfig',
      structFields: {
        [EPalletGenericAssetGenesisFields.assets]: 'asset_id_generic_asset',
        [EPalletGenericAssetGenesisFields.endowed_accounts]: 'endowed_accounts.iter().cloned().collect::<Vec<_>>()',
        [EPalletGenericAssetGenesisFields.initial_balance]: '100000',
        [EPalletGenericAssetGenesisFields.next_asset_id]: '6u32',
        [EPalletGenericAssetGenesisFields.spending_asset_id]: '1u32',
        [EPalletGenericAssetGenesisFields.staking_asset_id]: '4u32'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{GenericAssetConfig};'
      ],
      additionalVariables: [
        'let asset_id_generic_asset: Vec<u32> = vec![1,2,3,4,5].into();'
      ]
    }
  }
}

export default PalletGenericAssetConfig;
