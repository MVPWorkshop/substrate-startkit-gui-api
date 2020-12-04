import Configs from '../../src/pallets';
import { palletsConfigToDependencyModel } from '../../src/pallets/pallets.util';
import { ESupportedPallets } from '../../src/pallets/pallets.types';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {

    const rows: any[] = [];

    // Looping through pallets
    for (let palletName in Configs) {
      const config = Configs[palletName as ESupportedPallets];

      // Looping through each category and creating a row
      for (let dependencyRow of palletsConfigToDependencyModel(config)) {
        rows.push({
          ...dependencyRow,
          created_at: new Date(),
          updated_at: new Date()
        })
      }
    }

    return queryInterface.bulkInsert('pallet-dependency', rows, {});
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.bulkDelete('pallet-dependency', null, {})
  },
}
