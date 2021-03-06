import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkInsert('users', [{
      id: 'eb7a7b82-1932-4216-8ff6-43e33c360e64',
      github_user_id: '36957395',
      github_username: 'MVPWorkshop',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete('users', {
      id: 'eb7a7b82-1932-4216-8ff6-43e33c360e64'
    }, {})
  },
}
