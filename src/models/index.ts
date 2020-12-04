import {Sequelize} from 'sequelize-typescript';
import {CONFIG} from '../config'

const db =  new Sequelize({
  database: CONFIG.DB_NAME,
  dialect: CONFIG.DB_DIALECT as any,
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  host: CONFIG.DB_HOST,
  models: [__dirname + '/*.model.*'],
  retry: {
    max: 5
  },
  logging: (query) => console.log(query)
});

export default db;
