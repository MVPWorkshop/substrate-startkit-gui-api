import {
  AllowNull, BelongsTo,
  Column, DataType, Default,
  ForeignKey, HasMany,
  Model, PrimaryKey,
  Table, Unique,
} from 'sequelize-typescript';
import User from './User.model';
import TemplateDependency from './TemplateDependency.model';

export interface ITemplateAttributes {
  id: string;
  name: string;
  description: string;
  author_id: string;
  public: boolean;
}

@Table({
  modelName: 'templates',
  timestamps: true,
  underscored: true,
  freezeTableName: true
})
export default class Template extends Model<Template> implements ITemplateAttributes {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUID})
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({type: DataType.UUID})
  author_id: string;

  @AllowNull(false)
  @Column
  public: boolean;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => TemplateDependency)
  dependencies: TemplateDependency[];
}
