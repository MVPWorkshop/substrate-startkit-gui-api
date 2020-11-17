import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletElectionsTraits {
  Event = 'Event',
  ModuleId = 'ModuleId',
  Currency = 'Currency',
  BadPresentation = 'BadPresentation',
  BadReaper = 'BadReaper',
  BadVoterIndex = 'BadVoterIndex',
  LoserCandidate = 'LoserCandidate',
  ChangeMembers = 'ChangeMembers',
  CandidacyBond = 'CandidacyBond',
  VotingBond = 'VotingBond',
  VotingFee = 'VotingFee',
  MinimumVotingLock = 'MinimumVotingLock',
  PresentSlashPerVoter = 'PresentSlashPerVoter',
  CarryCount = 'CarryCount',
  InactiveGracePeriod = 'InactiveGracePeriod',
  VotingPeriod = 'VotingPeriod',
  DecayRatio = 'DecayRatio'
}

enum EPalletElectionsGenesisFields {
  presentation_duration = 'presentation_duration',
  term_duration = 'term_duration',
  desired_seats = 'desired_seats',
  members = 'members'
}

const palletDescription = [
  'Election module for stake-weighted membership selection of a collective.',
  'The composition of a set of account IDs works according to one or more approval votes weighted by stake. There is a partial carry-over facility to give greater weight to those whose voting is serially unsuccessful.'
].join('\n');

const PalletElectionsConfig: IPalletConfig<EPalletElectionsTraits, EPalletElectionsGenesisFields> = {
  name: ESupportedPallets.PALLET_ELECTIONS,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 23600,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME pallet for elections',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'elections',
      gitRepo: defaultGitRepo,
      package: 'pallet-elections',
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
      [EPalletElectionsTraits.Event]: 'Event',
      [EPalletElectionsTraits.ModuleId]: {
        customName: 'ElectionsModuleId',
        type: 'LockIdentifier',
        value: '*b"elcnsMdl"'
      },
      [EPalletElectionsTraits.Currency]: 'Balances',
      [EPalletElectionsTraits.BadPresentation]: '()',
      [EPalletElectionsTraits.BadReaper]: '()',
      [EPalletElectionsTraits.BadVoterIndex]: '()',
      [EPalletElectionsTraits.LoserCandidate]: '()',
      [EPalletElectionsTraits.ChangeMembers]: '()',
      [EPalletElectionsTraits.CandidacyBond]: {
        type: 'Balance',
        value: '9'
      },
      [EPalletElectionsTraits.VotingBond]: {
        type: 'Balance',
        value: '3'
      },
      [EPalletElectionsTraits.VotingFee]: {
        type: 'Balance',
        value: '1'
      },
      [EPalletElectionsTraits.MinimumVotingLock]: {
        type: 'Balance',
        value: '1'
      },
      [EPalletElectionsTraits.PresentSlashPerVoter]: {
        type: 'Balance',
        value: '1'
      },
      [EPalletElectionsTraits.CarryCount]: {
        type: 'u32',
        value: '2'
      },
      [EPalletElectionsTraits.InactiveGracePeriod]: {
        type: 'u32',
        value: '1'
      },
      [EPalletElectionsTraits.VotingPeriod]: {
        type: 'BlockNumber',
        value: '1000'
      },
      [EPalletElectionsTraits.DecayRatio]: {
        type: 'u32',
        value: '24'
      },
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
        [EPalletModuleParts.EVENT]: true,
        [EPalletModuleParts.CONFIG]: true
      }
    },
    genesisConfig: {
      configStructName: 'ElectionsConfig',
      structFields: {
        [EPalletElectionsGenesisFields.members]: 'vec![]',
        [EPalletElectionsGenesisFields.desired_seats]: 'Default::default()',
        [EPalletElectionsGenesisFields.presentation_duration]: 'Default::default()',
        [EPalletElectionsGenesisFields.term_duration]: 'Default::default()'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{ElectionsConfig};'
      ]
    }
  }
}

export default PalletElectionsConfig;
