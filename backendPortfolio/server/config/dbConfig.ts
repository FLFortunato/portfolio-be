import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DBNAME as string;
const dbBrands = process.env.DBBRAND as string;
const dbPass = process.env.DBPASS;
const host = process.env.HOST;
const dialect = 'postgres';

const options: SequelizeOptions = {
  host,
  dialect,
  models: [__dirname + '/models'],
};
export const sequelize = new Sequelize(dbName, dbBrands, dbPass, options);
