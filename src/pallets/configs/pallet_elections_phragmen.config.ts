import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletElectionsPhragmenTraits {
  Event = 'Event',
  ModuleId = 'ModuleId',
  Currency = 'Currency',
  ChangeMembers = 'ChangeMembers',
  InitializeMembers = 'InitializeMembers',
  CurrencyToVote = 'CurrencyToVote',
  CandidacyBond = 'CandidacyBond',
  VotingBond = 'VotingBond',
  LoserCandidate = 'LoserCandidate',
  BadReport = 'BadReport',
  KickedMember = 'KickedMember',
  DesiredMembers = 'DesiredMembers',
  DesiredRunnersUp = 'DesiredRunnersUp',
  TermDuration = 'TermDuration',
  WeightInfo = 'WeightInfo'
}

enum EPalletElectionsPhragmenGenesisFields {
  members = 'members'
}

const palletDescription = [
  'An election module based on sequential phragmen.',
  '\nTerm and Round',
  'The election happens in rounds: every N blocks, all previous members are retired and a new set is elected (which may or may not have an intersection with the previous set). Each round lasts for some number of blocks defined by TermDuration storage item. The words term and round can be used interchangeably in this context.',
  'TermDuration might change during a round. This can shorten or extend the length of the round. The next election round\'s block number is never stored but rather always checked on the fly. Based on the current block number and TermDuration, the condition BlockNumber % TermDuration == 0 being satisfied will always trigger a new election round.',
  '\nVoting',
  'Voters can vote for any set of the candidates by providing a list of account ids. Invalid votes (voting for non-candidates) are ignored during election. Yet, a voter might vote for a future candidate. Voters reserve a bond as they vote. Each vote defines a value. This amount is locked from the account of the voter and indicates the weight of the vote. Voters can update their votes at any time by calling vote() again. This keeps the bond untouched but can optionally change the locked value. After a round, votes are kept and might still be valid for further rounds. A voter is responsible for calling remove_voter once they are done to have their bond back and remove the lock.',
  'Voters also report other voters as being defunct to earn their bond. A voter is defunct once all of the candidates that they have voted for are neither a valid candidate anymore nor a member. Upon reporting, if the target voter is actually defunct, the reporter will be rewarded by the voting bond of the target. The target will lose their bond and get removed. If the target is not defunct, the reporter is slashed and removed. To prevent being reported, voters should manually submit a remove_voter() as soon as they are in the defunct state.',
  '\nCandidacy and Members',
  'Candidates also reserve a bond as they submit candidacy. A candidate cannot take their candidacy back. A candidate can end up in one of the below situations:',
  '- Winner: A winner is kept as a member. They must still have a bond in reserve and they are automatically counted as a candidate for the next election.',
  '- Runner-up: Runners-up are the best candidates immediately after the winners. The number of runners_up to keep is configurable. Runners-up are used, in order that they are elected, as replacements when a candidate is kicked by [remove_member], or when an active member renounces their candidacy. Runners are automatically counted as a candidate for the next election.',
  '- Loser: Any of the candidate who are not a winner are left as losers. A loser might be an outgoing member or runner, meaning that they are an active member who failed to keep their spot. An outgoing will always lose their bond.',
  '\nRenouncing candidacy.',
  'All candidates, elected or not, can renounce their candidacy. A call to [Module::renounce_candidacy] will always cause the candidacy bond to be refunded.',
  'Note that with the members being the default candidates for the next round and votes persisting in storage, the election system is entirely stable given no further input. This means that if the system has a particular set of candidates C and voters V that lead to a set of members M being elected, as long as V and C don\'t remove their candidacy and votes, M will keep being re-elected at the end of each round.'
].join('\n');

const PalletElectionsPhragmenConfig: IPalletConfig<EPalletElectionsPhragmenTraits, EPalletElectionsPhragmenGenesisFields> = {
  name: ESupportedPallets.PALLET_ELECTIONS_PHRAGMEN,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 24200,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME pallet based on seq-Phragmén election method.',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'elections-phragmen',
      gitRepo: defaultGitRepo,
      package: 'pallet-elections-phragmen',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_COLLECTIVE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletElectionsPhragmenTraits.Event]: 'Event',
      [EPalletElectionsPhragmenTraits.ModuleId]: {
        customName: 'ElectionsPhragmenModuleId',
        type: 'LockIdentifier',
        value: '*b"elnPrMdl"'
      },
      [EPalletElectionsPhragmenTraits.Currency]: 'Balances',
      [EPalletElectionsPhragmenTraits.ChangeMembers]: 'Collective',
      [EPalletElectionsPhragmenTraits.InitializeMembers]: 'Collective',
      [EPalletElectionsPhragmenTraits.CurrencyToVote]: '()',
      [EPalletElectionsPhragmenTraits.CandidacyBond]: {
        customName: 'CandidacyBondPhragmen',
        type: 'Balance',
        value: '5000'
      },
      [EPalletElectionsPhragmenTraits.VotingBond]: {
        customName: 'VotingBondPhragmen',
        type: 'Balance',
        value: '500'
      },
      [EPalletElectionsPhragmenTraits.LoserCandidate]: '()',
      [EPalletElectionsPhragmenTraits.BadReport]: '()',
      [EPalletElectionsPhragmenTraits.KickedMember]: '()',
      [EPalletElectionsPhragmenTraits.DesiredMembers]: {
        type: 'u32',
        value: '13'
      },
      [EPalletElectionsPhragmenTraits.DesiredRunnersUp]: {
        type: 'u32',
        value: '7'
      },
      [EPalletElectionsPhragmenTraits.TermDuration]: {
        type: 'BlockNumber',
        value: '486_600'
      },
      [EPalletElectionsPhragmenTraits.WeightInfo]: '()'
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
    genesisConfig: {
      configStructName: 'ElectionsPhragmenConfig',
      structFields: {
        [EPalletElectionsPhragmenGenesisFields.members]: 'vec![]'
      }
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{ElectionsPhragmenConfig};'
      ]
    }
  }
}

export default PalletElectionsPhragmenConfig;
