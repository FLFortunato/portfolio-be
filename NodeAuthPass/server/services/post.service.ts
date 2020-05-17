import { BaseService } from './base/base.service';
import { Post } from '../models/post.model';

export const PostService = () => {
  const { all, update, remove, create, findOne } = BaseService(Post);

  return { all, update, remove, create, findOne };
};
