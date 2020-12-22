import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
  Default,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import Pallet from './Pallet.model';
import { EPalletCategories, ESupportedPallets } from '../pallets/pallets.types';

export interface IPalletCategoryAttributes {
  id: string;
  pallet_name: ESupportedPallets;
  category: EPalletCategories;
}

@Table({
  modelName: 'pallet-category',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class PalletCategory extends Model<PalletCategory> implements IPalletCategoryAttributes {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUID})
  id: string;

  @ForeignKey(() => Pallet)
  @Column
  pallet_name: ESupportedPallets;

  @AllowNull(false)
  @Column
  category: EPalletCategories;

  @BelongsTo(() => Pallet)
  pallet: Pallet
}
