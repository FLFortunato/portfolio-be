import { Router, Request, Response } from 'express';
import { RouterBase } from './base/base.controller';
import { Products } from '../models/products';
import { ProductsService } from '../services/product.service';

export const ProductsController = () => {
  const router = Router();
  const { all, remove, findOne } = RouterBase(Products, ProductsService);

  const create = async (req: Request, res: Response) => {
    const { id, cat } = req.params;
    const { name, price, qtd } = req.body;

    const result = await ProductsService()
      .create({ id, cat, name, price, qtd })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });

    return res.json(result);
  };

  const findByCategory = async (req: Request, res: Response) => {
    const { id, userid, data, all } = req.params;
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

  const findByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await ProductsService()
      .findByUserId(Number(userId))
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });

    return res.json(result);
  };

  const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, qtd, total } = req.body;
    try {
      const result = await Products.update(
        { name, category, price, qtd, total: price * qtd },
        { where: { id } }
      );

      return res.status(201).send(result);
    } catch (error) {
      return error;
    }
  };

  router.post('/:id/:cat', create);
  router.get('/:userid/:id/:data', findByCategory);
  router.get('/byUser/:userId', findByUserId);
  router.delete('/:id', remove);
  router.put('/:id', update);
  router.get('/', all);

  return router;
};
