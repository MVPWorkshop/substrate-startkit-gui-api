import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkInsert('users', [{
      id: '6a556eae-b514-4ea6-a4b9-1c2e15a4514d',
      github_user_id: '47530779',
      github_username: 'substrate-developer-hub',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete('users', {
      id: '6a556eae-b514-4ea6-a4b9-1c2e15a4514d'
    }, {})
  },
}
