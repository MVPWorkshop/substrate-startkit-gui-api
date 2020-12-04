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
const substrateDeveloperHubId = '6a556eae-b514-4ea6-a4b9-1c2e15a4514d';

const walletTemplate: ITemplateConfig = {
  id: '3ed8a9bf-a703-4746-8bf6-9b497f6427b3',
  name: 'Wallet',
  description:
    'With Wallet template, the resulting blockchain will be able to keep a balance of tokens on the blockchain, support sending and receiving the tokens between accounts.\n' +
    'Creation and managing of fungible or non fungible assets.',
  author_id: mvpWUserId,
  public: true,
  dependencies: [
    {
      name: ESupportedPallets.PALLET_BALANCE,
      id: '3407cc82-c7f2-4438-9035-fa054ec13fb6'
    },
    {
      name: ESupportedPallets.PALLET_ASSETS,
      id: '3407cc82-c7f2-4438-9035-fa054ec13fb8'
    },
  ]
};

const supplyChainTemplate: ITemplateConfig = {
  id: '25732ee9-3ecb-4993-9c4d-3ffb3d2b0055',
  name: 'Supply Chain',
  description:
    'A FRAME-based blockchain node that implements a supply chain registry for a decentralized consortium of organisations.\n' +
    '- Setup a shared platform (permissioned blockchain network) among several organisations.\n' +
    '- Manage decentralized identities for member organisations and their delegates.\n' +
    '- Register master data about products, including the organisation that owns them.\n' +
    '- Register a shipment and track its journey through the supply chain.\n' +
    '- Monitor a shipment’s storage and transportation conditions.\n' +
    '- Enable seamless data integration with existing ERP (enterprise resource planning) systems deployed within corporate walls',
  author_id: substrateDeveloperHubId,
  public: true,
  dependencies: [
    {
      name: ESupportedPallets.PALLET_DID,
      id: '6d157ad4-1b98-4ec4-84b3-9dbc301a4d61'
    },
    {
      name: ESupportedPallets.PALLET_REGISTRAR,
      id: '4f2ae28b-8438-4e14-9012-8816465f7046'
    },
    {
      name: ESupportedPallets.PALLET_PRODUCT_REGISTRY,
      id: '133c8ba9-db27-4c62-aaa2-10516073f7fb'
    },
    {
      name: ESupportedPallets.PALLET_PRODUCT_TRACKING,
      id: '013232c9-fb17-4acb-a4a0-8bb52dc13d9f'
    },
    {
      name: ESupportedPallets.PALLET_RBAC,
      id: '89de5f7d-377b-45fb-bf94-33450ef125ec'
    },
    {
      name: ESupportedPallets.PALLET_VALIDATOR_SET,
      id: '0858e143-af88-4a46-84d1-7541413aa572'
    },
  ]
}

const governanceTemplate: ITemplateConfig = {
  id: 'c44d4703-5ee0-4ea8-825b-f2855707f2af',
  name: 'Governance',
  description: 'With the Governance template, the resulting blockchain will support the forming of governing councils and democratic functionalities such as voting to fund the Treasury with a portion of the block reward and use the funds to pay developers.',
  author_id: mvpWUserId,
  public: true,
  dependencies: [
    {
      name: ESupportedPallets.PALLET_DEMOCRACY,
      id: 'fe52681f-fe0f-4f70-9bfa-12b14c4cae9d'
    },
    {
      name: ESupportedPallets.PALLET_COLLECTIVE,
      id: '81b22d7f-a7c8-4288-b6c6-b4f19b8bbd57'
    },
    {
      name: ESupportedPallets.PALLET_ELECTIONS_PHRAGMEN,
      id: '9c1dddd2-085b-4f86-bf95-018ad8d75a12'
    },
    {
      name: ESupportedPallets.PALLET_MEMBERSHIP,
      id: '17912c35-7a8e-4092-bd20-ceaa7a568597'
    },
    {
      name: ESupportedPallets.PALLET_TREASURY,
      id: '24f5fc67-2eda-45d5-a0d3-6b994fefa706'
    }
  ]
}

const inkTemplate: ITemplateConfig = {
  id: 'c44d4703-5ee0-4ea8-825b-f2855808f2af',
  name: 'Ink!',
  description: 'With the Ink! template, the resulting blockchain will provide functionality for the runtime to deploy and execute WebAssembly smart-contracts. It is designed to iterate on the design of modern smart contract platforms.',
  author_id: substrateDeveloperHubId,
  public: true,
  dependencies: [
    {
      name: ESupportedPallets.PALLET_CONTRACT,
      id: '24f5fc67-2eda-45d5-a0d3-6b994fefa718'
    }
  ]
}

const configs: ITemplateConfig[] = [
  walletTemplate,
  supplyChainTemplate,
  governanceTemplate,
  inkTemplate
]

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
