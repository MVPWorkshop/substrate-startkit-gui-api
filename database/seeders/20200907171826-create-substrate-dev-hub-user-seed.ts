import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkInsert('users', [{
      id: '90f4f18f-e44b-452d-83ec-3ee36b6083f4',
      github_user_id: '47530779',
      github_username: 'substrate-developer-hub',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete('users', {
      id: '90f4f18f-e44b-452d-83ec-3ee36b6083f4'
    }, {})
  },
}
