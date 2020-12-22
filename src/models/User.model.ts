import {
  AllowNull,
  Column,
  DataType,
  Default, HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import Template from './Template.model';

export interface IUserAttributes {
  id: string;
  github_user_id: string;
  github_username: string;
}

@Table({
  freezeTableName: true,
  modelName: 'users',
  timestamps: true,
  underscored: true
})
export default class User extends Model<User> implements IUserAttributes {
  @Unique
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type: DataType.UUID})
  id: string;

  @AllowNull(false)
  @Column
  github_user_id: string;

  @AllowNull(false)
  @Column
  github_username: string;

  @HasMany(() => Template, { foreignKey: 'author_id' })
  templates: Template[];
}
