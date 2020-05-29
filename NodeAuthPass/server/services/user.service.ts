import { BaseService } from './base/base.service';
import { User } from '../models/user.model';

export const UserService = () => {
  const { all, create, findOne, remove, update } = BaseService(User);

  const findByEmail = async (email: any) => {
    const result = await User.findOne({ where: { email } });
    return result;
  };

  return { all, create, findOne, remove, update, findByEmail };
};
