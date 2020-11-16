import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletCollectiveTraits {
  Origin = 'Origin',
  Proposal = 'Proposal',
  Event = 'Event',
  MotionDuration = 'MotionDuration',
  MaxProposals = 'MaxProposals',
  WeightInfo = 'WeightInfo'
}

enum EPalletCollectiveGenesisFields {
  members = 'members',
  phantom = 'phantom'
}

const palletDescription = [
  'Collective system: Members of a set of account IDs can make their collective feelings known through dispatched calls from one of two specialized origins.',
  'The membership can be provided in one of two ways: either directly, using the Root-dispatchable function set_members, or indirectly, through implementing the ChangeMembers. The pallet assumes that the amount of members stays at or below MaxMembers for its weight calculations, but enforces this neither in set_members nor in change_members_sorted.',
  'A "prime" member may be set to help determine the default vote behavior based on chain config. If PreimDefaultVote is used, the prime vote acts as the default vote in case of any abstentions after the voting period. If MoreThanMajorityThenPrimeDefaultVote is used, then abstentations will first follow the majority of the collective voting, and then the prime member.',
  'Voting happens through motions comprising a proposal (i.e. a curried dispatchable) plus a number of approvals required for it to pass and be called. Motions are open for members to vote on for a minimum period given by MotionDuration. As soon as the needed number of approvals is given, the motion is closed and executed. If the number of approvals is not reached during the voting period, then close may be called by any account in order to force the end the motion explicitly. If a prime member is defined then their vote is used in place of any abstentions and the proposal is executed if there are enough approvals counting the new votes.',
  'If there are not, or if no prime is set, then the motion is dropped without being executed.'
].join('\n');

const PalletCollectiveConfig: IPalletConfig<EPalletCollectiveTraits, EPalletCollectiveGenesisFields> = {
  name: ESupportedPallets.PALLET_COLLECTIVE,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 15500,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME pallet collective',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'collective',
      gitRepo: defaultGitRepo,
      package: 'pallet-collective',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletCollectiveTraits.Event]: 'Event',
      [EPalletCollectiveTraits.WeightInfo]: '()',
      [EPalletCollectiveTraits.Origin]: 'Origin',
      [EPalletCollectiveTraits.Proposal]: 'Call',
      [EPalletCollectiveTraits.MaxProposals]: {
        type: 'u32',
        value:'100'
      },
      [EPalletCollectiveTraits.MotionDuration]: {
        type: 'BlockNumber',
        value: '28_800'
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.ORIGIN,
        EPalletModuleParts.CONFIG
      ],
      generic: {
        [EPalletModuleParts.ORIGIN]: true,
        [EPalletModuleParts.EVENT]: true,
        [EPalletModuleParts.CONFIG]: true
      }
    },
    genesisConfig: {
      structFields: {
        [EPalletCollectiveGenesisFields.members]: 'vec![]',
        [EPalletCollectiveGenesisFields.phantom]: 'Default::default()'
      },
      configStructName: 'CollectiveConfig'
    },
    additionalChainSpecCode: {
      additionalCode: [
        'use node_template_runtime::{CollectiveConfig};'
      ]
    }
  }
}

export default PalletCollectiveConfig;
