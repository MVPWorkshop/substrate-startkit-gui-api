import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';
import { tabs } from '../../utils/common.util';

enum EPalletProxyTraits {
  Event = 'Event',
  Call = 'Call',
  Currency = 'Currency',
  ProxyType = 'ProxyType',
  ProxyDepositBase = 'ProxyDepositBase',
  ProxyDepositFactor = 'ProxyDepositFactor',
  MaxProxies = 'MaxProxies',
  WeightInfo = 'WeightInfo',
  MaxPending = 'MaxPending',
  CallHasher = 'CallHasher',
  AnnouncementDepositBase = 'AnnouncementDepositBase',
  AnnouncementDepositFactor = 'AnnouncementDepositFactor'
}

const palletDescription = [
  'A module allowing accounts to give permission to other accounts to dispatch types of calls from their signed origin.',
  'The accounts to which permission is delegated may be requied to announce the action that they wish to execute some duration prior to execution happens. In this case, the target account may reject the announcement and in doing so, veto the execution.'
].join('\n');

const additionalImports: string = [
  'use frame_support::{ traits::InstanceFilter, RuntimeDebug };',
  'use codec::{Encode, Decode};'
].join('\n');

const proxyTypeDeclaration: string = [
  '#[derive(Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Encode, Decode, RuntimeDebug)]',
  'pub enum ProxyType {',
  `${tabs(1)}Any`,
  '}'
].join('\n');

const implDefaultForProxyType: string = 'impl Default for ProxyType { fn default() -> Self { Self::Any } }'

const implInstanceFilterForProxyType: string = [
  'impl InstanceFilter<Call> for ProxyType {',
  `${tabs(1)}fn filter(&self, c: &Call) -> bool {`,
  `${tabs(2)}match self {`,
  `${tabs(3)}ProxyType::Any => true,`,
  `${tabs(2)}}`,
  `${tabs(1)}}`,
  `${tabs(1)}fn is_superset(&self, o: &Self) -> bool {`,
  `${tabs(2)}match (self, o) {`,
  `${tabs(3)}(x, y) if x == y => true,`,
  `${tabs(3)}(ProxyType::Any, _) => true,`,
  `${tabs(3)}(_, ProxyType::Any) => false,`,
  `${tabs(3)}_ => false,`,
  `${tabs(2)}}`,
  `${tabs(1)}}`,
  `}`,
].join('\n');

const PalletProxyConfig: IPalletConfig<EPalletProxyTraits> = {
  name: ESupportedPallets.PALLET_PROXY,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 8890,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.OTHER],
    description: palletDescription,
    shortDescription: 'FRAME proxying pallet'
  },
  dependencies: {
    pallet: {
      alias: 'proxy',
      defaultFeatures: false,
      package: 'pallet-proxy',
      version: '2.0.0'
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: true }
    ]
  },
  runtime: {
    palletTraits: {
      [EPalletProxyTraits.Event]: 'Event',
      [EPalletProxyTraits.Call]: 'Call',
      [EPalletProxyTraits.Currency]: 'Balances',
      [EPalletProxyTraits.ProxyType]: 'ProxyType',
      [EPalletProxyTraits.ProxyDepositBase]: {
        type: 'Balance',
        value: '63_000_000_000_000'
      },
      [EPalletProxyTraits.ProxyDepositFactor]: {
        type: 'Balance',
        value: '198_000_000_000_000'
      },
      [EPalletProxyTraits.MaxProxies]: {
        type: 'u16',
        value: '32'
      },
      [EPalletProxyTraits.WeightInfo]: '()',
      [EPalletProxyTraits.MaxPending]: {
        type: 'u16',
        value: '32'
      },
      [EPalletProxyTraits.CallHasher]: 'BlakeTwo256',
      [EPalletProxyTraits.AnnouncementDepositBase]: {
        type: 'Balance',
        value: '63_000_000_000_000'
      },
      [EPalletProxyTraits.AnnouncementDepositFactor]: {
        type: 'Balance',
        value: '396_000_000_000_000'
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
    },
    additionalRuntimeLibCode: [
      additionalImports,
      proxyTypeDeclaration,
      implDefaultForProxyType,
      implInstanceFilterForProxyType
    ]
  }
}

export default PalletProxyConfig;
