import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletTreasuryTraits {
  ModuleId = 'ModuleId',
  Currency = 'Currency',
  ApproveOrigin = 'ApproveOrigin',
  RejectOrigin = 'RejectOrigin',
  Tippers = 'Tippers',
  TipCountdown = 'TipCountdown',
  TipFindersFee = 'TipFindersFee',
  TipReportDepositBase = 'TipReportDepositBase',
  Event = 'Event',
  ProposalBond = 'ProposalBond',
  ProposalBondMinimum = 'ProposalBondMinimum',
  SpendPeriod = 'SpendPeriod',
  Burn = 'Burn',
  BurnDestination = 'BurnDestination',
  TipReportDepositPerByte = 'TipReportDepositPerByte',
  WeightInfo = 'WeightInfo',
  ProposalRejection = 'ProposalRejection'
}

const palletDescription = [
  'The Treasury module provides a "pot" of funds that can be managed by stakeholders in the system and a structure for making spending proposals from this pot.',
  'The Treasury Module itself provides the pot to store funds, and a means for stakeholders to propose, approve, and deny expenditures. The chain will need to provide a method (e.g. inflation, fees) for collecting funds.',
  'By way of example, the Council could vote to fund the Treasury with a portion of the block reward and use the funds to pay developers.',
  '\nTipping',
  'A separate subsystem exists to allow for an agile "tipping" process, whereby a reward may be given without first having a pre-determined stakeholder group come to consensus on how much should be paid.',
  'A group of Tippers is determined through the config Trait. After half of these have declared some amount that they believe a particular reported reason deserves, then a countdown period is entered where any remaining members can declare their tip amounts also. After the close of the countdown period, the median of all declared tips is paid to the reported beneficiary, along with any finders fee, in case of a public (and bonded) original report.',
  '\nBounty',
  'A Bounty Spending is a reward for a specified body of work - or specified set of objectives - that needs to be executed for a predefined Treasury amount to be paid out. A curator is assigned after the bounty is approved and funded by Council, to be delegated with the responsibility of assigning a payout address once the specified set of objectives is completed.',
  'After the Council has activated a bounty, it delegates the work that requires expertise to a curator in exchange of a deposit. Once the curator accepts the bounty, they get to close the Active bounty. Closing the Active bounty enacts a delayed payout to the payout address, the curator fee and the return of the curator deposit. The delay allows for intervention through regular democracy. The Council gets to unassign the curator, resulting in a new curator election. The Council also gets to cancel the bounty if deemed necessary before assigning a curator or once the bounty is active or payout is pending, resulting in the slash of the curator\'s deposit.'
].join('\n');

const PalletTreasuryConfig: IPalletConfig<EPalletTreasuryTraits> = {
  name: ESupportedPallets.PALLET_TREASURY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 14100,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.GOVERNANCE],
    shortDescription: 'FRAME pallet to manage treasury',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'treasury',
      gitRepo: defaultGitRepo,
      package: 'pallet-treasury',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_ELECTIONS_PHRAGMEN, shouldImplement: true },
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletTreasuryTraits.Event]: 'Event',
      [EPalletTreasuryTraits.ModuleId]: {
        customName: 'TreasuryModuleId',
        type: 'ModuleId',
        value: 'ModuleId(*b"trsryMdl")'
      },
      [EPalletTreasuryTraits.Currency]: 'Balances',
      [EPalletTreasuryTraits.ApproveOrigin]: 'EnsureRoot<AccountId>',
      [EPalletTreasuryTraits.RejectOrigin]: 'EnsureRoot<AccountId>',
      [EPalletTreasuryTraits.Tippers]: 'ElectionsPhragmen',
      [EPalletTreasuryTraits.TipCountdown]: {
        type: 'BlockNumber',
        value: '28800'
      },
      [EPalletTreasuryTraits.TipFindersFee]: {
        type: 'Percent',
        value: 'Percent::from_percent(20)'
      },
      [EPalletTreasuryTraits.TipReportDepositBase]: {
        type: 'Balance',
        value: '100_000_000_000_000'
      },
      [EPalletTreasuryTraits.ProposalBond]: {
        type: 'Permill',
        value: 'Permill::from_percent(5)'
      },
      [EPalletTreasuryTraits.ProposalBondMinimum]: {
        type: 'Balance',
        value: '100_000_000_000_000'
      },
      [EPalletTreasuryTraits.SpendPeriod]: {
        type: 'BlockNumber',
        value: '28800'
      },
      [EPalletTreasuryTraits.Burn]: {
        type: 'Permill',
        value: 'Permill::from_percent(50)'
      },
      [EPalletTreasuryTraits.BurnDestination]: '()',
      [EPalletTreasuryTraits.TipReportDepositPerByte]: {
        type: 'Balance',
        value: '1_000_000_000_000'
      },
      [EPalletTreasuryTraits.WeightInfo]: '()',
      [EPalletTreasuryTraits.ProposalRejection]: '()',
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

export default PalletTreasuryConfig;
