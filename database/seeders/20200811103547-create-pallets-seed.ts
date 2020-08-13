import Configs from '../../src/pallets';
import { palletsConfigToModel } from '../../src/pallets/pallets.util';
import { ESupportedPallets } from '../../src/pallets/pallets.types';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {

    // Mapping through pallet config files
    const rows = Object.keys(Configs).map(key => {
      const config = Configs[key as ESupportedPallets];

      // Creating an row for every config file
      return {
        ...palletsConfigToModel(config),
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    return queryInterface.bulkInsert('pallets', rows, {});
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete('pallets', null, {})
  },
}
