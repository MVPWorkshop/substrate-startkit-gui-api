import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletOffencesTraits {
  Event = 'Event',
  IdentificationTuple = 'IdentificationTuple',
  OnOffenceHandler = 'OnOffenceHandler',
  WeightSoftLimit = 'WeightSoftLimit',
}

const palletDescription = [
  'Tracks reported offences'
].join('\n');

const PalletOffencesConfig: IPalletConfig<EPalletOffencesTraits> = {
  name: ESupportedPallets.PALLET_OFFENCES,
  metadata: {
    size: 7040,
    updated: 1600801158,
    license: 'Apache-2.0',
    compatibility: ESubstrateVersion.TWO,
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [
      EPalletCategories.CONSENSUS
    ],
    description: palletDescription,
    shortDescription: 'FRAME offences pallet'
  },
  dependencies: {
    pallet: {
      alias: 'offences',
      defaultFeatures: false,
      package: 'pallet-offences',
      version: '2.0.0'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: false },
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletOffencesTraits.Event]: 'Event',
      [EPalletOffencesTraits.IdentificationTuple]: '()',
      [EPalletOffencesTraits.OnOffenceHandler]: '()',
      [EPalletOffencesTraits.WeightSoftLimit]: {
        type: 'Weight',
        value: 'Perbill::from_percent(60) * MaximumBlockWeight::get()',
        isNotConst: true
      }
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE,
        EPalletModuleParts.EVENT
      ]
    }
  }
}

export default PalletOffencesConfig;
