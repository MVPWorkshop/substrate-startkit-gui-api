import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletSocietyTraits {
  Event = 'Event',
  ModuleId = 'ModuleId',
  Currency = 'Currency',
  Randomness = 'Randomness',
  CandidateDeposit = 'CandidateDeposit',
  WrongSideDeduction = 'WrongSideDeduction',
  MaxStrikes = 'MaxStrikes',
  PeriodSpend = 'PeriodSpend',
  MembershipChanged = 'MembershipChanged',
  RotationPeriod = 'RotationPeriod',
  MaxLockDuration = 'MaxLockDuration',
  FounderSetOrigin = 'FounderSetOrigin',
  SuspensionJudgementOrigin = 'SuspensionJudgementOrigin',
  ChallengePeriod = 'ChallengePeriod'
}

enum EPalletSocietyGenesisFields {
  members = 'members',
  pot = 'pot',
  max_members = 'max_members'
}

const palletDescription = [
  'The Society module is an economic game which incentivizes users to participate and maintain a membership society.'
].join('\n');

const PalletSocietyConfig: IPalletConfig<EPalletSocietyTraits, EPalletSocietyGenesisFields> = {
  name: ESupportedPallets.PALLET_SOCIETY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 24900,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME society pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'society',
      gitRepo: defaultGitRepo,
      package: 'pallet-society',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_RANDOMNESS_COLLECTIVE_FLIP, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletSocietyTraits.Event]: 'Event',
      [EPalletSocietyTraits.ModuleId]: {
        customName: 'SocietyModuleId',
        type: 'ModuleId',
        value: 'ModuleId(*b"soctyMdl")'
      },
      [EPalletSocietyTraits.Currency]: 'Balances',
      [EPalletSocietyTraits.Randomness]: 'RandomnessCollectiveFlip',
      [EPalletSocietyTraits.CandidateDeposit]: {
        type: 'Balance',
        value: '1000_000_000_000_000'
      },
      [EPalletSocietyTraits.WrongSideDeduction]: {
        type: 'Balance',
        value: '200_000_000_000_000'
      },
      [EPalletSocietyTraits.MaxStrikes]: {
        type: 'u32',
        value: '10'
      },
      [EPalletSocietyTraits.PeriodSpend]: {
        type: 'Balance',
        value: '50_000_000_000_000_000'
      },
      [EPalletSocietyTraits.MembershipChanged]: '()',
      [EPalletSocietyTraits.RotationPeriod]: {
        type: 'BlockNumber',
        value: '80 * 1200'
      },
      [EPalletSocietyTraits.MaxLockDuration]: {
        customName: '',
        type: 'BlockNumber',
        value: '36 * 30 * 28800'
      },
      [EPalletSocietyTraits.FounderSetOrigin]: 'EnsureRoot<AccountId>',
      [EPalletSocietyTraits.SuspensionJudgementOrigin]: 'society::EnsureFounder<Runtime>',
      [EPalletSocietyTraits.ChallengePeriod]: {
        type: 'BlockNumber',
        value: '7 * 28800'
      }
    },
    genesisConfig: {
      structFields: {
        [EPalletSocietyGenesisFields.members]: 'vec![]',
        [EPalletSocietyGenesisFields.max_members]: '999',
        [EPalletSocietyGenesisFields.pot]: '0'
      },
      configStructName: 'SocietyConfig'
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
        'use node_template_runtime::{SocietyConfig};'
      ]
    }
  }
}

export default PalletSocietyConfig;
