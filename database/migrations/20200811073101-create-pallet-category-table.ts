import { QueryInterface } from 'sequelize';
import { SequelizeMigration } from '../../src/types/util.types';

const palletCategoryTableMigration: SequelizeMigration = () => {
  const tableName = 'pallet-category';

  const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },
      pallet_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'pallets',
          key: 'name'
        }
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
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
  ...palletCategoryTableMigration()
}
