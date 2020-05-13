"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = require("dotenv");
dotenv.config();
const dbName = process.env.dbName;
const dbUserName = process.env.dbUserName;
const dbPassword = process.env.dbPassword;
const host = process.env.HOST;
const dialect = 'postgres';
const options = {
    host,
    dialect,
    models: [__dirname + '/models']
};
exports.sequelize = new sequelize_typescript_1.Sequelize(dbName, dbUserName, dbPassword, options);
