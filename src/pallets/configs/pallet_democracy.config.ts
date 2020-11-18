import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletDemocracyTraits {
  Proposal = 'Proposal',
  Event = 'Event',
  Currency = 'Currency',
  EnactmentPeriod = 'EnactmentPeriod',
  LaunchPeriod = 'LaunchPeriod',
  VotingPeriod = 'VotingPeriod',
  MinimumDeposit = 'MinimumDeposit',
  ExternalOrigin = 'ExternalOrigin',
  ExternalMajorityOrigin = 'ExternalMajorityOrigin',
  ExternalDefaultOrigin = 'ExternalDefaultOrigin',
  FastTrackOrigin = 'FastTrackOrigin',
  InstantOrigin = 'InstantOrigin',
  InstantAllowed = 'InstantAllowed',
  FastTrackVotingPeriod = 'FastTrackVotingPeriod',
  CancellationOrigin = 'CancellationOrigin',
  VetoOrigin = 'VetoOrigin',
  CooloffPeriod = 'CooloffPeriod',
  PreimageByteDeposit = 'PreimageByteDeposit',
  OperationalPreimageOrigin = 'OperationalPreimageOrigin',
  Slash = 'Slash',
  Scheduler = 'Scheduler',
  PalletsOrigin = 'PalletsOrigin',
  MaxVotes = 'MaxVotes',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'The Democracy pallet handles the administration of general stakeholder voting.',
  'There are two different queues that a proposal can be added to before it becomes a referendum',
  '1) the proposal queue consisting of all public proposals and',
  '2) the external queue consisting of a single proposal that originates from one of the external origins (such as a collective group).',
  'Every launch period - a length defined in the runtime - the Democracy pallet launches a referendum from a proposal that it takes from either the proposal queue or the external queue in turn. Any token holder in the system can vote on referenda. The voting system uses time-lock voting by allowing the token holder to set their conviction behind a vote. The conviction will dictate the length of time the tokens will be locked, as well as the multiplier that scales the vote power.'
].join('\n');

const PalletDemocracyConfig: IPalletConfig<EPalletDemocracyTraits> = {
  name: ESupportedPallets.PALLET_DEMOCRACY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 28700,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME pallet for democracy',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'democracy',
      gitRepo: defaultGitRepo,
      package: 'pallet-democracy',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_SCHEDULER, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_TREASURY, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletDemocracyTraits.Proposal]: 'Call',
      [EPalletDemocracyTraits.Event]: 'Event',
      [EPalletDemocracyTraits.Currency]: 'Balances',
      [EPalletDemocracyTraits.EnactmentPeriod]: {
        type: 'BlockNumber',
        value: '30 * 24 * 60 * 20'
      },
      [EPalletDemocracyTraits.LaunchPeriod]: {
        customName: 'LaunchPeriodDemocracy',
        type: 'BlockNumber',
        value: '28 * 24 * 60 * 20'
      },
      [EPalletDemocracyTraits.VotingPeriod]: {
        customName: 'VotingPeriodDemocracy',
        type: 'BlockNumber',
        value: '28 * 24 * 60 * 20'
      },
      [EPalletDemocracyTraits.MinimumDeposit]: {
        type: 'Balance',
        value: '100 * 100_000_000_000_000'
      },
      [EPalletDemocracyTraits.ExternalOrigin]: 'EnsureRoot<AccountId>',
      [EPalletDemocracyTraits.ExternalMajorityOrigin]: 'EnsureSigned<AccountId>',
      [EPalletDemocracyTraits.ExternalDefaultOrigin]: 'EnsureSigned<AccountId>',
      [EPalletDemocracyTraits.FastTrackOrigin]: 'EnsureSigned<AccountId>',
      [EPalletDemocracyTraits.InstantOrigin]: 'EnsureSigned<AccountId>',
      [EPalletDemocracyTraits.InstantAllowed]: {
        customName: '',
        type: '',
        value: ''
      },
      [EPalletDemocracyTraits.FastTrackVotingPeriod]: {
        type: 'bool',
        value: 'true'
      },
      [EPalletDemocracyTraits.CancellationOrigin]: 'EnsureNever<AccountId>',
      [EPalletDemocracyTraits.VetoOrigin]: 'EnsureNever<AccountId>',
      [EPalletDemocracyTraits.CooloffPeriod]: {
        type: 'BlockNumber',
        value: '28 * 24 * 60 * 20'
      },
      [EPalletDemocracyTraits.PreimageByteDeposit]: {
        type: 'Balance',
        value: '1_000_000_000_000'
      },
      [EPalletDemocracyTraits.OperationalPreimageOrigin]: 'EnsureSigned<AccountId>',
      [EPalletDemocracyTraits.Slash]: 'Treasury',
      [EPalletDemocracyTraits.Scheduler]: 'Scheduler',
      [EPalletDemocracyTraits.PalletsOrigin]: 'OriginCaller',
      [EPalletDemocracyTraits.MaxVotes]: {
        type: 'u32',
        value: '100'
      },
      [EPalletDemocracyTraits.WeightInfo]: '()',
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true
      }
    }
  }
}

export default PalletDemocracyConfig;
