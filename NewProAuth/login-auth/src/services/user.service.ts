import { User } from '../models/user.model';

import { BaseService } from './base.service';

const UserService = () => {
  const { checkEmail, remove, get, getById, update, save, login } = BaseService('user');

  return { checkEmail, remove, get, getById, update, save, login }
};

export default UserService;
