import Configs from '../../src/pallets';
import { palletsConfigToCategoriesModel } from '../../src/pallets/pallets.util';
import { ESupportedPallets } from '../../src/pallets/pallets.types';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {

    const rows: any[] = [];

    // Looping through pallets
    for (let palletName in Configs) {
      const config = Configs[palletName as ESupportedPallets];

      // Looping through each category and creating a row
      for (let categoryRow of palletsConfigToCategoriesModel(config)) {
        rows.push({
          ...categoryRow,
          created_at: new Date(),
          updated_at: new Date()
        })
      }
    }

    return queryInterface.bulkInsert('pallet-category', rows, {});
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete('pallet-category', null, {})
  },
}
