import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { TodoListController } from '../controllers/todoList.controller';
import { EmaiController } from '../controllers/util.controller';

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
];

export const AllRoutes = () => {
  const router = Router();

  routes.forEach((r) => router.use(r.path, r.route));

  return router;
};
