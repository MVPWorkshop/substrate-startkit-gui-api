import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletTransactionPaymentTraits {
  Currency = 'Currency',
  OnTransactionPayment = 'OnTransactionPayment',
  TransactionByteFee = 'TransactionByteFee',
  WeightToFee = 'WeightToFee',
  FeeMultiplierUpdate = 'FeeMultiplierUpdate'
}

const palletDescription = [
  'This module provides the basic logic needed to pay the absolute minimum amount needed for a transaction to be included. This includes:',
  '- weight fee: A fee proportional to amount of weight a transaction consumes.',
  '- length fee: A fee proportional to the encoded length of the transaction.',
  '- tip: An optional tip. Tip increases the priority of the transaction, giving it a higher chance to be included by the transaction queue.',
  '',
  'Additionally, this module allows one to configure:',
  '- The mapping between one unit of weight to one unit of fee via Trait::WeightToFee.',
  '- A means of updating the fee for the next block, via defining a multiplier, based on the final state of the chain at the end of the previous block. This can be configured via Trait::FeeMultiplierUpdate'
].join('\n');

const PalletTransactionPaymentConfig: IPalletConfig<EPalletTransactionPaymentTraits> = {
  name: ESupportedPallets.PALLET_TRANSACTION_PAYMENT,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 7160,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.RUNTIME],
    description: palletDescription,
    shortDescription: 'FRAME pallet to manage transaction payments'
  },
  dependencies: {
    pallet: {
      alias: 'pallet-transaction-payment',
      package: 'pallet-transaction-payment',
      version: '2.0.0',
      defaultFeatures: false,
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletTransactionPaymentTraits.Currency]: 'balances::Module<Runtime>',
      [EPalletTransactionPaymentTraits.FeeMultiplierUpdate]: '()',
      [EPalletTransactionPaymentTraits.OnTransactionPayment]: '()',
      [EPalletTransactionPaymentTraits.WeightToFee]: 'IdentityFee<Balance>',
      [EPalletTransactionPaymentTraits.TransactionByteFee]: {
        value: '1',
        type: 'Balance'
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.STORAGE
      ]
    },
    additionalRuntimeLibCode: [
      'pub use frame_support::{ weights::{ IdentityFee } };'
    ]
  }
}

export default PalletTransactionPaymentConfig;
