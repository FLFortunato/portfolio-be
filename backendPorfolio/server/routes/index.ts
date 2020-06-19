import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { TodoListController } from '../controllers/todoList.controller';
import { EmaiController } from '../controllers/util.controller';
import { ShoppingListController } from '../controllers/shoppingList.controller';

const routes = [
  {
    path: '/user',
    route: UserController(),
  },
  {
    path: '/todo',
    route: TodoListController(),
  },
  {
    path: '/contact',
    route: EmaiController(),
  },
  {
    path: '/shopping',
    route: ShoppingListController(),
  },
];

export const AllRoutes = () => {
  const router = Router();

  routes.forEach((r) => router.use(r.path, r.route));

  return router;
};
