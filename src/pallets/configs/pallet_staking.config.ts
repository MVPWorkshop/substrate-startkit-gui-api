import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';
import { tabs } from '../../utils/common.util';

enum EPalletStakingTraits {
  Currency = 'Currency',
  UnixTime = 'UnixTime',
  CurrencyToVote = 'CurrencyToVote',
  RewardRemainder = 'RewardRemainder',
  Event = 'Event',
  Slash = 'Slash',
  Reward = 'Reward',
  SessionsPerEra = 'SessionsPerEra',
  BondingDuration = 'BondingDuration',
  SlashDeferDuration = 'SlashDeferDuration',
  SlashCancelOrigin = 'SlashCancelOrigin',
  SessionInterface = 'SessionInterface',
  RewardCurve = 'RewardCurve',
  NextNewSession = 'NextNewSession',
  ElectionLookahead = 'ElectionLookahead',
  Call = 'Call',
  MaxIterations = 'MaxIterations',
  MinSolutionScoreBump = 'MinSolutionScoreBump',
  MaxNominatorRewardedPerValidator = 'MaxNominatorRewardedPerValidator',
  UnsignedPriority = 'UnsignedPriority',
  WeightInfo = 'WeightInfo'
}

enum EPalletStakingGenesisFields {
  validator_count = 'validator_count',
  minimum_validator_count = 'minimum_validator_count',
  stakers = 'stakers',
  invulnerables = 'invulnerables',
  slash_reward_fraction = 'slash_reward_fraction',
  canceled_payout = 'canceled_payout',
  force_era = 'force_era',
  history_depth = 'history_depth'
}

const palletDescription = [
  'The Staking module is used to manage funds at stake by network maintainers.',
  'The Staking module is the means by which a set of network maintainers (known as authorities in some contexts and validators in others) are chosen based upon those who voluntarily place funds under deposit.',
  'Under deposit, those funds are rewarded under normal operation but are held at pain of slash (expropriation) should the staked maintainer be found not to be discharging its duties properly.'
].join('\n');

const PalletStakingConfig: IPalletConfig<EPalletStakingTraits, EPalletStakingGenesisFields> = {
  name: ESupportedPallets.PALLET_STAKING,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 86100,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.CONSENSUS],
    shortDescription: 'FRAME pallet staking',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'staking',
      gitRepo: defaultGitRepo,
      package: 'pallet-staking',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalDeps: [
      { simple: true, package: 'pallet-staking-reward-curve', version: '2.0.0-rc5' }
    ],
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SESSION, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_AUTHORSHIP, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletStakingTraits.Event]: 'Event',
      [EPalletStakingTraits.Currency]: 'Balances',
      [EPalletStakingTraits.Call]: 'Call',
      [EPalletStakingTraits.UnixTime]: 'Timestamp',
      [EPalletStakingTraits.CurrencyToVote]: '()',
      [EPalletStakingTraits.RewardRemainder]: '()',
      [EPalletStakingTraits.Slash]: '()',
      [EPalletStakingTraits.Reward]: '()',
      [EPalletStakingTraits.SessionsPerEra]: {
        type: 'sp_staking::SessionIndex',
        value: '6'
      },
      [EPalletStakingTraits.BondingDuration]: {
        type: 'staking::EraIndex',
        value: '24 * 28'
      },
      [EPalletStakingTraits.SlashDeferDuration]: {
        type: 'staking::EraIndex',
        value: '24 * 7'
      },
      [EPalletStakingTraits.SlashCancelOrigin]: 'EnsureOneOf<AccountId, EnsureRoot<AccountId>, EnsureRoot<AccountId>>',
      [EPalletStakingTraits.SessionInterface]: 'Self',
      [EPalletStakingTraits.RewardCurve]: {
        type: '&\'static PiecewiseLinear<\'static>',
        value: '&REWARD_CURVE'
      },
      [EPalletStakingTraits.NextNewSession]: 'Session',
      [EPalletStakingTraits.ElectionLookahead]: {
        type: 'BlockNumber',
        value: '50'
      },
      [EPalletStakingTraits.MaxIterations]: {
        type: 'u32',
        value: '10'
      },
      [EPalletStakingTraits.MinSolutionScoreBump]: {
        type: 'Perbill',
        value: 'Perbill::from_rational_approximation(5u32, 10_000)',
        isNotConst: true
      },
      [EPalletStakingTraits.MaxNominatorRewardedPerValidator]: {
        type: 'u32',
        value: '256'
      },
      [EPalletStakingTraits.UnsignedPriority]: {
        type: 'TransactionPriority',
        value: 'TransactionPriority::max_value() / 2'
      },
      [EPalletStakingTraits.WeightInfo]: '()'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.CONFIG,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.VALIDATE_UNSIGNED
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true,
        [EPalletModuleParts.CONFIG]: true
      }
    },
    additionalRuntimeLibCode: [
      'use sp_runtime::curve::PiecewiseLinear;',
      [
        `pallet_staking_reward_curve::build! {`,
        `${tabs(1)}const REWARD_CURVE: PiecewiseLinear<'static> = curve!(`,
        `${tabs(2)}min_inflation: 0_025_000,`,
        `${tabs(2)}max_inflation: 0_100_000,`,
        `${tabs(2)}ideal_stake: 0_500_000,`,
        `${tabs(2)}falloff: 0_050_000,`,
        `${tabs(2)}max_piece_count: 40,`,
        `${tabs(2)}test_precision: 0_005_000,`,
        `${tabs(1)});`,
        '}'
      ].join('\n')
    ],
    genesisConfig: {
      configStructName: 'StakingConfig',
      structFields: {
        [EPalletStakingGenesisFields.canceled_payout]: 'Default::default()',
        [EPalletStakingGenesisFields.force_era]: 'Default::default()',
        [EPalletStakingGenesisFields.history_depth]: 'Default::default()',
        [EPalletStakingGenesisFields.invulnerables]: 'vec![]',
        [EPalletStakingGenesisFields.minimum_validator_count]: 'initial_authorities.len() as u32',
        [EPalletStakingGenesisFields.slash_reward_fraction]: 'Perbill::from_percent(10)',
        [EPalletStakingGenesisFields.validator_count]: 'initial_authorities.len() as u32 * 2',
        [EPalletStakingGenesisFields.stakers]: 'vec![]'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{StakingConfig};'
      ]
    }
  }
}

export default PalletStakingConfig;
