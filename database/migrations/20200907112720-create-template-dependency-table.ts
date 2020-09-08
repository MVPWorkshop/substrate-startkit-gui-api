import { QueryInterface } from 'sequelize';
import { SequelizeMigration } from '../../src/types/util.types';

const templateDependencyTableMigration: SequelizeMigration = () => {
  const tableName = 'template-dependency';

  const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },
      template_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'templates',
          key: 'id'
        }
      },
      dependency_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'pallets',
          key: 'name'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
  ...templateDependencyTableMigration()
}
