import { QueryInterface } from 'sequelize';
import { SequelizeMigration } from '../../src/types/util.types';

const templatesTableMigration: SequelizeMigration = () => {
  const tableName = 'templates';

  const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      public: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  }

  const down = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable(tableName, {cascade: true});
  }

  return {
    up,
    down
  }
}

module.exports = {
  ...templatesTableMigration()
}
