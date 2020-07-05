import * as express from 'express';
import { sequelize } from './config/dbConfig';
import { User } from './models/user.model';
import * as dotenv from 'dotenv';
import * as BodyParser from 'body-parser';
import { AllRoutes } from './routes';
import { TodoList } from './models/todoList';
import { ShoppingList } from './models/shoppingList';
import { Post } from './models/posts';
import * as Moment from 'moment';
const cors = require('cors');
dotenv.config();
const app = express();

//APP USE
const origin = '*';
const corsOptions = {
  origin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use('/api', AllRoutes());

const models = [User, TodoList, ShoppingList, Post];

const host = 5052;
app.listen(host, () => {
  sequelize.authenticate().then(() => {
    sequelize.addModels(models);

    //sequelize.sync();
  });
  console.log('Server online on port ==>', host);
});
