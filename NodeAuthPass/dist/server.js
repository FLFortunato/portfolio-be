"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const database_1 = require("./config/database");
const bodyParser = require("body-parser");
const user_model_1 = require("./models/user.model");
const company_model_1 = require("./models/company.model");
const index_js_1 = require("./routes/index.js");
const cors = require('cors');
dotenv.config();
//app use
const app = express();
//cors
const origin = '*';
const corsOptions = {
    origin,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', index_js_1.AppController());
const models = [user_model_1.User, company_model_1.Company];
app.listen(8002, () => {
    database_1.sequelize.authenticate().then(() => {
        database_1.sequelize.addModels(models);
        database_1.sequelize.sync();
    });
});
