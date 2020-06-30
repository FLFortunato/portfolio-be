import { RouterBase } from '../controllers/base/base.controller';
import { TodoList } from '../models/todoList';
import { TodoService } from '../services/todoList.service';
import { Router, Request, Response } from 'express';

export const TodoListController = () => {
  const router = Router();
  const { update, remove, findOne } = RouterBase(TodoList, TodoService);

  const create = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { content } = req.body;
      const result = await TodoList.create({ userId, content });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const all = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const result = await TodoList.findAll({ where: { userId } });

      return res.status(200).send(result);
    } catch (error) {
      return error;
    }
  };

  router.post('/:userId', create);
  router.get('/:id', findOne);
  router.get('/byId/:userId', all);
  router.delete('/:id', remove);
  router.put('/:id', update);

  return router;
};
