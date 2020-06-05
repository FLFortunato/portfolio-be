import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const routes = [
  {
    path: '/user',
    route: UserController(),
  },
];

export const AllRoutes = () => {
  const router = Router();

  routes.forEach((r) => router.use(r.path, r.route));

  return router;
};
