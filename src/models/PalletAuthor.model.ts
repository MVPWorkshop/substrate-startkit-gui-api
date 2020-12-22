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
import { ECommonAuthors, ESupportedPallets } from '../pallets/pallets.types';

export interface IPalletAuthorAttributes {
  id: string;
  pallet_name: ESupportedPallets;
  author: string | ECommonAuthors;
}

@Table({
  modelName: 'pallet-author',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class PalletAuthor extends Model<PalletAuthor> implements IPalletAuthorAttributes {
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
  author: string | ECommonAuthors;

  @BelongsTo(() => Pallet)
  pallet: Pallet
}
