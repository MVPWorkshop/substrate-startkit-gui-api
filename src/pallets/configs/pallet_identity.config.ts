import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletIdentityTraits {
  Event = 'Event',
  Currency = 'Currency',
  BasicDeposit = 'BasicDeposit',
  FieldDeposit = 'FieldDeposit',
  SubAccountDeposit = 'SubAccountDeposit',
  MaxSubAccounts = 'MaxSubAccounts',
  MaxAdditionalFields = 'MaxAdditionalFields',
  MaxRegistrars = 'MaxRegistrars',
  Slashed = 'Slashed',
  ForceOrigin = 'ForceOrigin',
  RegistrarOrigin = 'RegistrarOrigin',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'A federated naming system, allowing for multiple registrars to be added from a specified origin. Registrars can set a fee to provide identity-verification service. Anyone can put forth a proposed identity for a fixed deposit and ask for review by any number of registrars (paying each of their fees). Registrar judgements are given as an enum, allowing for sophisticated, multi-tier opinions.',
  'Some judgements are identified as sticky, which means they cannot be removed except by complete removal of the identity, or by the registrar. Judgements are allowed to represent a portion of funds that have been reserved for the registrar.',
  'A super-user can remove accounts and in doing so, slash the deposit.',
  'All accounts may also have a limited number of sub-accounts which may be specified by the owner; by definition, these have equivalent ownership and each has an individual name.',
  'The number of registrars should be limited, and the deposit made sufficiently large, to ensure no state-bloat attack is viable.'
].join('\n');

const PalletIdentityConfig: IPalletConfig<EPalletIdentityTraits> = {
  name: ESupportedPallets.PALLET_IDENTITY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 15900,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.IDENTITY],
    shortDescription: 'FRAME identity management pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'identity',
      gitRepo: defaultGitRepo,
      package: 'pallet-identity',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletIdentityTraits.Event]: 'Event',
      [EPalletIdentityTraits.Currency]: 'Balances',
      [EPalletIdentityTraits.BasicDeposit]: {
        type: 'Balance',
        value: '1_000_000_000_000_000'
      },
      [EPalletIdentityTraits.FieldDeposit]: {
        type: 'Balance',
        value: '250_000_000_000_000'
      },
      [EPalletIdentityTraits.SubAccountDeposit]: {
        type: 'Balance',
        value: '200_000_000_000_000'
      },
      [EPalletIdentityTraits.MaxSubAccounts]: {
        type: 'u32',
        value: '100'
      },
      [EPalletIdentityTraits.MaxAdditionalFields]: {
        type: 'u32',
        value: '100'
      },
      [EPalletIdentityTraits.MaxRegistrars]: {
        type: 'u32',
        value: '20'
      },
      [EPalletIdentityTraits.Slashed]: '()',
      [EPalletIdentityTraits.ForceOrigin]: 'EnsureRoot<AccountId>',
      [EPalletIdentityTraits.RegistrarOrigin]: 'EnsureRoot<AccountId>',
      [EPalletIdentityTraits.WeightInfo]: '()'
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
    }
  }
}

export default PalletIdentityConfig;
