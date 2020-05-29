import * as express from 'express';
import * as dotenv from 'dotenv';
import { sequelize } from './config/database';
import * as bodyParser from 'body-parser';
import { User } from './models/user.model';
import { Company } from './models/company.model';
import { AppController } from './routes/index';
import passport = require('passport');
import { Post } from './models/post.model';
import * as nodemailer from 'nodemailer';
// import ConfigureJwt from './auth/passport'

const cors = require('cors');

dotenv.config();

//app use
const app = express();

//cors
const origin = '*';
const corsOptions = {
  origin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//authentication
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', AppController());

const models = [User, Company, Post];

app.listen(8002, () => {
  sequelize.authenticate().then(() => {
    sequelize.addModels(models);
    sequelize.sync();
  });
});
