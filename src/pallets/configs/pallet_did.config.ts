import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletDidTraits {
  Event = 'Event',
  Public = 'Public',
  Signature = 'Signature'
}

const palletDescription = [
  'The DID pallet provides functionality for DIDs management. It uses a universal identity registry where all the required data is associated with an address. It enables the possibility to create a portable, persistent, privacy-protecting, and personal identity.',
  'NOTE: This pallet is intended for demonstration purposes and is not audited or ready for production use.',
  '\nSelf-Sovereign Identity',
  'A decentralized identity or self-sovereign identity is a new approach where no one but you own or control the state of your digital identity.',
  'Some of the inherited benefits of self-sovereign identity are:',
  '- Seamless Identity Verification',
  '- Non-Custodial Login Solutions',
  '- Stronger Protections for Critical Infrastructure',
  '- Securing the Internet of Things',
  '\nDid',
  'Decentralized identifiers (DIDs) are a new type of identifier to provide verifiable, decentralized digital identity. These new identifiers are designed to enable the controller of a DID to prove control over it and to be implemented independently of any centralized registry, identity provider, or certificate authority. DIDs are URLs that relate a DID subject to a DID document allowing trustable interactions with that subject. DID documents are simple documents describing how to use that specific DID. Each DID document can express cryptographic material, verification methods, or service endpoints, which provide a set of mechanisms enabling a DID controller to prove control of the DID. Service endpoints enable trusted interactions with the DID subject.'
].join('\n');

const PalletDidConfig: IPalletConfig<EPalletDidTraits> = {
  name: ESupportedPallets.PALLET_DID,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 50500,
    updated: 1600801158,
    license: 'GPL-3.0',
    authors: [ECommonAuthors.SUBSTRATE_DEV_HUB],
    categories: [EPalletCategories.IDENTITY],
    shortDescription: 'Pallet for Decentralized identifiers (DIDs)',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'did',
      defaultFeatures: false,
      package: 'pallet-did',
      gitRepo: 'https://github.com/substrate-developer-hub/pallet-did',
      version: '2.0.0'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_TIMESTAMP, shouldImplement: false }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletDidTraits.Event]: 'Event',
      [EPalletDidTraits.Public]: 'MultiSigner',
      [EPalletDidTraits.Signature]: 'Signature'
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
    },
    additionalRuntimeLibCode: [
      'use sp_runtime::MultiSigner;'
    ]
  }
}

export default PalletDidConfig;
