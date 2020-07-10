import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { TodoListController } from '../controllers/todoList.controller';
import { EmaiController } from '../controllers/util.controller';
import { ShoppingListController } from '../controllers/shoppingList.controller';
import { PostController } from '../controllers/post.controller';
import { auth } from '../auth/jwt';

const routes = [
  {
    path: '/user',
    route: UserController(),
  },
];

const privateRoutes = [
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
  {
    path: '/posts',
    route: PostController(),
  },
];
export const AllRoutes = () => {
  const router = Router();

  routes.forEach((r) => router.use(r.path, r.route));
  privateRoutes.forEach((r) => router.use(r.path, auth, r.route));

  return router;
};
