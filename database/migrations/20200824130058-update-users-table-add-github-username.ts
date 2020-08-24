import { QueryInterface } from 'sequelize';
import { SequelizeMigration } from '../../src/types/util.types';

const updateUsersTableAddGithubUsername: SequelizeMigration = () => {
  const tableName = 'users';

  const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addColumn(tableName, 'github_username', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }

  const down = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeColumn(tableName, 'github_username')
  }

  return {
    up,
    down
  }
}

module.exports = {
  ...updateUsersTableAddGithubUsername()
}
