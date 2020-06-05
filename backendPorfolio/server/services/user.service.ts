import { BaseService } from './base/base.service';
import { User } from '../models/user.model';

export const UserService = () => {
  const { all, create, findOne, remove, update } = BaseService(User);

  return { all, create, findOne, remove, update };
};
