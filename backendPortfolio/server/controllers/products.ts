import { Router, Request, Response } from 'express';
import { RouterBase } from './base/base.controller';
import { Products } from '../models/products';
import { ProductsService } from '../services/product.service';

export const ProductsController = () => {
  const router = Router();
  const { all, update, remove, findOne } = RouterBase(
    Products,
    ProductsService
  );

  const create = async (req: Request, res: Response) => {
    const { id, cat } = req.params;
    const { name } = req.body;

    const result = await ProductsService()
      .create({ id, cat, name })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });

    return res.json(result);
  };

  const findByCategory = async (req: Request, res: Response) => {
    const { id, userid, data } = req.params;
    const result = await ProductsService()
      .findByCategory(id, userid, data)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });

    return res.json(result);
  };

  router.post('/:id/:cat', create);
  router.get('/:userid/:id/:data', findByCategory);

  return router;
};
