import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletMembershipTraits {
  Event = 'Event',
  AddOrigin = 'AddOrigin',
  RemoveOrigin = 'RemoveOrigin',
  SwapOrigin = 'SwapOrigin',
  ResetOrigin = 'ResetOrigin',
  PrimeOrigin = 'PrimeOrigin',
  MembershipInitialized = 'MembershipInitialized',
  MembershipChanged = 'MembershipChanged'
}

enum EPalletMembershipGenesisFields {
  members = 'members',
  phantom = 'phantom'
}

const palletDescription = [
  'Allows control of membership of a set of AccountIds, useful for managing membership of of a collective.',
  'A prime member may be set.'
].join('\n');

const ensureRoot = 'EnsureRoot<AccountId>';

const PalletMembershipConfig: IPalletConfig<EPalletMembershipTraits, EPalletMembershipGenesisFields> = {
  name: ESupportedPallets.PALLET_MEMBERSHIP,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 5300,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME membership management pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'membership',
      gitRepo: defaultGitRepo,
      package: 'pallet-membership',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletMembershipTraits.Event]: 'Event',
      [EPalletMembershipTraits.AddOrigin]: ensureRoot,
      [EPalletMembershipTraits.RemoveOrigin]: ensureRoot,
      [EPalletMembershipTraits.SwapOrigin]: ensureRoot,
      [EPalletMembershipTraits.ResetOrigin]: ensureRoot,
      [EPalletMembershipTraits.PrimeOrigin]: ensureRoot,
      [EPalletMembershipTraits.MembershipChanged]: '()',
      [EPalletMembershipTraits.MembershipInitialized]: '()'
    },
    genesisConfig: {
      structFields: {
        [EPalletMembershipGenesisFields.phantom]: 'Default::default()',
        [EPalletMembershipGenesisFields.members]: 'Default::default()'
      },
      configStructName: 'MembershipConfig'
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
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{MembershipConfig};'
      ]
    }
  }
}

export default PalletMembershipConfig;
