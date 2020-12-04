import { QueryInterface } from 'sequelize';
import { SequelizeMigration } from '../../src/types/util.types';

const updatePalletsTableAddShortDescription: SequelizeMigration = () => {
  const tableName = 'pallets';

  const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addColumn(tableName, 'short_description', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }

  const down = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeColumn(tableName, 'short_description')
  }

  return {
    up,
    down
  }
}

module.exports = {
  ...updatePalletsTableAddShortDescription()
}
