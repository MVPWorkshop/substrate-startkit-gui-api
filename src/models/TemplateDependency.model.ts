import { ESupportedPallets } from '../pallets/pallets.types';
import {
  Table,
  Model,
  PrimaryKey,
  Unique,
  Default,
  DataType,
  Column,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import Pallet from './Pallet.model';
import Template from './Template.model';

export interface ITemplateDependencyAttributes {
  id: string;
  template_id: string;
  dependency_name: ESupportedPallets;
}

@Table({
  modelName: 'template-dependency',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class TemplateDependency extends Model<TemplateDependency> implements ITemplateDependencyAttributes {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUIDV4})
  id: string;

  @ForeignKey(() => Template)
  @Column
  template_id: string;

  @ForeignKey(() => Pallet)
  @Column
  dependency_name: ESupportedPallets;

  @BelongsTo(() => Template)
  template: Template;

}
