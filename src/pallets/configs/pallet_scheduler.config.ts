import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletSchedulerTraits {
  Event = 'Event',
  Origin = 'Origin',
  PalletsOrigin = 'PalletsOrigin',
  Call = 'Call',
  MaximumWeight = 'MaximumWeight',
  ScheduleOrigin = 'ScheduleOrigin',
  MaxScheduledPerBlock = 'MaxScheduledPerBlock',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'A module for scheduling dispatches.',
  'This module exposes capabilities for scheduling dispatches to occur at a specified block number or at a specified period. These scheduled dispatches may be named or anonymous and may be canceled.',
  'NOTE: The scheduled calls will be dispatched with the default filter for the origin: namely frame_system::Trait::BaseCallFilter for all origin except root which will get no filter. And not the filter contained in origin use to call fn schedule.',
  'If a call is scheduled using proxy or whatever mecanism which adds filter, then those filter will not be used when dispatching the schedule call.'
].join('\n');

const PalletSchedulerConfig: IPalletConfig<EPalletSchedulerTraits> = {
  name: ESupportedPallets.PALLET_SCHEDULER,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 8010,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.OTHER],
    shortDescription: 'FRAME pallet for scheduling dispatches',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'scheduler',
      package: 'pallet-scheduler',
      version: '2.0.0',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletSchedulerTraits.Event]: 'Event',
      [EPalletSchedulerTraits.Origin]: 'Origin',
      [EPalletSchedulerTraits.PalletsOrigin]: 'OriginCaller',
      [EPalletSchedulerTraits.Call]: 'Call',
      [EPalletSchedulerTraits.MaximumWeight]: {
        customName: 'MaximumSchedulerWeight',
        type: 'Weight',
        value: 'Perbill::from_percent(80) * MaximumBlockWeight::get()',
        isNotConst: true
      },
      [EPalletSchedulerTraits.ScheduleOrigin]: 'EnsureRoot<AccountId>',
      [EPalletSchedulerTraits.MaxScheduledPerBlock]: {
        type: 'u32',
        value: '50'
      },
      [EPalletSchedulerTraits.WeightInfo]: '()'
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

export default PalletSchedulerConfig;
