import { BaseService } from './base/base.service';

export const Userservice = () => {
  const { create, get, getById, login, remove, update } = BaseService('user');

  return { create, get, getById, login, remove, update };
};
