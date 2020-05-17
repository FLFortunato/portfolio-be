import { Company } from '../models/company.model';
import { Router, Request, Response } from 'express';
import { RouterBase } from './base/router.base';
import { CompanyService } from '../services/company.service';

export const CompanyController = () => {
  const router = Router();

  const { create, all, findOne, remove, update } = RouterBase<Company>(
    Company,
    CompanyService
  );

  router.post('/', create);
  router.get('/', all);
  router.get('/:id', findOne);
  router.delete('/:id', remove);
  router.put('/:id', update);

  return router;
};
