import { RouterBase } from './base/base.controller';
import { Post } from '../models/posts';
import { PostService } from '../services/post.service';
import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';

export const PostController = () => {
  const router = Router();
  const { all, update, remove, findOne } = RouterBase(Post, PostService);

  const create = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { title, content, type, writenBy } = req.body;

      const findUser = await User.findOne({ where: { id } });
      if (!findUser) {
        return res.status(404).send('User not found');
      }

      const result = await Post.create({
        userPostId: id,
        title,
        content,
        type,
        writenBy,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const findAll = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await Post.findAll({ where: { userPostId: id } });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  router.post('/:id', create);
  router.get('/', all);
  router.get('/:id', findAll);
  router.delete('/:id', remove);
  router.put('/:id', update);
  router.get('/byone/:id', findOne);

  return router;
};
