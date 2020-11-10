import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletRecoveryTraits {
  Event = 'Event',
  Call = 'Call',
  Currency = 'Currency',
  ConfigDepositBase = 'ConfigDepositBase',
  FriendDepositFactor = 'FriendDepositFactor',
  MaxFriends = 'MaxFriends',
  RecoveryDeposit = 'RecoveryDeposit'
}

const palletDescription = [
  'The Recovery pallet is an M-of-N social recovery tool for users to gain access to their accounts if the private key or other authentication mechanism is lost.',
  'Through this pallet, a user is able to make calls on-behalf-of another account which they have recovered.',
  'The recovery process is protected by trusted "friends" whom the original account owner chooses. A threshold (M) out of N friends are needed to give another account access to the recoverable account.'
].join('\n');

const PalletRecoveryConfig: IPalletConfig<EPalletRecoveryTraits> = {
  name: ESupportedPallets.PALLET_RECOVERY,
  metadata: {
    size: 12100,
    updated: 1596018720,
    license: 'Apache-2.0',
    compatibility: ESubstrateVersion.TWO,
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [
      EPalletCategories.ACCOUNTS
    ],
    description: palletDescription,
    shortDescription: 'FRAME account recovery pallet'
  },
  dependencies: {
    pallet: {
      defaultFeatures: false,
      package: 'pallet-recovery',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      gitRepo: defaultGitRepo,
      alias: 'recovery'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletRecoveryTraits.Event]: 'Event',
      [EPalletRecoveryTraits.Call]: 'Call',
      [EPalletRecoveryTraits.Currency]: 'Balances',
      [EPalletRecoveryTraits.ConfigDepositBase]: {
        constantType: 'Balance',
        value: '5_000_000_000'
      },
      [EPalletRecoveryTraits.FriendDepositFactor]: {
        constantType: 'Balance',
        value: '50_000_000'
      },
      [EPalletRecoveryTraits.MaxFriends]: {
        constantType: 'u16',
        value: '9'
      },
      [EPalletRecoveryTraits.RecoveryDeposit]: {
        constantType: 'Balance',
        value: '25_000_000_000'
      }
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

export default PalletRecoveryConfig;
