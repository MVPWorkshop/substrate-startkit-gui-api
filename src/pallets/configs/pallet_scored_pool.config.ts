import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletScoredPoolTraits {
  Currency = 'Currency',
  Score = 'Score',
  Event = 'Event',
  CandidateDeposit = 'CandidateDeposit',
  Period = 'Period',
  MembershipInitialized = 'MembershipInitialized',
  MembershipChanged = 'MembershipChanged',
  ScoreOrigin = 'ScoreOrigin',
  KickOrigin = 'KickOrigin'
}

enum EPalletScoredPoolGenesisFields {
  pool = 'pool',
  member_count = 'member_count',
  members = 'members',
  phantom = 'phantom'
}

const palletDescription = [
  'The module maintains a scored membership pool. Each entity in the pool can be attributed a Score. From this pool a set Members is constructed. This set contains the MemberCount highest scoring entities. Unscored entities are never part of Members.',
  'If an entity wants to be part of the pool a deposit is required. The deposit is returned when the entity withdraws or when it is removed by an entity with the appropriate authority.',
  'Every Period blocks the set of Members is refreshed from the highest scoring members in the pool and, no matter if changes occurred, T::MembershipChanged::set_members_sorted is invoked. On first load T::MembershipInitialized::initialize_members is invoked with the initial Members set.',
  'It is possible to withdraw candidacy/resign your membership at any time. If an entity is currently a member, this results in removal from the Pool and Members; the entity is immediately replaced by the next highest scoring candidate in the pool, if available.'
].join('\n');

const PalletScoredPoolConfig: IPalletConfig<EPalletScoredPoolTraits, EPalletScoredPoolGenesisFields> = {
  name: ESupportedPallets.PALLET_SCORED_POOL,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 8690,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME pallet for scored pools',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'scored-pool',
      package: 'pallet-scored-pool',
      version: '2.0.0',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletScoredPoolTraits.Currency]: 'Balances',
      [EPalletScoredPoolTraits.Score]: 'u64',
      [EPalletScoredPoolTraits.Event]: 'Event',
      [EPalletScoredPoolTraits.CandidateDeposit]: {
        customName: 'CandidateDepositScoredPool',
        type: 'Balance',
        value: '25'
      },
      [EPalletScoredPoolTraits.Period]: {
        customName: 'PeriodScoredPool',
        type: 'BlockNumber',
        value: '4'
      },
      [EPalletScoredPoolTraits.MembershipInitialized]: '()',
      [EPalletScoredPoolTraits.MembershipChanged]: '()',
      [EPalletScoredPoolTraits.ScoreOrigin]: 'EnsureRoot<AccountId>',
      [EPalletScoredPoolTraits.KickOrigin]: 'EnsureRoot<AccountId>'
    },
    genesisConfig: {
      configStructName: 'ScoredPoolConfig',
      structFields: {
        [EPalletScoredPoolGenesisFields.pool]: 'vec![]',
        [EPalletScoredPoolGenesisFields.member_count]: '0',
        [EPalletScoredPoolGenesisFields.members]: 'vec![]',
        [EPalletScoredPoolGenesisFields.phantom]: 'Default::default()'
      }
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
        'use node_template_runtime::{ScoredPoolConfig};'
      ]
    }
  }
}

export default PalletScoredPoolConfig;
