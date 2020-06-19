import * as express from 'express';
import { sequelize } from './config/dbConfig';
import { User } from './models/user.model';
import * as dotenv from 'dotenv';
import * as BodyParser from 'body-parser';
import { AllRoutes } from './routes';
import { TodoList } from './models/todoList';
import { ShoppingList } from './models/shoppingList';
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

const models = [User, TodoList, ShoppingList];

const host = process.env.HOST;
app.listen(5052, () => {
  sequelize.authenticate().then(() => {
    sequelize.addModels(models);

    //sequelize.sync();
  });
});
