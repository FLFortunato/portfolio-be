import { CategoriesService } from '../services/categories.service';
import { Categories } from '../models/categories';
import { RouterBase } from './base/base.controller';
import { Router } from 'express';

export const CategoriesController = () => {
  const router = Router();
  const { create, all, findOne, remove, update } = RouterBase(
    Categories,
    CategoriesService
  );

  router.post('/', create);
  router.get('/', all);
  return router;
};
