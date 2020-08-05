import { DynamicObject, AllKeysRequired } from "../types/util.types";

export enum EPalletModuleParts {
  MODULE = 'MODULE',
  CALL = 'CALL',
  STORAGE = 'STORAGE',
  EVENT = 'EVENT',
  ORIGIN = 'ORIGIN',
  CONFIG = 'CONFIG',
  VALIDATE_UNSIGNED = 'VALIDATE_UNSIGNED'
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
  additionalChainSpecCode?: string[];
  additionalRuntimeLibCode?: string[];
}

interface ICargoSimpleDependency {
  simple: true;
  package: string;
  version: string;
}

interface ICargoComplexDependency {
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
  additionalPallets?: ESupportedPallets[];
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
  SMART_CONTRACTS = 'SMART_CONTRACTS'
}

export enum ECommonAuthors {
  PARITY_TECHNOLOGIES = 'PARITY_TECHNOLOGIES'
}

interface IPalletMetadata {
  description: string;
  compatibility: ESubstrateVersion;
  license?: string;
  authors?: (string | ECommonAuthors)[];
  categories?: EPalletCategories[];
  // Size in bytes
  size: number;
  // Timestamp for corresponding version release
  updated: number;
}

export enum ESupportedPallets {
  PALLET_BALANCE = 'pallet-balance',
  PALLET_CONTRACT = 'pallet-contract'
}

export const defaultGitRepo = 'https://github.com/paritytech/substrate.git';

/**
 * This is the interface which every pallet config should implement
 */
export interface IPalletConfig<PalletTraits extends string, GenesisFields extends string = string> {
  name: ESupportedPallets;
  metadata: IPalletMetadata;
  runtime: IPalletRuntimeConfig<PalletTraits, GenesisFields>;
  dependencies: IPalletDependencyConfig;
}
