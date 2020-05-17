import { RouterBase } from './base/router.base';
import { Router, Request, Response } from 'express';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

export const PostController = () => {
  const router = Router();

  const { remove, update, findOne, all } = RouterBase<Post>(Post, PostService);

  const create = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { title, content } = req.body;
      const post = await Post.create({ title, content, userId });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(401).send(error);
    }
  };
  router.post('/:userId', create);
  router.get('/', all);
  router.get('/:id', findOne);
  router.delete('/:id', remove);
  router.put('/:id', update);

  return router;
};
