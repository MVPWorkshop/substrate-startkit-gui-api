import {
  defaultGitRepo,
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletUtilityTraits {
  Event = 'Event',
  Call = 'Call',
  WeightInfo = 'WeightInfo'
}

const palletDescription = [
  'A stateless module with helpers for dispatch management which does no re-authentication.',
  'This module contains two basic pieces of functionality:',
  '- Batch dispatch: A stateless operation, allowing any origin to execute multiple calls in a single dispatch. This can be useful to amalgamate proposals, combining set_code with corresponding set_storages, for efficient multiple payouts with just a single signature verify, or in combination with one of the other two dispatch functionality.',
  '- Pseudonymal dispatch: A stateless operation, allowing a signed origin to execute a call from an alternative signed origin. Each account has 2 * 2**16 possible "pseudonyms" (alternative account IDs) and these can be stacked. This can be useful as a key management tool, where you need multiple distinct accounts (e.g. as controllers for many staking accounts), but where it\'s perfectly fine to have each of them controlled by the same underlying keypair. Derivative accounts are, for the purposes of proxy filtering considered exactly the same as the oigin and are thus hampered with the origin\'s filters.',
  'Since proxy filters are respected in all dispatches of this module, it should never need to be filtered by any proxy.'
].join('\n');

const PalletUtilityConfig: IPalletConfig<EPalletUtilityTraits> = {
  name: ESupportedPallets.PALLET_UTILITY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 10500,
    updated: 1596018720,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.RUNTIME],
    shortDescription: 'FRAME utilities pallet',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'utility',
      gitRepo: defaultGitRepo,
      package: 'pallet-utility',
      tag: 'v2.0.0-rc5',
      version: '2.0.0-rc5',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletUtilityTraits.Event]: 'Event',
      [EPalletUtilityTraits.Call]: 'Call',
      [EPalletUtilityTraits.WeightInfo]: '()'
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.STORAGE
      ]
    }
  }
}

export default PalletUtilityConfig;
