import { QueryInterface } from 'sequelize';
import { SequelizeMigration } from '../../src/types/util.types';

const palletsTableMigration: SequelizeMigration = () => {
  const tableName = 'pallets';

  const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable(tableName, {
      name: {
        type: Sequelize.STRING,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      downloads: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      package_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      license: {
        type: Sequelize.STRING,
        allowNull: true
      },
      package_last_update: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,

      },
      compatibility: {
        type: Sequelize.STRING,
        allowNull: false,
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
  ...palletsTableMigration()
}
