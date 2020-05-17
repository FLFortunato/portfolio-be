import { UserController } from '../controllers/user.controller';
import { CompanyController } from '../controllers/company.controller';
import { Router } from 'express';
import { PostController } from '../controllers/post.controller';

const publicRoutes = [
  { path: '/user', route: UserController() },
  { path: '/company', route: CompanyController() },
  { path: '/post', route: PostController() },
];

export const AppController = () => {
  const router = Router();

  publicRoutes.forEach((routers) => router.use(routers.path, routers.route));

  return router;
};
