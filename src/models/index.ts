import {Sequelize} from 'sequelize-typescript';
import { ApplicationEnv, CONFIG } from '../config'

const isTestEnvironment = CONFIG.NODE_ENV === ApplicationEnv.TEST;

const db = new Sequelize({
  database: isTestEnvironment ? CONFIG.TEST_DB_NAME : CONFIG.DB_NAME,
  host: isTestEnvironment ? CONFIG.TEST_DB_HOST : CONFIG.DB_HOST,
  port: +(isTestEnvironment ? CONFIG.TEST_DB_PORT : CONFIG.DB_PORT),
  dialect: CONFIG.DB_DIALECT as any,
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  models: [__dirname + '/*.model.*'],
  retry: {
    max: 5
  },
  logging: (query) => {
    if (!isTestEnvironment) {
      console.log(query)
    }
  }
});

export default db;
