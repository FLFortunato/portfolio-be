import { RouterBase } from './base/base.controller';
import { TodoService } from '../services/todoList.service';
import { ShoppingList } from '../models/shoppingList';
import { ShoppingListService } from '../services/base/shoppingList.service';
import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';

export const ShoppingListController = () => {
  const router = Router();
  const { all, findOne, update, remove } = RouterBase(
    ShoppingList,
    ShoppingListService
  );

  const allById = async (req: Request, res: Response) => {
    try {
      const { UserId } = req.params;

      const result = await ShoppingList.findAll({ where: { UserId: UserId } });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };
  const create = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { UserId, item, qtd, price } = req.body;
      const result = await ShoppingList.create({
        UserId: id,
        item,
        qtd,
        price,
      });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  router.get('/', all);
  router.post('/:id', create);
  router.get('/findById/:UserId', allById);

  return router;
};
