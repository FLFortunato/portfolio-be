import { BaseService } from './base/base.service';
import { Post } from '../models/posts';

export const PostService = () => {
  const { all, create, findOne, remove, update } = BaseService(Post);

  return { all, create, findOne, remove, update };
};
