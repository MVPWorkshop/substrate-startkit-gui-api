import { Op, QueryInterface } from 'sequelize';
import { ESupportedPallets } from '../../src/pallets/pallets.types';

interface ITemplateConfig {
  id: string;
  name: string;
  description: string;
  author_id: string;
  public: boolean;
  dependencies: {
    name: ESupportedPallets;
    id: string
  }[];
}

const mvpWUserId = 'eb7a7b82-1932-4216-8ff6-43e33c360e64';
const configs: ITemplateConfig[] = [{
  id: '3ed8a9bf-a703-4746-8bf6-9b497f6427b3',
  name: 'Wallet',
  description: 'Supports sending, receiving, and keeping a balance of tokens and also on-chain governance',
  author_id: mvpWUserId,
  public: true,
  dependencies: [{
    name: ESupportedPallets.PALLET_BALANCE,
    id: '3407cc82-c7f2-4438-9035-fa054ec13fb6'
  }]
}]

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async transaction => {

      let templates: any[] = [];
      let templateDependency: any[] = [];
      for (let i = 0; i < configs.length; i++) {
        const templateConfig = configs[i];

        // Templates table data
        templates.push({
          id: templateConfig.id,
          name: templateConfig.name,
          description: templateConfig.description,
          author_id: templateConfig.author_id,
          public: templateConfig.public,
          created_at: new Date(),
          updated_at: new Date()
        })

        // Template dependency table data
        templateDependency.push(...templateConfig.dependencies.map(dependency => ({
          id: dependency.id,
          template_id: templateConfig.id,
          dependency_name: dependency.name,
          created_at: new Date(),
          updated_at: new Date()
        })))
      }

      await queryInterface.bulkInsert('templates', templates, { transaction });
      await queryInterface.bulkInsert('template-dependency', templateDependency, { transaction })
    })
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.sequelize.transaction(async transaction => {

      let templateDependencyDeleteCondition = [];
      let templatesDeleteCondition = [];
      for (let i = 0; i < configs.length; i++) {
        const templateConfig = configs[i];

        templatesDeleteCondition.push({
          id: templateConfig.id
        });

        templateDependencyDeleteCondition.push(...templateConfig.dependencies.map(dependency => ({
          id: dependency.id
        })));
      }

      await queryInterface.bulkDelete('template-dependency', {
        [Op.or]: templateDependencyDeleteCondition
      }, { transaction })
      await queryInterface.bulkDelete('templates', {
        [Op.or]: templatesDeleteCondition
      }, { transaction })
    })
  },
}
