import {
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
import { ESupportedPallets } from '../pallets/pallets.types';

export interface IPalletDependencyAttributes {
  id: string;
  pallet_name: ESupportedPallets;
  dependency_pallet_name: ESupportedPallets;
}

@Table({
  modelName: 'pallet-dependency',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class PalletDependency extends Model<PalletDependency> implements IPalletDependencyAttributes {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @ForeignKey(() => Pallet)
  @Column
  pallet_name: ESupportedPallets;

  @ForeignKey(() => Pallet)
  @Column
  dependency_pallet_name: ESupportedPallets;

  @BelongsTo(() => Pallet, {
    foreignKey: 'pallet_name',
    as: 'pallet'
  })
  pallet: Pallet

  @BelongsTo(() => Pallet, {
    foreignKey: 'dependency_pallet_name',
    as: 'palletDependency'
  })
  palletDependency: Pallet;
}
