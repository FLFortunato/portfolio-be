import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import * as dotenv from 'dotenv'

dotenv.config();

const dbName = process.env.dbName as string
const dbUserName = process.env.dbUserName as string
const dbPassword = process.env.dbPassword as string

const host = process.env.HOST;
const dialect = 'postgres';

const options: SequelizeOptions = {
  host,
  dialect,
  models: [__dirname + '/models']
};

 export const sequelize = new Sequelize(dbName,dbUserName, dbPassword, options)