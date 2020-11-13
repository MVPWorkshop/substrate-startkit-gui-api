import { DynamicObject, AllKeysRequired } from "../types/util.types";

export enum EPalletModuleParts {
  MODULE = 'Module',
  CALL = 'Call',
  STORAGE = 'Storage',
  EVENT = 'Event',
  ORIGIN = 'Origin',
  CONFIG = 'Config',
  INHERENT = 'Inherent',
  VALIDATE_UNSIGNED = 'ValidateUnsigned'
}

interface IPalletConstructRuntimeConfig {
  modules: EPalletModuleParts[];
  // Flag if module is generic
  generic?:
    DynamicObject<boolean,
      EPalletModuleParts.EVENT |
      EPalletModuleParts.ORIGIN |
      EPalletModuleParts.CONFIG
      >
}

// Used for genereting a type inside parameter_types! macro
interface IPalletTraitsConfig {
  constantType: string;
  value: string;
}

interface IPalletGenesisConfig<Fields extends string> {
  // Name of the struct
  configStructName: string;
  // Name of the fields inside the struct and their corresponding values
  structFields: DynamicObject<string, Fields, AllKeysRequired>
}

/**
 * Configuration for the pallets runtime configuration
 *  - Configuration traits
 *  - Runtime construction config
 */
interface IPalletRuntimeConfig<Traits extends string, GenesisFields extends string> {
  // The construct runtime config for the pallet
  constructRuntime: IPalletConstructRuntimeConfig;

  // Dynamic object of { Pallet Trait : string | Trait config}
  // if string, simply put the Trait name = string inside trait implementation for runtime
  // if config, put the data from config inside parameter_types macro and then insert name into implementation
  palletTraits: DynamicObject<IPalletTraitsConfig | string, Traits, AllKeysRequired>

  // In here we configure our genesis config struct
  genesisConfig?: IPalletGenesisConfig<GenesisFields>;

  // Rust syntax for code that can't be automatically inserted by the generator
  additionalChainSpecCode?: {
    additionalCode?: string[];
    additionalVariables?: string[];
  };
  additionalRuntimeLibCode?: string[];
}

export interface ICargoSimpleDependency {
  simple: true;
  package: string;
  version: string;
}

export interface ICargoComplexDependency {
  simple?: false;
  package: string;
  version: string;
  alias: string;
  defaultFeatures?: false | string[];
  gitRepo: string;
  tag: string;
}

/**
 * Configuration for the pallets dependencies inside the runtime cargo
 */
interface IPalletDependencyConfig {
  pallet: ICargoComplexDependency;
  /**
   * @description Any additional pallets used by the configuration pallet
   * If the pallet should be inside the node template code, shouldImplement should be marked
   * as true if it's an dependency which is already implemented as part of the pallet this should be
   * left undefined or false
   */
  additionalPallets?: {
    palletName: ESupportedPallets;
    shouldImplement?: boolean;
  }[];
  additionalDeps?: (ICargoComplexDependency | ICargoSimpleDependency)[];
}

export enum ESubstrateVersion {
  ONE = 'SUBSTRATE_1',
  TWO = 'SUBSTRATE_2'
}

export enum EPalletCategories {
  ACCOUNTS = 'ACCOUNTS',
  ASSETS = 'ASSETS',
  CONSENSUS = 'CONSENSUS',
  GOVERNANCE = 'GOVERNANCE',
  IDENTITY = 'IDENTITY',
  RUNTIME = 'RUNTIME',
  SMART_CONTRACTS = 'SMART_CONTRACTS',
  OTHER = 'OTHER'
}

export enum ECommonAuthors {
  PARITY_TECHNOLOGIES = 'PARITY_TECHNOLOGIES',
  CENTRALITY_DEVELOPERS = 'CENTRALITY_DEVELOPERS'
}

interface IPalletMetadata {
  description: string;
  shortDescription: string;
  compatibility: ESubstrateVersion;
  license?: string;
  authors: (string | ECommonAuthors)[];
  categories?: EPalletCategories[];
  // Size in bytes
  size: number;
  // Timestamp for corresponding version release
  updated: number;
}

export enum ESupportedPallets {
  PALLET_BALANCE = 'pallet-balances',
  PALLET_CONTRACT = 'pallet-contracts',
  PALLET_NICKS = 'pallet-nicks',
  PALLET_AURA = 'pallet-aura',
  PALLET_GRANDPA = 'pallet-grandpa',
  PALLET_RANDOMNESS_COLLECTIVE_FLIP = 'pallet-randomness-collective-flip',
  PALLET_SUDO = 'pallet-sudo',
  PALLET_TIMESTAMP = 'pallet-timestamp',
  PALLET_TRANSACTION_PAYMENT = 'pallet-transaction-payment',
  PALLET_GENERIC_ASSET = 'pallet-generic-asset',
  PALLET_RECOVERY = 'pallet-recovery',
  PALLET_VESTING = 'pallet-vesting',
  PALLET_SESSION = 'pallet-session',
  PALLET_ASSETS = 'pallet-assets',
  PALLET_BABE = 'pallet-babe',
  PALLET_AUTHORITY_DISCOVERY = 'pallet-authority-discovery',
  PALLET_AUTHORSHIP = 'pallet-authorship',
  PALLET_FINALITY_TRACKER = 'pallet-finality-tracker',
  PALLET_OFFENCES = 'pallet-offences',
  PALLET_IM_ONLINE = 'pallet-im-online',
  PALLET_ATOMIC_SWAP = 'pallet-atomic-swap'
}

export const defaultGitRepo = 'https://github.com/paritytech/substrate.git';

/**
 * This is the interface which every pallet config should implement
 */
export interface IPalletConfig<PalletTraits extends string = string, GenesisFields extends string = string> {
  name: ESupportedPallets;
  metadata: IPalletMetadata;
  runtime: IPalletRuntimeConfig<PalletTraits, GenesisFields>;
  dependencies: IPalletDependencyConfig;
}
