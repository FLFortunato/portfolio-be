import * as express from 'express';
import { sequelize } from './config/dbConfig';
import { User } from './models/user.model';
import * as dotenv from 'dotenv';
import bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();
const app = express();

//APP USER
const origin = '*';
const corsOptions = {
  origin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

const models = [User];

const host = process.env.HOST;
app.listen(host, () => {
  sequelize.authenticate().then(() => {
    sequelize.addModels(models);

    sequelize.sync();
  });
});
