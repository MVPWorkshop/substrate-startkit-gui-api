import { ApplicationEnv, CONFIG } from '../config';

const {
  DB_DIALECT,
  DB_NAME,
  TEST_DB_NAME,
  DB_PASSWORD,
  DB_HOST,
  TEST_DB_HOST,
  DB_USER,
  DB_PORT,
  TEST_DB_PORT,
  NODE_ENV
} = CONFIG;

const config: any = {};

const isTestEnvironment = NODE_ENV === ApplicationEnv.TEST;

config[NODE_ENV] = {
  dialect: DB_DIALECT,
  database: isTestEnvironment ? TEST_DB_NAME : DB_NAME,
  host: isTestEnvironment ? TEST_DB_HOST : DB_HOST,
  port: +(isTestEnvironment ? TEST_DB_PORT : DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  migrationStorageTableName: 'sequelize_meta',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_seed'
};

module.exports = config;
