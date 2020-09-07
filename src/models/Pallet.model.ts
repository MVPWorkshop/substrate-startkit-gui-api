import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
  HasMany
} from 'sequelize-typescript';
import PalletCategory from './PalletCategory.model';
import { ESubstrateVersion, ESupportedPallets } from '../pallets/pallets.types';
import PalletAuthor from './PalletAuthor.model';
import PalletDependency from './PalletDependency.model';

export interface IPalletAttributes {
  name: ESupportedPallets,
  size: number,
  downloads: number,
  package_name: string,
  version: string,
  license: string,
  package_last_update: Date,
  description: string,
  short_description: string,
  compatibility: ESubstrateVersion,
}

@Table({
  modelName: 'pallets',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class Pallet extends Model<Pallet> implements IPalletAttributes {
  @PrimaryKey
  @Unique
  @Column
  name: ESupportedPallets;

  @AllowNull(false)
  @Column
  size: number;

  @AllowNull(false)
  @Column
  downloads: number;

  @AllowNull(false)
  @Column
  package_name: string;

  @AllowNull(false)
  @Column
  version: string;

  @AllowNull(true)
  @Column
  license: string;

  @AllowNull(false)
  @Column
  package_last_update: Date;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  short_description: string;

  @AllowNull(false)
  @Column
  compatibility: ESubstrateVersion;

  @HasMany(() => PalletCategory)
  categories: PalletCategory[];

  @HasMany(() => PalletAuthor)
  authors: PalletAuthor[];

  // Pallets this pallet depends on (Using)
  @HasMany(() => PalletDependency, {foreignKey: 'pallet_name'})
  dependencies: PalletDependency[];

  // Pallets that depend on this pallet (Used by)
  @HasMany(() => PalletDependency, {foreignKey: 'dependency_pallet_name'})
  dependants: PalletDependency[];
}
