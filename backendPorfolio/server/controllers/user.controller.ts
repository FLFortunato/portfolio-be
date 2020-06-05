import { User } from '../models/user.model';
import { Router, Request, Response } from 'express';
import { RouterBase } from './base/base.controller';
import { UserService } from '../services/user.service';

export const UserController = () => {
  const router = Router();

  const { all, create, update, remove, findOne } = RouterBase(
    User,
    UserService
  );

  router.post('/', create);
  router.get('/:id', findOne);
  router.get('/', all);
  router.delete('/:id', remove);
  router.put('/:id', update);

  return router;
};
